interface FloatingElementsProps {
  density?: 'light' | 'medium' | 'heavy';
  side?: 'left' | 'right' | 'both';
}

export function FloatingElements({ density = 'medium', side = 'both' }: FloatingElementsProps) {
  const rightSideElements = (
    <>
      {/* Main right side floating shapes */}
      <div className="absolute top-20 right-8 w-16 h-16 border border-primary/20 rounded-full animate-slow-float">
        <div className="absolute inset-2 bg-primary/10 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute top-1/3 right-16 w-12 h-12 bg-accent-cyan/15 animate-diagonal-drift" 
           style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}>
      </div>
      
      <div className="absolute top-2/3 right-12 w-20 h-4 bg-gradient-to-l from-accent-amber/20 to-transparent animate-stretch-pulse">
      </div>
      
      <div className="absolute bottom-32 right-20 w-8 h-8 bg-primary-purple/20 rounded-full animate-bob">
        <div className="absolute inset-1 border border-primary-purple/30 rounded-full animate-spin-slow"></div>
      </div>
      
      {/* Micro elements for right side */}
      <div className="absolute top-40 right-6 w-3 h-3 bg-primary/40 rounded-full animate-sparkle"></div>
      <div className="absolute top-3/4 right-32 w-2 h-2 bg-accent-cyan/50 animate-sparkle animation-delay-1s"></div>
      <div className="absolute bottom-20 right-8 w-4 h-4 bg-accent-amber/30 animate-sparkle animation-delay-2s"></div>
    </>
  );

  const leftSideElements = (
    <>
      {/* Left side complementary elements */}
      <div className="absolute top-32 left-12 w-14 h-14 border-2 border-accent-cyan/20 animate-rotate-gentle" 
           style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'}}>
      </div>
      
      <div className="absolute top-1/2 left-8 w-6 h-6 bg-primary/15 animate-morph-float" 
           style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'}}>
      </div>
      
      <div className="absolute bottom-40 left-16 w-10 h-2 bg-gradient-to-r from-transparent via-primary/25 to-transparent animate-wave-slide">
      </div>
      
      {/* Micro elements for left side */}
      <div className="absolute top-1/4 left-6 w-3 h-3 bg-accent-amber/40 animate-sparkle animation-delay-3s"></div>
      <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-primary-purple/50 animate-sparkle animation-delay-4s"></div>
    </>
  );

  const heavyElements = density === 'heavy' ? (
    <>
      {/* Additional heavy elements */}
      <div className="absolute top-10 right-1/4 w-24 h-24 border border-primary/10 rounded-full animate-orbital-slow">
        <div className="absolute top-2 right-2 w-4 h-4 bg-accent-cyan/30 rounded-full animate-satellite"></div>
      </div>
      
      <div className="absolute bottom-16 left-1/4 w-18 h-18 bg-gradient-to-br from-accent-amber/15 to-primary-purple/15 rounded-full blur-sm animate-breathe-slow">
      </div>
      
      <svg className="absolute top-1/2 right-4 w-20 h-20 opacity-15">
        <path d="M10,10 Q50,5 90,10 Q85,50 90,90 Q50,85 10,90 Q15,50 10,10 Z" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1">
          <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0;150,150;0,300" dur="8s" repeatCount="indefinite"/>
        </path>
      </svg>
    </>
  ) : null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {(side === 'right' || side === 'both') && rightSideElements}
      {(side === 'left' || side === 'both') && leftSideElements}
      {heavyElements}
    </div>
  );
}