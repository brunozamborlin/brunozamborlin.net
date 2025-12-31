import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Selected Works", href: "#works" },
    { name: "Technology", href: "#technology" },
    { name: "About", href: "#about" },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
            className="text-lg font-display font-bold tracking-widest text-white cursor-pointer hover:opacity-70 transition-opacity mix-blend-difference z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          BZ
        </div>

        {/* Desktop Menu - Floating Island Style */}
        <div className={cn(
            "hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-500 backdrop-blur-md border border-white/5",
            scrolled ? "bg-black/80" : "bg-transparent border-transparent"
        )}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-xs font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50 mix-blend-difference"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8"
        >
          {navLinks.map((link, i) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => scrollToSection(link.href)}
              className="text-4xl font-display font-bold text-white hover:text-white/50 transition-colors uppercase tracking-tighter"
            >
              {link.name}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
