import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cyberworldGif from "@assets/viceland GIF by CYBERWAR_1753503286455.gif";

export function AboutSection() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const timelineSections = [
    {
      year: "2021",
      title: getTranslation('cleanCode', language),
      description: getTranslation('aboutDescription1', language)
    },
    {
      year: "2023",
      title: getTranslation('responsiveDesign', language),
      description: getTranslation('aboutDescription2', language)
    },
    {
      year: "2024",
      title: getTranslation('problemSolving', language),
      description: getTranslation('aboutDescription3', language)
    }
  ];

  // Smooth scroll to specific section
  const scrollToSection = (index: number) => {
    const container = timelineRef.current;
    if (!container) return;

    const cardWidth = 400; // approximate width of each timeline card + gap
    const targetPosition = index * cardWidth;
    
    container.scrollTo({
      left: targetPosition,
      behavior: 'smooth'
    });
    
    setCurrentSection(index);
    
    // Update progress indicator
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? Math.min(targetPosition / maxScroll, 1) : 0;
    setScrollProgress(progress);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  };

  const goToNext = () => {
    if (currentSection < timelineSections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  };

  // Update progress when manually scrolling
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
      
      // Update current section based on scroll position
      const cardWidth = 400;
      const section = Math.round(container.scrollLeft / cardWidth);
      setCurrentSection(Math.max(0, Math.min(section, timelineSections.length - 1)));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [timelineSections.length]);

  return (
    <section id="about" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-line" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-8 transition-all duration-700 ease-out ${
            isVisible ? 'visible' : ''
          }`}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                {getTranslation('aboutMe', language)}
              </span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mb-8"></div>
          </div>
        </div>
        
        <div className={`section-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="max-w-7xl mx-auto">
            
            {/* Square Hero Image Section - Centered */}
            <div className="flex justify-center mb-16">
              <div className="relative group">
                {/* Square container */}
                <div className="relative">
                  {/* Animated rings around square */}
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                  <div className="absolute -inset-8 rounded-3xl bg-gradient-to-l from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700"></div>
                  
                  {/* Main square image */}
                  <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-105">
                    <img 
                      src={cyberworldGif} 
                      alt="Digital binary code matrix with cybersecurity theme" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-110"
                    />
                    
                    {/* Sleek dark mask overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60"></div>
                    
                    {/* Interactive hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow Navigation Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={goToPrevious}
                disabled={currentSection === 0}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              {/* Section indicators */}
              <div className="flex items-center gap-2">
                {timelineSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSection 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNext}
                disabled={currentSection === timelineSections.length - 1}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Horizontal Scrollable Timeline */}
            <div className="relative">
              <div 
                ref={timelineRef}
                className="overflow-x-auto pb-8 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex gap-8 min-w-max px-4">
                  
                  {/* Curved connecting path - responsive to content width */}
                  <svg className="absolute top-1/2 left-0 w-full h-24 pointer-events-none z-0" style={{ transform: 'translateY(-50%)' }}>
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                        <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="pathProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                        <stop offset={`${scrollProgress * 100}%`} stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                        <stop offset={`${scrollProgress * 100}%`} stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 80 50 Q 160 30, 320 50 Q 480 70, 640 50 Q 800 30, 960 50 Q 1120 70, 1280 50" 
                      stroke="url(#pathProgressGradient)" 
                      strokeWidth="2" 
                      fill="none"
                      className="transition-all duration-300"
                    />
                    <path 
                      d="M 80 50 Q 160 30, 320 50 Q 480 70, 640 50 Q 800 30, 960 50 Q 1120 70, 1280 50" 
                      stroke="url(#pathGradient)" 
                      strokeWidth="1" 
                      fill="none"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  {/* Timeline cards */}
                  <div className="flex gap-16 relative z-10">
                    
                    {/* First card - 2023 Journey Start */}
                    <div className="flex-shrink-0 w-80 group">
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-lg z-20 group-hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-1 bg-background rounded-full"></div>
                          <div className="absolute inset-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-8 -left-4 w-8 h-8 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute -bottom-4 -right-2 w-6 h-6 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                        
                        {/* Content card */}
                        <div className="bg-gradient-to-br from-card/90 to-card/70 p-8 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer mt-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-xl font-bold text-primary uppercase tracking-wider">2023</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">The Beginning</h3>
                          <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                            {getTranslation('aboutDescription1', language)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative separator */}
                    <div className="flex-shrink-0 flex items-center justify-center w-16">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center animate-spin-slow">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
                      </div>
                    </div>
                    
                    {/* Second card - 2025 Growth */}
                    <div className="flex-shrink-0 w-80 group">
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-lg z-20 group-hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-1 bg-background rounded-full"></div>
                          <div className="absolute inset-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-3 w-7 h-7 bg-primary/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute -bottom-6 -left-3 w-5 h-5 bg-primary/25 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                        
                        {/* Content card */}
                        <div className="bg-gradient-to-bl from-card/90 to-card/70 p-8 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer mt-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <span className="text-xl font-bold text-primary uppercase tracking-wider">2025</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">Expansion</h3>
                          <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                            {getTranslation('aboutDescription2', language)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative separator */}
                    <div className="flex-shrink-0 flex items-center justify-center w-16">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-l from-primary/30 to-primary/50 flex items-center justify-center animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-l from-primary/80 to-primary"></div>
                      </div>
                    </div>
                    
                    {/* Third card - Future Collaboration */}
                    <div className="flex-shrink-0 w-80 group">
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-lg z-20 group-hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-1 bg-background rounded-full"></div>
                          <div className="absolute inset-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-10 left-1/2 w-6 h-6 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute -bottom-2 right-0 w-8 h-8 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                        
                        {/* Content card */}
                        <div className="bg-gradient-to-br from-card/90 to-card/70 p-8 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer mt-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <span className="text-xl font-bold text-primary uppercase tracking-wider">Future</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">Collaboration</h3>
                          <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                            {getTranslation('aboutDescription3', language)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              
              {/* Navigation progress indicator */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Journey Progress</span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
