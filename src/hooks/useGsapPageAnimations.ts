import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ease } from "@/lib/gsap";

/**
 * Orchestrates GSAP scroll animations for the landing page.
 *
 * Strategy: GSAP targets wrapper divs ([data-gsap-section]) so it never
 * conflicts with Framer Motion, which operates on child motion.* elements.
 */
export function useGsapPageAnimations() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. Scroll progress bar ─────────────────────────────────────────────
      gsap.to("[data-gsap-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          scrub: 0.3,
          start: "top top",
          end: "bottom bottom",
        },
      });

      // ── 2. Section wrappers: staggered reveal on scroll ────────────────────
      // Each [data-gsap-section] starts invisible; GSAP reveals it when the
      // top edge crosses 82% of the viewport.
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-section]")
        .forEach((section, i) => {
          const delay = i === 0 ? 0 : 0; // hero is always visible

          gsap.fromTo(
            section,
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay,
              ease: ease.expo,
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── 3. Section heading clip-path reveal ───────────────────────────────
      // Targets h2 elements that carry [data-gsap-heading].
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-heading]")
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.85,
              ease: ease.expo,
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── 4. Eyebrow / label slide-up ───────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-eyebrow]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: ease.out,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── 5. Card / grid items stagger ─────────────────────────────────────
      // Groups are marked [data-gsap-cards]; direct children get staggered.
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-cards]")
        .forEach((container) => {
          const items = container.children;
          gsap.fromTo(
            items,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: ease.back,
              scrollTrigger: {
                trigger: container,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── 6. Stat counters pop-in ───────────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-stat]")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              delay: i * 0.12,
              ease: ease.back,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ── 7. Hero parallax on scroll ────────────────────────────────────────
      const hero = document.querySelector<HTMLElement>("[data-gsap-hero]");
      if (hero) {
        gsap.to(hero, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── 8. Floating blob parallax (background decorations) ────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-blob]")
        .forEach((blob, i) => {
          gsap.to(blob, {
            yPercent: i % 2 === 0 ? -30 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: blob.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });

      // ── 9. Horizontal dividers draw in ───────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-gsap-divider]")
        .forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: ease.expo,
              scrollTrigger: {
                trigger: line,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return pageRef;
}
