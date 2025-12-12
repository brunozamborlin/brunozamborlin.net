import { technology } from "@/lib/data";
import ReactPlayer from "react-player";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Technology() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="technology" ref={ref} className="py-32 bg-black relative overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y, opacity }}>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-12 tracking-tighter"
            >
              TECH<br/>NOLOGY
            </motion.h2>
            
            <div className="space-y-12">
              {technology.text.map((paragraph, idx) => (
                <motion.p 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white/70 font-light leading-relaxed border-l-2 border-white/10 pl-8 hover:border-white/50 transition-colors duration-500"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-2xl -z-10 animate-pulse" />
            <div className="relative aspect-video w-full border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl">
              <ReactPlayer
                url={technology.videoUrl}
                width="100%"
                height="100%"
                controls
                light={true}
                playIcon={
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform duration-300 group cursor-none">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                    </div>
                }
              />
            </div>
            
            {/* Decorative tech lines */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-r border-b border-white/20 rounded-br-3xl opacity-50" />
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l border-t border-white/20 rounded-tl-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
