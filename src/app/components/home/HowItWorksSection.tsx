import { motion } from 'motion/react';
import { UserPlus, Brain, Eye, Zap, ArrowRight } from 'lucide-react';

const workflow = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Quick registration with mobile number & basic details',
    details: ['OTP verification', 'Choose your plan', 'Add UPI ID'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: 2,
    icon: Brain,
    title: 'AI Risk Profiling',
    description: 'Our AI analyzes your location and work patterns',
    details: ['Location analysis', 'Historical data', 'Risk assessment'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: 3,
    icon: Eye,
    title: '24/7 Monitoring',
    description: 'Real-time tracking of disruptions in your area',
    details: ['Weather monitoring', 'Strike detection', 'Pollution alerts'],
    color: 'from-teal-500 to-green-500',
  },
  {
    step: 4,
    icon: Zap,
    title: 'Automatic Payout',
    description: 'Instant money transfer when disruption is detected',
    details: ['Auto-processing', 'UPI transfer', 'WhatsApp notification'],
    color: 'from-orange-500 to-red-500',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GigShield Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Four simple steps to protect your income
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line (Mobile) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 md:hidden" />

          {/* Steps */}
          <div className="space-y-12">
            {workflow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 font-bold text-sm">
                      {item.step}
                    </div>
                  </div>

                  {/* Connector Arrow (Desktop) */}
                  {index < workflow.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      className="hidden md:block flex-1"
                    >
                      <div className="flex items-center">
                        <div className={`h-0.5 w-full bg-gradient-to-r ${item.color}`} />
                        <ArrowRight className="h-5 w-5 text-gray-400 -ml-1" />
                      </div>
                    </motion.div>
                  )}

                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {item.description}
                      </p>
                      <ul className={`space-y-2 ${index % 2 === 1 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} ${index % 2 === 1 ? 'md:ml-2 md:order-2' : 'mr-2'}`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2 mins</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Setup time</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0 forms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">To fill</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Automatic</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
