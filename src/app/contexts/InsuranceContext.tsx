import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivePolicy,
  ClaimRecord,
  DisruptionSignal,
  InsuranceState,
  PlanId,
  UserProfile,
} from '../types/insurance';
import {
  buildAutoClaim,
  calculatePremium,
  DELIVERY_ZONES,
  fetchDisruptionSignals,
  getLocationRisk,
  shouldCreateClaim,
  stepClaimLifecycle,
} from '../services/insuranceEngine';

const STORAGE_KEY = 'gigshield_insurance_state_v1';

const defaultSignals: DisruptionSignal[] = [
  {
    id: 'heavy_rain',
    label: 'Heavy Rain',
    source: 'OpenWeather mock',
    metric: '18 mm/hr',
    status: 'normal',
    probability: 24,
    updatedAt: Date.now(),
  },
  {
    id: 'extreme_heat',
    label: 'Extreme Heat',
    source: 'Climate API mock',
    metric: '37 deg C',
    status: 'normal',
    probability: 21,
    updatedAt: Date.now(),
  },
  {
    id: 'pollution',
    label: 'Pollution Spike',
    source: 'AQI API mock',
    metric: '142 AQI',
    status: 'alert',
    probability: 62,
    updatedAt: Date.now(),
  },
  {
    id: 'strike',
    label: 'City Strike',
    source: 'Mobility feed mock',
    metric: '4 / 10 index',
    status: 'normal',
    probability: 31,
    updatedAt: Date.now(),
  },
  {
    id: 'flooding',
    label: 'Road Flooding',
    source: 'Civic incident mock',
    metric: '12 %',
    status: 'normal',
    probability: 19,
    updatedAt: Date.now(),
  },
];

const initialState: InsuranceState = {
  otpSession: null,
  profile: null,
  policy: null,
  triggers: defaultSignals,
  claims: [],
  fakeLocationEnabled: false,
  fraudScore: 0,
  fraudWarnings: [],
  earningsProtected: 0,
  lastSyncedAt: null,
  initialized: false,
};

interface InsuranceContextValue {
  state: InsuranceState;
  deliveryZones: string[];
  requestOtp: (phone: string) => Promise<string>;
  verifyOtp: (otp: string) => boolean;
  setProfile: (name: string, location: string) => void;
  quotePolicy: (planId: PlanId, location?: string) => ActivePolicy | null;
  activatePolicy: (planId: PlanId) => boolean;
  refreshSignals: () => Promise<void>;
  toggleFakeLocation: (enabled: boolean) => void;
  resetAll: () => void;
}

const InsuranceContext = createContext<InsuranceContextValue | undefined>(undefined);

function parseStoredState(raw: string | null): InsuranceState {
  if (!raw) return { ...initialState, initialized: true };

  try {
    const parsed = JSON.parse(raw) as Partial<InsuranceState>;
    return {
      ...initialState,
      ...parsed,
      initialized: true,
      triggers: parsed.triggers && parsed.triggers.length > 0 ? parsed.triggers : defaultSignals,
      claims: parsed.claims ?? [],
      fraudWarnings: parsed.fraudWarnings ?? [],
    };
  } catch {
    return { ...initialState, initialized: true };
  }
}

