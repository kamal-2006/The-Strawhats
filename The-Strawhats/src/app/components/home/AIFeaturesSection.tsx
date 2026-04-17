import { motion } from 'motion/react';
import { Brain, ShieldCheck, Map, TrendingUp, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Dynamic Pricing',
    description: 'AI adjusts premiums based on your location and risk profile',
    details: ['Real-time risk assessment', 'Personalized pricing', 'Fair and transparent'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ShieldCheck,
    title: 'Fraud Detection',
    description: 'Advanced AI prevents fake claims and GPS spoofing',
    details: ['Multi-factor verification', 'Pattern recognition', '99.8% accuracy'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Map,
    title: 'Risk Heatmaps',
    description: 'Visual maps showing high-risk zones and disruption patterns',
    details: ['Live weather tracking', 'Historical data', 'Predictive zones'],
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Alerts',
    description: 'Get notified before disruptions affect your income',
    details: ['24-hour forecasts', 'Smart notifications', 'Proactive planning'],
    color: 'from-orange-500 to-red-500',
  },
];

export function AIFeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
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
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Smart Technology
            </span>
            <br />
            Behind GigShield
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Advanced AI and machine learning ensure accurate, fast, and fraud-free payouts
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {feature.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mr-2`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h4 className="text-xl font-bold mb-6">Powered By</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-2 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-300">TensorFlow</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-2 flex items-center justify-center">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-300">Google Maps</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg mb-2 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-300">Weather API</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-2 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-300">AWS Cloud</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
