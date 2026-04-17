import { motion } from 'motion/react';
import { User, MapPin, Clock, Bike, TrendingDown, Heart } from 'lucide-react';

export function PersonaSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Real Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rajan</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A delivery partner from Bangalore
          </p>
        </motion.div>

        {/* Persona Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Profile */}
              <div className="space-y-6">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-32 h-32 mx-auto md:mx-0"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white dark:border-gray-800">
                    <Bike className="h-5 w-5 text-white" />
                  </div>
                </motion.div>

                {/* Info */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Rajan Kumar
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Delivery Partner, 28 years old
                  </p>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-700 rounded-xl p-3">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div className="text-left flex-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Location</div>
                        <div className="font-semibold text-gray-900 dark:text-white">Bangalore, KR Puram</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-700 rounded-xl p-3">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div className="text-left flex-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Work Hours</div>
                        <div className="font-semibold text-gray-900 dark:text-white">10-12 hrs/day</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-700 rounded-xl p-3">
                      <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div className="text-left flex-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Monthly Income</div>
                        <div className="font-semibold text-gray-900 dark:text-white">₹25,000 - ₹30,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Story */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    His Struggles
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-red-600 dark:text-red-400">💔 Monsoon blues:</span> Lost ₹8,000 last July due to heavy rains
                      </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-orange-600 dark:text-orange-400">🚫 Platform strikes:</span> Couldn't work for 3 days during December strike
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-gray-600 dark:text-gray-400">🌫️ Pollution shutdown:</span> AQI above 400 stopped deliveries for 2 days
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    How GigShield Helps
                  </h4>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        ✅ Pays ₹29/week for Standard plan
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        ✅ Gets automatic ₹300-500 on rainy days
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        ✅ Received ₹2,400 during monsoon season
                      </p>
                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                        <p className="font-semibold text-green-700 dark:text-green-400">
                          💰 Net savings: ₹950/month after premium
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute top-0 left-0 text-6xl text-blue-200 dark:text-blue-800 font-serif">"</div>
                  <blockquote className="pl-8 pt-4 italic text-gray-700 dark:text-gray-300">
                    GigShield ne meri tension kam kar di. Ab barish mein bhi mujhe pata hai ki income protected hai.
                  </blockquote>
                  <div className="text-right mt-2 text-sm text-gray-600 dark:text-gray-400">
                    — Rajan Kumar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
