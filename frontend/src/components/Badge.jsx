import { cn } from '../utils/cn';

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-transparent bg-primary/20 text-primary hover:bg-primary/30",
    secondary: "border-transparent bg-surface-hover text-white hover:bg-surface-hover/80",
    destructive: "border-transparent bg-red-500/20 text-red-500 hover:bg-red-500/30",
    outline: "text-white",
    success: "border-transparent bg-green-500/20 text-green-500 hover:bg-green-500/30",
    warning: "border-transparent bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-background",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
