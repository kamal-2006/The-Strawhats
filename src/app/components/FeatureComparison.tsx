import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';

interface Feature {
  name: string;
  traditional: boolean;
  gigshield: boolean;
}

const features: Feature[] = [
  { name: 'Instant Payouts', traditional: false, gigshield: true },
  { name: 'No Claims Forms', traditional: false, gigshield: true },
  { name: 'AI-Powered Detection', traditional: false, gigshield: true },
  { name: 'Weekly Subscription', traditional: false, gigshield: true },
  { name: 'Income Protection', traditional: false, gigshield: true },
  { name: 'Weather Coverage', traditional: false, gigshield: true },
  { name: 'Strike Coverage', traditional: false, gigshield: true },
  { name: 'WhatsApp Notifications', traditional: false, gigshield: true },
  { name: 'Cancel Anytime', traditional: false, gigshield: true },
  { name: 'Accident Only', traditional: true, gigshield: false },
  { name: 'Complex Paperwork', traditional: true, gigshield: false },
  { name: 'Long Wait Times', traditional: true, gigshield: false },
];

export function FeatureComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-6 text-gray-900 dark:text-white font-bold">
              Feature
            </th>
            <th className="text-center py-4 px-6 text-gray-600 dark:text-gray-400">
              Traditional Insurance
            </th>
            <th className="text-center py-4 px-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                GigShield
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                {feature.name}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.traditional ? (
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-600 mx-auto" />
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.gigshield ? (
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-600 mx-auto" />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
