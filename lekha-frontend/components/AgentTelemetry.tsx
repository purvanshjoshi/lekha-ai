"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const agents = [
  { id: 0, name: "Semantic Parser", status: "Scanning" },
  { id: 1, name: "Bayesian Matcher", status: "Reconciling" },
  { id: 2, name: "Consensus Swarm", status: "Reviewing" },
  { id: 3, name: "Legal Counsel", status: "Drafting" }
];

export default function AgentTelemetry({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-start w-full relative">
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-800 z-0" />
        
        {agents.map((agent, i) => {
          const isActive = activeStep === i + 1;
          const isComplete = activeStep > i + 1;
          
          return (
            <div key={i} className="flex flex-col items-center flex-1 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 mb-4 bg-slate-900 border-2 ${
                isComplete ? 'border-emerald-500 bg-emerald-500/10' : 
                isActive ? 'border-emerald-400 bg-emerald-500/20 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-slate-800'
              }`}>
                {isComplete ? (
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                   <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest text-center ${
                isActive || isComplete ? 'text-white' : 'text-slate-600'
              }`}>
                {agent.name}
              </span>
              {isActive && (
                <span className="text-[9px] text-emerald-400 mt-1 font-medium animate-pulse">
                  {agent.status}...
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
