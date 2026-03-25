"use client";

const agents = [
  { id: 0, name: "Semantic Parser", status: "Scanning" },
  { id: 1, name: "Bayesian Matcher", status: "Reconciling" },
  { id: 2, name: "Consensus Swarm", status: "Peer-Reviewing" },
  { id: 3, name: "Legal Counsel", status: "Drafting" }
];

export default function AgentTelemetry({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex justify-between items-center w-full gap-4 py-8">
      {agents.map((agent, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className={`w-3 h-3 rounded-full mb-3 shadow-lg transition-all duration-500 ${
            activeStep >= i + 1 ? 'bg-blue-500 shadow-blue-500/50' : 'bg-gray-800'
          } ${activeStep === i + 1 ? 'animate-pulse scale-150' : ''}`} />
          <span className={`text-[10px] uppercase tracking-tighter font-bold ${
            activeStep >= i + 1 ? 'text-blue-400' : 'text-gray-600'
          }`}>{agent.name}</span>
          <span className="text-[9px] text-gray-700 mt-1">{activeStep === i + 1 ? agent.status : ''}</span>
        </div>
      ))}
    </div>
  );
}
