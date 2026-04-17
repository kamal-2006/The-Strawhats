import { motion } from 'motion/react';
import { Users, TrendingUp, AlertTriangle, IndianRupee, Activity, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const stats = [
    { label: 'Active Users', value: '5,234', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Total Payouts', value: '₹2.1Cr', icon: IndianRupee, color: 'from-green-500 to-teal-500', change: '+8%' },
    { label: 'Fraud Detected', value: '23', icon: AlertTriangle, color: 'from-red-500 to-orange-500', change: '-15%' },
    { label: 'Success Rate', value: '99.8%', icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '+0.2%' },
  ];

  const payoutsData = [
    { month: 'Jan', amount: 850000 },
    { month: 'Feb', amount: 1200000 },
    { month: 'Mar', amount: 1850000 },
    { month: 'Apr', amount: 1450000 },
    { month: 'May', amount: 1950000 },
    { month: 'Jun', amount: 2100000 },
  ];

  const usersData = [
    { day: 'Mon', users: 3200 },
    { day: 'Tue', users: 3800 },
    { day: 'Wed', users: 4100 },
    { day: 'Thu', users: 4500 },
    { day: 'Fri', users: 5000 },
    { day: 'Sat', users: 5100 },
    { day: 'Sun', users: 5234 },
  ];

  const planDistribution = [
    { name: 'Basic', value: 30, color: '#3b82f6' },
    { name: 'Standard', value: 55, color: '#a855f7' },
    { name: 'Pro', value: 15, color: '#f97316' },
  ];

  const recentClaims = [
    { id: 1, user: 'Rajan Kumar', type: 'Rain', amount: 400, location: 'KR Puram, BLR', status: 'approved', time: '5 mins ago' },
    { id: 2, user: 'Amit Singh', type: 'Pollution', amount: 500, location: 'Indiranagar, BLR', status: 'approved', time: '12 mins ago' },
    { id: 3, user: 'Suresh M', type: 'Rain', amount: 350, location: 'Whitefield, BLR', status: 'pending', time: '18 mins ago' },
    { id: 4, user: 'Vijay Kumar', type: 'Strike', amount: 650, location: 'HSR Layout, BLR', status: 'rejected', time: '25 mins ago' },
  ];

  const riskZones = [
    { zone: 'KR Puram', risk: 'High', incidents: 45, color: 'bg-red-500' },
    { zone: 'Whitefield', risk: 'Medium', incidents: 28, color: 'bg-yellow-500' },
    { zone: 'Indiranagar', risk: 'High', incidents: 52, color: 'bg-red-500' },
    { zone: 'HSR Layout', risk: 'Low', incidents: 12, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Monitor and manage GigShield operations</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Activity className="h-4 w-4 text-green-500 animate-pulse" />
              <span>System Operational</span>
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
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Payouts Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payouts Over Time</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={payoutsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Active Users Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Users (This Week)</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Claims */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Claims</h2>
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{claim.user}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                          <span>{claim.type}</span>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{claim.location}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{claim.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white mb-2">₹{claim.amount}</div>
                      <Badge
                        className={
                          claim.status === 'approved'
                            ? 'bg-green-500'
                            : claim.status === 'pending'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }
                      >
                        {claim.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {claim.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Plan Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Plan Distribution</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {planDistribution.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                        <span className="text-gray-700 dark:text-gray-300">{plan.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{plan.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Risk Zones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Risk Heatmap</h3>
                <div className="space-y-3">
                  {riskZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${zone.color} rounded-full`} />
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{zone.zone}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{zone.incidents} incidents</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{zone.risk}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