export function InsuranceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<InsuranceState>(() => parseStoredState(localStorage.getItem(STORAGE_KEY)));
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!state.initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const requestOtp = useCallback(async (phone: string) => {
    const generatedOtp = `${Math.floor(100000 + Math.random() * 900000)}`;

    await new Promise((resolve) => setTimeout(resolve, 700));

    setState((prev) => ({
      ...prev,
      otpSession: {
        phone,
        generatedOtp,
        expiresAt: Date.now() + 2 * 60 * 1000,
        verified: false,
      },
      profile: prev.profile
        ? {
            ...prev.profile,
            phone,
          }
        : prev.profile,
    }));

    return generatedOtp;
  }, []);

  const verifyOtp = useCallback((otp: string) => {
    const snapshot = stateRef.current.otpSession;
    if (!snapshot) return false;
    if (Date.now() > snapshot.expiresAt) return false;
    if (snapshot.generatedOtp !== otp) return false;

    setState((prev) => {
      if (!prev.otpSession) return prev;
      return {
        ...prev,
        otpSession: {
          ...prev.otpSession,
          verified: true,
        },
      };
    });

    return true;
  }, []);

  const setProfile = useCallback((name: string, location: string) => {
    const locationRisk = getLocationRisk(location);
    setState((prev) => ({
      ...prev,
      profile: {
        name,
        phone: prev.otpSession?.phone ?? prev.profile?.phone ?? '',
        location,
        locationRisk,
        joinedAt: prev.profile?.joinedAt ?? Date.now(),
      } satisfies UserProfile,
    }));
  }, []);

  const quotePolicy = useCallback((planId: PlanId, location?: string) => {
    const targetLocation = location ?? stateRef.current.profile?.location;
    if (!targetLocation) return null;
    return calculatePremium(planId, targetLocation);
  }, []);

  const activatePolicy = useCallback((planId: PlanId) => {
    const snapshot = stateRef.current;
    if (!snapshot.otpSession?.verified || !snapshot.profile) return false;

    const policy = calculatePremium(planId, snapshot.profile.location);
    setState((prev) => ({
      ...prev,
      policy,
      lastSyncedAt: Date.now(),
    }));

    return true;
  }, []);

  const refreshSignals = useCallback(async () => {
    const snapshot = stateRef.current;
    const location = snapshot.profile?.location;
    const risk = snapshot.profile?.locationRisk;

    if (!location || !risk) return;

    const fetchedSignals = await fetchDisruptionSignals(location, risk);

    setState((prev) => {
      const now = Date.now();
      const steppedClaims = prev.claims.map((claim) => stepClaimLifecycle(claim, now));

      let payoutDelta = 0;
      for (let index = 0; index < prev.claims.length; index += 1) {
        const before = prev.claims[index];
        const after = steppedClaims[index];
        if (before.status !== 'payout' && after.status === 'payout') {
          payoutDelta += after.amount;
        }
      }

      const newClaims: ClaimRecord[] = [];
      if (prev.policy) {
        for (const signal of fetchedSignals) {
          if (shouldCreateClaim(signal, steppedClaims)) {
            newClaims.push(buildAutoClaim(signal, prev.policy, prev.fakeLocationEnabled));
          }
        }
      }

      const fraudWarnings = [...prev.fraudWarnings];
      if (prev.fakeLocationEnabled && newClaims.length > 0) {
        fraudWarnings.unshift('Suspicious location toggling detected. Auto-claims are temporarily delayed for verification.');
      }

      return {
        ...prev,
        triggers: fetchedSignals,
        claims: [...newClaims, ...steppedClaims],
        earningsProtected: prev.earningsProtected + payoutDelta,
        fraudWarnings: fraudWarnings.slice(0, 6),
        fraudScore: Math.min(100, prev.fraudScore + (prev.fakeLocationEnabled ? 6 : 0)),
        lastSyncedAt: now,
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = stateRef.current;
      if (current.profile && current.policy) {
        void refreshSignals();
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [refreshSignals]);

  const toggleFakeLocation = useCallback((enabled: boolean) => {
    setState((prev) => {
      const warnings = [...prev.fraudWarnings];
      if (enabled) {
        warnings.unshift('Fraud monitor: location mismatch behavior detected. Claims may be delayed for verification.');
      }

      return {
        ...prev,
        fakeLocationEnabled: enabled,
        fraudScore: Math.min(100, Math.max(0, prev.fraudScore + (enabled ? 25 : -10))),
        fraudWarnings: warnings.slice(0, 6),
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...initialState, initialized: true });
  }, []);

  const value = useMemo(
    () => ({
      state,
      deliveryZones: DELIVERY_ZONES,
      requestOtp,
      verifyOtp,
      setProfile,
      quotePolicy,
      activatePolicy,
      refreshSignals,
      toggleFakeLocation,
      resetAll,
    }),
    [
      state,
      requestOtp,
      verifyOtp,
      setProfile,
      quotePolicy,
      activatePolicy,
      refreshSignals,
      toggleFakeLocation,
      resetAll,
    ],
  );

  return <InsuranceContext.Provider value={value}>{children}</InsuranceContext.Provider>;
}

export function useInsurance() {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error('useInsurance must be used inside InsuranceProvider');
  }
  return context;
}
