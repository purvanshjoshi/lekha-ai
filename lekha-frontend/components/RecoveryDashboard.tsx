"use client";

import { motion } from 'framer-motion';
import { Target, FileText, Send, Zap, ShieldCheck, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

export default function RecoveryDashboard({ amount }: { amount: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1400px] mx-auto pb-32"
    >
      {/* Recovery Central Command: 65% */}
      <div className="lg:col-span-8 space-y-8">
        {/* Cinematic Hero Metric */}
        <div className="sentinel-glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden group border-white/5 bg-slate-900/60">
          <div className="scanline opacity-10" />
          <Target className="absolute -top-16 -right-16 w-80 h-80 text-emerald-500/[0.03] rotate-12 group-hover:rotate-15 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span className="mono-tech text-emerald-500 font-bold tracking-[0.4em] text-[10px] bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                Recovery Liquidity Index
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-6 mb-12">
              <h3 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter emerald-glow-text text-white">
                {amount.replace('₹', '')}
              </h3>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-700 tracking-[0.2em] mb-1">INR</span>
                <span className="text-[10px] mono-tech text-emerald-500/60 font-medium">Unlocked Growth Capital</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/5">
               <div className="space-y-1">
                 <p className="mono-tech text-[9px] text-slate-500 font-bold">Consensus nodes</p>
                 <p className="text-xl font-bold text-white">128/128 Active</p>
               </div>
               <div className="space-y-1">
                 <p className="mono-tech text-[9px] text-slate-500 font-bold">Semantic precision</p>
                 <p className="text-xl font-bold text-emerald-500">99.8% Perfect</p>
               </div>
               <div className="space-y-1">
                 <p className="mono-tech text-[9px] text-slate-500 font-bold">Bailment priority</p>
                 <p className="text-xl font-bold text-white">Ultra High</p>
               </div>
            </div>
          </div>
        </div>

        {/* Action Ledger */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-6">
            <h4 className="flex items-center gap-4 text-2xl font-black text-white uppercase tracking-tighter">
              <Binary className="w-6 h-6 text-emerald-500" />
              Sovereign Execution Ledger
            </h4>
            <span className="text-[10px] mono-tech text-slate-500 font-bold">Updated real-time</span>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-10 sentinel-glass border-white/5 bg-slate-900/40 rounded-[2rem] hover:bg-slate-900 transition-colors group"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-slate-400 font-black text-xl group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all">
                    0{i}
                  </div>
                  <div>
                    <h5 className="text-2xl font-black text-white mb-2 leading-none">Trade Matrix Global Ltd.</h5>
                    <div className="flex items-center gap-4">
                      <p className="mono-tech text-[9px] text-slate-500 font-bold">ID: RECO-99{i}X</p>
                      <div className="w-1 h-1 rounded-full bg-slate-800" />
                      <p className="mono-tech text-[9px] text-emerald-500 font-black">₹5,420 Potential</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 md:mt-0 flex items-center gap-6">
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-[9px] mono-tech text-slate-500 font-bold">Match Confidence</span>
                    <span className="text-sm font-black text-white">99.2%</span>
                  </div>
                  <button className="flex items-center gap-4 px-10 py-5 bg-emerald-500 text-emerald-950 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20">
                    <Send className="w-4 h-4" /> Execute Recovery
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentinel Sidebar: 35% */}
      <div className="lg:col-span-4 space-y-8">
        <div className="sentinel-glass p-10 md:p-12 rounded-[3.5rem] h-full flex flex-col justify-between bg-slate-950 border-white/5 shadow-inner">
          <div className="space-y-16">
            <div className="flex items-center justify-between">
              <span className="mono-tech text-slate-400 font-bold tracking-[0.5em] text-[9px]">Sentinel Health</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500/40" />
            </div>

            {/* Audit Score Visualizer */}
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-white/[0.02]" />
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[2px] border-dashed border-emerald-500/20 m-2" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-7xl font-black text-white tracking-tighter"
                >
                  98<span className="text-emerald-500 text-3xl">%</span>
                </motion.span>
                <span className="mono-tech text-[9px] text-slate-500 font-bold tracking-widest mt-2 uppercase">Integrity Score</span>
              </div>
            </div>

            {/* Live Insights Terminal */}
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                <TrendingUp className="absolute -bottom-6 -right-6 w-24 h-24 text-emerald-500/[0.03]" />
                <p className="mono-tech text-emerald-500 font-black text-[9px] mb-4 tracking-[0.3em]">Operational Insight</p>
                <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                  "The Bayesian engine recalibrated match thresholds for Node-04. Found ₹1,240 additional ITC by ignoring whitespace variances in GSTIN '27AA...'"
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 relative overflow-hidden">
                <AlertCircle className="absolute -bottom-6 -right-6 w-24 h-24 text-amber-500/5" />
                <p className="mono-tech text-amber-500 font-black text-[9px] mb-4 tracking-[0.3em]">Compliance Alert</p>
                <p className="text-sm text-amber-500/60 leading-relaxed font-medium">
                  3 vendors detected with suspended GSTINs. Deferred recovery notices until verification.
                </p>
              </div>
            </div>
          </div>

          <button className="mt-16 w-full py-6 border border-white/10 text-slate-500 rounded-full font-black text-[10px] hover:border-emerald-500/40 hover:text-emerald-400 transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-4">
            Download Audit Consensus <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
