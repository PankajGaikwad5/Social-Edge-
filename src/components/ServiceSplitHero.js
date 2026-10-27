"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { cn } from "@/lib/utils";

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

// Copy on the left, a visual (e.g. <LiveFeed />) on the right; crumb adds a Home / crumb breadcrumb above
export default function ServiceSplitHero({ crumb, eyebrow, lines, body, visual }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".split-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".split-eyebrow", { x: -20, opacity: 0, duration: 0.8 }, 0)
          .from(".split-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.14, ease: "power4.out" }, 0.1)
          .from(".split-visual", { y: 40, opacity: 0, duration: 1.3 }, 0.2)
          .from([".split-body", ".split-cta"], { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.6);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn("border-b border-graphite/50 bg-edge-black px-6 pb-14 lg:px-10 lg:pb-[68px]", crumb ? "pt-10 lg:pt-12" : "pt-14 lg:pt-[68px]")}
    >
      {crumb && (
        <nav aria-label="Breadcrumb" className="split-crumb mx-auto mb-10 max-w-372 lg:mb-14">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium uppercase tracking-[0.2em] sm:text-[13px]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">{crumb}</li>
          </ol>
        </nav>
      )}
      <div className="mx-auto grid max-w-372 items-center gap-12 lg:grid-cols-[1fr_47.5%] lg:gap-16">
        <div>
          <p className="split-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-edge-stone">
            <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="size-1.5 rounded-full bg-edge-stone" />
            </span>
            {eyebrow}
          </p>

          <h1 className="mt-6 font-display text-[clamp(3rem,5.15vw,6.4rem)] leading-[1.04] tracking-[-0.02em] text-white">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.1em]">
                <span className="split-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="split-body mt-6 max-w-[33rem] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.65] text-concrete">{body}</p>

          <Magnetic className="split-cta mt-9 w-fit">
            <Link
              href="/contact"
              className={cn(
                "group flex h-15.5 w-fit items-center gap-4 rounded-full bg-white pl-6.5 pr-2 text-edge-black transition-[gap] duration-500 hover:gap-6",
                EASE_OUT
              )}
            >
              <span className="font-display text-[1.3rem] leading-none">Start a project</span>
              <span
                data-magnetic-inner
                className="relative flex size-11.5 items-center justify-center overflow-hidden rounded-full bg-edge-stone text-white"
              >
                <ArrowRight size={18} strokeWidth={1.75} className={cn("absolute transition-transform duration-500 group-hover:translate-x-[220%]", EASE_OUT)} />
                <ArrowRight size={18} strokeWidth={1.75} className={cn("absolute -translate-x-[220%] transition-transform duration-500 group-hover:translate-x-0", EASE_OUT)} />
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="split-visual">{visual}</div>
      </div>
    </section>
  );
}
