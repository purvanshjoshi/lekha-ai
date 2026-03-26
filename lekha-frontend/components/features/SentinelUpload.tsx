"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, Mono } from '../ui/Typography';
import SentinelCard from '../ui/SentinelCard';
import { FileUp, Database, ArrowRight } from 'lucide-react';

export default function SentinelUpload() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GSTR-2A Sentinel Node */}
          <SentinelCard delay={0.2} className="relative group overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <FileUp className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <Mono className="text-[9px] text-slate-500">Node ID: 0x2A_SENTINEL</Mono>
              </div>
              
              <div className="space-y-2">
                <Heading as="h3" className="text-3xl font-bold tracking-tight">GSTR-2A Portal</Heading>
                <Text className="text-slate-400">Secure ingestion stream for official GST telemetry data. Encrypted and indexed in real-time.</Text>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-4">
                  <span>Input Capacity</span>
                  <span>500MB / Index</span>
                </div>
                <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-white/40 blur-[2px]" 
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 text-white font-medium tracking-widest text-[11px] uppercase group/btn mt-8">
                Initialize Ingestion
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
              </button>
            </div>
          </SentinelCard>

          {/* Purchase Hub Sentinel Node */}
          <SentinelCard delay={0.4} className="relative group overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Database className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <Mono className="text-[9px] text-slate-500">Node ID: 0xHUB_SENTINEL</Mono>
              </div>
              
              <div className="space-y-2">
                <Heading as="h3" className="text-3xl font-bold tracking-tight">Purchase Hub</Heading>
                <Text className="text-slate-400">Local ledger synchronization. Built to support semantic drift across messy purchase registers instantly.</Text>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-4">
                  <span>Consensus Engine</span>
                  <span>99.9% Semantic Match</span>
                </div>
                <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-white/40 blur-[2px]" 
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 text-white font-medium tracking-widest text-[11px] uppercase group/btn mt-8">
                Sync Local Ledger
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
              </button>
            </div>
          </SentinelCard>
        </div>
      </div>
    </section>
  );
}
