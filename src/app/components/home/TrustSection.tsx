import { motion } from 'motion/react';
import { Shield, MapPin, Smartphone, Lock, CheckCircle, XCircle } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Anti-Fraud Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Built on <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Trust & Security</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Multi-layer verification ensures genuine workers get genuine payouts
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: MapPin,
              title: 'GPS Verification',
              description: 'Real-time location tracking',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Smartphone,
              title: 'Device Fingerprint',
              description: 'Unique device identification',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Lock,
              title: 'Secure Data',
              description: 'Bank-grade encryption',
              color: 'from-teal-500 to-green-500',
            },
            {
              icon: Shield,
              title: 'AI Monitoring',
              description: '24/7 fraud detection',
              color: 'from-orange-500 to-red-500',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            How We Detect Fraud
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Genuine Worker */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Genuine Worker</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verified & Protected</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  Consistent GPS location in work zone
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  Regular movement patterns
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  Verified mobile device
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  Correlates with weather data
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  Normal app usage patterns
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                  ✓ Instant Payout Approved
                </div>
              </div>
            </div>

            {/* Fraud Attempt */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Fraud Attempt</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Detected & Blocked</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  GPS spoofing detected
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  Suspicious location jumps
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  Multiple devices same user
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  No correlation with weather
                </li>
                <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  Abnormal activity patterns
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
                <div className="text-sm font-semibold text-red-700 dark:text-red-400">
                  ✗ Claim Rejected & Flagged
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">99.8%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">&lt;0.1%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fraud Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Data Secure</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
