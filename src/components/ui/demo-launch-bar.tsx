import { PlayCircle, MessageSquareText, ArrowRight } from "lucide-react";
import { Marquee } from "./marquee";

interface DemoLaunchBarProps {
  onNavigate: () => void;
}

const announcements = [
  { icon: PlayCircle, text: "Our Prototype Demo Video is Live" },
  { icon: MessageSquareText, text: "Share Your Feedback: Takes 2 Minutes" },
];

export function DemoLaunchBar({ onNavigate }: DemoLaunchBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div
        className="pointer-events-auto border-t border-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 15, 25, 0.65) 0%, rgba(8, 8, 15, 0.85) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950/90 to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950/90 to-transparent md:w-28" />

          <button
            onClick={onNavigate}
            aria-label="Watch the product demo video and share feedback"
            className="w-full text-left"
          >
            <Marquee pauseOnHover className="py-2.5 [--duration:22s] [--gap:2.5rem] md:py-3">
              {Array.from({ length: 6 }).map((_, i) => {
                const { icon: Icon, text } = announcements[i % announcements.length];
                return (
                  <div
                    key={i}
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-medium tracking-wide text-neutral-300 transition-colors hover:text-white md:text-sm"
                  >
                    <Icon size={16} className="shrink-0 text-indigo-400" />
                    <span>{text}</span>
                    <ArrowRight size={14} className="shrink-0 text-indigo-400" />
                    <span className="mx-1 text-indigo-500/50 md:mx-2">◈</span>
                  </div>
                );
              })}
            </Marquee>
          </button>
        </div>
      </div>
    </div>
  );
}
