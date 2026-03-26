import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lekha.ai | Cybernetic Sentinel",
  description: "Sovereign Autonomous Compliance Orchestrator for MSMEs. Precision Reconciliation for the ET AI Hackathon 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-[#020617] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
