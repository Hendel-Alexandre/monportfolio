import { useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContactMessage } from "@shared/schema";

export function ContactSection() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => 
      apiRequest("/api/contact", "POST", data),
    onSuccess: () => {
      toast({
        title: language === 'fr' ? "Email envoyé" : "Email sent",
        description: language === 'fr' 
          ? "Votre email a été envoyé. Vous serez contacté dès que possible. Merci ! :)"
          : "Your email was sent. You will be contacted as soon as possible. Thank you :)",
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Impossible d'envoyer le message. Veuillez réessayer."
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: language === 'fr' ? "Champs requis" : "Required fields",
        description: language === 'fr' 
          ? "Veuillez remplir tous les champs."
          : "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email contains @ sign
    if (!formData.email.includes('@')) {
      toast({
        title: language === 'fr' ? "Email invalide" : "Invalid email",
        description: language === 'fr' 
          ? "Veuillez entrer une adresse email valide avec @."
          : "Please enter a valid email address with @.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      label: getTranslation('email', language),
      value: "alexandre.hendel07@gmail.com",
      href: "mailto:alexandre.hendel07@gmail.com",
      color: "text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/hendel-alexandre-85736236b",
      href: "https://www.linkedin.com/in/hendel-alexandre-85736236b/",
      color: "text-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "/hendel-alexandre",
      href: "https://github.com/hendel-alexandre",
      color: "text-gray-700 dark:text-gray-300",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-line" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'visible' : ''
          }`}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                {getTranslation('contactTitle', language)}
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-8"></div>
          </div>
        </div>
        
        <div className={`section-fade-in ${isVisible ? 'visible' : ''}`}>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            {getTranslation('contactDescription', language)}
          </p>
          
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="flex flex-col items-center justify-center space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 group cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className={`text-2xl ${method.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{method.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Cliquer pour accéder' : 'Click to access'}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
              
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder={getTranslation('yourName', language)}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    type="email"
                    name="email"
                    placeholder={getTranslation('yourEmail', language)}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Textarea
                    name="message"
                    rows={4}
                    placeholder={getTranslation('yourMessage', language)}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="resize-none"
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={contactMutation.isPending}
                  >
                    <Send className="w-4 h-4" />
                    {contactMutation.isPending 
                      ? (language === 'fr' ? 'Envoi...' : 'Sending...') 
                      : getTranslation('sendMessage', language)
                    }
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
