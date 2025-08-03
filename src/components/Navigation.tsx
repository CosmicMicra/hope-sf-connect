import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/foodbank/login');
  };

  const handleRegisterClick = () => {
    navigate('/foodbank/register');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-md border-b border-border' : 'border-b border-border/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              🏠 <span>HopeSF</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Find Help
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors duration-200 font-medium">
                For Organizations
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-background border border-border shadow-lg z-[10000]">
                <DropdownMenuItem 
                  onClick={() => navigate('/foodbank/login')}
                  className="hover:bg-primary/10 hover:text-primary cursor-pointer"
                >
                  Food Bank Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/Register Buttons */}
            <Button
              variant="outline"
              onClick={handleLoginClick}
              className="text-primary hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Login
            </Button>
            <Button
              onClick={handleRegisterClick}
              className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;