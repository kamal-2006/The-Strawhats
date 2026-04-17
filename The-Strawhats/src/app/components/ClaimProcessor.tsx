/**
 * Claim Processor Component
 * Comprehensive UI for processing parametric insurance claims
 * Supports: Single claims, Batch processing, Real-time status updates
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Send,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert } from '../components/ui/alert';
import {
  claimService,
  ProcessClaimInput,
  ProcessClaimResponse,
  APIError,
  DisruptionDetectionInput,
  ClaimCalculationInput,
} from '../services/claimService';

interface ClaimFormState {
  workerId: string;
  platform: string;
  city: string;
  deliveryType: string;
  disruptionType: string;
  disruptionIntensity: string;
  weatherCondition: string;
  pollutionIndex: string;
  zoneSafetyScore: number;
  gpsAccuracy: number;
  incomeLossPercentage: number;
  daysWorkedWeekly: number;
  avgDeliveryDistance: number;
  customerRating: number;
  weeklyEarnings: number;
  experienceMonths: number;
  ageGroup: string;
  claimFraud: boolean;
}

interface ClaimResult {
  data: ProcessClaimResponse;
  timestamp: string;
}

const DEFAULT_FORM_STATE: ClaimFormState = {
  workerId: 'W0001',
  platform: 'Zomato',
  city: 'Bangalore',
  deliveryType: 'Food Delivery',
  disruptionType: 'Heavy Rain',
  disruptionIntensity: 'High',
  weatherCondition: 'Rainy',
  pollutionIndex: 'Low',
  zoneSafetyScore: 70,
  gpsAccuracy: 98.5,
  incomeLossPercentage: 40,
  daysWorkedWeekly: 6,
  avgDeliveryDistance: 3.5,
  customerRating: 4.7,
  weeklyEarnings: 9500,
  experienceMonths: 24,
  ageGroup: '25-35',
  claimFraud: false,
};

const DISRUPTION_TYPES = [
  'Heavy Rain',
  'Flooding',
  'Extreme Heat',
  'Heat Wave',
  'Pollution Spike',
  'Zone Lockdown',
  'Street Closure',
  'App Crash',
  'Strike',
  'Curfew Lockdown',
];

const INTENSITY_LEVELS = ['Low', 'Medium', 'High', 'Very High'];
const WEATHER_CONDITIONS = ['Clear', 'Cloudy', 'Rainy', 'Very Hot', 'Hazy', 'Very Hazy'];
const POLLUTION_LEVELS = ['Low', 'Medium', 'High', 'Very High', 'Severe'];
const PLATFORMS = ['Zomato', 'Swiggy', 'Zepto', 'Amazon', 'Flipkart'];
const AGE_GROUPS = ['20-25', '25-35', '35-45', '45-55', '55-65'];

const CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad',
];

export function ClaimProcessor() {
  const [formData, setFormData] = useState<ClaimFormState>(DEFAULT_FORM_STATE);
  const [result, setResult] = useState<ClaimResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCalculation, setShowCalculation] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  // ========== FORM HANDLERS ==========

  const handleInputChange = (field: keyof ClaimFormState, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_STATE);
    setResult(null);
    setError(null);
    setShowCalculation(false);
  };

  // ========== CLAIM PROCESSING ==========

  const processClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check API availability
      const available = await claimService.isAPIAvailable();
      if (!available) {
        setApiAvailable(false);
        throw new Error(
          'API Server is not available. Make sure backend is running on http://localhost:5000'
        );
      }
      setApiAvailable(true);

      // Build claim input
      const disruptionInput: DisruptionDetectionInput = {
        disruption_type: formData.disruptionType,
        disruption_intensity: formData.disruptionIntensity,
        weather_condition: formData.weatherCondition,
        pollution_index: formData.pollutionIndex,
        platform: formData.platform,
        city: formData.city,
        delivery_type: formData.deliveryType,
        zone_safety_score: formData.zoneSafetyScore,
        gps_accuracy_percent: formData.gpsAccuracy,
      };

      const claimInput: ClaimCalculationInput = {
        eligible: true, // Will be determined by Stage 1
        income_loss_percentage: formData.incomeLossPercentage,
        days_worked_weekly: formData.daysWorkedWeekly,
        avg_delivery_distance_km: formData.avgDeliveryDistance,
        customer_rating: formData.customerRating,
        weekly_avg_earnings: formData.weeklyEarnings,
        experience_months: formData.experienceMonths,
        age_group: formData.ageGroup,
        claim_fraud_indicator: formData.claimFraud,
      };

      const completeInput: ProcessClaimInput = claimService.buildClaimInput(
        formData.workerId,
        disruptionInput,
        claimInput
      );

      // Process claim
      const response = await claimService.processClaim(completeInput);

      setResult({
        data: response,
        timestamp: new Date().toLocaleString('en-IN'),
      });
      setShowCalculation(true);
    } catch (err) {
      if (err instanceof APIError) {
        setError(
          `API Error (${err.statusCode}): ${err.errorMessage}`
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Claim processing error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const dataStr = JSON.stringify(result.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `claim_${result.data.worker_id}_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Claim Processor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Two-Stage Parametric Insurance Pipeline | Stage 1: Disruption Detection → Stage 2: Amount Calculation
          </p>
        </motion.div>

        {/* API Status Alert */}
        {!apiAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              <AlertCircle className="h-4 w-4 mr-2 inline" />
              <strong>API Unavailable:</strong> Make sure the backend is running:
              <br />
              <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded mt-2 inline-block">
                python app.py
              </code>
            </Alert>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={processClaim}>
                {/* Worker Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Worker Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Worker ID
                      </label>
                      <input
                        type="text"
                        value={formData.workerId}
                        onChange={(e) =>
                          handleInputChange('workerId', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Platform
                      </label>
                      <select
                        value={formData.platform}
                        onChange={(e) =>
                          handleInputChange('platform', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {PLATFORMS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange('city', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Delivery Type
                      </label>
                      <input
                        type="text"
                        value={formData.deliveryType}
                        onChange={(e) =>
                          handleInputChange('deliveryType', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Age Group
                      </label>
                      <select
                        value={formData.ageGroup}
                        onChange={(e) =>
                          handleInputChange('ageGroup', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {AGE_GROUPS.map((ag) => (
                          <option key={ag} value={ag}>
                            {ag}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Experience (months)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.experienceMonths}
                        onChange={(e) =>
                          handleInputChange(
                            'experienceMonths',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Stage 1: Disruption Detection */}
                <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Stage 1: Disruption Detection
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Disruption Type
                      </label>
                      <select
                        value={formData.disruptionType}
                        onChange={(e) =>
                          handleInputChange('disruptionType', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {DISRUPTION_TYPES.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Intensity
                      </label>
                      <select
                        value={formData.disruptionIntensity}
                        onChange={(e) =>
                          handleInputChange('disruptionIntensity', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {INTENSITY_LEVELS.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weather
                      </label>
                      <select
                        value={formData.weatherCondition}
                        onChange={(e) =>
                          handleInputChange('weatherCondition', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {WEATHER_CONDITIONS.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pollution Index
                      </label>
                      <select
                        value={formData.pollutionIndex}
                        onChange={(e) =>
                          handleInputChange('pollutionIndex', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {POLLUTION_LEVELS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Zone Safety Score (0-100)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.zoneSafetyScore}
                        onChange={(e) =>
                          handleInputChange(
                            'zoneSafetyScore',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">
                        {formData.zoneSafetyScore}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GPS Accuracy (0-100%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.gpsAccuracy}
                        onChange={(e) =>
                          handleInputChange(
                            'gpsAccuracy',
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">
                        {formData.gpsAccuracy.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stage 2: Claim Amount */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Stage 2: Claim Amount Calculation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Income Loss (%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.incomeLossPercentage}
                        onChange={(e) =>
                          handleInputChange(
                            'incomeLossPercentage',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">
                        {formData.incomeLossPercentage}%
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Days Worked (weekly)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={formData.daysWorkedWeekly}
                        onChange={(e) =>
                          handleInputChange(
                            'daysWorkedWeekly',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Avg Delivery Distance (km)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.avgDeliveryDistance}
                        onChange={(e) =>
                          handleInputChange(
                            'avgDeliveryDistance',
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Customer Rating (0-5)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.customerRating}
                        onChange={(e) =>
                          handleInputChange(
                            'customerRating',
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weekly Earnings (₹)
                      </label>
                      <input
                        type="number"
                        step="100"
                        value={formData.weeklyEarnings}
                        onChange={(e) =>
                          handleInputChange(
                            'weeklyEarnings',
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.claimFraud}
                          onChange={(e) =>
                            handleInputChange('claimFraud', e.target.checked)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Fraud Indicator
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                    >
                      <p className="text-red-800 dark:text-red-400 text-sm">
                        <AlertCircle className="inline h-4 w-4 mr-2" />
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Actions */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Process Claim
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="p-6 sticky top-24">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Claim Result
                      </h3>

                      {/* Overall Decision */}
                      <div className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-start gap-3">
                          {result.data.claim_eligible ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">
                              {result.data.claim_eligible ? '✅ CLAIM APPROVED' : '❌ CLAIM REJECTED'}
                            </p>
                            {result.data.claim_eligible ? (
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {claimService.formatPayout(
                                  result.data.claim_result.estimated_payout
                                )}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.data.claim_result.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Disruption Result */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Stage 1 Result
                        </p>
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                            <strong>Type:</strong> {result.data.disruption_result.type}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                            <strong>Intensity:</strong> {result.data.disruption_result.intensity}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Eligibility:</strong>{' '}
                            <Badge className="ml-1 bg-blue-600">
                              {claimService.getConfidencePercentage(
                                result.data.disruption_result.eligibility_score
                              )}
                              %
                            </Badge>
                          </p>
                        </div>
                      </div>

                      {/* Calculation Breakdown */}
                      {result.data.claim_eligible &&
                        result.data.claim_result.calculation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          >
                            <button
                              onClick={() =>
                                setShowCalculation(!showCalculation)
                              }
                              className="flex items-center justify-between w-full text-sm font-semibold text-green-900 dark:text-green-300 hover:underline"
                            >
                              <span>Show Calculation Breakdown</span>
                              {showCalculation ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>

                            <AnimatePresence>
                              {showCalculation && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 space-y-2 text-xs"
                                >
                                  {Object.entries(
                                    result.data.claim_result.calculation
                                  ).map(([key, value]) => (
                                    <div
                                      key={key}
                                      className="flex justify-between border-t border-green-200 dark:border-green-700 pt-2"
                                    >
                                      <span className="text-green-700 dark:text-green-300">
                                        {key
                                          .replace(/_/g, ' ')
                                          .charAt(0)
                                          .toUpperCase() +
                                          key
                                            .replace(/_/g, ' ')
                                            .slice(1)}
                                        :
                                      </span>
                                      <span className="font-semibold text-green-900 dark:text-green-200">
                                        {typeof value === 'number'
                                          ? value.toFixed(2)
                                          : value}
                                      </span>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}

                      {/* Metadata */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                        <p>
                          <strong>Worker:</strong> {result.data.worker_id}
                        </p>
                        <p>
                          <strong>Processed:</strong> {result.timestamp}
                        </p>
                      </div>

                      {/* Download Button */}
                      {result && (
                        <Button
                          onClick={downloadResult}
                          variant="outline"
                          className="w-full mt-4"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Result
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimProcessor;
