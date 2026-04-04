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
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

export function Dashboard() {
  const { state, refreshSignals, toggleFakeLocation } = useInsurance();
  const [syncing, setSyncing] = useState(false);

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

  const stats = useMemo(() => {
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
  }, [state.claims, state.earningsProtected, state.policy, state.triggers]);

  const claimStatusData = useMemo(
    () => [
      { name: 'Processing', value: state.claims.filter((claim) => claim.status === 'processing').length, color: '#f59e0b' },
      { name: 'Approved', value: state.claims.filter((claim) => claim.status === 'approved').length, color: '#3b82f6' },
      { name: 'Payout', value: state.claims.filter((claim) => claim.status === 'payout').length, color: '#10b981' },
    ],
    [state.claims],
  );

  const triggerChartData = useMemo(
    () => state.triggers.map((trigger) => ({ name: trigger.label.replace(' ', '\n'), value: trigger.probability })),
    [state.triggers],
  );

  const upcomingAlerts = useMemo(
    () => state.triggers.filter((signal) => signal.status !== 'normal').sort((a, b) => b.probability - a.probability),
    [state.triggers],
  );

  const recentClaims = useMemo(() => state.claims.slice(0, 6), [state.claims]);

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
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={runManualSync} disabled={syncing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                Refresh Signals
              </Button>
              <Badge className="bg-green-500 text-white">Policy Active</Badge>
            </div>
          </div>
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
          {/* Recent Payouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zero-Touch Claims Timeline</h2>
                <Badge variant="outline">Automated</Badge>
              </div>
              {recentClaims.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-gray-600 dark:text-gray-400">
                  No claims yet. Severe disruptions will auto-create claims with no forms needed.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{claim.triggerLabel}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{claim.reason}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Created: {formatDateTime(claim.createdAt)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 dark:text-green-400">₹{claim.amount}</div>
                          <Badge
                            className={
                              claim.status === 'processing'
                                ? 'bg-amber-500'
                                : claim.status === 'approved'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }
                          >
                            {claim.status}
                          </Badge>
                        </div>
                      </div>
                      {claim.warning && (
                        <div className="mt-3 text-xs text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-md p-2 border border-red-200 dark:border-red-800">
                          {claim.warning}
                        </div>
                      )}
                    </div>
                  ))}
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
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Coverage Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Weekly Coverage Buffer</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹{Math.max(state.policy.maxWeeklyCoverage - state.earningsProtected, 0)} left</span>
                    </div>
                    <Progress value={Math.min(100, (state.earningsProtected / state.policy.maxWeeklyCoverage) * 100)} className="h-2" />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-1">AI pricing explanation</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      {state.policy.aiExplanation}
                    </div>
                  </div>
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
                <h3 className="font-bold text-gray-900 dark:text-white">Claims Status Distribution</h3>
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
