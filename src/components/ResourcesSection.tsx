import { Button } from '@/components/ui/button';
import { Home, UtensilsCrossed, Heart } from 'lucide-react';

const ResourceCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  className = '' 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
}) => {
  return (
    <div className={`hope-card text-center ${className}`}>
      <div className="w-20 h-20 mx-auto mb-6 text-primary">
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
        {description}
      </p>
      
      <Button className="hope-button w-full text-lg py-3">
        {buttonText}
      </Button>
    </div>
  );
};

const ResourcesSection = () => {
  const resources = [
    {
      icon: <Home className="w-full h-full" />,
      title: "Emergency Shelter",
      description: "Find safe shelter tonight with real-time bed availability and instant reservations",
      buttonText: "Find Shelter"
    },
    {
      icon: <UtensilsCrossed className="w-full h-full" />,
      title: "Food Resources",
      description: "Get meals and groceries today from verified food banks and community kitchens",
      buttonText: "Find Food"
    },
    {
      icon: <Heart className="w-full h-full" />,
      title: "Support Services",
      description: "Access healthcare, benefits counseling, and mental health support in your language",
      buttonText: "Get Support"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Help{' '}
            <span className="hope-gradient-text">Right Now</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect instantly with the resources you need. Our platform updates in real-time 
            to show exactly what's available in your area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              buttonText={resource.buttonText}
              className="animate-fade-in"
            />
          ))}
        </div>
        
        {/* Emergency Contact */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl px-8 py-6">
            <div className="text-2xl">🆘</div>
            <div className="text-left">
              <div className="font-semibold text-lg">Need immediate help?</div>
              <div className="text-muted-foreground">Call our 24/7 emergency line: (415) 555-HOPE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;