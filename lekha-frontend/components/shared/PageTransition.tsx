"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mono } from '../ui/Typography';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  
  const initialLogs = [
    "LEKHA.AI SENIOR SENTINEL VER 1.2.0",
    "INITIALIZING SWARM PROTOCOLS...",
    "CONNECTING TO GUERRILLA NODES...",
    "HANDSHAKE: 0x4f... SUCCESS",
    "DECRYPTING LEDGERS...",
    "SENTINEL ONLINE."
  ];

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < initialLogs.length) {
        setBootLogs(prev => [...prev, initialLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsInitializing(false), 800);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isInitializing && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center space-y-8"
          >
            {/* Scanline Curtain */}
            <motion.div 
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-emerald-500/5 origin-top z-10 scanline" 
            />

            <div className="relative z-20 space-y-4 text-center">
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      backgroundColor: ["#10b981", "#ffffff", "#10b981"]
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    className="h-2 w-2 rounded-full"
                  />
                ))}
              </div>
              
              <div className="h-40 overflow-hidden flex flex-col justify-end">
                {bootLogs.map((log, i) => (
                  <Mono key={i} className="block text-[10px] text-emerald-500/60 lowercase italic">
                    {`> ${log}`}
                  </Mono>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
