import { motion } from 'motion/react';
import { MessageSquare, CheckCheck } from 'lucide-react';

export function NotificationsSection() {
  const notifications = [
    {
      time: '10:45 AM',
      message: '☔ Heavy rain detected in KR Puram area',
      subtext: 'Monitoring your location...',
      status: 'info',
    },
    {
      time: '10:50 AM',
      message: '✅ Payout approved!',
      subtext: '₹400 will be credited to your UPI',
      status: 'success',
    },
    {
      time: '10:52 AM',
      message: '💰 ₹400 credited to rajan@paytm',
      subtext: 'Stay safe! We\'ve got you covered.',
      status: 'success',
      highlighted: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Stay Informed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Instant <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">WhatsApp Notifications</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get real-time alerts and payout confirmations on WhatsApp
          </p>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Phone Frame */}
          <div className="relative bg-gray-900 dark:bg-gray-700 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800 dark:border-gray-600">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 dark:bg-gray-700 rounded-b-3xl z-10" />

            {/* Screen */}
            <div className="relative bg-gradient-to-b from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-[2.5rem] overflow-hidden" style={{ height: '640px' }}>
              {/* WhatsApp Header */}
              <div className="bg-teal-600 dark:bg-teal-700 p-4 flex items-center space-x-3 shadow-md">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">🛡️</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">GigShield</div>
                  <div className="text-teal-100 text-xs">online</div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 overflow-y-auto" style={{ height: 'calc(640px - 140px)' }}>
                {notifications.map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="flex justify-start"
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 shadow-md ${
                        notification.highlighted
                          ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className={`font-medium text-sm mb-1 ${notification.highlighted ? 'text-white' : ''}`}>
                        {notification.message}
                      </div>
                      <div className={`text-xs ${notification.highlighted ? 'text-teal-50' : 'text-gray-600 dark:text-gray-400'}`}>
                        {notification.subtext}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className={`text-xs ${notification.highlighted ? 'text-teal-100' : 'text-gray-500 dark:text-gray-500'}`}>
                          {notification.time}
                        </div>
                        <CheckCheck className={`h-4 w-4 ${notification.highlighted ? 'text-teal-100' : 'text-blue-500'}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Input Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 flex items-center space-x-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm text-gray-400">
                  Type a message...
                </div>
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: '⚡', title: 'Instant Alerts', description: 'Get notified within seconds' },
            { icon: '🔔', title: 'Real-time Updates', description: 'Track payout status live' },
            { icon: '🌐', title: 'Multi-language', description: 'Hindi, English, Tamil support' },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
