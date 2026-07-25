import { useState, useEffect } from "react";
import { PillBase } from "./components/ui/3d-adaptive-navigation-bar";
import { CinematicHero } from "./components/ui/cinematic-landing-hero";
import TeamPage from "./components/ui/team";
import VisionPage from "./components/ui/vision";
import ProductPage from "./components/ui/product";
import { DemoLaunchBar } from "./components/ui/demo-launch-bar";
import { HoverFooter } from "./components/ui/hover-footer";
import { SECTION_PATHS, SECTION_TITLES, sectionFromPath } from "./lib/routes";

function App() {
  const [activeSection, setActiveSectionState] = useState(() =>
    sectionFromPath(window.location.pathname)
  );

  const navigate = (section: string) => {
    setActiveSectionState(section);
    const path = SECTION_PATHS[section] ?? "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ section }, "", path);
    }
  };

  // Keep activeSection in sync with browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setActiveSectionState(sectionFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    document.title = SECTION_TITLES[activeSection] ?? SECTION_TITLES.home;
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
        <PillBase activeSection={activeSection} setActiveSection={navigate} />
      </div>

      {/* Keep CinematicHero mounted and hide it to prevent React unmounting errors with GSAP ScrollTrigger pinning */}
      <div style={{ display: activeSection === "home" ? "block" : "none" }}>
        <CinematicHero activeSection={activeSection} />
      </div>

      {/* Fixed bottom ticker announcing the demo video, home page only */}
      {activeSection === "home" && (
        <DemoLaunchBar onNavigate={() => navigate("product")} />
      )}

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

      {/* Render Product Page when active */}
      {activeSection === "product" && (
        <div className="animate-fade-in">
          <ProductPage />
        </div>
      )}

      {/* Global Footer */}
      <HoverFooter activeSection={activeSection} setActiveSection={navigate} />
    </div>
  );
}

export default App;
