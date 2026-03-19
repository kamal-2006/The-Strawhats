import { motion } from 'motion/react';
import { CloudRain, Users, TrendingDown, AlertTriangle, Droplets, Wind } from 'lucide-react';

const problems = [
  {
    icon: CloudRain,
    title: 'No Income During Rain',
    description: 'Heavy rains mean no orders, but bills don\'t stop.',
    color: 'from-blue-500 to-cyan-500',
    stat: '40% income loss'
  },
  {
    icon: Users,
    title: 'Strikes & Protests',
    description: 'Platform strikes leave you without work for days.',
    color: 'from-orange-500 to-red-500',
    stat: '3-5 days lost'
  },
  {
    icon: Wind,
    title: 'Pollution Shutdowns',
    description: 'AQI spikes force delivery restrictions in major cities.',
    color: 'from-gray-500 to-gray-700',
    stat: '₹500-800/day'
  },
  {
    icon: TrendingDown,
    title: 'No Safety Net',
    description: 'Traditional insurance doesn\'t cover income loss.',
    color: 'from-purple-500 to-pink-500',
    stat: '0 coverage'
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">The Problem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gig Workers Face <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Unpredictable Income Loss</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Millions of delivery partners lose income due to factors beyond their control
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${problem.color} mb-4`}>
                  <problem.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  {problem.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {problem.description}
                </p>

                {/* Stat */}
                <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${problem.color} bg-opacity-10`}>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {problem.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-100 dark:border-red-800">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">₹15,000 - ₹25,000</div>
            <div className="text-gray-700 dark:text-gray-300">Average yearly income loss per gig worker</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
