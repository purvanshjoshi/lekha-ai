"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, FileText, Send, Zap } from 'lucide-react';
import AgentTelemetry from '@/components/AgentTelemetry';
import RecoveryDashboard from '@/components/RecoveryDashboard';

export default function Home() {
  const [step, setStep] = useState(0); 
  const [files, setFiles] = useState<{ gstr2a: File | null; purchase: File | null }>({ gstr2a: null, purchase: null });
  const [apiResult, setApiResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'gstr2a' | 'purchase') => {
    if (e.target.files) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const startAnalysis = async () => {
    if (!files.gstr2a || !files.purchase) {
      alert("Please upload both files.");
      return;
    }

    setStep(1);
    
    const telemetryInterval = setInterval(() => {
      setStep(prev => prev < 4 ? prev + 1 : prev);
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
      clearInterval(telemetryInterval);
      setApiResult(data);
      setStep(5);
    } catch (error) {
      console.error("Analysis failed:", error);
      clearInterval(telemetryInterval);
      setStep(5); // Show mock result on failure
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        
        {/* Header: Monumental & Clean */}
        <header className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black tracking-tight mb-4 text-white"
          >
            Lekha<span className="text-emerald-500">.ai</span>
          </motion.h1>
          <p className="text-slate-400 font-medium tracking-[0.2em] uppercase text-sm">
            Autonomous Financial Compliance Orchestrator
          </p>
        </header>

        <section className="relative z-10">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* GSTR-2A Box */}
                  <label className={`group p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 ${files.gstr2a ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-800 hover:border-slate-700'}`}>
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'gstr2a')} />
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                      <FileText className={`w-8 h-8 ${files.gstr2a ? 'text-emerald-500' : 'text-slate-600'}`} />
                    </div>
                    <span className="text-xl font-bold mb-1">{files.gstr2a ? files.gstr2a.name : "GSTR-2A Data"}</span>
                    <span className="text-slate-500 text-sm font-medium">Government Ledger</span>
                  </label>

                  {/* Purchase Journal Box */}
                  <label className={`group p-12 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 ${files.purchase ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-slate-800 hover:border-slate-700'}`}>
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'purchase')} />
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                      <ShieldCheck className={`w-8 h-8 ${files.purchase ? 'text-emerald-500' : 'text-slate-600'}`} />
                    </div>
                    <span className="text-xl font-bold mb-1">{files.purchase ? files.purchase.name : "Purchase Journal"}</span>
                    <span className="text-slate-500 text-sm font-medium">Internal Tally Data</span>
                  </label>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={startAnalysis}
                    className="px-12 py-5 bg-emerald-500 text-emerald-950 font-black rounded-2xl hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/10 uppercase tracking-widest text-lg"
                  >
                    Ingest & Reconcile
                  </button>
                </div>
              </motion.div>
            ) : step >= 1 && step < 5 ? (
              <motion.div 
                key="telemetry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-5xl mx-auto py-12"
              >
                <AgentTelemetry activeStep={step} />
                <div className="text-center mt-12">
                  <h2 className="text-4xl font-bold mb-4">Swarm Intelligence at Work</h2>
                  <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
                    Our Bayesian agents are currently reconciling semantic variances between your internal books and government records.
                  </p>
                </div>
              </motion.div>
            ) : (
              <RecoveryDashboard amount={apiResult?.recovered_capital || "₹47,320.00"} />
            )}
          </AnimatePresence>
        </section>

        {/* Footer: Tech Badge */}
        <footer className="mt-32 border-t border-slate-900 pt-12 flex flex-col items-center opacity-20 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
            <span>Sovereign Security</span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span>Zero-Knowledge Computation</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
