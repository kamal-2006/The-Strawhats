import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon?: LucideIcon;
  color?: string;
}

interface StatsBannerProps {
  stats: Stat[];
  className?: string;
}

export function StatsBanner({ stats, className = '' }: StatsBannerProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          {stat.icon && (
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-3">
              <stat.icon className={`h-6 w-6 ${stat.color || 'text-blue-600 dark:text-blue-400'}`} />
            </div>
          )}
          <div className={`text-3xl font-bold ${stat.color || 'text-gray-900 dark:text-white'} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
