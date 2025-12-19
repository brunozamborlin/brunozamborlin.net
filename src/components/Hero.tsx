import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroVideo from "@assets/minigifs/hero-loop.mp4";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Video Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
        
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 sepia-[0.15] hue-rotate-[220deg] saturate-100 contrast-110 brightness-75"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-cyan-900/30 mix-blend-overlay" />
      </motion.div>

      {/* Floating Particles/Elements (Simulated with simple divs for now, could be canvas) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" 
        />
        <motion.div 
            animate={{ y: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-30 text-center px-4 max-w-7xl mx-auto flex flex-col items-center justify-center h-full"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-[0.95] tracking-tight mix-blend-screen max-w-5xl"
        >
          MATERIALS AS SOUND.
          <br />
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-b from-white/70 to-white/20 transition-all duration-500"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}
          >
            PLACES AS INSTRUMENTS
          </span>
        </motion.h1>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
            <ChevronDown className="text-white/30 animate-bounce w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
