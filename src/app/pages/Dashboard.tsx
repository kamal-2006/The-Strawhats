import { motion } from 'motion/react';
import { Shield, TrendingUp, Bell, Calendar, IndianRupee, CloudRain, Users, Wind, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

export function Dashboard() {
  const stats = [
    { label: 'Total Protected', value: '₹2,400', icon: IndianRupee, color: 'from-green-500 to-teal-500', change: '+12%' },
    { label: 'Active Coverage', value: 'Standard', icon: Shield, color: 'from-blue-500 to-cyan-500', plan: '₹59/week' },
    { label: 'Total Payouts', value: '8', icon: TrendingUp, color: 'from-purple-500 to-pink-500', subtitle: 'Last 30 days' },
    { label: 'Next Renewal', value: '3 days', icon: Calendar, color: 'from-orange-500 to-red-500', subtitle: 'Auto-renew on' },
  ];

  const recentPayouts = [
    { id: 1, type: 'Rain', amount: 400, date: 'Today, 10:45 AM', status: 'Completed', icon: CloudRain, color: 'text-blue-600' },
    { id: 2, type: 'Rain', amount: 350, date: 'Yesterday', status: 'Completed', icon: CloudRain, color: 'text-blue-600' },
    { id: 3, type: 'Pollution', amount: 500, date: '2 days ago', status: 'Completed', icon: Wind, color: 'text-gray-600' },
    { id: 4, type: 'Strike', amount: 650, date: '5 days ago', status: 'Completed', icon: Users, color: 'text-orange-600' },
  ];

  const upcomingAlerts = [
    { type: 'Heavy Rain', probability: 85, when: 'Tomorrow, 2 PM', icon: CloudRain, color: 'bg-blue-500' },
    { type: 'High AQI', probability: 60, when: 'This Weekend', icon: Wind, color: 'bg-gray-500' },
  ];

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Rajan! 👋</h1>
              <p className="text-gray-600 dark:text-gray-400">Your protection is active and working</p>
            </div>
            <Badge className="bg-green-500 text-white">Active</Badge>
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
                  {stat.change && (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                {(stat.plan || stat.subtitle) && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {stat.plan || stat.subtitle}
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Payouts</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-white dark:bg-gray-700 ${payout.color}`}>
                        <payout.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{payout.type} Protection</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{payout.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 dark:text-green-400">+₹{payout.amount}</div>
                      <Badge variant="outline" className="text-xs">{payout.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Coverage Status */}
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
                      <span className="text-gray-600 dark:text-gray-400">Monthly Usage</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹2,400 / ₹2,500</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-1">
                      You're almost at your limit!
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      Consider upgrading to Pro for higher coverage
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
                  <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Alerts</h3>
                </div>
                <div className="space-y-3">
                  {upcomingAlerts.map((alert, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 ${alert.color} rounded-lg flex items-center justify-center`}>
                          <alert.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{alert.type}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{alert.when}</div>
                        </div>
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
                  <h3 className="font-bold text-gray-900 dark:text-white">Your Zone</h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  KR Puram, Bangalore
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: 5 mins ago</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
