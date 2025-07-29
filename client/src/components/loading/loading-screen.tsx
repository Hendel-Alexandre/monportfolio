import { useEffect, useState } from "react";
import backgroundVideo from "@assets/background_1753492809936.mp4";
import haLogo from "@assets/0b3ba0e9-167f-49f2-9221-837385411062_removalai_preview_1753505489672.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start loading immediately with fallback timeout
    const startLoading = () => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setFadeOut(true);
            setTimeout(onLoadingComplete, 800); // Smooth fade transition
            return 100;
          }
          return prev + Math.random() * 8 + 3; // Realistic loading speed
        });
      }, 180);
      
      return interval;
    };

    let interval: NodeJS.Timeout;
    
    if (isVideoLoaded) {
      // Start immediately if video is loaded
      interval = startLoading();
    } else {
      // Fallback: start after 2 seconds regardless of video status
      const fallbackTimeout = setTimeout(() => {
        if (!isVideoLoaded) {
          setIsVideoLoaded(true); // Force video loaded state
        }
        interval = startLoading();
      }, 2000);
      
      return () => clearTimeout(fallbackTimeout);
    }

    return () => clearInterval(interval);
  }, [onLoadingComplete, isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log('Loading screen video failed, continuing without video');
    setIsVideoLoaded(true); // Continue loading even if video fails
  };

  // Start loading after component mounts as additional fallback
  useEffect(() => {
    const mountTimeout = setTimeout(() => {
      if (!isVideoLoaded) {
        console.log('Video loading timeout, starting loading sequence');
        setIsVideoLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(mountTimeout);
  }, [isVideoLoaded]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-800 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={handleVideoLoad}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Fallback gradient background if video fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90" />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Clean Spinning Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 animate-spin">
            <img 
              src={haLogo} 
              alt="HA Logo" 
              className="w-full h-full object-contain filter invert brightness-0 contrast-100"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Loading
            <span className="animate-pulse">...</span>
          </h2>
          
          {/* Progress bar */}
          <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 transition-all duration-500 ease-out rounded-full shadow-lg shadow-primary/30"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          {/* Progress percentage */}
          <p className="text-white/80 text-lg font-semibold tracking-wider">
            {Math.floor(Math.min(progress, 100))}%
          </p>
          
          {/* Loading status */}
          <p className="text-white/60 text-sm">
            {progress < 20 && "Initializing..."}
            {progress >= 20 && progress < 50 && "Loading components..."}
            {progress >= 50 && progress < 80 && "Setting up portfolio..."}
            {progress >= 80 && progress < 100 && "Almost ready..."}
            {progress >= 100 && "Welcome!"}
          </p>
        </div>
      </div>
    </div>
  );
}