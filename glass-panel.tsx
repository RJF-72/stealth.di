// packages/ui-components/src/glass-panel.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlassPanel({ children, className, intensity = 'medium' }: GlassPanelProps) {
  const intensityClasses = {
    low: 'bg-stealth-surface/30 backdrop-blur-stealth',
    medium: 'bg-stealth-surface/50 backdrop-blur-stealth border border-stealth-primary/20',
    high: 'bg-stealth-surface/70 backdrop-blur-stealth border border-stealth-primary/30'
  };

  return (
    <div className={cn(
      'rounded-xl p-6 transition-all duration-300 hover:border-stealth-primary/40',
      intensityClasses[intensity],
      className
    )}>
      {children}
    </div>
  );
}