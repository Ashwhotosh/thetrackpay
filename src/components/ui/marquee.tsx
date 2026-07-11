import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Controlled pause state - takes precedence over pauseOnHover's CSS hover. */
  paused?: boolean;
  children: React.ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  paused,
  children,
  ...props
}: MarqueeProps) {
  const playState =
    paused === undefined ? undefined : paused ? "paused" : "running";

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] flex-row",
        className
      )}
    >
      <div
        style={playState ? { animationPlayState: playState } : undefined}
        className={cn(
          "flex w-max shrink-0 [gap:var(--gap)] animate-marquee flex-row",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        style={playState ? { animationPlayState: playState } : undefined}
        className={cn(
          "flex w-max shrink-0 [gap:var(--gap)] animate-marquee flex-row",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
