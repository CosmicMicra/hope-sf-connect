import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const FoodBankRegister = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    capacity: '',
    services: [] as string[],
  });

  const handleChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', formData);
      // For now, just navigate to login
      navigate('/foodbank/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Your Food Bank</DialogTitle>
          <DialogDescription>
            Create an account to manage your food bank resources
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                type="text"
                value={formData.orgName}
                onChange={(e) => handleChange('orgName', e.target.value)}
                placeholder="Enter your organization name"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter your password"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter your address"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="capacity">Storage Capacity</Label>
              <Input
                id="capacity"
                type="text"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', e.target.value)}
                placeholder="Enter your storage capacity"
                className="mt-2"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Services Offered</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id="preparedMeals"
                    checked={formData.services.includes('preparedMeals')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange('services', [...formData.services, 'preparedMeals']);
                      } else {
                        handleChange('services', formData.services.filter(s => s !== 'preparedMeals'));
                      }
                    }}
                  />
                  <Label htmlFor="preparedMeals">Prepared Meals</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id="freshFood"
                    checked={formData.services.includes('freshFood')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange('services', [...formData.services, 'freshFood']);
                      } else {
                        handleChange('services', formData.services.filter(s => s !== 'freshFood'));
                      }
                    }}
                  />
                  <Label htmlFor="freshFood">Fresh Food Distribution</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id="pantry"
                    checked={formData.services.includes('pantry')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange('services', [...formData.services, 'pantry']);
                      } else {
                        handleChange('services', formData.services.filter(s => s !== 'pantry'));
                      }
                    }}
                  />
                  <Label htmlFor="pantry">Food Pantry</Label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Register Food Bank
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/foodbank/login"
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodBankRegister;
