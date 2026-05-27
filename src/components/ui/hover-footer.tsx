import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, ArrowRight, ShieldCheck, Landmark } from "lucide-react";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer pointer-events-auto", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent stroke-white font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.35 : 0.12 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent stroke-indigo-500/40 font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.5"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 100%, #020617 40%, rgba(99, 102, 241, 0.08) 100%)",
      }}
    />
  );
};

interface HoverFooterProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function HoverFooter({ activeSection, setActiveSection }: HoverFooterProps) {
  const handleNav = (section: string, elementId?: string) => {
    setActiveSection(section);
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950/80 border-t border-white/5 relative h-fit overflow-hidden pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 z-10 relative flex flex-col gap-12">
        
        {/* Top Row: Brand & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-500 text-3xl font-extrabold">◈</span>
              <span className="text-white text-2xl font-bold tracking-tight">TrackPay</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              TrackPay (King of Payments) — A Unified Money OS for the modern Indian user.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <button 
                  onClick={() => handleNav("home")}
                  className="text-neutral-400 hover:text-indigo-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("team")}
                  className="text-neutral-400 hover:text-indigo-400 transition-colors text-left"
                >
                  Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("vision")}
                  className="text-neutral-400 hover:text-indigo-400 transition-colors text-left"
                >
                  Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider font-bold mb-6">Contact & Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:founder@thetrackpay.com" className="text-neutral-400 hover:text-indigo-400 transition-colors">
                  founder@thetrackpay.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:thetrackpay@gmail.com" className="text-neutral-400 hover:text-indigo-400 transition-colors">
                  thetrackpay@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Call to Action Final Hook */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white text-sm uppercase tracking-wider font-bold mb-4">The Final Hook</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Don't just spend. Master your money.
            </p>
            <button 
              onClick={() => handleNav("home")}
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Middle Row: Trust & Compliance */}
        <div className="border-y border-white/5 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
          <div className="flex items-center space-x-3.5 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
            <Landmark size={20} className="text-indigo-400 flex-shrink-0" />
            <span className="text-xs font-medium text-neutral-300">Proudly pre-incubated at IITM Nirmaan</span>
          </div>
          <div className="flex items-center space-x-3.5 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
            <Landmark size={20} className="text-indigo-400 flex-shrink-0" />
            <span className="text-xs font-medium text-neutral-300">Built for India: NPCI & UPI Compliant Architecture</span>
          </div>
          <div className="flex items-center space-x-3.5 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
            <ShieldCheck size={20} className="text-indigo-400 flex-shrink-0" />
            <span className="text-xs font-medium text-neutral-300">AES-256 Data Protection</span>
          </div>
        </div>

        {/* Bottom Row: Social & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 space-y-4 md:space-y-0 pt-4 z-10">
          
          {/* Copyright & Made in India */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-2 md:order-1">
            <p>© 2026 TrackPay Technologies. All rights reserved.</p>
            <span className="hidden sm:inline text-neutral-800">|</span>
            <span className="inline-flex items-center gap-1 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded text-neutral-400 font-medium">
              🇮🇳 Made in India
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-4 order-1 md:order-2">
            <span className="text-neutral-600 cursor-not-allowed select-none" title="Coming Soon">Privacy Policy</span>
            <span>|</span>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <span>|</span>
            <span className="text-neutral-600 cursor-not-allowed select-none" title="Coming Soon">Security Manifesto</span>
          </div>

          {/* Social icons */}
          <div className="flex space-x-4 order-3 text-neutral-400">
            <a 
              href="https://x.com/thetrackpay" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/thetrackpay" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/thetrackpay/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* SVG Text Hover Effect (glowing background text) */}
      <div className="lg:flex hidden h-[22rem] -mt-36 -mb-28 justify-center select-none pointer-events-none">
        <TextHoverEffect text="TRACKPAY" className="z-0 pointer-events-auto" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
