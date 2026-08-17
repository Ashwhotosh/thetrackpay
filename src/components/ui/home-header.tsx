"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface HomeHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Team", id: "team" },
  { label: "Vision", id: "vision" },
  { label: "Survey", id: "survey" },
];

/**
 * Banner-style top navigation for the home page (adapted from
 * responsive-hero-banner): TrackPay logo on the left, a glassy pill of nav
 * links + a "Join Waitlist" CTA on the right, and a mobile dropdown.
 * Wired to the app's SPA navigation instead of plain <a> hrefs.
 */
export function HomeHeader({ activeSection, setActiveSection }: HomeHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const go = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="mx-4 sm:mx-6">
        <div className="flex items-center justify-between pt-4">
          {/* Logo + Nirmaan chip */}
          <div className="pointer-events-auto flex items-center gap-3">
            <button onClick={() => go("home")} className="inline-flex items-center gap-2.5" aria-label="TrackPay home">
              <img
                src="/image/Trackpay.jpg"
                alt="TrackPay"
                className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15"
              />
              <span className="text-white font-semibold tracking-tight text-lg">TrackPay</span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5 ring-1 ring-white/10 backdrop-blur">
              <img src="/image/Nirmaan.png" alt="" className="h-4 w-4 object-contain" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                Pre-Incubated at Nirmaan IITM
              </span>
            </div>
          </div>

          {/* Desktop nav pill */}
          <nav className="pointer-events-auto hidden md:flex items-center">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className={`px-3 py-2 text-sm font-medium font-sans transition-colors hover:text-white ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => go("home")}
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
              >
                Join Waitlist
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white/90"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-3 rounded-2xl bg-black/40 p-2 ring-1 ring-white/10 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`block w-full text-left rounded-xl px-4 py-3 text-sm font-medium font-sans transition-colors ${
                  activeSection === link.id ? "text-white bg-white/5" : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => go("home")}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-neutral-900 font-sans"
            >
              Join Waitlist
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default HomeHeader;
