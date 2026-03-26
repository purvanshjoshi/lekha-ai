"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SentinelCursor() {
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 450 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -16,
          top: -16,
        }}
        animate={{
          scale: isPointer ? 2.5 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-500 pointer-events-none z-[9999] hidden md:block"
      />
      
      {/* Inner Precision Point */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -2,
          top: -2,
        }}
        className="fixed top-0 left-0 w-1 h-1 bg-emerald-500 rounded-full pointer-events-none z-[10000] hidden md:block shadow-[0_0_10px_#10b981]"
      />
    </>
  );
}
