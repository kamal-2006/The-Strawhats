/**
 * GigShield Parametric Insurance API Service
 * Handles all communication with the backend Flask API
 * 
 * Two-Stage Pipeline:
 * Stage 1: Disruption Detection - Checks if worker is eligible
 * Stage 2: Claim Amount Calculation - Calculates payout amount
 */

// ================================
// API CONFIGURATION
// ================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log(`🔌 Claim Service initialized with API URL: ${API_BASE_URL}`);

// ================================
// TYPES
// ================================

export interface DisruptionDetectionInput {
  disruption_type: string;
  disruption_intensity: string;
  weather_condition: string;
  pollution_index: string;
  platform: string;
  city: string;
  delivery_type: string;
  zone_safety_score: number;
  gps_accuracy_percent: number;
}

export interface DisruptionDetectionResponse {
  eligible: boolean;
  eligibility_score: number;
  confidence: {
    not_eligible: number;
    eligible: number;
  };
  processed_at: string;
  status: 'success' | 'error';
}

export interface ClaimCalculationInput {
  eligible: boolean;
  income_loss_percentage: number;
  days_worked_weekly: number;
  avg_delivery_distance_km: number;
  customer_rating: number;
  weekly_avg_earnings: number;
  experience_months: number;
  age_group: string;
  claim_fraud_indicator: boolean;
}

export interface ClaimCalculationResponse {
  eligible: boolean;
  estimated_payout: number;
  calculation_breakdown?: {
    model_prediction: number;
    income_loss_percentage: number;
    weekly_earnings: number;
    max_theoretical_payout: number;
    final_payout: number;
  };
  reason?: string;
  processed_at: string;
  status: 'success' | 'ineligible';
}

export interface ProcessClaimInput extends DisruptionDetectionInput, ClaimCalculationInput {
  worker_id: string;
}

export interface ProcessClaimResponse {
  worker_id: string;
  claim_eligible: boolean;
  disruption_result: {
    type: string;
    intensity: string;
    eligible: boolean;
    eligibility_score: number;
  };
  claim_result: {
    status: 'approved' | 'rejected';
    estimated_payout: number;
    reason?: string;
    calculation?: {
      model_prediction: number;
      income_loss_percentage: number;
      weekly_earnings: number;
      max_possible_payout: number;
      final_payout: number;
    };
  };
  processed_at: string;
  status: 'success' | 'error';
}

export interface BatchClaimInput {
  workers: ProcessClaimInput[];
}

export interface BatchClaimResponse {
  total_processed: number;
  results: ProcessClaimResponse[];
  status: 'success' | 'error';
}

export interface ModelInfoResponse {
  models: {
    disruption_detection: {
      type: string;
      n_estimators: number;
      features: string[];
      categorical_features: string[];
    };
    claim_calculator: {
      type: string;
      n_estimators: number;
      features: string[];
      categorical_features: string[];
    };
  };
  performance_metrics: {
    disruption_model: {
      accuracy: number;
      eligible_precision: number;
    };
    claim_model: {
      mae: number;
      r2_score: number;
      training_samples: number;
    };
  };
  status: 'success';
}

export interface AutoProcessedClaim {
  claim_id: string;
  worker_id: string;
  disruption_type: string;
  status: 'approved' | 'rejected';
  payout: number;
  disruption_score: number;
  timestamp: string;
  error?: string;
}

export interface ProcessingStatistics {
  total_processed: number;
  approved_count: number;
  rejected_count: number;
  total_payout: number;
  average_payout: number;
  claims: AutoProcessedClaim[];
}

export interface AutoStatsResponse {
  status: string;
  statistics: ProcessingStatistics;
  timestamp: string;
}

// ================================
// ERROR HANDLING
// ================================

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public errorMessage: string,
    public details?: any
  ) {
    super(errorMessage);
    this.name = 'APIError';
  }
}

async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      data.error || `API Error: ${response.status} ${response.statusText}`,
      data
    );
  }
  return response.json() as Promise<T>;
}

// ================================
// API SERVICE
// ================================

