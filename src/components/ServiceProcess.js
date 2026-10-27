"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Heading stays put on the left while a stone line traces down the steps and lights each one as it passes
export default function ServiceProcess({ eyebrow, lines, steps }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".process-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".process-list", start: "top 62%", end: "bottom 62%", scrub: 0.6 },
          }
        );

        gsap.utils.toArray(".process-row").forEach((row) => {
          ScrollTrigger.create({ trigger: row, start: "top 62%", toggleClass: { targets: row, className: "is-lit" } });
        });

        gsap.from(".process-line-inner", {
          yPercent: 112,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".process-heading", start: "top 85%", once: true },
        });
      });

      // Without motion every step is simply lit
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(".process-row").forEach((row) => row.classList.add("is-lit"));
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-b border-graphite/50 bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-372 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="self-start lg:sticky lg:top-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-edge-stone">{eyebrow}</p>
          <h2 className="process-heading mt-4 font-display text-[clamp(2.4rem,3.4vw,4rem)] leading-[1.08] text-white">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.1em]">
                <span className="process-line-inner block">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative">
          <span aria-hidden className="process-progress absolute left-0 top-0 h-full w-px origin-top bg-edge-stone" />
          <ol className="process-list border-t border-graphite/60">
            {steps.map((step, i) => (
              <li key={step.title} className="process-row group flex gap-6 border-b border-graphite/60 py-8 pl-5">
                <span className="w-5 shrink-0 pt-2.5 text-[10px] tracking-[0.2em] text-concrete transition-colors duration-700 group-[.is-lit]:text-edge-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,1.75vw,2rem)] leading-tight text-white/45 transition-colors duration-700 group-[.is-lit]:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[26rem] text-[14.5px] leading-relaxed text-concrete">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
