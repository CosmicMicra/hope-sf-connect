import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FoodBankLogin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Demo login credentials
      if (orgName === 'The Roberts Foundation - Food Distribution Center' && 
          email === 'robertfoundation@us.org' && 
          password === 'robert') {
        navigate('/foodbank/dashboard');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Food Bank Resource Portal</DialogTitle>
                <DialogDescription>
                  Secure access to your food bank management system
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Link to="/">
                  <Button variant="ghost">Logout</Button>
                </Link>
              </div>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="mt-2"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Login to Portal
                  </Button>

                  <div className="text-center mt-4">
                    <Link
                      to="/foodbank/register"
                      className="text-sm text-primary hover:underline"
                    >
                      Register New Food Bank
                    </Link>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FoodBankLogin;
