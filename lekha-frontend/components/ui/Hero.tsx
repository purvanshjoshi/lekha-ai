"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, Mono } from './Typography';
import WebGLBackground from './WebGLBackground';
import { Shield, ArrowRight, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Layer */}
      <WebGLBackground />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-10">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md shadow-sm">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
            </div>
            <Mono className="text-[10px] text-slate-300">Lekha Sentinel v2.0 • Operational</Mono>
          </div>
        </motion.div>

        {/* Hero Typography */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Heading as="h1" className="text-6xl md:text-8xl lg:text-[140px] font-bold tracking-tighter text-white leading-[0.9]">
              Lekha.ai
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Heading as="h2" weight="medium" className="text-lg md:text-2xl text-slate-400 font-normal tracking-[0.2em] uppercase max-w-2xl mx-auto">
              Sovereign Autonomous Compliance
            </Heading>
          </motion.div>
        </div>

        {/* Narrative Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <Text size="lg" className="text-slate-500 leading-relaxed font-light text-balance pt-4">
            A precision-engineered orchestration engine for the digital frontier. Reconcile complex ledgers with sub-pixel perfection, transforming financial ambiguity into sovereign clarity.
          </Text>
        </motion.div>

        {/* Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <button className="group relative flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-[#050505] transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
            <Shield className="w-4 h-4" />
            <span>Deploy Sentinel</span>
            <div className="absolute inset-0 rounded-full bg-white/20 premium-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-medium text-white transition-all hover:bg-white/10 backdrop-blur-md w-full sm:w-auto">
            <span className="text-sm">View Telemetry</span>
            <Activity className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>

      {/* Atmospheric bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#000000] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
