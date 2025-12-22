import { technology } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import TextReveal from "./TextReveal";
import CinematicPlayer from "./CinematicPlayer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Technology() {
  const ref = useRef(null);
  const textContainerRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Separate scroll tracking for text reveal - ensures sequential animation
  // Animation ends when container's end is at 60% from top (more forgiving for bottom-of-page sections)
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textContainerRef,
    offset: ["start 0.9", "end 0.6"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const paragraphCount = technology.text.length;

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
            
            <div ref={textContainerRef} className="space-y-12">
              {technology.text.map((paragraph, idx) => {
                const rangeStart = idx / paragraphCount;
                const rangeEnd = (idx + 1) / paragraphCount;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                    className="border-l-2 border-white/10 pl-8 hover:border-white/50 transition-colors duration-500"
                  >
                    <TextReveal
                      className="text-xl md:text-2xl text-white font-light leading-relaxed"
                      scrollYProgress={textScrollProgress}
                      range={[rangeStart, rangeEnd]}
                    >
                      {paragraph}
                    </TextReveal>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="group cursor-none relative w-full aspect-video bg-white/5 overflow-hidden rounded-sm">
                  <video
                    src={technology.thumbnailVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Minimal hover frame */}
                  <div className="absolute inset-0 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm" />
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-7xl bg-black border-white/5 p-0 overflow-hidden w-[95vw] h-[90vh] md:h-[85vh] md:w-full shadow-2xl shadow-black/50">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-2/3 h-[40vh] md:h-full bg-black relative">
                    <CinematicPlayer
                      videoUrl={technology.videoUrl}
                      title="Technology"
                      isOpen={dialogOpen}
                    />
                  </div>

                  <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto border-l border-white/5 bg-gradient-to-b from-black via-zinc-950 to-black">
                    <DialogHeader>
                      <div className="mb-8">
                        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/50 uppercase tracking-wider mb-6">
                          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">Technology</span>
                        </div>
                        <DialogTitle className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight tracking-tight">
                          Technology
                        </DialogTitle>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-white/50 to-transparent mt-4" />
                      </div>
                    </DialogHeader>

                    <div className="space-y-6 text-white/60 text-sm md:text-base leading-relaxed font-light">
                      {technology.text.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
