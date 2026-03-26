import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Heading({ 
  children, 
  className, 
  as: Component = 'h1',
  weight = 'medium' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}) {
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <Component className={cn(
      'font-["Clash_Display"] tracking-tight', 
      weights[weight],
      className
    )}>
      {children}
    </Component>
  );
}

export function Text({ 
  children, 
  className, 
  as: Component = 'p',
  size = 'base'
}: { 
  children: React.ReactNode; 
  className?: string; 
  as?: any;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
}) {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <Component className={cn(
      'font-["Satoshi"] leading-relaxed text-slate-400', 
      sizes[size],
      className
    )}>
      {children}
    </Component>
  );
}

export function Mono({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <span className={cn(
      'font-mono uppercase tracking-[0.15em] text-[10px] text-slate-400 font-medium', 
      className
    )}>
      {children}
    </span>
  );
}
