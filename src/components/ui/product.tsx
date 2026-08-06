import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ScanLine, Sparkles, Users, PieChart, ArrowRight, Lock } from "lucide-react";

const DEMO_URL = "/trackpay-demo.html";
const ACCESS_CODE = "20252026";
const UNLOCK_KEY = "tp_prototype_unlocked";

const features = [
  { icon: ScanLine, title: "Scan & Pay", desc: "UPI-native flows built for how India actually pays." },
  { icon: PieChart, title: "Live Insights", desc: "Every transaction turns into a spending story instantly." },
  { icon: Sparkles, title: "ArthaAI", desc: "A money advisor that remembers your context." },
  { icon: Users, title: "Social & Splits", desc: "Settle bills and track friends without the awkward chase." },
];

// Reusable entrance transition matching the site's cinematic feel
const rise = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface ProductPageProps {
  onNavigateToSurvey?: () => void;
}

export default function ProductPage({ onNavigateToSurvey }: ProductPageProps) {
  const [loaded, setLoaded] = useState(false);

  // Access gate for the live prototype. Soft client-side lock (not security —
  // the demo files are public); persists once unlocked so the code isn't asked
  // again on this device.
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (codeInput.trim() === ACCESS_CODE) {
      setUnlocked(true);
      setError(false);
      try {
        window.localStorage.setItem(UNLOCK_KEY, "1");
      } catch {
        /* ignore storage errors */
      }
    } else {
      setError(true);
      setCodeInput("");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-24 text-white">
      {/* Ambient brand glow — mirrors the hero / footer gradients */}
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
            This isn't a video — it's the real thing. Tap around the phone below to explore
            the Unified Money OS: payments, insights, social splits and an AI advisor, all in one place.
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

            {/* The embedded interactive app — height tracks the viewport on
                mobile so the whole phone fits without page scroll. */}
            <div className="relative h-[68vh] max-h-[760px] min-h-[460px] overflow-hidden rounded-[2rem] bg-slate-900/40 sm:h-[720px] lg:h-[780px]">
              {unlocked ? (
                <>
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
                </>
              ) : (
                /* ---------- Lock screen ---------- */
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  {/* Blurred teaser backdrop */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40 blur-xl"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 0%, rgba(99,102,241,0.25), transparent 60%), radial-gradient(80% 60% at 50% 100%, rgba(217,70,239,0.18), transparent 60%)",
                    }}
                    aria-hidden="true"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="relative z-10 w-full max-w-xs"
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                      <Lock size={24} />
                    </div>

                    <h3 className="mb-1.5 text-lg font-semibold text-white">Prototype locked</h3>
                    <p className="mb-6 text-sm font-light text-neutral-400">
                      Enter your access code to open the live TrackPay demo.
                    </p>

                    <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                      <motion.input
                        value={codeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                          if (error) setError(false);
                        }}
                        type="password"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Access code"
                        aria-label="Prototype access code"
                        aria-invalid={error}
                        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`h-12 w-full rounded-xl border bg-black/40 px-4 text-center text-base tracking-[0.3em] text-white placeholder:tracking-normal placeholder:text-neutral-500 outline-none backdrop-blur-sm transition-colors focus:ring-1 ${
                          error
                            ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
                            : "border-white/15 focus:border-indigo-500/50 focus:ring-indigo-500/30"
                        }`}
                      />
                      {error && (
                        <p className="text-xs font-medium text-red-400">
                          Incorrect code. Please try again.
                        </p>
                      )}
                      <button
                        type="submit"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      >
                        Unlock prototype
                        <ArrowRight size={16} />
                      </button>
                    </form>

                    <p className="mt-5 text-[11px] font-medium text-neutral-500">
                      Don't have a code?{" "}
                      <a
                        href="mailto:founder@thetrackpay.com?subject=TrackPay%20prototype%20access"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Request access
                      </a>
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-neutral-500">
            Static, offline demo with sample data — no real money, accounts or backend involved.
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
