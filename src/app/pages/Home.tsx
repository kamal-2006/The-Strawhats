import { HeroSection } from '../components/home/HeroSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { SolutionSection } from '../components/home/SolutionSection';
import { PersonaSection } from '../components/home/PersonaSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ScenariosSection } from '../components/home/ScenariosSection';
import { PricingSection } from '../components/home/PricingSection';
import { AIFeaturesSection } from '../components/home/AIFeaturesSection';
import { TrustSection } from '../components/home/TrustSection';
import { DashboardPreview } from '../components/home/DashboardPreview';
import { NotificationsSection } from '../components/home/NotificationsSection';
import { CTASection } from '../components/home/CTASection';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <PersonaSection />
      <HowItWorksSection />
      <ScenariosSection />
      <PricingSection />
      <AIFeaturesSection />
      <TrustSection />
      <DashboardPreview />
      <NotificationsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
