import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const sampleQuestions = [
    "I need food today",
    "Looking for shelter tonight", 
    "Need help with benefits"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Every person deserves a
          <span className="block text-primary"> safe place to call home</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 animate-fade-in [animation-delay:0.2s]">
          Connecting San Francisco's community with real-time resources and hope
        </p>

        {/* AI Chat Interface */}
        <div className="max-w-2xl mx-auto animate-fade-in [animation-delay:0.4s]">
          {!showChat ? (
            <button
              onClick={() => setShowChat(true)}
              className="bg-primary text-primary-foreground px-6 py-4 rounded-3xl shadow-lg text-lg font-semibold inline-flex items-center gap-3 hover:scale-105 transition-transform duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              Hi! Tell me what I can help you with today
            </button>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-scale-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="text-left text-foreground">
                    <div className="font-semibold">HopeSF Assistant</div>
                    <div className="text-sm text-muted-foreground">Here to help you find resources</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Sample Questions */}
              <div className="grid gap-3 mb-6">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setChatMessage(question)}
                    className="text-left p-4 rounded-xl border border-border hover:bg-muted transition-colors duration-200 text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="flex gap-3">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 text-foreground"
                />
                <Button className="hope-button px-6">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Available 24/7 in English, Spanish, Chinese, and more
              </p>
            </div>
          )}
        </div>

        {/* Floating Chat Indicator */}
        <div className="absolute bottom-10 right-10 animate-float">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
            💬 Chat available 24/7
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;