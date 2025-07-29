import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { getTranslation } from '@/lib/translations';

interface ChatbotNotificationProps {
  onOpenChat: () => void;
  hasBeenClosed: boolean;
}

export function ChatbotNotification({ onOpenChat, hasBeenClosed }: ChatbotNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();

  const notifications = [
    'chatbotNotification1',
    'chatbotNotification2', 
    'chatbotNotification3',
    'chatbotNotification4'
  ] as const;

  const [currentNotification, setCurrentNotification] = useState(0);

  useEffect(() => {
    // Don't show notifications if already dismissed or chat has been closed
    if (isDismissed || hasBeenClosed) return;

    // Show first notification after 10 seconds
    const initialTimer = setTimeout(() => {
      if (!isDismissed && !hasBeenClosed) {
        setIsVisible(true);
        setIsAnimating(true);
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [isDismissed, hasBeenClosed]);

  // Auto-hide after 8 seconds
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
      }, 8000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const handleClick = () => {
    onOpenChat();
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
    }, 300);
  };

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-20 right-6 z-40 transition-all duration-300 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="relative">
        {/* Pulse animation rings */}
        <div className="absolute -inset-1 bg-primary/20 rounded-2xl animate-ping"></div>
        <div className="absolute -inset-2 bg-primary/10 rounded-2xl animate-pulse"></div>
        
        {/* Main notification */}
        <div className="relative bg-card border border-border/50 rounded-2xl shadow-lg p-4 max-w-xs backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>

          {/* Content */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                Hendelito
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {getTranslation(notifications[currentNotification] as keyof typeof import('@/lib/translations').translations, language)}
              </p>
              
              <button
                onClick={handleClick}
                className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {getTranslation('startChatting', language)} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}