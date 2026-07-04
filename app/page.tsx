import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AIChat from "@/components/AIChat";
import Dashboard from "@/components/Dashboard";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <AIChat />
      <Dashboard />
      <Pricing />
    </main>
  );
}