"use client";

import { motion } from 'framer-motion';
import { Target, FileText, Send, Zap, ShieldCheck } from 'lucide-react';

export default function RecoveryDashboard({ amount }: { amount: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto"
    >
      {/* Recovery Hub: 60% */}
      <div className="lg:col-span-8 space-y-8">
        {/* Main Metric Card */}
        <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-[2.5rem] relative overflow-hidden group">
          <Target className="absolute -top-12 -right-12 w-64 h-64 text-emerald-500/5 rotate-12 group-hover:rotate-15 transition-transform" />
          <div className="relative z-10">
            <span className="text-emerald-500 uppercase font-black tracking-widest text-xs mb-8 block">Total Recoverable Capital</span>
            <div className="flex items-baseline gap-4 mb-10">
              <h3 className="text-8xl font-black text-white tracking-tighter">
                {amount.replace('₹', '')}
              </h3>
              <span className="text-3xl font-bold text-slate-700 tracking-widest uppercase">INR</span>
            </div>
            
            <div className="flex items-center gap-3 text-emerald-500/80">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Consensus Audited
              </span>
            </div>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-4 text-xl font-bold text-white uppercase tracking-tight px-4">
            <FileText className="w-5 h-5 text-emerald-500" />
            Execution Ledger
          </h4>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-500 font-bold group-hover:text-emerald-500 transition-colors">
                    0{i}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white mb-1">Trade Matrix Global</h5>
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Recoverable: ₹5,420 • ID: LX-202{i}</p>
                  </div>
                </div>
                <button className="flex items-center gap-3 px-8 py-3.5 bg-emerald-500 text-emerald-950 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/10">
                  <Send className="w-4 h-4" /> Execute
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Sentinel: 40% */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] h-full flex flex-col justify-between">
          <div className="space-y-12">
            <div className="flex items-center justify-between mb-16">
              <span className="text-slate-500 uppercase font-black tracking-widest text-[10px]">Risk Sentinel</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="42%" className="stroke-slate-800 fill-none" strokeWidth="8" />
                <circle cx="50%" cy="50%" r="42%" className="stroke-emerald-500 fill-none" strokeWidth="8" strokeDasharray="251" strokeDashoffset="25" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">98%</span>
                <span className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">Audit Score</span>
              </div>
            </div>

            <div className="p-8 bg-slate-800/50 rounded-2xl relative overflow-hidden group border border-slate-700">
              <Zap className="absolute -bottom-8 -right-8 w-32 h-32 text-emerald-500/5" />
              <p className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-4">Swarm Insight</p>
              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                "Bayesian engine detected a semantic drift in GSTR-2A fields 4 and 7. Adjusting match thresholds to recover additional ₹1,240."
              </p>
            </div>
          </div>

          <button className="mt-12 w-full py-4 border border-slate-800 text-slate-500 rounded-full font-bold text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-all uppercase tracking-widest">
            Download Audit Export
          </button>
        </div>
      </div>
    </motion.div>
  );
}
