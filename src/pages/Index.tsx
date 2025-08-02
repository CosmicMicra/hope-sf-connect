import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ResourcesSection from '@/components/ResourcesSection';
import StoriesSection from '@/components/StoriesSection';
import ProviderSignup from '@/components/ProviderSignup';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ResourcesSection />
      <StoriesSection />
      <ProviderSignup />
      <Footer />
    </div>
  );
};

export default Index;
