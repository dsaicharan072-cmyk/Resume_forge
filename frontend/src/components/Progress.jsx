import React from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

export const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <motion.div
      className="h-full w-full flex-1 bg-primary transition-all"
      initial={{ x: "-100%" }}
      animate={{ x: `-${100 - (value || 0)}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
));

Progress.displayName = "Progress";
export default Progress;
