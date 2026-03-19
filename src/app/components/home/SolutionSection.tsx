import { motion } from 'motion/react';
import { Shield, Zap, IndianRupee, Sparkles, Check } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Shield,
    title: 'Weekly Subscription',
    description: 'Simple plans starting at just ₹29/week',
    features: ['No paperwork', 'Instant activation', 'Cancel anytime']
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI Monitors Disruptions',
    description: 'Our AI tracks weather, strikes, pollution in real-time',
    features: ['24/7 monitoring', 'Smart detection', 'Multi-source data']
  },
  {
    number: '03',
    icon: Zap,
    title: 'Instant Payout via UPI',
    description: 'Money in your account within minutes, automatically',
    features: ['No claims form', 'Auto-processing', 'Direct to UPI']
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-800 dark:via-purple-900/10 dark:to-blue-900/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

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
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">The Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Automatic Income Protection
            </span>
            <br />
            Made Simple
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            GigShield uses AI to detect disruptions and send instant payouts — no claims, no hassle
          </p>
        </motion.div>

        {/* Visual Flow */}
        <div className="relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 dark:from-blue-800 dark:via-purple-800 dark:to-teal-800 transform -translate-y-1/2" />

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <IndianRupee className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                15 Minutes
              </div>
            </div>
            <div className="text-gray-700 dark:text-gray-300">Average time from disruption to payout</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