export const claimService = {
  // ========== HEALTH CHECK ==========
  
  async checkHealth(): Promise<{ status: string; models_loaded: boolean; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return handleAPIResponse(response);
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw error;
    }
  },

  // ========== STAGE 1: DISRUPTION DETECTION ==========
  
  /**
   * Stage 1: Detect if a disruption has occurred
   * Returns eligibility for claim based on disruption
   */
  async detectDisruption(
    data: DisruptionDetectionInput
  ): Promise<DisruptionDetectionResponse> {
    try {
      console.log('🔍 Detecting disruption...', data);
      
      const response = await fetch(`${API_BASE_URL}/detect-disruption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await handleAPIResponse<DisruptionDetectionResponse>(response);
      console.log('✅ Disruption detection result:', result);
      return result;
    } catch (error) {
      console.error('❌ Disruption detection failed:', error);
      throw error;
    }
  },

  // ========== STAGE 2: CLAIM AMOUNT CALCULATION ==========
  
  /**
   * Stage 2: Calculate claim amount for eligible disruptions
   * Returns payout amount based on worker and disruption details
   */
  async calculateClaim(
    data: ClaimCalculationInput
  ): Promise<ClaimCalculationResponse> {
    try {
      console.log('💰 Calculating claim amount...', data);
      
      const response = await fetch(`${API_BASE_URL}/calculate-claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await handleAPIResponse<ClaimCalculationResponse>(response);
      console.log('✅ Claim calculation result:', result);
      return result;
    } catch (error) {
      console.error('❌ Claim calculation failed:', error);
      throw error;
    }
  },

  // ========== END-TO-END COMPLETE PIPELINE ==========
  
  /**
   * Process complete claim in one call (Stage 1 + Stage 2)
   * RECOMMENDED: Use this endpoint for most cases
   * 
   * Flow:
   * 1. Checks if disruption is eligible
   * 2. If yes, calculates payout amount
   * 3. Returns decision + amount in one response
   */
  async processClaim(
    data: ProcessClaimInput
  ): Promise<ProcessClaimResponse> {
    try {
      console.log('📋 Processing complete claim...', data);
      
      const response = await fetch(`${API_BASE_URL}/process-claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await handleAPIResponse<ProcessClaimResponse>(response);
      console.log('✅ Claim processing result:', result);
      return result;
    } catch (error) {
      console.error('❌ Claim processing failed:', error);
      throw error;
    }
  },

  // ========== BATCH PROCESSING ==========
  
  /**
   * Process multiple claims in batch
   * Useful for bulk operations or daily reconciliation
   */
  async processClaimsBatch(
    data: BatchClaimInput
  ): Promise<BatchClaimResponse> {
    try {
      console.log(`📦 Processing batch of ${data.workers.length} claims...`);
      
      const response = await fetch(`${API_BASE_URL}/process-claims-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await handleAPIResponse<BatchClaimResponse>(response);
      console.log(`✅ Batch processing complete: ${result.total_processed} claims processed`);
      return result;
    } catch (error) {
      console.error('❌ Batch processing failed:', error);
      throw error;
    }
  },

  // ========== MODEL INFORMATION ==========
  
  /**
   * Get information about trained models
   * Useful for debugging and understanding model capabilities
   */
  async getModelInfo(): Promise<ModelInfoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/model-info`);
      const result = await handleAPIResponse<ModelInfoResponse>(response);
      console.log('📊 Model info:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch model info:', error);
      throw error;
    }
  },

  // ========== AUTO-PROCESSING STATISTICS ==========
  
  /**
   * Get auto-processing statistics with all processed claims from MongoDB
   * Returns total processed, approved, rejected, payouts, and recent claims
   */
  async getAutoProcessingStats(): Promise<AutoStatsResponse> {
    try {
      console.log('📊 Fetching auto-processing statistics...');
      const response = await fetch(`${API_BASE_URL}/auto-stats`);
      const result = await handleAPIResponse<AutoStatsResponse>(response);
      console.log('✅ Auto-stats retrieved:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to fetch auto-processing stats:', error);
      throw error;
    }
  },

  // ========== HELPER METHODS ==========
  
  /**
   * Build complete claim input from separated stage data
   */
  buildClaimInput(
    workerId: string,
    disruption: DisruptionDetectionInput,
    claim: ClaimCalculationInput
  ): ProcessClaimInput {
    return {
      worker_id: workerId,
      ...disruption,
      ...claim,
    };
  },

  /**
   * Format payout amount for display
   */
  formatPayout(amount: number): string {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  /**
   * Get status badge color
   */
  getStatusColor(status: 'approved' | 'rejected' | 'processing'): string {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      processing: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status];
  },

  /**
   * Calculate confidence percentage
   */
  getConfidencePercentage(score: number): number {
    return Math.round(score * 100);
  },

  /**
   * Check if API is available
   */
  async isAPIAvailable(): Promise<boolean> {
    try {
      await this.checkHealth();
      return true;
    } catch {
      return false;
    }
  },
};

export default claimService;
