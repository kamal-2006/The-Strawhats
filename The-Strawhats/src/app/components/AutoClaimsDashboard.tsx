/**
 * Auto Claims Dashboard Component
 * Automatically processes insurance claims without manual input
 * - Auto-populated with realistic test data
 * - Auto-submits on load
 * - Shows results in real-time
 * - Can generate multiple batches
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Download,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert } from '../components/ui/alert';
import { claimService, ProcessClaimInput } from '../services/claimService';

interface AutoClaimData {
  claimId: string;
  workerId: string;
  status: 'processing' | 'approved' | 'rejected';
  payout: number;
  disruptionScore: number;
  timestamp: string;
  error?: string;
}

interface BatchStats {
  total: number;
  approved: number;
  rejected: number;
  totalPayout: number;
  avgPayout: number;
}

// Test data for automatic claims
const TEST_CLAIMS = [
  {
    worker_id: 'W0001',
    platform: 'Zomato',
    city: 'Bangalore',
    delivery_type: 'Food Delivery',
    age_group: '25-35',
    experience_months: 24,
    weekly_avg_earnings: 8500,
    disruption_type: 'Heavy Rain',
    disruption_intensity: 'High',
    income_loss_percentage: 40,
    weather_condition: 'Rainy',
    pollution_index: 'Low',
    gps_accuracy_percent: 98.5,
    zone_safety_score: 68,
    days_worked_weekly: 6,
    avg_delivery_distance_km: 3.5,
    customer_rating: 4.7,
    claim_fraud_indicator: false,
  },
  {
    worker_id: 'W0002',
    platform: 'Flipkart',
    city: 'Mumbai',
    delivery_type: 'Parcel Delivery',
    age_group: '30-40',
    experience_months: 36,
    weekly_avg_earnings: 9500,
    disruption_type: 'Flooding',
    disruption_intensity: 'High',
    income_loss_percentage: 50,
    weather_condition: 'Rainy',
    pollution_index: 'Normal',
    gps_accuracy_percent: 97.2,
    zone_safety_score: 55,
    days_worked_weekly: 5,
    avg_delivery_distance_km: 4.2,
    customer_rating: 4.8,
    claim_fraud_indicator: false,
  },
  {
    worker_id: 'W0003',
    platform: 'Uber Eats',
    city: 'Delhi',
    delivery_type: 'Food Delivery',
    age_group: '20-25',
    experience_months: 12,
    weekly_avg_earnings: 7200,
    disruption_type: 'Dust Storm',
    disruption_intensity: 'Medium',
    income_loss_percentage: 30,
    weather_condition: 'Dusty',
    pollution_index: 'High',
    gps_accuracy_percent: 96.0,
    zone_safety_score: 72,
    days_worked_weekly: 7,
    avg_delivery_distance_km: 2.8,
    customer_rating: 4.5,
    claim_fraud_indicator: false,
  },
  {
    worker_id: 'W0004',
    platform: 'Swiggy',
    city: 'Pune',
    delivery_type: 'Food Delivery',
    age_group: '35-45',
    experience_months: 48,
    weekly_avg_earnings: 10000,
    disruption_type: 'Clear Day',
    disruption_intensity: 'Low',
    income_loss_percentage: 5,
    weather_condition: 'Sunny',
    pollution_index: 'Low',
    gps_accuracy_percent: 99,
    zone_safety_score: 85,
    days_worked_weekly: 6,
    avg_delivery_distance_km: 3.0,
    customer_rating: 4.9,
    claim_fraud_indicator: false,
  },
  {
    worker_id: 'W0005',
    platform: 'Zomato',
    city: 'Kolkata',
    delivery_type: 'Food Delivery',
    age_group: '25-35',
    experience_months: 18,
    weekly_avg_earnings: 7500,
    disruption_type: 'Extreme Heat',
    disruption_intensity: 'High',
    income_loss_percentage: 35,
    weather_condition: 'Very Hot',
    pollution_index: 'Normal',
    gps_accuracy_percent: 97.5,
    zone_safety_score: 70,
    days_worked_weekly: 5,
    avg_delivery_distance_km: 3.2,
    customer_rating: 4.4,
    claim_fraud_indicator: false,
  },
];

export function AutoClaimsDashboard() {
  const [claims, setClaims] = useState<AutoClaimData[]>([]);
  const [stats, setStats] = useState<BatchStats>({
    total: 0,
    approved: 0,
    rejected: 0,
    totalPayout: 0,
    avgPayout: 0,
  });
  const [loading, setLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [autoProcessing, setAutoProcessing] = useState(true);
  const [processingIndex, setProcessingIndex] = useState(0);

  // Auto-process claims on mount
  useEffect(() => {
    if (autoProcessing && processingIndex === 0) {
      processNextClaim();
    }
  }, []);

  // Process claims one by one
  useEffect(() => {
    if (autoProcessing && processingIndex > 0 && processingIndex < TEST_CLAIMS.length) {
      const timer = setTimeout(() => {
        processNextClaim();
      }, 800); // 800ms delay between claims
      return () => clearTimeout(timer);
    }
  }, [processingIndex, autoProcessing]);

  const processNextClaim = async () => {
    if (processingIndex >= TEST_CLAIMS.length) {
      setAutoProcessing(false);
      return;
    }

    const claimData = TEST_CLAIMS[processingIndex];
    const claimId = `CLAIM_${Date.now()}_${processingIndex}`;

    // Add processing state
    const newClaim: AutoClaimData = {
      claimId,
      workerId: claimData.worker_id,
      status: 'processing',
      payout: 0,
      disruptionScore: 0,
      timestamp: new Date().toLocaleString('en-IN'),
    };

    setClaims((prev) => [newClaim, ...prev]);

    try {
      // Check API availability
      const available = await claimService.isAPIAvailable();
      if (!available) {
        setApiAvailable(false);
        setClaims((prev) =>
          prev.map((c) =>
            c.claimId === claimId
              ? {
                  ...c,
                  status: 'rejected',
                  error: 'API Server not available',
                }
              : c
          )
        );
        setProcessingIndex(processingIndex + 1);
        return;
      }
      setApiAvailable(true);

      // Process claim through auto endpoint
      const response = await fetch('https://integrated-thiruselvan-gigshield.hf.space/auto-process-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      const result = await response.json();

      // Update claim with result
      setClaims((prev) =>
        prev.map((c) =>
          c.claimId === claimId
            ? {
                ...c,
                status: result.status === 'approved' ? 'approved' : 'rejected',
                payout: result.payout_approved || 0,
                disruptionScore: result.disruption_score || 0,
              }
            : c
        )
      );

      // Update stats
      setStats((prev) => {
        const isApproved = result.status === 'approved';
        const newStats = {
          total: prev.total + 1,
          approved: prev.approved + (isApproved ? 1 : 0),
          rejected: prev.rejected + (isApproved ? 0 : 1),
          totalPayout: prev.totalPayout + (result.payout_approved || 0),
          avgPayout: 0,
        };
        newStats.avgPayout =
          newStats.approved > 0 ? newStats.totalPayout / newStats.approved : 0;
        return newStats;
      });
    } catch (error) {
      console.error('Error processing claim:', error);
      setClaims((prev) =>
        prev.map((c) =>
          c.claimId === claimId
            ? {
                ...c,
                status: 'rejected',
                error: error instanceof Error ? error.message : 'Processing failed',
              }
            : c
        )
      );
    } finally {
      setProcessingIndex(processingIndex + 1);
    }
  };

  const processAllAgain = () => {
    setClaims([]);
    setStats({
      total: 0,
      approved: 0,
      rejected: 0,
      totalPayout: 0,
      avgPayout: 0,
    });
    setProcessingIndex(0);
    setAutoProcessing(true);
  };

  const downloadResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      stats,
      claims,
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auto_claims_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Auto Claims Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Automatic claim processing with zero manual intervention
          </p>
        </motion.div>

        {/* API Status */}
        {!apiAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              <AlertCircle className="h-4 w-4 mr-2 inline" />
              <strong>API Unavailable:</strong> Backend not running on
              <code className="ml-1 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                
              </code>https://integrated-thiruselvan-gigshield.hf.space
            </Alert>
          </motion.div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Claims</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.approved}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.rejected}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ₹{stats.totalPayout.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Payout</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{stats.avgPayout.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Payout</div>
            </Card>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-3">
          <Button
            onClick={processAllAgain}
            disabled={autoProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {autoProcessing ? 'Processing...' : 'Process Again'}
          </Button>
          {stats.total > 0 && (
            <Button onClick={downloadResults} className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Results
            </Button>
          )}
        </div>

        {/* Claims List */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Processed Claims
          </h2>

          <AnimatePresence mode="popLayout">
            {claims.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-500" />
                <p className="text-gray-600 dark:text-gray-400">Waiting to process claims...</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {claims.map((claim, index) => (
                  <motion.div
                    key={claim.claimId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {claim.status === 'processing' && (
                          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                        )}
                        {claim.status === 'approved' && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        {claim.status === 'rejected' && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {claim.workerId}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {claim.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        {claim.disruptionScore > 0 && (
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Score: {(claim.disruptionScore * 100).toFixed(1)}%
                          </p>
                        )}
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ₹{claim.payout.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Badge
                        className={
                          claim.status === 'approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }
                      >
                        {claim.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </Card>

        {/* Progress Indicator */}
        {autoProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Processing {processingIndex + 1} of {TEST_CLAIMS.length}...
            </p>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((processingIndex + 1) / TEST_CLAIMS.length) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
