import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useScrollRotation } from "@/hooks/use-scroll-rotation";
import { useEffect } from "react";

export function HeroSection() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  const rotation = useScrollRotation();

  // Optimized mobile video handler with performance improvements
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    const playVideo = () => {
      const video = document.querySelector('video[key="hero-video"]') as HTMLVideoElement;
      if (video && video.paused) {
        // Reduce video quality on mobile for better performance
        if (isMobile && video.playbackRate !== 0.8) {
          video.playbackRate = 0.8; // Slightly slower on mobile
        }
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log('Video autoplay prevented:', err);
            // Fallback: show static background on mobile if video fails
            if (isMobile) {
              video.style.display = 'none';
            }
          });
        }
      }
    };

    // Only use necessary events for mobile
    const events = isMobile ? ['touchstart'] : ['touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, playVideo, { once: true, passive: true });
    });
    
    // Optimized intersection observer with less frequent checks
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Longer delay on mobile for better performance
          setTimeout(playVideo, isMobile ? 300 : 100);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '50px' // Start loading earlier
    });

    const videoElement = document.querySelector('video[key="hero-video"]');
    if (videoElement) {
      observer.observe(videoElement);
      
      // Pre-optimize video element for mobile
      if (isMobile) {
        videoElement.setAttribute('preload', 'metadata'); // Reduce preload on mobile
        videoElement.setAttribute('playsinline', 'true'); // Better iOS support
      }
    }
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, playVideo);
      });
      observer.disconnect();
    };
  }, []);

  const handleDownloadCV = async () => {
    try {
      // Download the appropriate CV based on current language
      const response = await fetch(`/api/cv/download?lang=${language}`);
      
      if (!response.ok) {
        throw new Error('Failed to download CV');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename based on language
      const filename = language === 'fr' 
        ? 'Alexandre_Hendel_CV_Francais.pdf'
        : 'Alexandre_Hendel_CV_English.pdf';
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback: direct link to PDF file
      const filename = language === 'fr' 
        ? 'Alexandre_Hendel_CV_Francais.pdf'
        : 'Alexandre_Hendel_CV_English.pdf';
      
      const link = document.createElement('a');
      link.href = `/cv/${filename}`;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload={window.innerWidth <= 768 ? "none" : "metadata"}
          controls={false}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.4) contrast(1.1) saturate(0.9)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          onLoadStart={() => console.log('Hero video loading...')}
          onLoadedData={() => console.log('Hero video data loaded')}
          onCanPlay={() => console.log('Hero video can play')}
          onPlay={() => console.log('Hero video playing')}
          onError={(e) => {
            const target = e.target as HTMLVideoElement;
            console.error('Hero video error:', target?.error?.message || 'Video load failed');
            // Fallback to gradient background on error
            if (target.parentElement) {
              target.parentElement.style.background = 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)';
            }
          }}
          onLoadedMetadata={() => {
            // Force play on mobile devices after metadata loads
            const video = document.querySelector('video[key="hero-video"]') as HTMLVideoElement;
            if (video && video.paused) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(err => console.log('Video autoplay prevented:', err));
              }
            }
          }}
        >
          <source src="/hero-background.mp4" type="video/mp4" />
          <source src="/hero-background.webm" type="video/webm" />
        </video>
        
        {/* Sleek dark overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>


      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div 
          ref={elementRef}
          className={`section-fade-in ${isVisible ? 'visible' : ''}`}
        >
          {/* HA Logo replacing text */}
          <div className="flex justify-center mb-6">
            <img 
              src="/ha-logo.png" 
              alt="HA Logo" 
              className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 drop-shadow-2xl transition-transform duration-300 hover:scale-110"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                filter: 'invert(1)',
                transformOrigin: 'center',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
          
          {/* Web Developer title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-12 drop-shadow-2xl">
            WEB DEVELOPER
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={scrollToProjects} className="btn-primary shadow-2xl">
              <ExternalLink className="w-4 h-4" />
              {getTranslation('viewMyWork', language)}
            </button>
            <button onClick={handleDownloadCV} className="btn-secondary shadow-2xl" aria-label="Download CV">
              <Download className="w-4 h-4" />
              {getTranslation('downloadCV', language)}
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="text-gray-300 text-2xl drop-shadow-lg" />
      </div>
    </section>
  );
}
