export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Traveling geometric shapes - move across the page (non-circular) */}
      <div className="absolute bottom-40 w-4 h-4 bg-accent-amber opacity-25 rotate-45 animate-travel-vertical-up"></div>
      <div className="absolute bottom-60 w-7 h-7 bg-accent-cyan opacity-20 animate-travel-zigzag"></div>
      
      {/* Animated triangles and squares */}
      <div className="absolute top-1/3 left-20 w-6 h-6 bg-primary opacity-15 animate-rotate-scale" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>
      </div>
      <div className="absolute bottom-1/3 right-20 w-8 h-8 bg-accent-cyan opacity-10 animate-morph"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-primary-purple opacity-20 animate-zigzag" style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'}}>
      </div>
      
      {/* Traveling gradient orbs - cross-page movement (removed) */}
      
      {/* Enhanced particle streams - flowing across screen (removed circular particles) */}
      
      {/* Subtle grid pattern with animation */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 animate-grid-shift" 
           style={{
             backgroundImage: `
               linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
               linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}>
      </div>
      
      {/* Dynamic flowing lines */}
      <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 animate-slide-right"></div>
      <div className="absolute bottom-32 right-0 w-full h-px bg-gradient-to-l from-transparent via-accent-cyan to-transparent opacity-15 animate-slide-left"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-amber to-transparent opacity-10 animate-wave-line"></div>
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-purple to-transparent opacity-12 animate-pulse-line"></div>
      
      {/* Ripple effects (left side circles removed) */}
      <div className="absolute bottom-1/3 right-1/5 w-16 h-16 border border-accent-cyan opacity-15 rounded-full animate-ripple-delayed"></div>
      
      {/* Right side focus design elements (no circles) */}
      <div className="absolute top-32 right-16 w-12 h-12 bg-accent-cyan opacity-10 animate-float-up" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}>
      </div>
      <div className="absolute top-60 right-8 w-16 h-16 border border-accent-amber opacity-20 animate-pulse-border" style={{borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'}}>
      </div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-primary-purple opacity-25 animate-rotate-3d"></div>
      <div className="absolute bottom-20 right-20 w-24 h-1 bg-gradient-to-l from-primary to-transparent opacity-30 animate-expand-contract"></div>
      
      {/* Left side complementary elements */}
      <div className="absolute top-40 left-8 w-14 h-14 border-2 border-accent-cyan opacity-12 animate-morph-border" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}>
      </div>
      <div className="absolute bottom-60 left-12 w-6 h-6 bg-accent-amber opacity-20 animate-bounce-rotate"></div>
      <div className="absolute top-80 left-6 w-18 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 animate-slide-vertical"></div>
      
      {/* Scattered micro elements throughout (left side circles removed) */}
      <div className="absolute top-1/5 right-1/3 w-3 h-3 bg-primary opacity-30 rounded-full animate-twinkle"></div>
      <div className="absolute bottom-1/4 right-2/3 w-4 h-4 bg-accent-amber opacity-25 animate-twinkle animation-delay-2s"></div>
      <div className="absolute top-3/5 right-1/5 w-3 h-3 bg-primary-purple opacity-35 animate-twinkle animation-delay-3s"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary to-transparent opacity-5 animate-corner-glow"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent-cyan to-transparent opacity-8 animate-corner-glow-reverse"></div>
      <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-accent-amber to-transparent opacity-6 animate-corner-pulse"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-primary-purple to-transparent opacity-7 animate-corner-breathe"></div>
      
      {/* Enhanced constellation-like connections */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-draw-line">
          <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="8s" repeatCount="indefinite"/>
        </line>
        <line x1="70%" y1="30%" x2="90%" y2="60%" stroke="hsl(var(--accent-cyan))" strokeWidth="1" className="animate-draw-line-delayed">
          <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="10s" repeatCount="indefinite"/>
        </line>
        <line x1="20%" y1="70%" x2="50%" y2="80%" stroke="hsl(var(--accent-amber))" strokeWidth="1" className="animate-draw-line-slow">
          <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="12s" repeatCount="indefinite"/>
        </line>
        <line x1="80%" y1="15%" x2="95%" y2="25%" stroke="hsl(var(--primary-purple))" strokeWidth="1">
          <animate attributeName="stroke-dasharray" values="0,50;50,0;0,50" dur="6s" repeatCount="indefinite"/>
        </line>
        <line x1="15%" y1="85%" x2="35%" y2="95%" stroke="hsl(var(--primary))" strokeWidth="1">
          <animate attributeName="stroke-dasharray" values="0,70;70,0;0,70" dur="9s" repeatCount="indefinite"/>
        </line>
        <circle cx="85%" cy="20%" r="2" fill="hsl(var(--accent-cyan))" opacity="0.3">
          <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
        </circle>
      </svg>
      
      {/* Floating geometric patterns */}
      <div className="absolute top-1/3 right-1/6 w-10 h-10 opacity-15 animate-geometric-dance">
        <div className="w-full h-full bg-primary" style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'}}></div>
      </div>
      <div className="absolute bottom-1/3 left-1/8 w-8 h-8 opacity-20 animate-geometric-dance-reverse">
        <div className="w-full h-full bg-accent-cyan" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}></div>
      </div>
    </div>
  );
}