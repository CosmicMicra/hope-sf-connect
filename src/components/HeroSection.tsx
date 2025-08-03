import { useState, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotService } from '@/services/chatbot';
import { ChatMessage } from '@/types/chat';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "I need food today",
    "Looking for shelter tonight", 
    "Need help with benefits",
    "What services are available for housing?",
    "How can I apply for food assistance?",
    "What emergency resources are available?"
  ];

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    // Add user message to history
    const userMessage: ChatMessage = {
      content: chatMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');

    try {
      setIsLoading(true);
      // Get assistant response
      const response = await chatbotService.sendMessage(chatMessage, chatHistory);
      
      // Add assistant message to history
      const assistantMessage: ChatMessage = {
        content: response,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      // Add the message to history
      setChatHistory(prev => [...prev, assistantMessage]);
      
      // Reset the input
      setChatMessage('');
    } catch (error) {
      console.error('Error in chat interface:', error);
      const errorMessage: ChatMessage = {
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
              className="hope-chat-bubble text-lg font-semibold inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Hi! Tell me what I can help you with today
            </button>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative p-8">
              <div className="flex justify-between items-center mb-6">
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
                  className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              {/* Sample Questions */}
              <div className="grid gap-3 mb-6">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                  setChatMessage(question);
                  handleSendMessage();
                }}
                    className="text-left p-4 rounded-xl border border-border hover:bg-muted transition-colors duration-200 text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
              
              {/* Chat History */}
              <div className="space-y-4 mb-6">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'} relative`}>
                      <div className="text-sm">
                        {message.content}
                      </div>
                      <div className="absolute -bottom-2 right-2 text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground animate-pulse">
                      <div className="h-4 w-1/2 bg-primary/10 rounded mb-2"></div>
                      <div className="h-3 w-3/4 bg-primary/10 rounded"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-3">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 text-foreground"
                />
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs text-muted-foreground">{chatMessage.length}/1000</span>
                  <Button className="hope-button px-6" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mt-4">
                <div>Available 24/7 in English, Spanish, Chinese, and more</div>
                <div className="mt-2">
                  <span className="font-semibold">Note:</span> If you're in immediate danger, please call 911.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Chat Indicator */}
           <div className="absolute bottom-10 right-10">
           <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
             💬 Chat available 24/7
           </div>
         </div>
      </div>
    </section>
  );
};

export default HeroSection;