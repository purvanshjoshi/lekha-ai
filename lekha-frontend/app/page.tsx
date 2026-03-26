"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentTelemetry from '@/components/AgentTelemetry';
import RecoveryDashboard from '@/components/RecoveryDashboard';

export default function Home() {
  const [step, setStep] = useState(0); // 0: Start, 1: Process, 2: Result

  const startAnalysis = () => {
    setStep(1);
    // Simulate agent progress
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= 5) {
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gradient-bg">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-7xl font-black mb-4 glow-text tracking-tighter">
          Lekha<span className="text-blue-500">.ai</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium opacity-80">
          Autonomous Financial Guardian for Indian MSMEs
        </p>
      </motion.div>

      {/* Main Command Center */}
      <div className="w-full max-w-5xl glass-card p-1 relative overflow-hidden">
        <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl p-12 rounded-[1.4rem]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div 
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="grid grid-cols-2 gap-8 w-full mb-12">
                  <div className="border border-white/5 bg-white/5 rounded-3xl p-14 flex flex-col items-center justify-center hover:border-blue-500/50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">📄</span>
                    </div>
                    <p className="text-gray-300 font-bold text-lg">GSTR-2A Data</p>
                    <p className="text-gray-500 text-sm mt-1">Upload Government Proof</p>
                  </div>
                  <div className="border border-white/5 bg-white/5 rounded-3xl p-14 flex flex-col items-center justify-center hover:border-blue-500/50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">📊</span>
                    </div>
                    <p className="text-gray-300 font-bold text-lg">Purchase Register</p>
                    <p className="text-gray-500 text-sm mt-1">Tally / Excel Export</p>
                  </div>
                </div>
                
                <button 
                  onClick={startAnalysis}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-16 py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  SCAN FOR LOST CAPITAL
                </button>
              </motion.div>
            ) : step >= 1 && step < 5 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <AgentTelemetry activeStep={step} />
                <h2 className="text-3xl font-bold text-white mb-2 mt-12 tracking-tight">Swarm Convergence in Progress...</h2>
                <p className="text-gray-500 font-medium">Lekha Agents are reconciling semantic mismatches across 427 invoices.</p>
              </motion.div>
            ) : (
              <RecoveryDashboard amount="₹47,320.00" />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-8 text-gray-600 text-[10px] uppercase font-bold tracking-[0.3em]">
        <span>REGIONAL LEGAL AUTONOMY</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span>PROBABILISTIC RECONCILIATION</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span>AUDIT-READY ARCHITECTURE</span>
      </div>
    </main>
  );
}
