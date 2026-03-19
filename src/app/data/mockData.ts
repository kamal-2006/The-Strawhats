// Mock data for demo purposes

export const mockUser = {
  name: 'Rajan Kumar',
  phone: '+91 98765 43210',
  location: 'KR Puram, Bangalore',
  plan: 'Standard',
  planPrice: 59,
  joinedDate: '2026-01-15',
  totalEarningsProtected: 2400,
  totalPayouts: 8,
};

export const mockStats = {
  totalUsers: 5234,
  totalPayouts: 21000000, // 2.1 Crore
  fraudDetected: 23,
  successRate: 99.8,
};

export const mockPayouts = [
  { id: 1, type: 'Rain', amount: 400, date: 'Today, 10:45 AM', status: 'Completed', location: 'KR Puram' },
  { id: 2, type: 'Rain', amount: 350, date: 'Yesterday', status: 'Completed', location: 'KR Puram' },
  { id: 3, type: 'Pollution', amount: 500, date: '2 days ago', status: 'Completed', location: 'KR Puram' },
  { id: 4, type: 'Strike', amount: 650, date: '5 days ago', status: 'Completed', location: 'KR Puram' },
  { id: 5, type: 'Rain', amount: 300, date: '1 week ago', status: 'Completed', location: 'KR Puram' },
];

export const mockAlerts = [
  { type: 'Heavy Rain', probability: 85, when: 'Tomorrow, 2 PM', severity: 'high' },
  { type: 'High AQI', probability: 60, when: 'This Weekend', severity: 'medium' },
  { type: 'Possible Strike', probability: 40, when: 'Next Week', severity: 'low' },
];

export const mockZones = [
  { name: 'KR Puram', risk: 'High', incidents: 45, city: 'Bangalore' },
  { name: 'Whitefield', risk: 'Medium', incidents: 28, city: 'Bangalore' },
  { name: 'Indiranagar', risk: 'High', incidents: 52, city: 'Bangalore' },
  { name: 'HSR Layout', risk: 'Low', incidents: 12, city: 'Bangalore' },
  { name: 'Electronic City', risk: 'Medium', incidents: 34, city: 'Bangalore' },
];

export const mockReviews = [
  {
    name: 'Rajan Kumar',
    role: 'Delivery Partner',
    rating: 5,
    review: 'GigShield ne meri tension kam kar di. Ab barish mein bhi mujhe pata hai ki income protected hai.',
    location: 'Bangalore',
  },
  {
    name: 'Amit Singh',
    role: 'Zomato Partner',
    rating: 5,
    review: 'Very easy to use. Automatic payout is the best feature. No need to submit any forms!',
    location: 'Delhi',
  },
  {
    name: 'Suresh M',
    role: 'Swiggy Partner',
    rating: 4,
    review: 'Good service. Got my payout in 15 minutes during last week\'s rain.',
    location: 'Chennai',
  },
];

export const languages = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ta: { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
};

export const plans = {
  basic: {
    name: 'Basic',
    weeklyPrice: 29,
    monthlyPrice: 99,
    maxPayout: 600,
    features: [
      'Rain protection (₹200-300/event)',
      'Basic weather alerts',
      '2 payouts per month',
      'Email support',
      'UPI auto-payout',
    ],
  },
  standard: {
    name: 'Standard',
    weeklyPrice: 59,
    monthlyPrice: 199,
    maxPayout: 2500,
    features: [
      'All weather disruptions (₹300-500/event)',
      'Strike coverage (₹500-800/day)',
      'Pollution alerts (₹400-600/day)',
      'Priority support',
      'Unlimited payouts',
      'WhatsApp notifications',
    ],
  },
  pro: {
    name: 'Pro',
    weeklyPrice: 99,
    monthlyPrice: 349,
    maxPayout: 5000,
    features: [
      'Maximum payouts (₹500-1000/event)',
      'All disruption types',
      'Accident insurance add-on',
      '24/7 priority support',
      'Early payout (5 mins)',
      'Personal risk consultant',
      'Family coverage option',
    ],
  },
};
