"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, Zap, Binary } from 'lucide-react';

const agents = [
  { id: 0, name: "Semantic Parser", status: "Scanning", icon: Binary },
  { id: 1, name: "Bayesian Matcher", status: "Reconciling", icon: Target },
  { id: 2, name: "Consensus Swarm", status: "Reviewing", icon: Zap },
  { id: 3, name: "Legal Counsel", status: "Drafting", icon: ShieldCheck }
];

export default function AgentTelemetry({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 md:py-20 relative px-6">
      {/* Cinematic Connecting Lines */}
      <div className="absolute top-[45%] left-24 right-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent z-0 hidden lg:block" />
      
      <div className="flex flex-wrap justify-center lg:justify-between items-start w-full relative z-10 gap-x-12 gap-y-16">
        {agents.map((agent, i) => {
          const isActive = activeStep === i + 1;
          const isComplete = activeStep > i + 1;
          const Icon = agent.icon;
          
          return (
            <div key={i} className="flex flex-col items-center min-w-[120px] md:min-w-[160px] group relative">
              <div className="relative mb-10 md:mb-12 flex items-center justify-center">
                
                {/* Status Halo */}
                <AnimatePresence>
                  {(isActive || isComplete) && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`absolute inset-0 w-20 h-20 md:w-24 md:h-24 -m-6 md:-m-8 border rounded-full transition-colors duration-1000 ${
                        isComplete ? 'border-emerald-500/20' : 'border-emerald-500/40 animate-pulse-ring'
                      }`} 
                    />
                  )}
                </AnimatePresence>
                
                {/* Core Sentinel Node */}
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-700 relative z-10 ${
                  isComplete ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 
                  isActive ? 'bg-emerald-500 emerald-glow-strong scale-110' : 'bg-slate-900 border-white/5'
                } border-2`}>
                   <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
                     isComplete ? 'text-emerald-500' : 
                     isActive ? 'text-emerald-950' : 'text-slate-700'
                   }`} />
                </div>

                {/* Vertical Progress Indicator (Stitch Principle: No-Line Vertical) */}
                {isActive && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 32 }}
                    className="absolute top-full w-[1px] bg-gradient-to-b from-emerald-500 to-transparent mt-4" 
                  />
                )}
              </div>
              
              <div className="text-center">
                <span className={`mono-tech text-[9px] md:text-[11px] font-black transition-colors duration-500 uppercase tracking-[0.3em] block mb-2 ${
                  isActive || isComplete ? 'text-white' : 'text-slate-600'
                }`}>
                  {agent.name}
                </span>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[8px] md:text-[10px] text-emerald-500/60 font-black tracking-widest uppercase italic"
                    >
                      {agent.status} Orchestration...
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
