import FeedbackForm from "./feedback-form";

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/xsLY5tpoz8Q";

export default function SurveyPage() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-24 text-white">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            Live Prototype
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            See TrackPay in Action.
          </h1>
          <p className="max-w-2xl text-lg font-light text-neutral-400 md:text-xl">
            A first look at TrackPay, the payment app with a financial intelligence layer for India, then tell us what you think.
            Your feedback directly shapes what ships next.
          </p>
        </div>

        {/* Video */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/40 shadow-[0_10px_40px_rgba(99,102,241,0.08)]">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={YOUTUBE_EMBED_URL}
              title="TrackPay Demo"
              allow="accelerated-motion; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-4 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Your Feedback Shapes v1
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Tell us what you think.
          </h2>
          <p className="max-w-xl font-light text-neutral-400">
            We built a short survey comparing your experience with existing payment apps to
            what TrackPay offers. Fill it out below, it takes about two minutes.
          </p>
          <svg
            className="mt-2 h-6 w-6 animate-pulse text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Form */}
        <FeedbackForm />
      </div>
    </section>
  );
}
