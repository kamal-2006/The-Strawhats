import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4"
        >
          <Shield className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GigShield
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
}
