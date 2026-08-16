"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  /* Environment grid */
  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Theme-aware matte text */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }
  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Brand gradient platform card */
  .premium-depth-card {
      background: linear-gradient(145deg, #092070 0%, #3b085c 50%, #050914 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 5;
      background: radial-gradient(800px circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 45%);
      mix-blend-mode: screen;
  }

  /* iPhone mockup hardware */
  .iphone-bezel {
      background-color: #0b0f19;
      box-shadow:
          inset 0 0 0 2px #3f3f46,
          inset 0 0 0 7px #010409,
          0 40px 80px -15px rgba(0,0,0,0.95),
          0 15px 25px -5px rgba(0,0,0,0.8);
  }
  .screen-glare { background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%); }
  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 0 10px 20px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }
  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
  }
  .progress-ring-purple { transform: rotate(-130deg); transform-origin: center; stroke-linecap: round; }
  .progress-ring-blue   { transform: rotate(50deg);   transform-origin: center; stroke-linecap: round; }
  .progress-ring-yellow { transform: rotate(140deg);  transform-origin: center; stroke-linecap: round; }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaDescription?: string;
  activeSection?: string;
}

export function CinematicHero({
  brandName = "Trackpay",
  tagline1 = "TrackPay | TheTrackPay,",
  tagline2 = "Track the flow of money.",
  cardHeading = "Intelligence in every scroll.",
  cardDescription = <>Watch your financial health in real-time. From spending alerts to bill insights, our UI is built to turn complex data into simple, actionable steps.</>,
  metricValue = 1219,
  metricLabel = "Total Spent",
  ctaDescription = "The payment app with a financial intelligence layer for India — built to track, analyze, and save automatically.",
  activeSection = "home",
  className,
  ...props
}: CinematicHeroProps) {

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-10-01T00:00:00+05:30");
    const difference = targetDate.getTime() - Date.now();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Countdown only shows on the home CTA; don't tick while hidden on other tabs.
    if (activeSection !== "home") return;
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [activeSection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const timestampVal = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const response = await fetch("https://sheetdb.io/api/v1/lflhlaw3h4ppo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{ Email: email, email: email, Timestamp: timestampVal, timestamp: timestampVal }],
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        alert("🎉 Success! You have been successfully added to the TrackPay waitlist.");
      } else {
        const errorText = await response.text();
        console.error("Submission failed response:", errorText);
        setSubmitError("Failed to submit. Please ensure your Google Sheet has 'Email' and 'Timestamp' columns in the first row.");
      }
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Donut chart geometry (drawn statically at their final proportions).
  const rOuter = 64;
  const cOuter = 2 * Math.PI * rOuter;

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background text-foreground font-sans antialiased",
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/[0.07] blur-[120px]" aria-hidden="true" />

      {/* ================= HERO ================= */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-32 pb-16 text-center md:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-3d-matte mb-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-[4.25rem]"
        >
          {tagline1}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="text-silver-matte max-w-5xl text-4xl font-extrabold leading-none tracking-tighter md:text-6xl lg:text-[4.25rem]"
        >
          {tagline2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mx-auto mt-6 mb-10 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl"
        >
          {ctaDescription}
        </motion.p>

        {/* Waitlist card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="relative w-full max-w-md rounded-3xl border border-white/15 bg-black/50 p-7 shadow-2xl backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />

          {!isSubmitted ? (
            <div className="relative">
              <form onSubmit={handleSubmit} className="mb-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="h-12 flex-1 rounded-xl border border-white/20 bg-black/40 px-4 text-sm text-white outline-none backdrop-blur-sm placeholder:text-white/50 focus:border-white/40 focus:ring-1 focus:ring-white/20 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 whitespace-nowrap rounded-xl bg-indigo-600 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </button>
                </div>
              </form>

              {submitError && (
                <p className="mb-4 text-center text-xs font-semibold text-red-400">⚠️ {submitError}</p>
              )}

              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-medium text-white">J</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-purple-400 to-purple-600 text-xs font-medium text-white">A</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-pink-400 to-pink-600 text-xs font-medium text-white">M</div>
                </div>
                <span className="text-sm text-white/70">~2k + People already joined</span>
              </div>

              <div className="flex items-center justify-center gap-4 text-center sm:gap-6">
                {[
                  { v: timeLeft.days, l: "days" },
                  { v: timeLeft.hours, l: "hours" },
                  { v: timeLeft.minutes, l: "minutes" },
                  { v: timeLeft.seconds, l: "seconds" },
                ].map((t, i) => (
                  <React.Fragment key={t.l}>
                    {i > 0 && <div className="text-white/40">|</div>}
                    <div>
                      <div className="text-2xl font-light tabular-nums text-white">{t.v}</div>
                      <div className="text-xs uppercase tracking-wide text-white/60">{t.l}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative py-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-400/40 bg-gradient-to-r from-green-400/30 to-emerald-500/30">
                <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">You're on the list!</h3>
              <p className="text-sm text-white/90">We'll notify you when we launch. Thanks for joining!</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ================= PRODUCT SHOWCASE ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="premium-depth-card relative overflow-hidden rounded-[32px] p-6 md:rounded-[40px] md:p-10 lg:p-14"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-8">
            {/* LEFT: heading */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                {cardHeading}
              </h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-200/70 md:text-base lg:mx-0 lg:text-lg">
                {cardDescription}
              </p>
            </div>

            {/* MIDDLE: phone mockup (static) */}
            <div className="order-1 flex items-center justify-center lg:order-2">
              <div className="relative flex scale-[0.82] items-center justify-center sm:scale-90 lg:scale-100">
                <div className="relative flex h-[600px] w-[300px] flex-col rounded-[3.25rem] iphone-bezel">
                  {/* Screen */}
                  <div className="absolute inset-[8px] z-10 overflow-hidden rounded-[2.75rem] bg-[#02050d] text-white shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                    <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />

                    {/* Dynamic island */}
                    <div className="absolute left-1/2 top-[6px] z-50 flex h-[30px] w-[110px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    </div>

                    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pb-8 pt-14">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold tracking-tight text-neutral-100">Payment History</span>
                        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1.5">
                          <div className="h-4 w-4 text-neutral-400 opacity-60">☰</div>
                          <div className="flex h-5 w-5 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-600/20 text-[10px] font-bold text-blue-400">◑</div>
                        </div>
                      </div>

                      {/* Spending breakdown donut */}
                      <div className="widget-depth relative my-auto flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
                        <span className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Spending Breakdown</span>
                        <div className="relative flex h-44 w-44 items-center justify-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                            <circle className="progress-ring-purple" cx="88" cy="88" r={rOuter} fill="none" stroke="#b08bf8" strokeWidth="13" strokeDasharray={cOuter} strokeDashoffset={cOuter * 0.5} />
                            <circle className="progress-ring-blue" cx="88" cy="88" r={rOuter} fill="none" stroke="#638df6" strokeWidth="13" strokeDasharray={cOuter} strokeDashoffset={cOuter * 0.65} />
                            <circle className="progress-ring-yellow" cx="88" cy="88" r={rOuter} fill="none" stroke="#f6c243" strokeWidth="13" strokeDasharray={cOuter} strokeDashoffset={cOuter * 0.85} />
                          </svg>
                          <div className="z-10 flex flex-col items-center text-center">
                            <span className="mb-0.5 text-[9px] font-medium tracking-wide text-neutral-400">{metricLabel}</span>
                            <span className="text-3xl font-extrabold tracking-tight text-white">₹{metricValue.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Alerts */}
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-3 rounded-xl border border-blue-500/10 bg-blue-950/20 p-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-xs text-blue-400">↗</div>
                          <div>
                            <p className="text-xs font-bold text-neutral-200">Spending Alert</p>
                            <p className="mt-0.5 text-[10px] leading-normal text-neutral-400">You've spent <span className="font-semibold text-blue-400">15% more</span> on Food compared to last month.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-950/20 p-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-500/10 text-xs text-amber-400">⚡</div>
                          <div>
                            <p className="text-xs font-bold text-neutral-200">Bill Insight</p>
                            <p className="mt-0.5 text-[10px] leading-normal text-neutral-400">Your <span className="font-semibold text-white">Electricity Bill</span> is <span className="font-medium text-red-400">15% higher</span> (₹1,650) than usual.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto mt-4 h-[4px] w-[110px] rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="floating-ui-badge absolute left-[-15px] top-12 z-30 flex items-center gap-3 rounded-xl p-3 lg:left-[-60px]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-400/30 bg-gradient-to-b from-purple-500/20 to-purple-900/10 text-base">💳</div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white">Subscriptions</p>
                    <p className="text-[10px] font-medium text-purple-300/60">₹649 Tracked</p>
                  </div>
                </div>
                <div className="floating-ui-badge absolute bottom-24 right-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:right-[-60px]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 text-base">🛡️</div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white">Auto Savings</p>
                    <p className="text-[10px] font-medium text-emerald-300/60">Smart rule active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: brand */}
            <div className="order-3 flex justify-center lg:justify-end">
              <h2 className="text-card-silver-matte text-5xl font-black uppercase tracking-tighter md:text-[5.5rem] lg:text-[7rem]">
                {brandName}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
