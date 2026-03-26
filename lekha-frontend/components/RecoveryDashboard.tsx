"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, Mono } from './ui/Typography';
import SentinelCard from './ui/SentinelCard';
import { TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

interface RecoveryDashboardProps {
  amount?: string;
}

export default function RecoveryDashboard({ amount = "₹47,230.00" }: RecoveryDashboardProps) {
  return (
    <div className="w-full space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Primary Metric: Recovered Capital */}
        <SentinelCard className="lg:col-span-2 border-emerald-500/40 bg-emerald-500/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <Mono className="text-emerald-500/80">Sovereign Recovery Index</Mono>
              </div>
              <Heading as="h2" className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                {amount}
              </Heading>
              <Text size="lg" className="text-emerald-500/60 font-medium italic">
                Verified capital ready for immediate consensus execution.
              </Text>
            </div>
            
            <div className="h-32 w-32 md:h-48 md:w-48 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent animate-pulse" />
               <ShieldCheck className="w-16 h-16 text-emerald-500 relative z-10" />
            </div>
          </div>
        </SentinelCard>

        {/* Secondary Metrics cluster */}
        <div className="space-y-8">
          <SentinelCard className="p-6 border-violet-500/20 bg-violet-500/5">
             <div className="space-y-2">
                <Mono className="text-violet-400">Match Confidence</Mono>
                <Heading as="h4" className="text-4xl font-black">99.8%</Heading>
                <div className="h-1 w-full bg-violet-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "99.8%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-violet-500" 
                  />
                </div>
             </div>
          </SentinelCard>

          <SentinelCard className="p-6 border-amber-500/20 bg-amber-500/5">
             <div className="space-y-2">
                <Mono className="text-amber-400">Execution Risks</Mono>
                <div className="flex items-center gap-3">
                   <Heading as="h4" className="text-4xl font-black">02</Heading>
                   <AlertCircle className="w-6 h-6 text-amber-500 animate-pulse" />
                </div>
                <Text size="xs" className="text-amber-500/60">Semantic anomalies detected in 0x2A stream.</Text>
             </div>
          </SentinelCard>
        </div>
      </div>

      {/* Action Ledger */}
      <div className="sentinel-glass p-8 rounded-[2rem] border-white/5">
        <div className="flex items-center justify-between mb-8">
          <Heading as="h3" weight="semibold" className="text-2xl">Compliance Execution Ledger</Heading>
          <button className="bg-emerald-500 text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
             Initiate Disbursement
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { vendor: "Global Tech Solutions", id: "0x451", amount: "₹12,400", status: "VERIFIED" },
            { vendor: "Alpha Logistics", id: "0x882", amount: "₹8,230", status: "VERIFIED" },
            { vendor: "Sentinel Prime", id: "0x991", amount: "₹26,600", status: "AWAITING" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Mono className="text-[9px] text-slate-500">{item.id}</Mono>
                 </div>
                 <div>
                    <Heading as="h5" weight="medium" className="text-sm">{item.vendor}</Heading>
                    <Mono className="text-[8px] opacity-40">Vendor Code: VC_{item.id}</Mono>
                 </div>
              </div>
              <div className="text-right">
                 <Heading as="h5" weight="bold" className="text-emerald-500">{item.amount}</Heading>
                 <Mono className={`text-[8px] ${item.status === 'VERIFIED' ? 'text-emerald-500' : 'text-amber-500'}`}>{item.status}</Mono>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
