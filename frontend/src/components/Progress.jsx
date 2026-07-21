import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const Progress = forwardRef(({ className, value = 0, indicatorColor = "bg-primary", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-surface-hover", className)}
      {...props}
    >
      <motion.div
        className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
        initial={{ x: "-100%" }}
        animate={{ x: `-${100 - (value || 0)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
});
Progress.displayName = "Progress";
