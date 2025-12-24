import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Technology from "@/components/Technology";
import About from "@/components/About";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
        <Navbar />
        <Hero onVideoReady={() => setIsLoading(false)} />
        <Works />
        <Technology />
        <About />
        <Footer />
      </main>
    </>
  );
}
