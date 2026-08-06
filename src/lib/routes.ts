export const SECTION_PATHS: Record<string, string> = {
  home: "/",
  team: "/team",
  vision: "/vision",
  product: "/product",
  survey: "/survey",
};

export const SECTION_TITLES: Record<string, string> = {
  home: "TrackPay — Unified Money OS",
  team: "Meet the Founders — TrackPay",
  vision: "Our Vision — TrackPay",
  product: "Product — Interactive Demo — TrackPay",
  survey: "Share Your Feedback — TrackPay",
};

export function sectionFromPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  const match = Object.entries(SECTION_PATHS).find(([, sectionPath]) => sectionPath === path);
  return match ? match[0] : "home";
}
