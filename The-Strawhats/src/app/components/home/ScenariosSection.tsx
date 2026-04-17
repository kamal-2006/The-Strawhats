import { motion } from 'motion/react';
import { CloudRain, Users, Wind, Bell, ArrowRight, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const scenarios = [
  {
    id: 'rain',
    icon: CloudRain,
    title: 'Heavy Rain',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    trigger: 'Rainfall > 15mm/hr detected',
    detection: 'Weather API + Local sensors',
    payout: '₹300 - ₹500',
    notification: 'Rain detected in your area. ₹400 credited to your UPI.',
    timeline: [
      { time: '12:30 PM', event: 'Heavy rain starts', status: 'trigger' },
      { time: '12:35 PM', event: 'AI detects disruption', status: 'detection' },
      { time: '12:40 PM', event: 'Payout processed', status: 'payout' },
      { time: '12:42 PM', event: 'WhatsApp notification sent', status: 'notification' },
    ]
  },
  {
    id: 'strike',
    icon: Users,
    title: 'Platform Strike',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    trigger: 'Strike reported by 30% workers',
    detection: 'Social media + News APIs',
    payout: '₹500 - ₹800/day',
    notification: 'Strike detected. ₹650 daily payout activated.',
    timeline: [
      { time: '6:00 AM', event: 'Strike announcement', status: 'trigger' },
      { time: '6:15 AM', event: 'AI verifies multiple sources', status: 'detection' },
      { time: '6:30 AM', event: 'Daily payout approved', status: 'payout' },
      { time: '6:35 AM', event: 'Notification sent', status: 'notification' },
    ]
  },
  {
    id: 'pollution',
    icon: Wind,
    title: 'Pollution Alert',
    color: 'from-gray-500 to-gray-700',
    bgColor: 'from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50',
    trigger: 'AQI > 400 with restrictions',
    detection: 'Government AQI monitors',
    payout: '₹400 - ₹600/day',
    notification: 'Severe AQI detected. ₹500 payout credited.',
    timeline: [
      { time: '8:00 AM', event: 'AQI crosses 400', status: 'trigger' },
      { time: '8:10 AM', event: 'Government restrictions confirmed', status: 'detection' },
      { time: '8:20 AM', event: 'Payout initiated', status: 'payout' },
      { time: '8:25 AM', event: 'Alert notification', status: 'notification' },
    ]
  },
];

export function ScenariosSection() {
  return (
    <section id="scenarios" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Real <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scenarios</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how GigShield protects you in different situations
          </p>
        </motion.div>

        {/* Scenarios Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="rain" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              {scenarios.map((scenario) => (
                <TabsTrigger
                  key={scenario.id}
                  value={scenario.id}
                  className="flex items-center space-x-2"
                >
                  <scenario.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{scenario.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {scenarios.map((scenario) => (
              <TabsContent key={scenario.id} value={scenario.id}>
                <div className={`bg-gradient-to-br ${scenario.bgColor} rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl`}>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Scenario Details */}
                    <div>
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${scenario.color} mb-6`}>
                        <scenario.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {scenario.title}
                      </h3>

                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${scenario.color} mt-2`} />
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Trigger</div>
                              <div className="font-semibold text-gray-900 dark:text-white">{scenario.trigger}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${scenario.color} mt-2`} />
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Detection Method</div>
                              <div className="font-semibold text-gray-900 dark:text-white">{scenario.detection}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${scenario.color} mt-2`} />
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Payout Amount</div>
                              <div className={`text-2xl font-bold bg-gradient-to-r ${scenario.color} bg-clip-text text-transparent`}>
                                {scenario.payout}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notification Preview */}
                        <div className="mt-6">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                            <Bell className="h-3 w-3 mr-1" />
                            Notification Preview
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-green-900 dark:text-green-100 text-sm">
                                  GigShield Payout
                                </div>
                                <div className="text-green-800 dark:text-green-200 text-sm mt-1">
                                  {scenario.notification}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Timeline */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        How It Works
                      </h4>
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className={`absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b ${scenario.color}`} />

                        {/* Timeline Items */}
                        <div className="space-y-6">
                          {scenario.timeline.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="relative flex items-start space-x-4"
                            >
                              {/* Dot */}
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${scenario.color} flex items-center justify-center shadow-lg z-10`}>
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                  {item.time}
                                </div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {item.event}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Result */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white shadow-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm opacity-90 mb-1">Total Time</div>
                            <div className="text-3xl font-bold">~15 mins</div>
                          </div>
                          <ArrowRight className="h-8 w-8 opacity-50" />
                          <div className="text-right">
                            <div className="text-sm opacity-90 mb-1">Money in Account</div>
                            <div className="text-3xl font-bold">✓</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
