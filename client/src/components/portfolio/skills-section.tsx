import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import { 
  SiHtml5, 
  SiCss3, 
  SiPython, 
  SiSap, 
  SiAdobe, 
  SiFigma, 
  SiJavascript
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }> | string;
  color: string;
}

export function SkillsSection() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
    { name: "CSS", icon: SiCss3, color: "text-blue-500" },
    { name: "Python", icon: SiPython, color: "text-green-500" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
    { name: "SAP", icon: SiSap, color: "text-blue-700" },
    { name: "Photoshop", icon: SiAdobe, color: "text-red-600" },
    { name: "Figma", icon: SiFigma, color: "text-purple-500" },
    { name: "Adobe AI", icon: SiAdobe, color: "text-orange-600" },
    { name: "Adobe XD", icon: SiAdobe, color: "text-pink-600" },
    { name: "Microsoft Office", icon: "💼", color: "text-blue-600" },
    { name: "Excel", icon: "📊", color: "text-green-700" },
  ];

  // Duplicate skills for infinite scroll effect
  const infiniteSkills = [...skills, ...skills];

  useEffect(() => {
    const container = skillsContainerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    let animationId: number;
    let isUserInteracting = false;

    const startContinuousScroll = () => {
      let scrollPosition = 0;
      const skillWidth = 140; // width + gap
      const totalSkillsWidth = skills.length * skillWidth;
      
      // Reduce animation frequency on mobile for better performance
      const scrollSpeed = isMobile ? 0.3 : 0.5;
      let frameCount = 0;

      const animate = () => {
        if (!isUserInteracting && container) {
          // Skip frames on mobile to improve performance
          if (isMobile && frameCount % 2 !== 0) {
            frameCount++;
            animationId = requestAnimationFrame(animate);
            return;
          }
          
          scrollPosition += scrollSpeed;
          
          // Reset when we've scrolled through one set of skills
          if (scrollPosition >= totalSkillsWidth) {
            scrollPosition = 0;
          }
          
          container.scrollLeft = scrollPosition;
          frameCount++;
        }
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      isUserInteracting = true;
    };

    const handleMouseLeave = () => {
      isUserInteracting = false;
    };

    const handleTouchStart = () => {
      isUserInteracting = true;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        isUserInteracting = false;
      }, 2000);
    };

    // Start animation after a delay
    setTimeout(startContinuousScroll, 1000);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [skills.length]);

  const renderSkillIcon = (skill: Skill) => {
    if (typeof skill.icon === 'string') {
      return (
        <span className={`text-4xl ${skill.color} block mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out transform-gpu`}>
          {skill.icon}
        </span>
      );
    } else {
      const IconComponent = skill.icon;
      return (
        <IconComponent 
          className={`text-4xl ${skill.color} block mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out transform-gpu`} 
        />
      );
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-background overflow-hidden relative">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-line" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'visible' : ''
          }`}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                {getTranslation('skillsTitle', language)}
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {getTranslation('skillsSubtitle', language)}
            </p>
          </div>
        </div>
        
        {/* Continuous scrolling skills carousel */}
        <div 
          ref={skillsContainerRef}
          className="relative overflow-x-hidden scrollbar-hide"
        >
          <div className="flex gap-8 w-max">
            {infiniteSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`} 
                className="skill-badge flex-shrink-0 group cursor-pointer"
                style={{ animationDelay: `${(index % skills.length) * 0.1}s` }}
              >
                <div className="skill-icon-container">
                  {renderSkillIcon(skill)}
                </div>
                <span className="font-semibold text-foreground text-center text-sm group-hover:text-primary transition-colors duration-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hint text */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className="animate-pulse">
            {language === 'fr' 
              ? 'Défilement automatique • Survolez pour pausé' 
              : 'Auto-scrolling • Hover to pause'
            }
          </p>
        </div>
      </div>
    </section>
  );
}