"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mono } from './Typography';

interface Log {
  id: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
}

export default function AuditTerminal({ logs }: { logs: Log[] }) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-[#000000]/80 p-5 shadow-2xl backdrop-blur-xl flex flex-col">
      {/* Terminal Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800" />
          </div>
          <Mono className="text-[10px] text-slate-400">Daemon // Terminal</Mono>
        </div>
        <Mono className="text-[9px] text-slate-500">v2.0-STABLE</Mono>
      </div>

      {/* Log Feed */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 pb-8"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 font-mono text-[11px] leading-relaxed"
            >
              <span className="text-slate-600 whitespace-nowrap">[{log.timestamp}]</span>
              <span className={
                log.type === 'SUCCESS' ? 'text-white font-medium w-16' :
                log.type === 'ERROR' ? 'text-red-400 font-medium w-16' :
                log.type === 'WARNING' ? 'text-amber-400 font-medium w-16' : 'text-slate-500 w-16'
              }>
                {log.type}
              </span>
              <span className="text-slate-300 break-words">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent pointer-events-none" />
    </div>
  );
}
