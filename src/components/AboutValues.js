"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { title: "Creativity", body: "We challenge conventions with bold ideas that make brands stand out." },
  { title: "Collaboration", body: "We work hand-in-hand with clients, aligned to their goals." },
  { title: "Strategic excellence", body: "Every solution is rooted in data and thoughtful planning, built for long-term impact." },
  { title: "Transparency", body: "Open processes, clear pricing, visible reporting. No smoke and mirrors." },
  { title: "Client-centricity", body: "Clients are at the heart of everything we do." },
  { title: "Honest communication", body: "We tell you what works, what doesn't, and what we'd do differently." },
];

// Hover runs on one even ease-in-out curve: no burst at the start, a soft landing, and a slightly
// quicker release. Colour changes are opacity cross-fades so they stay smooth.
const EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";
const DURATION = "duration-[400ms] group-hover:duration-[550ms]";

// Per-card light colours, as in the reference. An explicit, approved exception to the brand palette
// for this section only. "base" tints the number, label and dash; "light" is the bright corner.
const TONES = [
  { base: "#e8457c", light: "#ff8fc0" },
  { base: "#7b5cff", light: "#b89cff" },
  { base: "#f07a2a", light: "#ffb15c" },
  { base: "#22c3a6", light: "#6ef0d4" },
  { base: "#3b7bff", light: "#7fb2ff" },
  { base: "#e0a92e", light: "#ffd36b" },
];

export default function AboutValues() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".values-line-inner", {
          yPercent: 112,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".values-heading", start: "top 85%", once: true },
        });

        gsap.from(".value-card", {
          y: 50,
          opacity: 0,
          duration: 1.1,
          stagger: { each: 0.09, grid: [2, 3], from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 82%", once: true },
        });

      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-t border-graphite/50 bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <h2 className="values-heading font-display text-[clamp(2.4rem,2.75vw,3.4rem)] leading-tight text-white">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="values-line-inner block">What we stand for</span>
          </span>
        </h2>

        <ul className="values-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4.5">
          {VALUES.map((value, i) => {
            const number = String(i + 1).padStart(2, "0");
            const tone = TONES[i];
            return (
              <li
                key={value.title}
                style={{ "--tone": tone.base, "--tone-light": tone.light }}
                className="value-card surface-dark group relative min-h-52 overflow-hidden rounded-md border border-graphite/50 bg-black-depth px-8.5 py-10 transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-graphite hover:duration-[550ms]"
              >
                {/* Corner light: a faint tint at rest; the full wash fades in over it */}
                <span className="value-glow-rest pointer-events-none absolute inset-0" />
                <span className={cn("value-glow-hover pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100", DURATION, EASE)} />

                {/* The number rises and grows a touch while its full-colour copy fades in over the dim one */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -bottom-[0.22em] right-0 origin-bottom-right font-display text-[11rem] leading-none transition-transform will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.04]",
                    DURATION,
                    EASE
                  )}
                >
                  <span className="block text-[color-mix(in_srgb,var(--tone)_20%,transparent)]">{number}</span>
                  <span className={cn("absolute inset-0 text-(--tone) opacity-0 transition-opacity group-hover:opacity-100", DURATION, EASE)}>
                    {number}
                  </span>
                </span>

                <p className={cn("relative text-[11px] font-semibold tracking-[0.2em] text-(--tone) transition-transform group-hover:translate-x-1.5", DURATION, EASE)}>
                  {number}
                </p>
                <h3 className="relative mt-3.5 font-display text-[1.75rem] leading-tight text-white">{value.title}</h3>
                <span className={cn("relative mt-3 block h-px w-5.5 bg-(--tone) transition-[width] group-hover:w-12", DURATION, EASE)} />
                <p className="relative mt-5 max-w-[24rem] text-sm leading-relaxed text-white/85">{value.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
