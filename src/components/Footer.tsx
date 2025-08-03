import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const emergencyContacts = [
    { label: "24/7 Crisis Line", number: "(415) 555-HOPE", description: "Immediate support and resources" },
    { label: "Emergency Shelter", number: "(415) 555-BEDS", description: "Tonight's available beds" },
    { label: "Food Emergency", number: "(415) 555-FOOD", description: "Urgent food assistance" },
    { label: "911", number: "911", description: "Life-threatening emergencies" }
  ];

  const quickLinks = [
    "Find Shelter",
    "Food Resources", 
    "Healthcare",
    "Benefits Help",
    "Mental Health",
    "Job Training"
  ];

  const languages = [
    "English", "Español", "中文", "Tagalog", "العربية", "Русский"
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Emergency Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Need Help Right Now?</h3>
            <p className="text-lg opacity-90">Emergency contacts available 24/7</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="font-bold text-lg mb-1">{contact.label}</div>
                <div className="text-2xl font-bold mb-1">{contact.number}</div>
                <div className="text-sm opacity-80">{contact.description}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start AI Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-4">
                Hope<span className="text-primary">SF</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Connecting San Francisco's community with real-time resources and hope. 
                Our AI-powered platform helps people find shelter, food, healthcare, and 
                support services instantly, 24/7.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>1234 Market Street, San Francisco, CA 94102</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>help@hopesf.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(415) 555-HOPE (4673)</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Access</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <div key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Languages */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Languages</h4>
              <div className="space-y-3">
                {languages.map((language, index) => (
                  <div key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {language}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h5 className="font-semibold mb-3">For Providers</h5>
                <div className="space-y-2">
                  <div><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partner Portal</a></div>
                  <div><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resource Updates</a></div>
                  <div><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Training</a></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-border/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-muted-foreground">
                © 2024 HopeSF. All rights reserved. A nonprofit initiative for San Francisco.
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;