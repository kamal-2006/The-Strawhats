import { motion } from 'motion/react';
import {
  Shield,
  TrendingUp,
  Bell,
  Calendar,
  IndianRupee,
  RefreshCw,
  MapPin,
  Clock,
  AlertTriangle,
  Radar,
  BadgeCheck,
  Zap,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useInsurance } from '../contexts/InsuranceContext';
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { claimService, AutoProcessedClaim, ProcessingStatistics } from '../services/claimService';

function formatDateTime(timestamp: number | string) {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function Dashboard() {
  const { state, refreshSignals, toggleFakeLocation } = useInsurance();
  const [syncing, setSyncing] = useState(false);
  const [backendStats, setBackendStats] = useState<ProcessingStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test claims for demo
  const TEST_CLAIMS = [
    {
      worker_id: 'W0001',
      platform: 'Zomato',
      disruption_type: 'Heavy Rain',
      disruption_intensity: 'high',
      weather_condition: 'rainy',
      pollution_index: 'low',
      city: 'Mumbai',
      delivery_type: 'food',
      zone_safety_score: 65,
      gps_accuracy_percent: 92,
      eligible: true,
      income_loss_percentage: 75,
      days_worked_weekly: 6,
      avg_delivery_distance_km: 8,
      customer_rating: 4.8,
      weekly_avg_earnings: 8000,
      experience_months: 24,
      age_group: '25-35',
      claim_fraud_indicator: false,
    },
    {
      worker_id: 'W0002',
      platform: 'Flipkart',
      disruption_type: 'Flooding',
      disruption_intensity: 'high',
      weather_condition: 'flooded',
      pollution_index: 'medium',
      city: 'Mumbai',
      delivery_type: 'logistics',
      zone_safety_score: 45,
      gps_accuracy_percent: 88,
      eligible: true,
      income_loss_percentage: 85,
      days_worked_weekly: 5,
      avg_delivery_distance_km: 15,
      customer_rating: 4.6,
      weekly_avg_earnings: 12000,
      experience_months: 36,
      age_group: '30-40',
      claim_fraud_indicator: false,
    },
    {
      worker_id: 'W0003',
      platform: 'Uber Eats',
      disruption_type: 'Dust Storm',
      disruption_intensity: 'medium',
      weather_condition: 'dusty',
      pollution_index: 'high',
      city: 'Delhi',
      delivery_type: 'food',
      zone_safety_score: 55,
      gps_accuracy_percent: 90,
      eligible: true,
      income_loss_percentage: 60,
      days_worked_weekly: 7,
      avg_delivery_distance_km: 10,
      customer_rating: 4.7,
      weekly_avg_earnings: 9500,
      experience_months: 18,
      age_group: '20-30',
      claim_fraud_indicator: false,
    },
  ];

  // Fetch auto-processing stats from backend on mount
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await claimService.getAutoProcessingStats();
        if (response.statistics) {
          setBackendStats(response.statistics);
        }
      } catch (err) {
        console.error('Failed to fetch backend stats:', err);
        setError('Failed to load live data from backend');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 seconds
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Process test claims to populate statistics
  const processTestClaims = async () => {
    setProcessing(true);
    try {
      for (let i = 0; i < TEST_CLAIMS.length; i++) {
        await claimService.processClaim(TEST_CLAIMS[i]);
        // Delay between claims
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      // Refresh stats after processing
      const response = await claimService.getAutoProcessingStats();
      if (response.statistics) {
        setBackendStats(response.statistics);
      }
    } catch (err) {
      console.error('Failed to process test claims:', err);
      setError('Failed to process test claims');
    } finally {
      setProcessing(false);
    }
  };

  const statusColorMap = {
    normal: 'bg-emerald-500',
    alert: 'bg-amber-500',
    severe: 'bg-red-500',
  } as const;

  const statusTextClassMap = {
    normal: 'text-emerald-600 dark:text-emerald-400',
    alert: 'text-amber-600 dark:text-amber-400',
    severe: 'text-red-600 dark:text-red-400',
  } as const;

  // Use backend stats if available, otherwise fall back to context state
  const stats = useMemo(() => {
    if (backendStats) {
      return [
        {
          label: 'Total Claims Processed',
          value: `${backendStats?.total_processed || 0}`,
          icon: TrendingUp,
          color: 'from-blue-500 to-cyan-500',
          subtitle: `via auto-processing engine`,
        },
        {
          label: 'Earnings Protected',
          value: `₹${(backendStats?.total_payout || 0).toLocaleString('en-IN')}`,
          icon: IndianRupee,
          color: 'from-green-500 to-teal-500',
          subtitle: `${backendStats?.approved_count || 0} approved claims`,
        },
        {
          label: 'Approved Claims',
          value: `${backendStats?.approved_count || 0}`,
          icon: BadgeCheck,
          color: 'from-emerald-500 to-teal-500',
          subtitle: `Avg payout: ₹${(backendStats?.total_payout / (backendStats?.approved_count || 1) || 0).toLocaleString('en-IN')}`,
        },
        {
          label: 'Rejected Claims',
          value: `${backendStats?.rejected_count || 0}`,
          icon: AlertTriangle,
          color: 'from-orange-500 to-red-500',
          subtitle: 'Did not meet claim criteria',
        },
      ];
    }

    // Fallback to context state if no backend stats
    const activeClaims = state.claims.filter((claim) => claim.status !== 'payout').length;
    const payoutClaims = state.claims.filter((claim) => claim.status === 'payout').length;
    const severeCount = state.triggers.filter((trigger) => trigger.status === 'severe').length;

    return [
      {
        label: 'Earnings Protected',
        value: `₹${state.earningsProtected.toLocaleString('en-IN')}`,
        icon: IndianRupee,
        color: 'from-green-500 to-teal-500',
        subtitle: `${payoutClaims} payouts completed`,
      },
      {
        label: 'Active Policy',
        value: state.policy?.planName ?? 'Not active',
        icon: Shield,
        color: 'from-blue-500 to-cyan-500',
        subtitle: state.policy ? `₹${state.policy.weeklyPremium}/week` : 'Activate from onboarding',
      },
      {
        label: 'Live Claims Queue',
        value: `${activeClaims}`,
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500',
        subtitle: 'processing to approved to payout',
      },
      {
        label: 'Severe Triggers',
        value: `${severeCount}`,
        icon: AlertTriangle,
        color: 'from-orange-500 to-red-500',
        subtitle: 'Auto-claim checks in progress',
      },
    ];
  }, [backendStats, state.claims, state.earningsProtected, state.policy, state.triggers]);

  const claimStatusData = useMemo(() => {
    if (backendStats) {
      return [
        { 
          name: 'Approved', 
          value: backendStats.approved_count, 
          color: '#10b981' 
        },
        { 
          name: 'Rejected', 
          value: backendStats.rejected_count, 
          color: '#ef4444' 
        },
      ];
    }

    return [
      { name: 'Processing', value: state.claims.filter((claim) => claim.status === 'processing').length, color: '#f59e0b' },
      { name: 'Approved', value: state.claims.filter((claim) => claim.status === 'approved').length, color: '#3b82f6' },
      { name: 'Payout', value: state.claims.filter((claim) => claim.status === 'payout').length, color: '#10b981' },
    ];
  }, [backendStats, state.claims]);

  const triggerChartData = useMemo(
    () => state.triggers.map((trigger) => ({ name: trigger.label.replace(' ', '\n'), value: trigger.probability })),
    [state.triggers],
  );

  const upcomingAlerts = useMemo(
    () => state.triggers.filter((signal) => signal.status !== 'normal').sort((a, b) => b.probability - a.probability),
    [state.triggers],
  );

  // Use backend claims if available, otherwise fall back to context
  const recentClaims = useMemo(() => {
    if (backendStats?.claims && backendStats.claims.length > 0) {
      return backendStats.claims.slice(0, 6);
    }
    return state.claims.slice(0, 6);
  }, [backendStats, state.claims]);

  if (!state.profile || !state.policy) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Complete Onboarding to Unlock Live Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              OTP registration, location risk profiling, plan selection, and AI premium calculation must be completed first.
            </p>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Go to Registration</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const runManualSync = async () => {
    setSyncing(true);
    await refreshSignals();
    setSyncing(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {state.profile.name}!</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {state.profile.location} zone risk: <span className="font-semibold uppercase">{state.profile.locationRisk}</span>
                {backendStats && ` • Live backend data • ${backendStats.total_processed} auto-processed claims`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={runManualSync} 
                disabled={syncing || loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing || loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge className="bg-green-500 text-white">Policy Active</Badge>
              {backendStats && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Live Backend
                </Badge>
              )}
            </div>
          </div>
          {error && (
            <div className="text-sm text-amber-600 dark:text-amber-400 mt-2">
              ⚠️ {error} (using local data as fallback)
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                {stat.subtitle && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {stat.subtitle}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Claims from Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {backendStats ? 'Auto-Processed Claims (Live)' : 'Zero-Touch Claims Timeline'}
                </h2>
                <Badge variant="outline">{backendStats ? '🚀 Auto-Processing' : 'Automated'}</Badge>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin inline-block">
                    <RefreshCw className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Loading live data...</p>
                </div>
              ) : recentClaims.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-gray-600 dark:text-gray-400">
                  No claims yet. Severe disruptions will auto-create claims with no forms needed.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentClaims.map((claim) => {
                    // Handle both backend and context claim formats
                    const isBackendClaim = 'claim_id' in claim;
                    const claimId = isBackendClaim ? claim.claim_id : (claim as any).id;
                    const status = isBackendClaim ? claim.status : (claim as any).status;
                    const amount = isBackendClaim ? claim.payout : (claim as any).amount;
                    const reason = isBackendClaim ? claim.disruption_type : (claim as any).reason;
                    const timestamp = isBackendClaim ? claim.timestamp : (claim as any).createdAt;

                    return (
                      <div
                        key={claimId}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {reason}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {isBackendClaim ? `Worker: ${claim.worker_id}` : (claim as any).reason}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {formatDateTime(timestamp)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600 dark:text-green-400">₹{amount.toLocaleString('en-IN')}</div>
                            <Badge
                              className={
                                status === 'processing'
                                  ? 'bg-amber-500'
                                  : status === 'approved'
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }
                            >
                              {status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Policy Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Backend Status</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                    <div className="text-xs text-blue-900 dark:text-blue-100 font-medium mb-1">Connection Status</div>
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {backendStats ? '🟢 Connected' : loading ? '🟡 Connecting...' : '🟢 Connected'}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Syncing every 5 seconds
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">Approved Rate</div>
                      <div className="font-bold text-green-700 dark:text-green-300 text-lg mt-1">
                        {backendStats && backendStats.total_processed > 0
                          ? ((backendStats.approved_count / backendStats.total_processed) * 100).toFixed(0)
                          : '0'}%
                      </div>
                      {backendStats && (
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                          {backendStats.approved_count} claims
                        </div>
                      )}
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium">Rejected Rate</div>
                      <div className="font-bold text-red-700 dark:text-red-300 text-lg mt-1">
                        {backendStats && backendStats.total_processed > 0
                          ? ((backendStats.rejected_count / backendStats.total_processed) * 100).toFixed(0)
                          : '0'}%
                      </div>
                      {backendStats && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {backendStats.rejected_count} claims
                        </div>
                      )}
                    </div>
                  </div>
                  {!backendStats && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                      <div className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                        ℹ️ No auto-processed claims yet. Process test claims to populate statistics.
                      </div>
                      <Button
                        size="sm"
                        onClick={processTestClaims}
                        disabled={processing}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        {processing ? (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-3 w-3 mr-1" />
                            Process Test Claims
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Live Trigger Feed</h3>
                </div>
                <div className="space-y-3">
                  {state.triggers.map((alert) => (
                    <div key={alert.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 ${statusColorMap[alert.status]} rounded-lg flex items-center justify-center`}>
                          <Radar className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{alert.label}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{alert.metric} from {alert.source}</div>
                        </div>
                        <Badge variant="outline" className={statusTextClassMap[alert.status]}>{alert.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={alert.probability} className="h-1" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {alert.probability}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Risk and Fraud Monitor</h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{state.profile.location}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  Fraud score: <span className="font-semibold">{state.fraudScore}/100</span>
                </div>
                <div className="mb-3">
                  <Progress value={state.fraudScore} className="h-2" />
                </div>
                <Button
                  variant={state.fakeLocationEnabled ? 'destructive' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={() => toggleFakeLocation(!state.fakeLocationEnabled)}
                >
                  {state.fakeLocationEnabled ? 'Disable Fake Location Mode' : 'Simulate Fake Location Toggle'}
                </Button>
                {state.fraudWarnings[0] && (
                  <div className="mt-3 text-xs text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-md p-2 border border-red-200 dark:border-red-800">
                    {state.fraudWarnings[0]}
                  </div>
                )}
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500 mt-3">
                  <Clock className="h-3 w-3" />
                  <span>
                    Last API sync:{' '}
                    {state.lastSyncedAt ? formatDateTime(state.lastSyncedAt) : 'Not synced yet'}
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {backendStats ? 'Claims Distribution' : 'Claims Status Distribution'}
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={claimStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {claimStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Trigger Probability by Type</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={triggerChartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {upcomingAlerts.length > 0 && (
          <div className="mt-6">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Priority Alerts</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {upcomingAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">{alert.label}</div>
                      <Badge variant="outline" className={statusTextClassMap[alert.status]}>{alert.status}</Badge>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.metric}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
