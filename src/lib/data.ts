import skincare from "@/assets/raw/skincare.jpg";
import sneaker from "@/assets/raw/sneaker.jpg";
import chrome from "@/assets/raw/chrome.jpg";
import restaurant from "@/assets/raw/restaurant.jpg";
import architecture from "@/assets/raw/architecture.jpg";
import coffee from "@/assets/raw/coffee.jpg";
import fitness from "@/assets/raw/fitness.jpg";
import fashion from "@/assets/raw/fashion.jpg";

export const IMG = { skincare, sneaker, chrome, restaurant, architecture, coffee, fitness, fashion };

export const VIDEO = {
  shoe: "https://videos.pexels.com/video-files/8456210/8456210-sd_540_960_25fps.mp4",
  boxer: "https://videos.pexels.com/video-files/8472272/8472272-sd_540_960_25fps.mp4",
  wraps: "https://videos.pexels.com/video-files/9943337/9943337-sd_540_960_24fps.mp4",
};

export const EMAIL = "vrapitupp@gmail.com";

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export type VisualKind = "live-ghar" | "live-saal" | "image";

export type Project = {
  id: string; name: string; industry: string; services: string[]; year: string;
  description: string; challenge: string; solution: string;
  results: { value: string; label: string }[]; bg: string; visual: VisualKind; image: string; liveUrl?: string;
};

export const FEATURED: Project[] = [
  {
    id: "ghar-home", name: "GHAR", industry: "Home food · Hyderabad", services: ["Website", "UI / UX"], year: "2026",
    description: "A real-world home-food experience built around discovery, trust, and a warm Hyderabad-first identity.",
    challenge: "Turn a home-food concept into a digital experience that feels credible, distinctive, and effortless to explore.",
    solution: "A focused interface with strong visual hierarchy, clear discovery paths, and a polished experience designed around the actual GHAR product.",
    results: [{ value: "LIVE", label: "Website" }, { value: "01", label: "Real project" }, { value: "2026", label: "Launch" }],
    bg: "#171717", visual: "live-ghar", image: restaurant, liveUrl: "https://gharhome-qgw2sbkx.manus.space/",
  },
];

export const LATEST: Project = {
  id: "saal", name: "Saal", industry: "Furniture · India", services: ["Website", "Creative Direction"], year: "2026",
  description: "An editorial furniture experience built around warm materials, refined typography, and a highly tactile browsing experience.",
  challenge: "Create a premium furniture site that feels crafted rather than templated, while keeping the browsing experience clear and responsive.",
  solution: "A fully self-contained, motion-led interface with editorial layouts, product storytelling, responsive navigation, and interactive collection details.",
  results: [{ value: "LIVE", label: "Website" }, { value: "01", label: "Real project" }, { value: "2026", label: "Launch" }],
  bg: "#F2EFE9", visual: "live-saal", image: architecture, liveUrl: "/saal/index.html",
};

export const MORE: Project[] = [];
