import { useState, useEffect } from "react";
import { PillBase } from "./components/ui/3d-adaptive-navigation-bar";
import { CinematicHero } from "./components/ui/cinematic-landing-hero";
import TeamPage from "./components/ui/team";
import VisionPage from "./components/ui/vision";
import { HoverFooter } from "./components/ui/hover-footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Global Nirmaan Pre-incubation Badge */}
      <div 
        className="global-nirmaan-badge fixed top-6 left-6 z-50 pointer-events-auto flex items-center gap-2 p-1.5 md:px-3.5 md:py-1.5 rounded-full border border-white/10"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.4)',
          transform: activeSection !== "home" ? "translate(0px, 0px) scale(1)" : undefined,
        }}
      >
        <img src="/image/Nirmaan.png" alt="Nirmaan IIT Madras Logo" className="w-5 h-5 object-contain" />
        <span className="hidden md:inline text-[10px] md:text-xs font-semibold tracking-wider uppercase text-white/90">
          Currently Pre-Incubated at Nirmaan IITM
        </span>
      </div>

      {/* Global Glassy Navbar Overlay */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <PillBase activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Keep CinematicHero mounted and hide it to prevent React unmounting errors with GSAP ScrollTrigger pinning */}
      <div style={{ display: activeSection === "home" ? "block" : "none" }}>
        <CinematicHero activeSection={activeSection} />
      </div>

      {/* Render Team Page when active */}
      {activeSection === "team" && (
        <div className="animate-fade-in">
          <TeamPage />
        </div>
      )}

      {/* Render Vision Page when active */}
      {activeSection === "vision" && (
        <div className="animate-fade-in">
          <VisionPage />
        </div>
      )}

      {/* Global Footer */}
      <HoverFooter activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}

export default App;
