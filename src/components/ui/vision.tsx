import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PillarData {
  id: number;
  title: string;
  headline: string;
  body: string;
}

const pillars: PillarData[] = [
  {
    id: 1,
    title: "Next-Gen Bank Aggregation",
    headline: "Every Account. One Single Source of Truth.",
    body: "Stop opening four different apps just to check your financial standing. Trackpay securely integrates your complete financial footprint—from monthly salary deposits to automated EMI cycles and long-term investment portfolios. Review your true net worth effortlessly.",
  },
  {
    id: 2,
    title: "Intelligent AI Money Agents",
    headline: "Autonomous Intelligence Working for Your Wallet.",
    body: "Meet your personal financial engine. Our integrated AI Agents automatically categorize deductions and monitor tax liabilities in real-time to avoid year-end panics. Planning a purchase? The agent optimizes your cash flow, pinpointing the ideal credit card rewards and tracking travel budgets.",
  },
  {
    id: 3,
    title: "UPI Family Circle",
    headline: "Finances Are a Team Sport.",
    body: "Connect your household or trusted group to manage shared expenses, track allowances, and align on joint financial milestones smoothly—no awkward manual math or clunky shared spreadsheets required.",
  },
];

const teamMembers = [
  {
    image: "/image/Team/Ashutosh.png",
    name: "Ashutosh",
    role: "Founder & CEO",
    focus: "Product vision & intelligent money network",
  },
  {
    image: "/image/Team/Siddhi.jpg",
    name: "Siddhi",
    role: "Cofounder & Finance Head",
    focus: "Behavioral finance trends & financial strategy",
  },
  {
    image: "/image/Team/Sarthak.jpg",
    name: "Sarthak",
    role: "Cofounder & Tech Head",
    focus: "High-speed backend integrations & system architecture",
  },
  {
    image: "/image/Team/Prathamesh.png",
    name: "Prathamesh",
    role: "Cofounder & AIML/Networking Head",
    focus: "AIML training models, security & bank aggregation",
  },
  {
    image: "/image/Team/Shaurya.jpg",
    name: "Shaurya",
    role: "Cofounder & Application Head",
    focus: "Ultra-premium UI/UX design framework & application architecture",
  },
];

