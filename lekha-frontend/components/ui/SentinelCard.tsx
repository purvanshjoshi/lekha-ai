"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SentinelCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SentinelCard({ children, className, delay = 0 }: SentinelCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative rounded-3xl border border-white/5 bg-[#0A0A0A]/50 p-8 backdrop-blur-2xl transition-colors hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* 3D Depth Elements */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10"
      >
        {children}
      </div>

      {/* Subtle Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.03]">
        <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Glossy Reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(1000px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06),transparent_40%)]" />
    </motion.div>
  );
}
