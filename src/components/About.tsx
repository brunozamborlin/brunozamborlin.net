import { about } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="about" ref={containerRef} className="py-32 container mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <motion.div 
            style={{ y: titleY }}
            className="lg:col-span-5"
        >
          <div className="sticky top-32">
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-9xl font-display font-bold text-white mb-8 tracking-tighter"
            >
                ABOUT
            </motion.h2>
            <div className="w-24 h-2 bg-white mb-8" />
            <p className="text-xl text-white/50 font-mono uppercase tracking-widest max-w-sm">
                AI Researcher & Artist<br/>
                PhD in Human-Computer Interaction
            </p>
            
            <motion.div 
                className="mt-12 p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-sm text-white/40 uppercase tracking-widest mb-4">Contact</h3>
                <a 
                    href={`mailto:${about.contact}`} 
                    className="text-xl md:text-2xl text-white font-display hover:text-white/70 transition-colors break-all"
                >
                    {about.contact}
                </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 space-y-20 lg:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm text-white/50 font-mono uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-white/30" /> 01. Biography
            </h3>
            <p className="text-2xl md:text-4xl text-white font-light leading-tight">
              {about.bio}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-sm text-white/50 font-mono uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-white/30" /> 02. Art Practice
            </h3>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-line">
              {about.practice}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