export default function VisionPage() {
  const [activePillar, setActivePillar] = useState(1);
  
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const teamTrackRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const lockHookRef = useRef<SVGPathElement>(null);

  const leftTrackRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const pillar1Ref = useRef<HTMLDivElement>(null);
  const pillar2Ref = useRef<HTMLDivElement>(null);
  const pillar3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // SECTION 1: Pinned Scroll Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            let newPillar = 1;
            if (progress < 0.30) {
              newPillar = 1;
            } else if (progress >= 0.30 && progress < 0.57) {
              newPillar = 2;
            } else {
              newPillar = 3;
            }
            setActivePillar((current) => current !== newPillar ? newPillar : current);
          }
        },
      });

      // Initial States
      gsap.set(mockupRef.current, { autoAlpha: 0, scale: 0.8, y: 150, rotationX: 25, rotationY: -10 });

      scrollTl
        // 1. Mockup enters (starts at 0, finishes at 1.5)
        .to(mockupRef.current, { autoAlpha: 1, scale: 1, y: 0, rotationX: 0, rotationY: 0, duration: 1.5, ease: "power2.out" }, 0)
        
        // 2. Pillar 1 Hold (leftTrackRef stays at y: 0)
        
        // 3. Transition to Pillar 2 (starts at 2.5, ends at 4.0)
        .to(leftTrackRef.current, { y: "-60vh", duration: 1.5, ease: "power2.inOut" }, 2.5)

        // 4. Pillar 2 Hold (leftTrackRef stays at y: -60vh)

        // 5. Transition to Pillar 3 (starts at 5.5, ends at 7.0)
        .to(leftTrackRef.current, { y: "-120vh", duration: 1.5, ease: "power2.inOut" }, 5.5)

        // 6. Pillar 3 Hold (leftTrackRef stays at y: -120vh)

        // 7. Outro (starts at 9.0, ends at 11.0)
        .to(leftTrackRef.current, { y: "-180vh", duration: 1.5, ease: "power2.in" }, 9.0)
        .to(mockupRef.current, { autoAlpha: 0, y: -150, scale: 0.9, duration: 2 }, 9.0);

      // SECTION 2: Horizontal scroll override for Team Manifesto
      if (teamTrackRef.current && section2Ref.current) {
        const amountToScroll = teamTrackRef.current.scrollWidth - window.innerWidth + 200;
        
        gsap.to(teamTrackRef.current, {
          x: () => -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // SECTION 3: SVG Lock hook animation on scroll reveal
      if (lockHookRef.current && securityRef.current) {
        gsap.fromTo(
          lockHookRef.current,
          { rotation: -45, transformOrigin: "right bottom" },
          {
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: securityRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    });

    // Let layout settle, then refresh ScrollTrigger positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden relative">
      
      {/* INTRO HEADER SECTION */}
      <section className="w-full pt-32 pb-16 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wider uppercase w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Unified Money OS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent mb-6 max-w-4xl">
            The Architecture of a True Money OS.
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl">
            Standard apps just move money. Trackpay acts as the central intelligence engine for your entire financial ecosystem.
          </p>
        </div>
      </section>

      {/* SECTION 1: THE SOLUTION ARCHITECTURE */}
      <section ref={section1Ref} className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative z-10">
          
          {/* Left Column Viewport */}
          <div className="h-[60vh] overflow-hidden relative flex flex-col justify-center w-full">
            <div ref={leftTrackRef} className="absolute top-0 inset-x-0 w-full space-y-0 flex flex-col pointer-events-none">

              {/* Pillar 1 */}
              <div 
                ref={pillar1Ref} 
                className={cn(
                  "h-[60vh] flex flex-col justify-center pl-6 border-l-2 space-y-4 flex-shrink-0 transition-all duration-500 ease-in-out",
                  activePillar === 1 
                    ? "border-indigo-500 opacity-100 scale-100" 
                    : "border-indigo-500/20 opacity-40 scale-95 origin-left"
                )}
              >
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">Pillar 01</span>
                <h3 className="text-2xl font-bold tracking-tight text-white">{pillars[0].title}</h3>
                <h4 className="text-lg font-medium text-indigo-300">{pillars[0].headline}</h4>
                <p className="leading-relaxed font-light text-neutral-300">{pillars[0].body}</p>
              </div>

              {/* Pillar 2 */}
              <div 
                ref={pillar2Ref} 
                className={cn(
                  "h-[60vh] flex flex-col justify-center pl-6 border-l-2 space-y-4 flex-shrink-0 transition-all duration-500 ease-in-out",
                  activePillar === 2 
                    ? "border-indigo-500 opacity-100 scale-100" 
                    : "border-indigo-500/20 opacity-40 scale-95 origin-left"
                )}
              >
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">Pillar 02</span>
                <h3 className="text-2xl font-bold tracking-tight text-white">{pillars[1].title}</h3>
                <h4 className="text-lg font-medium text-indigo-300">{pillars[1].headline}</h4>
                <p className="leading-relaxed font-light text-neutral-300">{pillars[1].body}</p>
              </div>

              {/* Pillar 3 */}
              <div 
                ref={pillar3Ref} 
                className={cn(
                  "h-[60vh] flex flex-col justify-center pl-6 border-l-2 space-y-4 flex-shrink-0 transition-all duration-500 ease-in-out",
                  activePillar === 3 
                    ? "border-indigo-500 opacity-100 scale-100" 
                    : "border-indigo-500/20 opacity-40 scale-95 origin-left"
                )}
              >
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">Pillar 03</span>
                <h3 className="text-2xl font-bold tracking-tight text-white">{pillars[2].title}</h3>
                <h4 className="text-lg font-medium text-indigo-300">{pillars[2].headline}</h4>
                <p className="leading-relaxed font-light text-neutral-300">{pillars[2].body}</p>
              </div>

            </div>
          </div>

          {/* Right Column: Sticky Mockup */}
          <div ref={mockupRef} className="hidden lg:flex items-center justify-center h-full relative">
            {/* Realistic Phone Case Outer Body */}
            <div className="relative w-[340px] h-[680px] rounded-[52px] bg-neutral-950 p-[12px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 overflow-hidden flex flex-col">
              
              {/* Physical Buttons */}
              {/* Silent Switch (Left Side) */}
              <div className="absolute top-[105px] left-0 w-[3px] h-[16px] bg-gradient-to-r from-neutral-700 to-neutral-900 rounded-l-[2px] -translate-x-[3px] z-20 border-r border-black" />
              {/* Action Button (Left Side) */}
              <div className="absolute top-[138px] left-0 w-[3px] h-[26px] bg-gradient-to-r from-neutral-700 to-neutral-900 rounded-l-[2px] -translate-x-[3px] z-20 border-r border-black" />
              {/* Volume Up (Left Side) */}
              <div className="absolute top-[182px] left-0 w-[3px] h-[52px] bg-gradient-to-r from-neutral-700 to-neutral-900 rounded-l-[2px] -translate-x-[3px] z-20 border-r border-black" />
              {/* Volume Down (Left Side) */}
              <div className="absolute top-[248px] left-0 w-[3px] h-[52px] bg-gradient-to-r from-neutral-700 to-neutral-900 rounded-l-[2px] -translate-x-[3px] z-20 border-r border-black" />
              {/* Power Button (Right Side) */}
              <div className="absolute top-[182px] right-0 w-[3px] h-[76px] bg-gradient-to-l from-neutral-700 to-neutral-900 rounded-r-[2px] translate-x-[3px] z-20 border-l border-black" />

              {/* Screen Bezel Specular highlight border */}
              <div className="absolute inset-[3px] rounded-[48px] border border-neutral-800/80 pointer-events-none z-30" />
              
              {/* Glass Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none z-35 animate-float-light" />
              
              {/* Inner Screen */}
              <div className="w-full h-full rounded-[42px] bg-slate-950 overflow-hidden relative flex flex-col pt-12 pb-4 px-4 text-white">
                
                {/* iOS Status Bar */}
                <div className="absolute top-3.5 left-8 right-8 flex justify-between text-[11px] font-semibold text-neutral-300 z-30 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* Signal */}
                    <div className="flex gap-[1.5px] items-end h-[8px]">
                      <span className="w-[2px] h-[3px] bg-neutral-300 rounded-[0.5px]" />
                      <span className="w-[2px] h-[5px] bg-neutral-300 rounded-[0.5px]" />
                      <span className="w-[2px] h-[7px] bg-neutral-300 rounded-[0.5px]" />
                      <span className="w-[2px] h-[8px] bg-neutral-300 rounded-[0.5px]" />
                    </div>
                    {/* Wifi */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                      <path d="M8 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.95-4.95a7 7 0 0 1 9.9 0l-.7.7a6 6 0 0 0-8.5 0l-.7-.7zm-1.41-1.41a9 9 0 0 1 12.72 0l-.7.7a8 8 0 0 0-11.32 0l-.7-.7z" />
                    </svg>
                    {/* Battery */}
                    <div className="w-5 h-2.5 border border-neutral-400 rounded-[3px] p-[1px] flex items-center">
                      <div className="h-full w-[85%] bg-neutral-300 rounded-[1.5px]" />
                    </div>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-40 flex items-center justify-between px-3 border border-neutral-900 shadow-inner">
                  {/* Camera Lens */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#080810] border border-[#1a1a2e] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#181838]" />
                  </div>
                  {/* Active Ring Indicator */}
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                  </span>
                </div>

                {/* Cross-fading screens */}
                <div className="flex-1 relative w-full h-full mt-2">

                  {/* SCREEN 1: BANK AGGREGATION */}
                  <div 
                    style={{ 
                      opacity: activePillar === 1 ? 1 : 0, 
                      transform: activePillar === 1 ? "scale(1)" : "scale(0.95)",
                      pointerEvents: activePillar === 1 ? "auto" : "none" 
                    }}
                    className="iphone-screen-1 absolute inset-0 flex flex-col justify-between py-2 transition-all duration-500 ease-in-out"
                  >
                    {/* Dashboard Header */}
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Total Balance</span>
                        <div className="text-2xl font-bold tracking-tight text-white">₹12,45,680</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs shadow-md border border-white/10">
                        A
                      </div>
                    </div>

                    {/* SVG Connector Flow Graph */}
                    <div className="relative w-full h-[180px] my-2 bg-neutral-900/30 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
                      {/* SVG Connecting Dotted Lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 20 20 L 50 50" fill="none" stroke="rgba(99, 102, 241, 0.45)" strokeWidth="0.75" className="animate-dash" />
                        <path d="M 80 20 L 50 50" fill="none" stroke="rgba(99, 102, 241, 0.45)" strokeWidth="0.75" className="animate-dash" />
                        <path d="M 50 82 L 50 50" fill="none" stroke="rgba(99, 102, 241, 0.45)" strokeWidth="0.75" className="animate-dash" />
                      </svg>

                      {/* Central Node (Trackpay Logo) */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse-glow">
                          <span className="font-bold text-sm tracking-widest text-white">TP</span>
                        </div>
                      </div>

                      {/* Bank 1 Node (HDFC) */}
                      <div className="absolute left-[20%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shadow-md">
                          <span className="text-[8px] font-extrabold text-blue-400">HDFC</span>
                        </div>
                      </div>

                      {/* Bank 2 Node (Zerodha) */}
                      <div className="absolute left-[80%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shadow-md">
                          <span className="text-[8px] font-extrabold text-indigo-400">KITE</span>
                        </div>
                      </div>

                      {/* Bank 3 Node (SBI) */}
                      <div className="absolute left-[50%] top-[82%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shadow-md">
                          <span className="text-[8px] font-extrabold text-emerald-400">SBI</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Accounts List */}
                    <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
                      <div className="bg-neutral-900/60 border border-white/5 p-2 rounded-xl flex items-center justify-between text-xs transition-colors hover:bg-neutral-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="text-neutral-400 font-medium">HDFC Savings</span>
                        </div>
                        <span className="text-white font-bold">₹4,50,000</span>
                      </div>
                      <div className="bg-neutral-900/60 border border-white/5 p-2 rounded-xl flex items-center justify-between text-xs transition-colors hover:bg-neutral-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-400" />
                          <span className="text-neutral-400 font-medium">Zerodha Mutual</span>
                        </div>
                        <span className="text-white font-bold">₹7,20,680</span>
                      </div>
                      <div className="bg-neutral-900/60 border border-white/5 p-2 rounded-xl flex items-center justify-between text-xs transition-colors hover:bg-neutral-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-neutral-400 font-medium">SBI Credit Card</span>
                        </div>
                        <span className="text-rose-400 font-bold">-₹25,000</span>
                      </div>
                    </div>
                  </div>

                  {/* SCREEN 2: AI AGENTS */}
                  <div 
                    style={{ 
                      opacity: activePillar === 2 ? 1 : 0, 
                      transform: activePillar === 2 ? "scale(1)" : "scale(0.95)",
                      pointerEvents: activePillar === 2 ? "auto" : "none" 
                    }}
                    className="iphone-screen-2 absolute inset-0 flex flex-col justify-between py-2 transition-all duration-500 ease-in-out"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                      <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-500/30 flex items-center justify-center animate-pulse-glow">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.725h-8.98L10.207 3 1.225 14.725h8.588z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Trackpay AI</span>
                        <span className="text-[9px] text-emerald-400 font-semibold block flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Optimizer
                        </span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-[11px] leading-relaxed">
                      {/* AI message 1 */}
                      <div className="bg-neutral-900/50 border border-white/5 p-2.5 rounded-2xl rounded-tl-none space-y-1">
                        <p className="text-neutral-300">
                          Hi Ashutosh, I've consolidated your dashboard. I noticed a subscription leakage anomaly.
                        </p>
                      </div>

                      {/* AI message 2 */}
                      <div className="bg-neutral-900/50 border border-indigo-500/20 p-2.5 rounded-2xl rounded-tl-none space-y-1.5">
                        <div className="flex items-center gap-1 text-indigo-400 font-bold text-[10px]">
                          <span>⚡ SUBSCRIPTION LEAK</span>
                        </div>
                        <p className="text-neutral-300">
                          You paid <span className="text-white font-semibold">₹649</span> for Prime Video twice this month. Tap to auto-refund.
                        </p>
                      </div>

                      {/* AI message 3 */}
                      <div className="bg-neutral-900/50 border border-amber-500/20 p-2.5 rounded-2xl rounded-tl-none space-y-1.5">
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
                          <span>💡 TAX OPTIMIZER</span>
                        </div>
                        <p className="text-neutral-300">
                          Section 80C is full. Routing <span className="text-white font-semibold">₹45,000</span> to Section 80D (Health) saves <span className="text-emerald-400 font-bold">₹13,500</span> in tax today.
                        </p>
                      </div>

                      {/* AI Typing / Processing status */}
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] pl-1.5">
                        <span>Monitoring active anomalies</span>
                        <div className="flex gap-[3px] items-center">
                          <span className="w-1 h-1 rounded-full bg-neutral-500 animate-typing-1" />
                          <span className="w-1 h-1 rounded-full bg-neutral-500 animate-typing-2" />
                          <span className="w-1 h-1 rounded-full bg-neutral-500 animate-typing-3" />
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="space-y-1.5 border-t border-white/5 pt-2">
                      <div className="flex gap-1.5">
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1.5 rounded-lg text-[10px] text-center transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                          Optimize Tax (80D)
                        </button>
                        <button className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 font-medium py-1.5 rounded-lg text-[10px] text-center transition-all">
                          Dismiss Alert
                        </button>
                      </div>
                      {/* Input pill */}
                      <div className="w-full bg-neutral-900 border border-white/5 rounded-full px-3 py-1.5 flex items-center justify-between text-[10px] text-neutral-500">
                        <span>Ask AI Agent anything...</span>
                        <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* SCREEN 3: FAMILY CIRCLE */}
                  <div 
                    style={{ 
                      opacity: activePillar === 3 ? 1 : 0, 
                      transform: activePillar === 3 ? "scale(1)" : "scale(0.95)",
                      pointerEvents: activePillar === 3 ? "auto" : "none" 
                    }}
                    className="iphone-screen-3 absolute inset-0 flex flex-col justify-between py-2 transition-all duration-500 ease-in-out"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="text-[9px] text-neutral-400 block uppercase tracking-wider font-semibold">UPI Family Circle</span>
                        <span className="text-xl font-bold text-white">Family Budget</span>
                      </div>
                      <div className="flex -space-x-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-neutral-950 flex items-center justify-center text-[9px] font-bold">P</div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border border-neutral-950 flex items-center justify-center text-[9px] font-bold">S</div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 border border-neutral-950 flex items-center justify-center text-[9px] font-bold">A</div>
                      </div>
                    </div>

                    {/* SVG Progress Budget Circle Ring */}
                    <div className="relative w-full h-[150px] my-1 flex items-center justify-center bg-neutral-900/20 rounded-2xl border border-white/5">
                      <svg className="w-[120px] h-[120px] transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#262626" strokeWidth="8" />
                        {/* Foreground Progress Circle (68.4%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="url(#budget-grad-vision)"
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * 68.4) / 100}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="budget-grad-vision" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-neutral-400">Total Spent</span>
                        <span className="text-lg font-bold text-white">₹34,200</span>
                        <span className="text-[9px] text-indigo-300 font-medium">Limit: ₹50,000</span>
                      </div>
                    </div>

                    {/* Transaction History & Pending requests */}
                    <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
                      <span className="text-[9px] text-neutral-500 font-bold block uppercase tracking-wider">Pending Approvals</span>
                      
                      {/* Request Card */}
                      <div className="bg-neutral-900/70 border border-indigo-500/20 p-2 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-neutral-300 font-medium">Sarthak requests allowance</span>
                          <span className="text-white font-bold">₹2,500</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 rounded-lg text-[9px] transition-all">
                            Approve
                          </button>
                          <button className="flex-1 bg-neutral-950 hover:bg-neutral-900 border border-white/5 text-neutral-400 py-1 rounded-lg text-[9px] transition-all">
                            Decline
                          </button>
                        </div>
                      </div>

                      {/* Approved Feed Item */}
                      <div className="bg-neutral-900/40 border border-white/5 p-1.5 rounded-xl flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-neutral-400">Prathamesh Rent</span>
                        </div>
                        <span className="text-emerald-400 font-bold">+₹18,000</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Home Indicator */}
                <div className="w-[110px] h-[4px] bg-white/30 rounded-full mx-auto mt-2 relative z-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE VISION & ENGINEERING POWERHOUSE (THE TEAM) */}
      <section ref={section2Ref} className="bg-slate-900/30 border-y border-white/5 min-h-screen flex flex-col justify-center overflow-hidden py-24 relative">
        <div className="max-w-7xl mx-auto px-6 w-full mb-16 space-y-8">
          
          {/* IITM Nirmaan Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/20 to-purple-600/5 text-white text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            IIT Madras Nirmaan Pre-Incubated
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl bg-gradient-to-r from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
            Redefining Payments from Inside IIT Madras.
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
            Trackpay is proudly pre-incubated at IITM Nirmaan, engineered by a core team obsessed with making financial management effortless.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-neutral-300 text-lg max-w-3xl leading-relaxed my-8 font-light">
            "We believe tracking your money shouldn't feel like a second job. The current payment ecosystem is fragmented: you pay in one app, invest in another, and track your budget on a spreadsheet. We built Trackpay to be the 'King of Payments'—a single, fluid operating system that thinks, automates, and optimizes for you."
          </blockquote>
        </div>

        {/* Horizontal scroll track */}
        <div className="w-full flex items-center">
          <div ref={teamTrackRef} className="flex gap-8 px-6 md:px-12 will-change-transform">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className="team-card-wrapper w-[280px] md:w-[320px] shrink-0 group bg-neutral-900/60 rounded-3xl p-6 border border-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)]"
              >
                <div className="relative w-full h-[260px] rounded-2xl overflow-hidden mb-6 bg-neutral-800">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">{member.focus}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">{member.name}</h4>
                  <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FORT KNOX SECURITY ARCHITECTURE */}
      <section id="security" ref={securityRef} className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Bank-Grade Security. Privacy by Design.
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light">
            Your financial data is highly sensitive. Our infrastructure ensures it remains exclusively yours.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Encryption */}
          <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">AES-256 Bit Encryption</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Every byte of data synced to your Unified Money OS is guarded with the same cryptographic protocols used by major global banking networks.
              </p>
            </div>
          </div>

          {/* Card 2: Privacy */}
          <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Privacy First Data Isolation</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We track, we don't sell. We operate on a strict data privacy framework where your transactions, balances, and financial behaviors are never shared.
              </p>
            </div>
          </div>

          {/* Card 3: Compliance */}
          <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* SVG Draw Lock icon */}
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg className="w-6 h-6 overflow-visible" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {/* Lock Hook */}
                <path 
                  ref={lockHookRef}
                  className="transition-transform duration-300"
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M8 11V7a4 4 0 118 0v4" 
                />
                {/* Lock Body */}
                <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth={2} />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Regulatory Compliance First</h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Built from the ground up to operate seamlessly alongside official NPCI and UPI architectures, ensuring rapid, legally compliant transaction speeds.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
