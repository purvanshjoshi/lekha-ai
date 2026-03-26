"use client";

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, FileText, Send, Download } from 'lucide-react';

interface ActionItem {
  company: string;
  invoice: string;
  delta: string;
}

export default function RecoveryDashboard({ amount, actions }: { amount: string, actions: ActionItem[] }) {
  const handleExport = () => {
    window.location.href = 'http://localhost:8000/export';
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Left Panel: Primary Metric */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Recoverable Capital Found</p>
            <h3 className="text-6xl font-black tracking-tighter text-white">{amount}</h3>
          </div>
          <div className="bg-blue-500/20 p-4 rounded-full">
            <CheckCircle className="text-blue-500 w-12 h-12" />
          </div>
        </div>

        {/* Action List */}
        <div className="bg-gray-900/40 border border-white/5 p-8 rounded-[2rem]">
          <h4 className="flex items-center gap-2 font-bold mb-6 text-gray-300">
            <FileText className="w-4 h-4 text-blue-500" />
            Priority Legal Drafts
          </h4>
          <div className="space-y-4">
            {actions && actions.length > 0 ? actions.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                <div>
                  <p className="font-bold text-gray-200">{act.company}</p>
                  <p className="text-xs text-gray-500">Invoice: {act.invoice} | Delta: {act.delta}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold opacity-80 group-hover:opacity-100 flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Notice
                </button>
              </div>
            )) : (
              <p className="text-gray-500 text-sm italic">No actionable discrepancies found by Swarm.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Risk Sentinel */}
      <div className="bg-gray-900/40 border border-white/5 p-8 rounded-[2rem] h-full flex flex-col justify-between">
        <div>
          <h4 className="flex items-center gap-2 font-bold mb-8 text-gray-300">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Risk Sentinel
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Compliance Health</p>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[87%]" />
              </div>
              <p className="text-right text-[10px] text-gray-400">87% Auditor-Ready</p>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-500 font-bold text-sm">{actions ? actions.length : 0} Critical Risks</p>
              <p className="text-[10px] text-gray-500 mt-1">Vendors flagged for semantic discrepancies.</p>
            </div>
            
            <button 
              onClick={handleExport}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-sm border border-gray-700"
            >
              <Download className="w-4 h-4" />
              Export Audit Evidence (.zip)
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
