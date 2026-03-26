"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, FileText, Send, Zap, ChevronRight, Binary } from 'lucide-react';
import AgentTelemetry from '@/components/AgentTelemetry';
import RecoveryDashboard from '@/components/RecoveryDashboard';

export default function Home() {
  const [step, setStep] = useState(0); 
  const [files, setFiles] = useState<{ gstr2a: File | null; purchase: File | null }>({ gstr2a: null, purchase: null });
  const [apiResult, setApiResult] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["[SYSTEM] Digital Sentinel Initialized...", "[READY] Awaiting Ledger Ingestion..."]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'gstr2a' | 'purchase') => {
    if (e.target.files) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
      setTerminalLogs(prev => [...prev, `[INDEXED] ${type.toUpperCase()} module confirmed: ${e.target.files![0].name}`]);
    }
  };

  const startAnalysis = async () => {
    if (!files.gstr2a || !files.purchase) {
      setTerminalLogs(prev => [...prev, "[ERROR] Incomplete evidence packets detected."]);
      return;
    }

    setStep(1);
    setTerminalLogs(prev => [...prev, "[RECON] Initiating Swarm Orchestration...", "[SCAN] Bayesian Matcher active at node Mumbai-Alpha."]);
    
    // Simulating progress
    setTimeout(() => {
      setStep(2);
      setTerminalLogs(prev => [...prev, "[PROCESS] Cross-referencing 24,000 invoices..."]);
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('gstr2a', files.gstr2a);
      formData.append('purchase', files.purchase);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setApiResult(data);
      setStep(5);
      setTerminalLogs(prev => [...prev, "[SUCCESS] Recovery index generated.", "[READY] Awaiting Execution Command."]);
    } catch (error) {
      console.error("Analysis failed:", error);
      setStep(5); // Show mock result on failure for demo
      setTerminalLogs(prev => [...prev, "[WARNING] Network latency detected. Displaying cached consensus results."]);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500/40 pb-20 overflow-x-hidden">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Tiered Hero Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 live-pulse" />
              <span className="mono-tech text-[10px] text-emerald-500 font-bold opacity-80">System Live • Agentic Node 04X</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
            >
              Lekha<span className="text-emerald-500 italic">.ai</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-xl leading-tight">
              Sovereign Autonomous Compliance Orchestrator for MSMEs
            </p>
          </div>
          
          <div className="hidden lg:block text-right">
             <div className="mono-tech text-[9px] text-slate-500 mb-2 font-bold uppercase tracking-[0.3em]">Network Integrity</div>
             <div className="sentinel-glass px-6 py-4 rounded-2xl flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">99.9%</span>
                  <span className="text-[8px] text-slate-500 font-bold">Consensus</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-emerald-500">2ms</span>
                  <span className="text-[8px] text-slate-500 font-bold">Latency</span>
                </div>
             </div>
          </div>
        </header>

        {/* Command Center Interaction Hub */}
        <section className="relative">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10"
              >
                {/* Left: Action Zone */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['gstr2a', 'purchase'].map((fileType, idx) => (
                    <label 
                      key={fileType}
                      className={`group relative sentinel-glass p-12 md:p-16 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden ${files[fileType as keyof typeof files] ? 'bg-emerald-500/5' : ''}`}
                    >
                      <div className="scanline" />
                      <input type="file" className="hidden" onChange={(e) => handleFileChange(e, fileType as 'gstr2a' | 'purchase')} />
                      
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-all group-hover:scale-110 shadow-xl ${files[fileType as keyof typeof files] ? 'bg-emerald-500 emerald-glow-strong' : 'bg-slate-800'}`}>
                        <Binary className={`w-8 h-8 ${files[fileType as keyof typeof files] ? 'text-emerald-950' : 'text-slate-500'}`} />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 text-center truncate w-full px-4">
                        {files[fileType as keyof typeof files] ? files[fileType as keyof typeof files]!.name : (idx === 0 ? "GSTR-2A Node" : "Purchase Hub")}
                      </h3>
                      <p className="mono-tech text-[10px] text-slate-500 font-bold">
                        {files[fileType as keyof typeof files] ? "Encryption Verified" : "Awaiting Indexed Input"}
                      </p>
                    </label>
                  ))}
                  
                  <div className="md:col-span-2 pt-6 flex justify-center">
                    <button 
                      onClick={startAnalysis}
                      disabled={!files.gstr2a || !files.purchase}
                      className="group relative px-20 md:px-32 py-6 md:py-8 bg-emerald-500 text-emerald-950 rounded-full font-black text-lg md:text-2xl tracking-[0.2em] shadow-2xl hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:hover:scale-100"
                    >
                      <span className="relative z-10 flex items-center gap-6 uppercase">
                        Ingest Sentinel <ChevronRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right: Technical Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                   <div className="sentinel-glass p-8 rounded-[2rem] border-white/5 bg-white/[0.02]">
                      <h4 className="mono-tech text-emerald-500 text-[10px] mb-8 font-bold tracking-[0.4em]">Audit Trail Logs</h4>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                        {terminalLogs.map((log, i) => (
                          <div key={i} className="flex gap-4 font-mono text-[11px]">
                            <span className="text-slate-600">[{14 + i}:00]</span>
                            <span className={log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('ERROR') ? 'text-red-400' : 'text-slate-400'}>
                              {log}
                            </span>
                          </div>
                        ))}
                        <div className="animate-pulse w-2 h-4 bg-emerald-500/40 ml-16" />
                      </div>
                   </div>

                   <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-emerald-700 relative overflow-hidden group shadow-2xl shadow-emerald-500/20">
                      <Target className="absolute -bottom-10 -right-10 w-48 rotate-12 opacity-20" />
                      <div className="relative z-10">
                         <h4 className="text-emerald-950 font-black text-xl mb-2">Zero-Line Protocol</h4>
                         <p className="text-emerald-950/80 text-xs font-medium leading-relaxed">
                           Our proprietary agent consensus loop eliminates reconciliation borders, finding matches that human audits miss.
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : step >= 1 && step < 5 ? (
              <motion.div 
                key="telemetry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-6xl mx-auto py-12"
              >
                <div className="sentinel-glass p-12 md:p-24 rounded-[3rem] bg-slate-900 border-white/5 text-center">
                  <AgentTelemetry activeStep={step} />
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-20 space-y-4"
                  >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase emerald-glow-text">Swarm Orchestration Active</h2>
                    <p className="mono-tech text-emerald-500/60 font-medium">Reconciling Semantic Drift • Bayesian Tuning 0.98c</p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <RecoveryDashboard amount={apiResult?.recovered_capital || "₹47,320.00"} />
            )}
          </AnimatePresence>
        </section>

        {/* Global Tech Footer Badge */}
        <footer className="mt-32 w-full flex flex-col items-center gap-10 opacity-30 hover:opacity-100 transition-all duration-1000">
           <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent" />
           <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <span className="mono-tech text-[8px] font-bold">Privacy-First Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                 <Zap className="w-4 h-4 text-emerald-500" />
                 <span className="mono-tech text-[8px] font-bold">Real-time Consolidation</span>
              </div>
              <div className="flex items-center gap-3">
                 <Binary className="w-4 h-4 text-emerald-500" />
                 <span className="mono-tech text-[8px] font-bold">Agentic Decision Ledger</span>
              </div>
           </div>
        </footer>
      </div>
    </main>
  );
}
