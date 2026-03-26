"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Heading, Text, Mono } from '../ui/Typography';
import { useAudio } from '../shared/AudioProvider';
import { Bug, Share2, ShieldCheck } from 'lucide-react';

function StorySegment({ 
  icon: Icon, 
  title, 
  description, 
  tag,
}: { 
  icon: any; 
  title: string; 
  description: string; 
  tag: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });
  const { play } = useAudio();

  React.useEffect(() => {
    if (isInView) {
      play('ping');
    }
  }, [isInView, play]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, amount: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12"
    >
      <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.02)] premium-shimmer overflow-hidden">
        <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.5} />
      </div>
      
      <div className="space-y-6 max-w-2xl px-4">
        <Mono className="text-[10px] text-slate-500 tracking-[0.3em] font-semibold">{tag}</Mono>
        <Heading as="h2" className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">{title}</Heading>
        <Text size="lg" className="text-slate-400 font-light leading-relaxed text-balance pt-2">
          {description}
        </Text>
      </div>

      {/* Connection Line */}
      <div className="h-32 w-[1px] bg-gradient-to-b from-white/20 to-transparent mt-12" />
    </motion.div>
  );
}

export default function StoryNarrative() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={targetRef} className="relative z-10 bg-[#000000]">
      <motion.div style={{ opacity }}>
        <StorySegment 
          tag="01 // OBSERVE"
          icon={Bug}
          title="Detect Anomalies."
          description="In the noise of modern commerce, enterprises lose critical capital to semantic drift, missed input credits, and disjointed reconciliation. The system observes the chaos silently."
        />

        <StorySegment 
          tag="02 // ORCHESTRATE"
          icon={Share2}
          title="Achieve Consensus."
          description="A distributed network of intelligent agents analyzes telemetry in real-time. Cross-referencing data points instantly, finding absolute truth where traditional systems fail."
        />

        <StorySegment 
          tag="03 // RESOLVE"
          icon={ShieldCheck}
          title="Sovereign Clarity."
          description="Zero manual intervention. Complete algorithmic certainty. We transform reconciliation from a continuous liability into an instantly verified, sovereign asset."
        />
      </motion.div>
    </section>
  );
}
