import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { ChatbotNotification } from "./chatbot-notification";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertChatMessage } from "@shared/schema";
// OpenAI-powered chatbot - no static responses needed

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; sessionId: string; language: string }) => {
      const response = await fetch("/api/chat/openai", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onError: (error) => {
      console.error("Error generating chat response:", error);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chatbot opens for the first time
      const welcomeMessage = language === 'fr' 
        ? "Salut! Je suis Hendelito 👋 Pose-moi des questions sur moi, mes compétences, ou n'importe quoi d'autre!"
        : "Hey there! I'm Hendelito 👋 Ask me anything about myself, my skills, or whatever else!";
      
      setMessages([{
        text: welcomeMessage,
        isBot: true,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language, messages.length]);

  // OpenAI-powered response generation (replacing static responses)
  const processMessage = async (userInput: string): Promise<void> => {
    setIsTyping(true);
    
    try {
      const result = await chatMutation.mutateAsync({
        message: userInput,
        sessionId,
        language
      });

      if (result.response) {
        setMessages(prev => [...prev, {
          text: result.response,
          isBot: true,
          timestamp: new Date()
        }]);
      } else {
        // Fallback if no response
        const fallbackMsg = language === 'fr' 
          ? "Désolé, j'ai eu un petit problème 😅 Peux-tu répéter ?" 
          : "Sorry, I had a little hiccup 😅 Can you repeat that?";
        
        setMessages(prev => [...prev, {
          text: fallbackMsg,
          isBot: true,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMsg = language === 'fr'
        ? "Oups ! J'ai des problèmes de connexion 😵 Essaie encore !"
        : "Oops! I'm having connection issues 😵 Try again!";
        
      setMessages(prev => [...prev, {
        text: errorMsg,
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageText = inputValue;
    const userMessage: Message = {
      text: userMessageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Generate bot response using OpenAI
    await processMessage(userMessageText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Notification */}
      {!isOpen && <ChatbotNotification onOpenChat={() => setIsOpen(true)} hasBeenClosed={hasBeenClosed} />}
      
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          size="sm"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] sm:w-80 max-w-80 h-96 max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden chatbot-entrance">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">H</span>
              </div>
              <div>
                <h3 className="font-semibold">Hendelito</h3>
                <p className="text-xs opacity-80">
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsOpen(false);
                setHasBeenClosed(true);
              }}
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm break-words ${
                    message.isBot
                      ? 'bg-muted text-foreground rounded-bl-sm'
                      : 'bg-primary text-primary-foreground rounded-br-sm'
                  }`}
                >
                  <div 
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{ 
                      __html: message.text
                        .replace(/alexandre\.hendel07@gmail\.com/g, '<a href="mailto:alexandre.hendel07@gmail.com" class="underline hover:text-blue-400 transition-colors">email</a>')
                        .replace(/514-458-1262/g, '<a href="tel:514-458-1262" class="underline hover:text-blue-400 transition-colors">phone</a>')
                        .replace(/https:\/\/www\.linkedin\.com\/in\/hendel-alexandre-85736236b\//g, '<a href="https://www.linkedin.com/in/hendel-alexandre-85736236b/" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-400 transition-colors">LinkedIn</a>')
                        .replace(/https:\/\/github\.com\/hendel-alexandre/g, '<a href="https://github.com/hendel-alexandre" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-400 transition-colors">GitHub</a>')
                        .replace(/🔗 Cliquez pour télécharger le PDF/g, '<a href="#" onclick="document.querySelector(\'[aria-label="Download CV"]\')?.click(); return false;" class="underline hover:text-blue-400 transition-colors cursor-pointer">🔗 Télécharger le CV PDF</a>')
                        .replace(/🔗 Click to download PDF/g, '<a href="#" onclick="document.querySelector(\'[aria-label="Download CV"]\')?.click(); return false;" class="underline hover:text-blue-400 transition-colors cursor-pointer">🔗 Download CV PDF</a>')
                    }}
                  />
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-2xl rounded-bl-sm text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'fr' ? 'Tape ton message...' : 'Type your message...'}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}