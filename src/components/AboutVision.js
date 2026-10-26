"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Brand-fixed colours: the Warm Stone band and ink text read the same in either theme
export default function AboutVision() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The statement fills in word by word as it scrolls up the screen
        const split = SplitText.create(".vision-statement", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".vision-statement", start: "top 80%", end: "bottom 45%", scrub: 0.8 },
          }
        );

        gsap.from(".vision-rule", {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });

        gsap.from(".vision-mark", {
          yPercent: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: 1 },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-warm-stone px-6 py-24 text-ink lg:px-10 lg:py-32">
      <span
        aria-hidden
        className="vision-mark pointer-events-none absolute -top-[0.18em] right-[2%] font-display text-[clamp(14rem,22vw,26rem)] leading-none text-snow/25"
      >
        &rdquo;
      </span>

      <div className="relative mx-auto max-w-372">
        <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.24em]">
          <span>Our vision</span>
          <span className="vision-rule h-px flex-1 origin-left bg-ink/30" />
          <span>Social Edge</span>
        </div>

        <p className="vision-statement mt-14 font-display text-[9vw] leading-[1.08] tracking-[-0.015em] sm:text-[clamp(3rem,5vw,6rem)] lg:mt-16">
          To be the most trusted and innovative marketing partner, redefining the client-agency relationship with
          integrity and results.
        </p>

        <div className="mt-12 flex justify-end lg:mt-14">
          <Magnetic>
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full border border-ink/70 px-6 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 hover:text-edge-stone"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
              <span className="relative">Work with us</span>
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="relative transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
