export type PlanId = 'basic' | 'standard' | 'pro';
export type RiskLevel = 'low' | 'medium' | 'high';
export type TriggerStatus = 'normal' | 'alert' | 'severe';
export type ClaimStatus = 'processing' | 'approved' | 'payout';

export interface OtpSession {
  phone: string;
  generatedOtp: string;
  expiresAt: number;
  verified: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  location: string;
  locationRisk: RiskLevel;
  joinedAt: number;
}

export interface PolicyPlan {
  id: PlanId;
  name: string;
  weeklyBasePremium: number;
  maxWeeklyCoverage: number;
  triggerMultipliers: Record<DisruptionType, number>;
}

export interface ActivePolicy {
  planId: PlanId;
  planName: string;
  weeklyBasePremium: number;
  weeklyPremium: number;
  maxWeeklyCoverage: number;
  riskMultiplier: number;
  aiExplanation: string;
  startedAt: number;
}

export type DisruptionType = 'heavy_rain' | 'extreme_heat' | 'pollution' | 'strike' | 'flooding';

export interface DisruptionSignal {
  id: DisruptionType;
  label: string;
  source: string;
  metric: string;
  status: TriggerStatus;
  probability: number;
  updatedAt: number;
}

export interface ClaimRecord {
  id: string;
  triggerId: DisruptionType;
  triggerLabel: string;
  amount: number;
  reason: string;
  status: ClaimStatus;
  createdAt: number;
  statusUpdatedAt: number;
  delayedUntil?: number;
  warning?: string;
}

export interface InsuranceState {
  otpSession: OtpSession | null;
  profile: UserProfile | null;
  policy: ActivePolicy | null;
  triggers: DisruptionSignal[];
  claims: ClaimRecord[];
  fakeLocationEnabled: boolean;
  fraudScore: number;
  fraudWarnings: string[];
  earningsProtected: number;
  lastSyncedAt: number | null;
  initialized: boolean;
}
