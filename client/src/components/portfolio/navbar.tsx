import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { useScrollRotation } from "@/hooks/use-scroll-rotation";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rotation = useScrollRotation();

  const navItems = [
    { href: "#skills", key: "skills" as const },
    { href: "#about", key: "about" as const },
    { href: "#projects", key: "projects" as const },
    { href: "#contact", key: "contact" as const },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* HA Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <img 
                src="/ha-logo.png" 
                alt="HA Logo" 
                className="h-12 w-12 transition-all duration-200"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  filter: theme === 'dark' ? 'invert(1)' : 'none',
                  willChange: 'transform'
                }}
              />
            </button>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {getTranslation(item.key, language)}
              </button>
            ))}
          </div>
          
          {/* Controls - Desktop */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm font-medium"
            >
              {language.toUpperCase()}
            </Button>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-3 items-center h-16 w-full">
          {/* Language Toggle - Left */}
          <div className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm font-medium"
            >
              {language.toUpperCase()}
            </Button>
          </div>

          {/* HA Logo - Center */}
          <div className="flex items-center justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <img 
                src="/ha-logo.png" 
                alt="HA Logo" 
                className="h-12 w-12 transition-all duration-200"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  filter: theme === 'dark' ? 'invert(1)' : 'none',
                  willChange: 'transform'
                }}
              />
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle - Right */}
          <div className="flex items-center justify-end space-x-1">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {getTranslation(item.key, language)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
