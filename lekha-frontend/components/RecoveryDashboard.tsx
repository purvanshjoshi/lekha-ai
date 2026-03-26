"use client";

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, FileText, Send } from 'lucide-react';

export default function RecoveryDashboard({ amount }: { amount: string }) {
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
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                <div>
                  <p className="font-bold text-gray-200">Matrix Solutions Pct Ltd</p>
                  <p className="text-xs text-gray-500">Invoice: INV-4239 | Delta: ₹5,340</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold opacity-80 group-hover:opacity-100 flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Notice
                </button>
              </div>
            ))}
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
              <p className="text-red-500 font-bold text-sm">2 Critical Risks</p>
              <p className="text-[10px] text-gray-500 mt-1">Vendors with recurring GSTR-1 failures.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
