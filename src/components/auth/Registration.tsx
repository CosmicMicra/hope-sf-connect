import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface FormData {
  // Basic Info
  name: string;
  phone: string;
  email: string;
  password: string;
  // Personal Info
  age: string;
  gender: string;
  language: string;
  emergencyContact: string;
  // Housing Info
  housingStatus: string;
  hasChildren: boolean;
  familyType: string;
  address: string;
  // Benefits Info
  veteranStatus: string;
  disability: boolean;
  currentBenefits: string[];
  income: string;
  // Health Info
  diet: string;
  healthNeeds: string;
  transportation: string;
  // Optional Info
  ssnLast4?: string;
  idDocs?: string[];
  caseManager?: string;
  pets?: string[];
  work?: string;
}

interface RegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    language: '',
    emergencyContact: '',
    housingStatus: '',
    hasChildren: false,
    familyType: '',
    address: '',
    veteranStatus: '',
    disability: false,
    currentBenefits: [],
    income: '',
    diet: '',
    healthNeeds: '',
    transportation: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    onClose();
  };

  const steps = [
    { title: 'Basic Info', description: 'Name, contact details' },
    { title: 'Personal Info', description: 'Age, gender, language' },
    { title: 'Housing Info', description: 'Housing status, family' },
    { title: 'Benefits Info', description: 'Veteran status, income' },
    { title: 'Health Info', description: 'Diet, transportation' },
    { title: 'Optional Info', description: 'SSN, ID docs' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="housingStatus">Housing Status</Label>
              <Input
                id="housingStatus"
                value={formData.housingStatus}
                onChange={(e) => handleChange('housingStatus', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="familyType">Family Type</Label>
              <Input
                id="familyType"
                value={formData.familyType}
                onChange={(e) => handleChange('familyType', e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasChildren"
                checked={formData.hasChildren}
                onCheckedChange={(checked) => handleChange('hasChildren', checked as boolean)}
              />
              <Label htmlFor="hasChildren">Do you have children?</Label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="veteranStatus">Veteran Status</Label>
              <Input
                id="veteranStatus"
                value={formData.veteranStatus}
                onChange={(e) => handleChange('veteranStatus', e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disability"
                checked={formData.disability}
                onCheckedChange={(checked) => handleChange('disability', checked as boolean)}
              />
              <Label htmlFor="disability">Do you have a disability?</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentBenefits">Current Benefits</Label>
              <Input
                id="currentBenefits"
                value={formData.currentBenefits.join(', ')}
                onChange={(e) => handleChange('currentBenefits', e.target.value.split(','))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="income">Income</Label>
              <Input
                id="income"
                value={formData.income}
                onChange={(e) => handleChange('income', e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="diet">Dietary Preferences</Label>
              <Input
                id="diet"
                value={formData.diet}
                onChange={(e) => handleChange('diet', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="healthNeeds">Health Needs</Label>
              <Input
                id="healthNeeds"
                value={formData.healthNeeds}
                onChange={(e) => handleChange('healthNeeds', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transportation">Transportation Needs</Label>
              <Input
                id="transportation"
                value={formData.transportation}
                onChange={(e) => handleChange('transportation', e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ssnLast4">Last 4 digits of SSN (Optional)</Label>
              <Input
                id="ssnLast4"
                value={formData.ssnLast4}
                onChange={(e) => handleChange('ssnLast4', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="idDocs">ID Documents (Optional)</Label>
              <Input
                id="idDocs"
                value={formData.idDocs?.join(', ')}
                onChange={(e) => handleChange('idDocs', e.target.value.split(','))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="caseManager">Case Manager (Optional)</Label>
              <Input
                id="caseManager"
                value={formData.caseManager}
                onChange={(e) => handleChange('caseManager', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pets">Pets (Optional)</Label>
              <Input
                id="pets"
                value={formData.pets?.join(', ')}
                onChange={(e) => handleChange('pets', e.target.value.split(','))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="work">Work Information (Optional)</Label>
              <Input
                id="work"
                value={formData.work}
                onChange={(e) => handleChange('work', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Create your account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </p>
            <Progress
              value={(currentStep + 1) / totalSteps * 100}
              className="w-48"
            />
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === index
                      ? 'bg-primary text-primary-foreground'
                      : currentStep > index
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </span>
                <div className="space-y-1 leading-none">
                  <p className="text-sm font-medium">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderStep()}
          <DialogFooter className="justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={currentStep === totalSteps - 1 ? handleSubmit : handleNext}
              className="bg-primary hover:bg-primary/90"
            >
              {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Registration;
