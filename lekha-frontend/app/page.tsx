"use client";

import React, { useState, useEffect } from "react";
import PageTransition from "@/components/shared/PageTransition";
import Hero from "@/components/ui/Hero";
import SentinelUpload from "@/components/features/SentinelUpload";
import ConsensusSwarm from "@/components/features/ConsensusSwarm";
import AuditTerminal from "@/components/ui/AuditTerminal";
import { Mono } from "@/components/ui/Typography";
import { AudioProvider, useAudio } from "@/components/shared/AudioProvider";
import SentinelCursor from "@/components/shared/SentinelCursor";
import StoryNarrative from "@/components/features/StoryNarrative";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

function DashboardContent() {
  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState<{ id: string; timestamp: string; type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'; message: string }[]>([
    { id: "1", timestamp: "14:00", type: "INFO", message: "System initialization sequence complete." },
    { id: "2", timestamp: "14:05", type: "SUCCESS", message: "Global state coherence verified." },
  ]);
  const { play } = useAudio();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen relative bg-[#000000] text-slate-200">
      <SentinelCursor />
      
      {/* Navigation / Header Branding */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-[#000000] via-[#000000]/40 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group" onClick={() => play('click')}>
          <div className="h-4 w-4 bg-white rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform" />
          <Mono className="text-[11px] text-white">LEKHA // CLOUD</Mono>
        </div>
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <Mono className="text-[10px] text-slate-400 font-medium">SYSTEM NOMINAL</Mono>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen">
        <Hero />
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <Mono className="text-[9px] opacity-40">EXPLORE ARCHITECTURE</Mono>
            <ChevronDown className="w-4 h-4 text-slate-400 animate-bounce mt-2" />
        </motion.div>
      </div>

      {/* The Story / Narrative Overhaul */}
      <StoryNarrative />

      {/* Ingestion Cluster */}
      <SentinelUpload />

      {/* Intelligence Swarm */}
      <ConsensusSwarm activeStep={activeStep} />

      {/* Fixed Persistent Telemetry Bar (Bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 pointer-events-auto">
          {/* Real-time Audit Trail */}
          <div className="w-full md:w-1/3">
            <AuditTerminal logs={logs} />
          </div>

          {/* Sovereign Status */}
          <div className="hidden md:block text-right space-y-3">
            <Mono className="text-[9px] text-slate-500 block">System Throughput</Mono>
            <div className="flex items-center gap-3 justify-end">
              <div className="h-[2px] w-32 bg-white/10 overflow-hidden">
                <div className="h-full w-[85%] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
              <span className="font-mono text-[10px] text-white">1,240 REQ/S</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Ambient Flairs (Subtle) */}
      <div className="fixed top-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-white/5 blur-[120px] pointer-events-none" />
    </main>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <PageTransition>
        <DashboardContent />
      </PageTransition>
    </AudioProvider>
  );
}
