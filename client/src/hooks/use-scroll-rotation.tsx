import { useEffect, useState } from 'react';

export function useScrollRotation() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateRotation = () => {
      const scrollY = window.scrollY;
      // Smoother rotation: 1 full rotation every 1200 pixels scrolled
      const newRotation = (scrollY / 1200) * 360;
      setRotation(newRotation);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateRotation);
        ticking = true;
      }
    };

    // Initial call to set rotation based on current scroll position
    updateRotation();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return rotation;
}