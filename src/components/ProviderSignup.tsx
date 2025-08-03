import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building2, Users, CheckCircle } from 'lucide-react';
import providerImage from '@/assets/provider-signup.jpg';

const ProviderSignup = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    services: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Provider signup:', formData);
  };

  const benefits = [
    "Reach people who need your services most",
    "Real-time availability management",
    "Multilingual support for your clients",
    "Analytics and impact reporting",
    "24/7 automated referral system"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our{' '}
            <span className="hope-gradient-text">Network of Care</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partner with HopeSF to connect with people who need your services most. 
            Together, we can build a stronger, more connected community.
          </p>

          {/* Shelters Button */}
          <div className="mt-8">
            <Button className="w-full lg:w-auto">
              <Building2 className="w-4 h-4 mr-2" />
              Shelters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={providerImage} 
                alt="Community support worker helping someone"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Overlay Stats */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6" />
                <span className="font-semibold">2,847 people</span>
              </div>
              <div className="text-sm opacity-90">connected this month</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                Why Partner With Us?
              </h3>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    placeholder="Your organization's name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(415) 555-0123"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services">Services Offered</Label>
                <Input
                  id="services"
                  value={formData.services}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  placeholder="e.g., Emergency shelter, Food distribution, Healthcare"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Brief Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us about your organization and how you help the community..."
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="hope-button w-full text-lg py-3">
                Register Your Organization
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                We'll review your application and get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderSignup;