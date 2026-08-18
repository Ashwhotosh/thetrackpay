import { useState } from "react";
import { motion } from "framer-motion";
import { ScanLine, Sparkles, Users, PieChart, ArrowRight } from "lucide-react";

const DEMO_URL = "/trackpay-demo.html";

const features = [
  { icon: ScanLine, title: "Scan & Pay", desc: "UPI-native flows built for how India actually pays." },
  { icon: PieChart, title: "Live Insights", desc: "Every transaction turns into a spending story instantly." },
  { icon: Sparkles, title: "ArthaAI", desc: "A money advisor that remembers your context." },
  { icon: Users, title: "Social & Splits", desc: "Settle bills and track friends without the awkward chase." },
];

// Reusable entrance transition matching the site's feel
const rise = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface ProductPageProps {
  onNavigateToSurvey?: () => void;
}

export default function ProductPage({ onNavigateToSurvey }: ProductPageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-24 text-white">
      {/* Ambient brand glow, mirrors the hero / footer gradients */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ---------- Themed header ---------- */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={rise}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            Live Interactive Prototype
          </motion.div>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="mb-5 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent md:text-6xl"
          >
            Hold TrackPay
            <br />
            in your hands.
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-2xl text-lg font-light text-neutral-400 md:text-xl"
          >
            This isn't a video, it's the real thing. Tap around the phone below to explore
            TrackPay, the payment app with a financial intelligence layer for India: payments,
            insights, social splits and an AI advisor, all in one place.
          </motion.p>
        </motion.div>

        {/* ---------- Device stage ----------
            Zooms in as it scrolls into view (feels great on mobile: the phone
            scales up to fit the screen, then you tap to interact). */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform", transformOrigin: "center" }}
          className="relative mx-auto w-full max-w-3xl transform-gpu"
        >
          {/* Glow pad under the device */}
          <div className="pointer-events-none absolute inset-x-8 top-10 bottom-0 rounded-[3rem] bg-gradient-to-b from-indigo-500/20 via-fuchsia-500/10 to-transparent blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {/* Top chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                trackpay.app · interactive demo
              </span>
            </div>

            {/* The embedded interactive app, height tracks the viewport on
                mobile so the whole phone fits without page scroll. */}
            <div className="relative h-[68vh] max-h-[760px] min-h-[460px] overflow-hidden rounded-[2rem] bg-slate-900/40 sm:h-[720px] lg:h-[780px]">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950/60">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400" />
                  <p className="text-xs font-medium tracking-wide text-neutral-500">Loading the live demo…</p>
                </div>
              )}
              <iframe
                src={DEMO_URL}
                title="TrackPay Interactive Demo"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className="h-full w-full border-0"
                allow="clipboard-write"
              />
            </div>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-neutral-500">
            Static, offline demo with sample data. No real money, accounts or backend involved.
          </p>
        </motion.div>

        {/* ---------- Feature grid ---------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={rise}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
                <Icon size={18} />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs leading-relaxed text-neutral-400">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- CTA to survey ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Tried it? Tell us what you think.
          </h2>
          <p className="max-w-xl font-light text-neutral-400">
            Your feedback directly shapes what ships in v1. It takes about two minutes.
          </p>
          <a
            href="/survey"
            onClick={(e) => {
              if (onNavigateToSurvey) {
                e.preventDefault();
                onNavigateToSurvey();
              }
            }}
            className="mt-2 inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]"
          >
            Share your feedback
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
