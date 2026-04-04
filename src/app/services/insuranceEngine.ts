import {
  ActivePolicy,
  ClaimRecord,
  DisruptionSignal,
  DisruptionType,
  PlanId,
  PolicyPlan,
  RiskLevel,
} from '../types/insurance';

export const PLAN_CATALOG: Record<PlanId, PolicyPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    weeklyBasePremium: 29,
    maxWeeklyCoverage: 1200,
    triggerMultipliers: {
      heavy_rain: 0.85,
      extreme_heat: 0.6,
      pollution: 0.65,
      strike: 0.5,
      flooding: 0.75,
    },
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    weeklyBasePremium: 59,
    maxWeeklyCoverage: 2800,
    triggerMultipliers: {
      heavy_rain: 1,
      extreme_heat: 0.85,
      pollution: 0.9,
      strike: 1,
      flooding: 1,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    weeklyBasePremium: 99,
    maxWeeklyCoverage: 5000,
    triggerMultipliers: {
      heavy_rain: 1.2,
      extreme_heat: 1.1,
      pollution: 1.05,
      strike: 1.2,
      flooding: 1.25,
    },
  },
};

const LOCATION_RISK_MAP: Record<string, RiskLevel> = {
  'KR Puram, Bangalore': 'high',
  'Whitefield, Bangalore': 'medium',
  'HSR Layout, Bangalore': 'medium',
  'Indiranagar, Bangalore': 'high',
  'Electronic City, Bangalore': 'low',
  'Andheri East, Mumbai': 'high',
  'Anna Nagar, Chennai': 'medium',
  'Banjara Hills, Hyderabad': 'low',
};

export const DELIVERY_ZONES = Object.keys(LOCATION_RISK_MAP);

const RISK_MULTIPLIER: Record<RiskLevel, number> = {
  low: 0.9,
  medium: 1,
  high: 1.22,
};

const DISRUPTION_DEFS: Array<{ id: DisruptionType; label: string; source: string; unit: string }> = [
  { id: 'heavy_rain', label: 'Heavy Rain', source: 'OpenWeather mock', unit: 'mm/hr' },
  { id: 'extreme_heat', label: 'Extreme Heat', source: 'Climate API mock', unit: 'deg C' },
  { id: 'pollution', label: 'Pollution Spike', source: 'AQI API mock', unit: 'AQI' },
  { id: 'strike', label: 'City Strike', source: 'Mobility feed mock', unit: 'index' },
  { id: 'flooding', label: 'Road Flooding', source: 'Civic incident mock', unit: '%' },
];

export function getLocationRisk(location: string): RiskLevel {
  return LOCATION_RISK_MAP[location] ?? 'medium';
}

export function calculatePremium(planId: PlanId, location: string): ActivePolicy {
  const plan = PLAN_CATALOG[planId];
  const risk = getLocationRisk(location);
  const multiplier = RISK_MULTIPLIER[risk];
  const weeklyPremium = Math.round(plan.weeklyBasePremium * multiplier);

  const explanation =
    risk === 'high'
      ? 'AI pricing detected high disruption frequency in your zone, so premium includes a higher risk load with better auto-claim coverage.'
      : risk === 'medium'
      ? 'AI pricing found moderate disruption probability, keeping your weekly premium balanced for cost and protection.'
      : 'AI pricing detected low disruption frequency in your zone, so you receive a discounted weekly premium.';

  return {
    planId,
    planName: plan.name,
    weeklyBasePremium: plan.weeklyBasePremium,
    weeklyPremium,
    maxWeeklyCoverage: plan.maxWeeklyCoverage,
    riskMultiplier: multiplier,
    aiExplanation: explanation,
    startedAt: Date.now(),
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickStatus(base: number): 'normal' | 'alert' | 'severe' {
  if (base > 0.78) return 'severe';
  if (base > 0.52) return 'alert';
  return 'normal';
}

export async function fetchDisruptionSignals(location: string, risk: RiskLevel): Promise<DisruptionSignal[]> {
  await wait(350 + Math.round(Math.random() * 450));

  const riskBoost = risk === 'high' ? 0.2 : risk === 'medium' ? 0.1 : 0;
  const locationBias = location.toLowerCase().includes('bangalore') ? 0.05 : 0;

  return DISRUPTION_DEFS.map((def) => {
    const roll = Math.random() * 0.82 + riskBoost + locationBias;
    const status = pickStatus(roll);
    const probability = Math.min(98, Math.max(8, Math.round(roll * 100)));

    const metric =
      def.id === 'heavy_rain'
        ? `${Math.round(probability * 0.9)} ${def.unit}`
        : def.id === 'extreme_heat'
        ? `${35 + Math.round(probability / 8)} ${def.unit}`
        : def.id === 'pollution'
        ? `${90 + Math.round(probability * 2.4)} ${def.unit}`
        : def.id === 'strike'
        ? `${Math.round(probability / 10)} / 10 ${def.unit}`
        : `${Math.round(probability * 0.9)} ${def.unit}`;

    return {
      id: def.id,
      label: def.label,
      source: def.source,
      metric,
      status,
      probability,
      updatedAt: Date.now(),
    };
  });
}

export function buildAutoClaim(signal: DisruptionSignal, policy: ActivePolicy, fakeLocationEnabled: boolean): ClaimRecord {
  const plan = PLAN_CATALOG[policy.planId];
  const triggerFactor = plan.triggerMultipliers[signal.id];
  const severityFactor = signal.status === 'severe' ? 1 : 0.7;
  const raw = policy.weeklyBasePremium * 6 * triggerFactor * severityFactor;
  const amount = Math.max(180, Math.min(Math.round(raw), policy.maxWeeklyCoverage));

  return {
    id: `${signal.id}_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
    triggerId: signal.id,
    triggerLabel: signal.label,
    amount,
    reason: `${signal.label} reached ${signal.status.toUpperCase()} threshold for your delivery zone`,
    status: 'processing',
    createdAt: Date.now(),
    statusUpdatedAt: Date.now(),
    delayedUntil: fakeLocationEnabled ? Date.now() + 12000 : undefined,
    warning: fakeLocationEnabled
      ? 'Claim delayed for additional verification due to suspicious location behavior.'
      : undefined,
  };
}

export function stepClaimLifecycle(claim: ClaimRecord, now: number): ClaimRecord {
  if (claim.status === 'processing') {
    if (claim.delayedUntil && now < claim.delayedUntil) {
      return claim;
    }

    if (now - claim.statusUpdatedAt > 5000) {
      return { ...claim, status: 'approved', statusUpdatedAt: now };
    }
  }

  if (claim.status === 'approved' && now - claim.statusUpdatedAt > 4000) {
    return { ...claim, status: 'payout', statusUpdatedAt: now };
  }

  return claim;
}

export function shouldCreateClaim(signal: DisruptionSignal, claims: ClaimRecord[]): boolean {
  if (signal.status !== 'severe') {
    return false;
  }

  const sameTriggerRecent = claims.find(
    (claim) => claim.triggerId === signal.id && Date.now() - claim.createdAt < 45000,
  );

  return !sameTriggerRecent;
}
