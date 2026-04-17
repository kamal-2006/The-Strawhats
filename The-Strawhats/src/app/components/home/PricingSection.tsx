import { motion } from 'motion/react';
import { Check, Zap, Shield, Crown, IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Link } from 'react-router';

const plans = [
  {
    name: 'Basic',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    weeklyPrice: 29,
    monthlyPrice: 99,
    description: 'Essential protection for occasional disruptions',
    features: [
      'Rain protection (₹200-300/event)',
      'Basic weather alerts',
      '2 payouts per month',
      'Email support',
      'UPI auto-payout',
    ],
    maxPayout: '₹600/month',
    popular: false,
  },
  {
    name: 'Standard',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    weeklyPrice: 59,
    monthlyPrice: 199,
    description: 'Complete coverage for regular gig workers',
    features: [
      'All weather disruptions (₹300-500/event)',
      'Strike coverage (₹500-800/day)',
      'Pollution alerts (₹400-600/day)',
      'Priority support',
      'Unlimited payouts',
      'WhatsApp notifications',
    ],
    maxPayout: '₹2,500/month',
    popular: true,
  },
  {
    name: 'Pro',
    icon: Crown,
    color: 'from-orange-500 to-red-500',
    weeklyPrice: 99,
    monthlyPrice: 349,
    description: 'Premium protection with maximum coverage',
    features: [
      'Maximum payouts (₹500-1000/event)',
      'All disruption types',
      'Accident insurance add-on',
      '24/7 priority support',
      'Early payout (5 mins)',
      'Personal risk consultant',
      'Family coverage option',
    ],
    maxPayout: '₹5,000/month',
    popular: false,
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <section id="pricing" className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      </div>

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
            <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Affordable Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Protection Plan</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Flexible pricing that works for you. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'weekly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Save 15%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div
                className={`relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${
                  plan.popular
                    ? 'border-purple-500 dark:border-purple-400'
                    : 'border-gray-200 dark:border-gray-700'
                } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.color} mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ₹{billingCycle === 'weekly' ? plan.weeklyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /{billingCycle === 'weekly' ? 'week' : 'month'}
                    </span>
                  </div>
                  <div className={`text-sm font-semibold mt-2 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    Max payout: {plan.maxPayout}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/login">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.popular ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            ✓ No hidden fees • ✓ Cancel anytime • ✓ Money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
