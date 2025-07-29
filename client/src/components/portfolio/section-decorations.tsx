interface SectionDecorationsProps {
  position: 'left' | 'right' | 'both';
  variant?: 'minimal' | 'standard' | 'elaborate';
}

export function SectionDecorations({ position, variant = 'standard' }: SectionDecorationsProps) {
  const leftElements = (
    <>
      <div className="absolute -left-8 top-10 w-2 h-16 bg-gradient-to-b from-primary to-transparent opacity-30 animate-pulse"></div>
      <div className="absolute -left-4 top-32 w-6 h-6 border border-accent-cyan opacity-20 rounded-full animate-spin-slow"></div>
      <div className="absolute -left-6 bottom-20 w-4 h-4 bg-accent-amber opacity-25 animate-bounce"></div>
    </>
  );

  const rightElements = (
    <>
      <div className="absolute -right-8 top-16 w-3 h-20 bg-gradient-to-b from-accent-cyan to-transparent opacity-25 animate-pulse"></div>
      <div className="absolute -right-5 top-40 w-8 h-8 border-2 border-primary opacity-15 animate-rotate-scale" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute -right-7 bottom-32 w-5 h-5 bg-primary-purple opacity-30 animate-wobble"></div>
      <div className="absolute -right-12 bottom-10 w-10 h-2 bg-gradient-to-l from-accent-amber to-transparent opacity-20 animate-expand-contract"></div>
    </>
  );

  const elaborateElements = variant === 'elaborate' ? (
    <>
      <div className="absolute -right-16 top-1/4 w-12 h-12 opacity-10 animate-float">
        <div className="w-full h-full bg-primary" style={{clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'}}></div>
      </div>
      <div className="absolute -left-14 bottom-1/4 w-10 h-10 border border-accent-cyan opacity-15 animate-morph-border" style={{borderRadius: '50% 20% 80% 30%'}}></div>
      <svg className="absolute -right-20 top-1/2 w-16 h-16 opacity-15">
        <circle cx="8" cy="8" r="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
          <animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </>
  ) : null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {(position === 'left' || position === 'both') && leftElements}
      {(position === 'right' || position === 'both') && rightElements}
      {elaborateElements}
    </div>
  );
}