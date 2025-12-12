export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white/40 text-sm">
          © 2026 Bruno Zamborlin
        </div>
        
        <div className="flex gap-6">
           {/* Social links could go here */}
           <span className="text-white/20 text-sm uppercase tracking-widest">Symphony of Senses</span>
        </div>
      </div>
    </footer>
  );
}
