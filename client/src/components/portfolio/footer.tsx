import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguage();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/hendel-alexandre",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/hendel-alexandre-85736236b/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:alexandre.hendel07@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="py-8 px-4 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground mb-4 md:mb-0">
            <p>{getTranslation('copyright', language)}</p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-xl" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
