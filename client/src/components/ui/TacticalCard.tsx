import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TacticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "highlight";
  delay?: number;
}

export function TacticalCard({ 
  className, 
  variant = "default", 
  delay = 0,
  children, 
  ...props 
}: TacticalCardProps) {
  const baseClasses = "relative bg-card p-6 overflow-hidden flex flex-col group rounded-md tactical-border";
  
  const variants = {
    default: "border-border hover:bg-secondary/50 transition-colors",
    destructive: "border-destructive/50 bg-destructive/5 glow-box-destructive",
    highlight: "border-primary/50 bg-primary/5 glow-box",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {/* Tactical Corner Accents */}
      <div className={cn(
        "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2",
        variant === "destructive" ? "border-destructive" : variant === "highlight" ? "border-primary" : "border-muted-foreground/30 group-hover:border-primary/50 transition-colors"
      )} />
      <div className={cn(
        "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2",
        variant === "destructive" ? "border-destructive" : variant === "highlight" ? "border-primary" : "border-muted-foreground/30 group-hover:border-primary/50 transition-colors"
      )} />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2 mb-4 text-sm font-display tracking-wider text-muted-foreground uppercase", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-3xl font-display font-bold text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}
