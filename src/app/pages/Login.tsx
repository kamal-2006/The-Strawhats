import { motion } from 'motion/react';
import { Shield, Smartphone, MapPin, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useInsurance } from '../contexts/InsuranceContext';
import { PLAN_CATALOG } from '../services/insuranceEngine';
import { PlanId } from '../types/insurance';

export function Login() {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'plan' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('KR Puram, Bangalore');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('standard');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [demoOtp, setDemoOtp] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('English');

  const { deliveryZones, requestOtp, verifyOtp, setProfile, quotePolicy, activatePolicy } = useInsurance();
  const navigate = useNavigate();

  const quote = useMemo(() => quotePolicy(selectedPlan, location), [quotePolicy, selectedPlan, location]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    const otpCode = await requestOtp(digits);
    setDemoOtp(otpCode);
    setLoading(false);
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const isValid = verifyOtp(otp.trim());
    if (!isValid) {
      setErrorMessage('Invalid or expired OTP. Please use the latest demo OTP.');
      return;
    }
    setStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setProfile(name.trim(), location);
    setStep('plan');
  };

  const handleActivatePolicy = () => {
    const activated = activatePolicy(selectedPlan);
    if (!activated) {
      setErrorMessage('Registration details are incomplete. Please retry the previous step.');
      return;
    }

    setStep('success');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GigShield
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Your Protection Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of delivery partners who trust GigShield
          </p>

          <div className="space-y-4">
            {[
              { icon: CheckCircle, text: '2-minute signup', color: 'text-green-600' },
              { icon: CheckCircle, text: 'Instant protection activation', color: 'text-blue-600' },
              { icon: CheckCircle, text: 'No paperwork required', color: 'text-purple-600' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                R
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Rajan Kumar</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Partner</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              "GigShield gave me peace of mind. I don't worry about rain or strikes anymore. The automatic payouts are amazing!"
            </p>
          </div>
        </motion.div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 shadow-2xl">
            {/* Phone Step */}
            {step === 'phone' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
                    <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Enter Your Mobile Number
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll send you an OTP to verify
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-4 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg">
                        <span className="text-gray-700 dark:text-gray-300">+91</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </motion.div>
            )}

            {/* OTP Step */}
            {step === 'otp' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-2xl mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Verify OTP
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter the 6-digit code sent to +91 {phone}
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-800 dark:text-green-200">
                    Demo OTP for simulation: <span className="font-bold tracking-widest">{demoOtp}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OTP
                    </label>
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                    size="lg"
                  >
                    Verify
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Change number
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Profile Step */}
            {step === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl mb-4">
                    <MapPin className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell us where you deliver so AI can calculate your risk-based premium
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rajan Kumar"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Delivery Zone
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {deliveryZones.slice(0, 8).map((zone) => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setLocation(zone)}
                          className={`text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                            location === zone
                              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                              : 'border-gray-200 bg-white hover:border-blue-300 dark:border-gray-700 dark:bg-gray-900'
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-100">
                    Location enables weather, pollution, strike, and flooding trigger checks with zero-touch claim automation.
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    size="lg"
                  >
                    Continue to Plan Selection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                    Your location data is encrypted and only used for disruption verification and fraud prevention.
                  </p>
                </form>
              </motion.div>
            )}

            {/* Plan Step */}
            {step === 'plan' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-2xl mb-4">
                    <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Pick Your Weekly Protection Plan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI-calculated premium for {location}
                  </p>
                </div>

                <div className="grid gap-3 mb-6">
                  {(Object.keys(PLAN_CATALOG) as PlanId[]).map((planId) => {
                    const plan = PLAN_CATALOG[planId];
                    const selected = selectedPlan === planId;
                    return (
                      <button
                        key={planId}
                        type="button"
                        onClick={() => setSelectedPlan(planId)}
                        className={`rounded-xl border p-4 text-left transition-all ${
                          selected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                            : 'border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{plan.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Base ₹{plan.weeklyBasePremium}/week</div>
                          </div>
                          {selected && <Badge className="bg-blue-600">Selected</Badge>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {quote && (
                  <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-indigo-900 dark:text-indigo-100">AI Premium Breakdown</div>
                      <Badge variant="outline" className="bg-white dark:bg-gray-900">{Math.round((quote.riskMultiplier - 1) * 100)}% risk factor</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">₹{quote.weeklyPremium}/week</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Coverage up to ₹{quote.maxWeeklyCoverage}/week</div>
                    <p className="text-sm text-indigo-900 dark:text-indigo-100">{quote.aiExplanation}</p>
                  </div>
                )}

                <Button
                  onClick={handleActivatePolicy}
                  className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
                  size="lg"
                >
                  Activate Zero-Touch Protection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {errorMessage && (
              <div className="mt-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-200 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex p-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  You're All Set! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your protection is now active
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
                </motion.div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                  Redirecting to dashboard...
                </p>
              </motion.div>
            )}
          </Card>

          {/* Language Selector */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Choose your language</p>
            <div className="flex justify-center space-x-4">
              {['English', 'हिंदी', 'தமிழ்'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <span className={activeLanguage === lang ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}>{lang}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
