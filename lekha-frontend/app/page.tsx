"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1: Process, 2: Result

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gradient-bg">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold mb-4 glow-text tracking-tighter">
          Lekha<span className="text-blue-500">.ai</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          The Autonomous Financial Guardian for Indian MSMEs. <br/>
          Restore your "Economic Dignity" by reclaiming lost capital.
        </p>
      </motion.div>

      {/* Main Command Center */}
      <div className="w-full max-w-4xl glass-card p-12 relative overflow-hidden">
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
                <div className="border-2 border-dashed border-gray-700 rounded-3xl p-12 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer group">
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📄</span>
                  <p className="text-gray-400 font-medium">GSTR-2A PDF</p>
                  <p className="text-gray-600 text-sm">Download from GSTN</p>
                </div>
                <div className="border-2 border-dashed border-gray-700 rounded-3xl p-12 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer group">
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</span>
                  <p className="text-gray-400 font-medium">Purchase Register</p>
                  <p className="text-gray-600 text-sm">Tally/Excel Export</p>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(1)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/40 transition-all hover:scale-105"
              >
                Scan for Lost Money
              </button>
            </motion.div>
          ) : step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="flex justify-center gap-12 mb-12">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 agent-pulse mb-4 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Agent {i}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-light text-gray-300 mb-2">Analyzing Swarm Consensus...</h2>
              <p className="text-gray-500">Performing Probabilistic Matching on 427 Invoices</p>
              
              <button onClick={() => setStep(2)} className="mt-8 text-blue-500 underline">Skip (Demo)</button>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-3 gap-8"
            >
              <div className="col-span-2 space-y-6">
                <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-3xl">
                  <p className="text-green-500 text-sm uppercase font-bold tracking-widest mb-1">Recoverable Capital Found</p>
                  <h3 className="text-5xl font-bold">₹47,320.00</h3>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-3xl">
                  <h4 className="font-bold mb-4">Urgent Actions Required</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-2xl">
                      <span>Refiling notice for vendor 'Matrix Tech'</span>
                      <button className="text-blue-500 font-bold">GENERATE</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-3xl">
                <h4 className="font-bold mb-4">Risk Sentinel</h4>
                <div className="flex items-center gap-4 text-red-400">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span>2 High Risk Vendors</span>
                </div>
                <div className="mt-8 space-y-4 text-sm text-gray-400">
                  <p>Audit Readiness Score: <span className="text-white font-bold">87%</span></p>
                  <p>Pro-active Injections: <span className="text-white font-bold">₹12k</span></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-12 text-gray-600 text-sm uppercase tracking-[0.2em]">
        Secured by Agentic Logic &bull; India First Compliance
      </p>
    </main>
  );
}
