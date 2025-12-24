import { useEffect, useMemo, useRef, useState } from "react";
import { categories, projects, type Project } from "@/lib/data";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CinematicPlayer from "./CinematicPlayer";
import { useLocation, useSearch } from "wouter";

export default function Works() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const userClickedRef = useRef(false);
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const isUpdatingUrlRef = useRef(false);
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Handle URL-based project opening (single handler at Works level)
  useEffect(() => {
    if (isUpdatingUrlRef.current) {
      isUpdatingUrlRef.current = false;
      return;
    }

    const params = new URLSearchParams(searchString);
    const projectParam = params.get('project');

    if (projectParam) {
      const project = projects.find(p => p.id === projectParam);
      if (project && !dialogOpen) {
        userClickedRef.current = false;
        setSelectedProject(project);
        setDialogOpen(true);
      }
    } else if (dialogOpen) {
      setDialogOpen(false);
      setSelectedProject(null);
    }
  }, [searchString, dialogOpen]);

  // Handle dialog open/close with URL sync
  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    isUpdatingUrlRef.current = true;

    const params = new URLSearchParams(searchString);
    if (open && selectedProject) {
      params.set('project', selectedProject.id);
    } else {
      params.delete('project');
      setSelectedProject(null);
    }

    const newSearch = params.toString();
    const newUrl = newSearch ? `${location}?${newSearch}` : location.split('?')[0];
    setLocation(newUrl);
  };

  // Called when a WorkCard is clicked
  const handleProjectSelect = (project: Project) => {
    userClickedRef.current = true;
    isUpdatingUrlRef.current = true;

    // Update URL first
    const params = new URLSearchParams(searchString);
    params.set('project', project.id);
    const newSearch = params.toString();
    const newUrl = newSearch ? `${location}?${newSearch}` : location.split('?')[0];
    setLocation(newUrl);

    // Then open dialog
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Global scroll-based title zoom once the heading reaches the top of the viewport.
  const { scrollY } = useScroll();
  const titleTriggerScrollY = useMotionValue(0);
  const titleTriggerTopPx = useMotionValue(0);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      titleTriggerScrollY.set(window.scrollY + rect.top);
    };

    // Measure a few times to handle font/video/layout settling.
    measure();
    const raf1 = window.requestAnimationFrame(measure);
    const raf2 = window.requestAnimationFrame(measure);

    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [titleTriggerScrollY]);

  // Use navbar height as the "visual top" so the effect doesn't feel delayed behind the fixed menu.
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const measureNav = () => {
      const rect = nav.getBoundingClientRect();
      titleTriggerTopPx.set(rect.height);
    };

    measureNav();
    window.addEventListener("resize", measureNav);
    const ro = new ResizeObserver(measureNav);
    ro.observe(nav);

    return () => {
      window.removeEventListener("resize", measureNav);
      ro.disconnect();
    };
  }, [titleTriggerTopPx]);

  const titleScrollPx = useTransform(
    [scrollY, titleTriggerScrollY, titleTriggerTopPx],
    ([y, triggerY, topPx]) => Math.max(0, y - (triggerY - topPx))
  );

  const titleScaleRaw = useTransform(titleScrollPx, [0, 520], [1, 7], { clamp: true });
  const titleScale = useSpring(titleScaleRaw, { stiffness: 160, damping: 28, mass: 0.25 });
  const titleOpacity = useTransform(titleScrollPx, [0, 380], [1, 0], { clamp: true });
  const titleBlur = useTransform(titleScrollPx, [0, 380], ["blur(0px)", "blur(10px)"], { clamp: true });
  const titleEntryOpacityRaw = useMotionValue(0);
  const titleEntryOpacity = useSpring(titleEntryOpacityRaw, { stiffness: 160, damping: 28, mass: 0.35 });
  const titleCombinedOpacity = useTransform(
    [titleOpacity, titleEntryOpacity],
    ([scrollFade, entryFade]) => scrollFade * entryFade
  );

  // Parallax speeds for columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) => filter === "All" || project.category === filter
    );
  }, [filter]);

  // Split projects into 3 columns for desktop, 2 for tablet, 1 for mobile
  const columns = useMemo(() => {
    const cols: Project[][] = [[], [], []];
    filteredProjects.forEach((project, i) => {
      cols[i % 3].push(project);
    });
    return cols;
  }, [filteredProjects]);

  // Helper function to determine aspect ratio for specific projects
  const getAspectRatio = (project: Project, columnIndex: number, indexInColumn: number): string => {
    // Override aspect ratio for specific projects to make them smaller
    if (project.id === "airplane-instrument" || project.id === "playing-stove") {
      return "aspect-[16/9]";
    }

    // Default column-based logic
    if (columnIndex === 0) {
      return indexInColumn % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]";
    } else if (columnIndex === 1) {
      return indexInColumn % 2 !== 0 ? "aspect-square" : "aspect-[16/9]";
    } else {
      return indexInColumn % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]";
    }
  };

  return (
    <section id="works" ref={containerRef} className="py-32 px-4 md:px-6 container mx-auto relative z-10 min-h-screen">
      {/* Sticky title: stays at the very top so the "zoom/disappear" starts exactly when it hits the viewport top */}
      <div className="sticky top-0 z-30 pointer-events-none">
        <div className="flex justify-between items-end">
          <motion.h2 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => titleEntryOpacityRaw.set(1)}
            ref={titleRef}
            style={{
              scale: titleScale,
              opacity: titleCombinedOpacity,
              filter: titleBlur,
              transformOrigin: "left top",
              willChange: "transform, opacity, filter",
            }}
            className="text-6xl md:text-9xl font-display font-bold text-[#9AA3AD]/40 leading-none pointer-events-none mix-blend-difference"
          >
            SELECTED
            <span className="block">WORKS</span>
          </motion.h2>
        </div>
      </div>

      {/* Sticky filters: sit just below the fixed navbar, with a dark panel to avoid video/text overlap */}
      <div className="sticky top-20 md:top-24 z-30 pointer-events-none mt-6 md:mt-8 mb-24">
        <div className="flex flex-col md:flex-row justify-end items-end gap-8">
          <div className="pointer-events-auto">
            <div className="flex flex-wrap gap-2 md:gap-4 px-3 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
                    filter === cat
                      ? "border-white text-black bg-white"
                      : "border-white/10 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: single column showing all projects */}
      <div className="md:hidden flex flex-col gap-48">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i}
              aspect={project.id === "airplane-instrument" || project.id === "playing-stove" ? "aspect-[16/9]" : (i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]")}
              onSelect={handleProjectSelect}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop / tablet: three-column staggered layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-48 md:mt-0">
          <AnimatePresence mode="popLayout">
            {columns[0].map((project, i) => (
              <WorkCard key={project.id} project={project} index={i} aspect={getAspectRatio(project, 0, i)} onSelect={handleProjectSelect} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Column 2 - Offset Start */}
        <motion.div style={{ y: y2 }} className="hidden md:flex flex-col gap-48 -mt-24">
          <AnimatePresence mode="popLayout">
            {columns[1].map((project, i) => (
              <WorkCard key={project.id} project={project} index={i} aspect={getAspectRatio(project, 1, i)} onSelect={handleProjectSelect} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Column 3 - More Offset */}
        <motion.div style={{ y: y3 }} className="hidden lg:flex flex-col gap-48 mt-12">
          <AnimatePresence mode="popLayout">
            {columns[2].map((project, i) => (
              <WorkCard key={project.id} project={project} index={i} aspect={getAspectRatio(project, 2, i)} onSelect={handleProjectSelect} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Shared Dialog - Only ONE video player instance */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-7xl bg-black border-white/5 p-0 overflow-hidden w-[95vw] h-[90vh] md:h-[85vh] md:w-full shadow-2xl shadow-black/50">
          {selectedProject && (
            <div className="flex flex-col md:flex-row h-full min-h-0">
              <div className="w-full md:w-2/3 h-[40vh] md:h-full bg-black relative">
                <CinematicPlayer
                  videoUrl={selectedProject.videoUrl}
                  title={selectedProject.title}
                  isOpen={dialogOpen}
                  startMuted={!userClickedRef.current}
                />
              </div>

              <div className="w-full md:w-1/3 p-6 md:p-8 min-h-0 overflow-y-auto border-l border-white/5 bg-gradient-to-b from-black via-zinc-950 to-black">
                <DialogHeader>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-8"
                  >
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/50 uppercase tracking-wider mb-6">
                      <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">{selectedProject.location}</span>
                      <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">{selectedProject.category}</span>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight tracking-tight">{selectedProject.title}</DialogTitle>
                    {selectedProject.subtitle && (
                      <div className="text-xs text-white/50 uppercase tracking-[0.25em]">
                        {selectedProject.subtitle}
                      </div>
                    )}
                    <div className="w-12 h-[1px] bg-gradient-to-r from-white/50 to-transparent mt-4" />
                  </motion.div>
                </DialogHeader>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <DialogDescription className="text-white/60 text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                    {selectedProject.description}
                  </DialogDescription>
                </motion.div>
                {selectedProject.credits && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-8 pt-8 border-t border-white/5"
                  >
                    <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Credits</h4>
                    <p className="text-xs text-white/40 font-mono leading-relaxed">
                      {selectedProject.credits}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function WorkCard({ project, index, aspect, onSelect }: { project: Project; index: number; aspect: string; onSelect: (project: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const useDarkOverlayText = project.id === "plaid-diana";
  const darkOverlayTextClass = "text-black/60";
  const darkOverlaySubtextClass = "text-black/45";
  const darkOverlayBorderClass = "border-black/20";
  const darkOverlayLineClass = "bg-black/35";

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={ref}
        onClick={() => onSelect(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {}}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group cursor-none relative w-full ${aspect} bg-white/5 overflow-hidden rounded-sm`}
      >
        {/* Background Content */}
        <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
            style={{ transform: "translateZ(-20px)" }}
        >
            {project.thumbnailVideo ? (
                <video
                    ref={videoRef}
                    src={project.thumbnailVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover brightness-dim"
                />
            ) : project.thumbnailImage ? (
                <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover brightness-dim"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            )}
        </div>

        {/* Minimal hover frame */}
        <div className="absolute inset-0 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm" />

        {/* Content Floating in 3D */}
        <div
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start pointer-events-none"
            style={{ transform: "translateZ(30px)" }}
        >
            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded-full backdrop-blur-sm ${
                    useDarkOverlayText
                      ? `${darkOverlayTextClass} ${darkOverlayBorderClass}`
                      : "text-white/70 border-white/20"
                  }`}
                >
                  {project.category}
                </span>
            </div>

            <h3
              className={`text-xl md:text-2xl font-bold leading-none mb-2 transition-colors ${
                useDarkOverlayText ? `${darkOverlayTextClass} group-hover:${darkOverlayTextClass}` : "text-white group-hover:text-white"
              }`}
            >
                {project.title}
            </h3>

            {project.subtitle && (
              <p
                className={`text-[10px] md:text-xs uppercase tracking-widest mb-3 ${
                  useDarkOverlayText ? darkOverlaySubtextClass : "text-white/45"
                }`}
              >
                {project.subtitle}
              </p>
            )}

            <div
              className={`w-8 h-[1px] group-hover:w-full transition-all duration-500 ease-out ${
                useDarkOverlayText ? darkOverlayLineClass : "bg-white/50"
              }`}
            />
        </div>
      </motion.div>
    </motion.div>
  );
}
