export function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Animated geometric shapes */}
      <div 
        className="absolute top-20 left-10 w-8 h-8 bg-primary/20 animate-float" 
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-32 right-20 w-6 h-6 bg-[hsl(var(--primary-purple))] opacity-30 rounded-full animate-float" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-64 left-1/4 w-4 h-4 bg-[hsl(var(--accent-cyan))] opacity-25 transform rotate-45 animate-float" 
        style={{ animationDelay: '4s' }}
      />
      <div 
        className="absolute bottom-32 right-16 w-10 h-10 bg-[hsl(var(--accent-amber))] opacity-20 animate-float" 
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-48 left-1/3 w-5 h-5 bg-primary/30 rounded-full animate-float" 
        style={{ animationDelay: '3s' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-12 h-12 bg-primary/10 transform rotate-12 animate-float" 
        style={{ animationDelay: '5s' }}
      />
      <div 
        className="absolute bottom-1/4 left-20 w-7 h-7 bg-[hsl(var(--primary-purple))] opacity-20 rounded-full animate-float" 
        style={{ animationDelay: '2.5s' }}
      />
    </div>
  );
}
