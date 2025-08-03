import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md h-16' : 'shadow-sm h-18'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">🏠 HopeSF</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Find Help
              </a>
              
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                For Organizations
              </a>

              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                About Us
              </a>
              
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Resources
              </a>

              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Food Banks
              </a>

              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Shelters
              </a>

              <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Contact
              </a>

              <div className="flex items-center space-x-3 ml-8">
                <Button variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground font-medium px-6">
                  Login
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6">
                  Get Help Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileMenu}></div>
          <div className="fixed top-0 right-0 w-80 h-full bg-background shadow-xl transform transition-transform duration-300">
            <div className="p-6 pt-20">
              <div className="space-y-6">
                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  Find Help
                </a>
                
                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  For Organizations
                </a>

                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  About Us
                </a>
                
                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  Resources
                </a>

                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  Food Banks
                </a>

                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  Shelters
                </a>

                <a href="#" className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg">
                  Contact
                </a>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground font-medium">
                    Login
                  </Button>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                    Get Help Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;