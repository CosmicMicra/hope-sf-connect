import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Shield, Heart } from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Personal
    age: '',
    gender: '',
    language: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Step 3: Housing/Family
    housingStatus: '',
    hasChildren: '',
    numberOfChildren: '',
    familyType: '',
    currentAddress: '',
    
    // Step 4: Benefits
    isVeteran: '',
    hasDisability: '',
    currentBenefits: [],
    monthlyIncome: '',
    
    // Step 5: Health
    dietaryRestrictions: '',
    healthNeeds: '',
    hasTransportation: '',
    
    // Step 6: Optional
    ssnLast4: '',
    hasID: '',
    hasCaseManager: '',
    caseManagerInfo: '',
    hasPets: '',
    petInfo: '',
    employmentStatus: ''
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Basic Information',
    'Personal Details', 
    'Housing & Family',
    'Benefits & Income',
    'Health & Transportation',
    'Optional Information'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(415) 555-0123"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Create a secure password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  placeholder="Your age"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={formData.language} onValueChange={(value) => updateFormData('language', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="chinese">中文</SelectItem>
                  <SelectItem value="tagalog">Tagalog</SelectItem>
                  <SelectItem value="arabic">العربية</SelectItem>
                  <SelectItem value="russian">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                placeholder="Name of emergency contact"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                placeholder="(415) 555-0123"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="housingStatus">Current Housing Situation</Label>
              <Select value={formData.housingStatus} onValueChange={(value) => updateFormData('housingStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select housing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homeless">Currently homeless</SelectItem>
                  <SelectItem value="shelter">In emergency shelter</SelectItem>
                  <SelectItem value="transitional">Transitional housing</SelectItem>
                  <SelectItem value="temporary">Staying with friends/family</SelectItem>
                  <SelectItem value="rental">Renting</SelectItem>
                  <SelectItem value="owned">Own home</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hasChildren">Do you have children?</Label>
                <Select value={formData.hasChildren} onValueChange={(value) => updateFormData('hasChildren', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.hasChildren === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="numberOfChildren">Number of Children</Label>
                  <Input
                    id="numberOfChildren"
                    type="number"
                    value={formData.numberOfChildren}
                    onChange={(e) => updateFormData('numberOfChildren', e.target.value)}
                    placeholder="Number of children"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="familyType">Family Type</Label>
              <Select value={formData.familyType} onValueChange={(value) => updateFormData('familyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select family type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single person</SelectItem>
                  <SelectItem value="single-parent">Single parent</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family with children</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address (if any)</Label>
              <Textarea
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => updateFormData('currentAddress', e.target.value)}
                placeholder="Street address, city, zip code"
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isVeteran">Are you a veteran?</Label>
                <Select value={formData.isVeteran} onValueChange={(value) => updateFormData('isVeteran', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hasDisability">Do you have a disability?</Label>
                <Select value={formData.hasDisability} onValueChange={(value) => updateFormData('hasDisability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Current Benefits (check all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['CalFresh (SNAP)', 'Medi-Cal', 'SSI/SSDI', 'TANF', 'Housing voucher', 'WIC', 'None'].map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={formData.currentBenefits.includes(benefit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('currentBenefits', [...formData.currentBenefits, benefit]);
                        } else {
                          updateFormData('currentBenefits', formData.currentBenefits.filter(b => b !== benefit));
                        }
                      }}
                    />
                    <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income Range</Label>
              <Select value={formData.monthlyIncome} onValueChange={(value) => updateFormData('monthlyIncome', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">$0</SelectItem>
                  <SelectItem value="1-500">$1 - $500</SelectItem>
                  <SelectItem value="501-1000">$501 - $1,000</SelectItem>
                  <SelectItem value="1001-1500">$1,001 - $1,500</SelectItem>
                  <SelectItem value="1501-2000">$1,501 - $2,000</SelectItem>
                  <SelectItem value="2000+">$2,000+</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</Label>
              <Textarea
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) => updateFormData('dietaryRestrictions', e.target.value)}
                placeholder="Any food allergies, dietary restrictions, or special needs"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="healthNeeds">Health Needs or Conditions</Label>
              <Textarea
                id="healthNeeds"
                value={formData.healthNeeds}
                onChange={(e) => updateFormData('healthNeeds', e.target.value)}
                placeholder="Any health conditions, medications, or special needs we should know about"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hasTransportation">Do you have reliable transportation?</Label>
              <Select value={formData.hasTransportation} onValueChange={(value) => updateFormData('hasTransportation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, I have transportation</SelectItem>
                  <SelectItem value="public">I use public transportation</SelectItem>
                  <SelectItem value="limited">Limited transportation</SelectItem>
                  <SelectItem value="no">No transportation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Optional Information</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This information helps us provide better services but is completely optional. 
                You can skip any fields you're not comfortable sharing.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ssnLast4">Last 4 digits of SSN (optional)</Label>
              <Input
                id="ssnLast4"
                value={formData.ssnLast4}
                onChange={(e) => updateFormData('ssnLast4', e.target.value)}
                placeholder="1234"
                maxLength={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hasID">Do you have government-issued ID?</Label>
              <Select value={formData.hasID} onValueChange={(value) => updateFormData('hasID', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="skip">Skip this question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hasCaseManager">Do you have a case manager?</Label>
              <Select value={formData.hasCaseManager} onValueChange={(value) => updateFormData('hasCaseManager', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="skip">Skip this question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.hasCaseManager === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="caseManagerInfo">Case Manager Information</Label>
                <Textarea
                  id="caseManagerInfo"
                  value={formData.caseManagerInfo}
                  onChange={(e) => updateFormData('caseManagerInfo', e.target.value)}
                  placeholder="Name, organization, and contact information"
                  rows={3}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="hasPets">Do you have pets?</Label>
              <Select value={formData.hasPets} onValueChange={(value) => updateFormData('hasPets', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="skip">Skip this question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.hasPets === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="petInfo">Pet Information</Label>
                <Textarea
                  id="petInfo"
                  value={formData.petInfo}
                  onChange={(e) => updateFormData('petInfo', e.target.value)}
                  placeholder="Type, breed, size, and any special needs"
                  rows={3}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData('employmentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="part-time">Part-time work</SelectItem>
                  <SelectItem value="disabled">Unable to work</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="skip">Skip this question</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center justify-center gap-2 mb-4">
            🏠 <span>HopeSF</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Join Our Community</h1>
          <p className="text-muted-foreground">
            Help us connect you with the right resources and support
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">{stepTitles[currentStep - 1]}</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              {currentStep === 6 
                ? "These details are optional but help us serve you better"
                : "Please provide the following information to help us assist you"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="hope-button flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="hope-button flex items-center gap-2"
                  >
                    Complete Registration
                    <Heart className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-6 text-center">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Your Privacy Matters</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All information is encrypted and secure. We only share what's necessary to connect you with services, 
              and you control what information you provide.
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;