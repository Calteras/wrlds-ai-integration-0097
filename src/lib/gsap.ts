import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Default ease used across all page animations
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  back: "back.out(1.4)",
  expo: "expo.out",
};

export { gsap, ScrollTrigger };
