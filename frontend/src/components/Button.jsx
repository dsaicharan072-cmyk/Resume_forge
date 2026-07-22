import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  isLoading = false, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5",
    outline: "border-2 border-border/50 bg-background shadow-sm hover:bg-muted hover:border-border hover:-translate-y-0.5",
    ghost: "hover:bg-muted hover:text-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <motion.button
      ref={ref}
      whileTap={!props.disabled && !isLoading ? { scale: 0.98 } : {}}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
