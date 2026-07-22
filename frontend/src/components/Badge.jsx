import React from 'react';
import { cn } from '../utils/cn';

const badgeVariants = {
  default: "bg-primary/10 text-primary border-transparent hover:bg-primary/20",
  secondary: "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
  destructive: "bg-destructive/10 text-destructive border-transparent hover:bg-destructive/20",
  outline: "text-foreground border-border/50",
  success: "bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/20",
  warning: "bg-amber-500/10 text-amber-600 border-transparent hover:bg-amber-500/20",
};

export const Badge = ({ className, variant = "default", ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        variant === "outline" ? "border-input" : "border-transparent",
        className
      )}
      {...props}
    />
  );
};

export default Badge;
