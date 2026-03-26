"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, Text, Mono } from '../ui/Typography';
import { ShieldCheck, Target, Zap, Binary, Cpu } from 'lucide-react';

const agents = [
  { id: 0, name: "Data Parser", icon: Binary, position: { x: -80, y: -60 } },
  { id: 1, name: "Semantic Match", icon: Target, position: { x: 80, y: -60 } },
  { id: 2, name: "Consensus Engine", icon: Zap, position: { x: 80, y: 60 } },
  { id: 3, name: "Verification", icon: ShieldCheck, position: { x: -80, y: 60 } }
];

export default function ConsensusSwarm({ activeStep }: { activeStep: number }) {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#000000]">
      <div className="max-w-5xl mx-auto text-center space-y-24">
        
        <div className="space-y-4">
          <Heading as="h2" className="text-4xl md:text-5xl lg:text-7xl">Reconciliation Engine</Heading>
          <Text className="max-w-xl mx-auto text-slate-400">Our distributed agent network collaborates across complex datasets to establish absolute ground truth.</Text>
        </div>

        {/* The Swarm Hologram */}
        <div className="relative h-[400px] flex items-center justify-center">
          
          {/* Central Core */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: 360 
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 120, repeat: Infinity, ease: "linear" }
            }}
            className="absolute z-20 h-32 w-32 rounded-[2rem] bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_60px_rgba(255,255,255,0.05)]"
          >
            <Cpu className="w-10 h-10 text-white" strokeWidth={1} />
            <div className="absolute inset-0 rounded-[2rem] premium-shimmer" />
          </motion.div>

          {/* Orbiting Agents */}
          <div className="relative w-full h-full flex items-center justify-center">
             {agents.map((agent, i) => {
               const isActive = activeStep === i + 1;
               const isComplete = activeStep > i + 1;
               const Icon = agent.icon;
               
               return (
                 <motion.div
                   key={agent.id}
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ 
                     opacity: 1, 
                     scale: 1,
                     x: agent.position.x * 1.5,
                     y: agent.position.y * 1.5
                   }}
                   transition={{ duration: 1, delay: i * 0.2 }}
                   className="absolute z-30"
                 >
                   <div className="relative group flex flex-col items-center">
                     {/* Agent Node */}
                     <div className={`
                       h-14 w-14 rounded-full flex items-center justify-center border transition-all duration-700
                       ${isActive ? 'bg-white border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-110 text-black' : 
                         isComplete ? 'bg-white/10 border-white/30 text-white' : 'bg-[#050505] border-white/10 opacity-40 text-slate-500'}
                     `}>
                       <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                     </div>

                     {/* Label */}
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0.5 }}
                        className="absolute top-full mt-4 whitespace-nowrap"
                     >
                       <Mono className={`text-[9px] font-semibold tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>{agent.name}</Mono>
                     </motion.div>

                     {/* Particle Trail Connectors */}
                     {isActive && (
                       <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none z-[-1]">
                         <motion.path
                           d={`M 0 0 L ${-agent.position.x * 1.5} ${-agent.position.y * 1.5}`}
                           stroke="#ffffff"
                           strokeWidth="1"
                           strokeDasharray="4 4"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           className="opacity-20"
                         />
                       </svg>
                     )}
                   </div>
                 </motion.div>
               );
             })}
          </div>

          {/* Ambient Rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="h-[280px] w-[280px] rounded-full border border-white animate-[spin_40s_linear_infinite]" />
            <div className="absolute h-[380px] w-[380px] rounded-full border border-white animate-[spin_60s_linear_infinite_reverse] border-dashed" />
          </div>
        </div>
      </div>
    </section>
  );
}
