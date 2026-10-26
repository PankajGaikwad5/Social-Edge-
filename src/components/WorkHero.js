"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Typewriter from "@/components/Typewriter";
import { cn } from "@/lib/utils";

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

const WORDS = ["Cultures", "Markets", "Brands", "Audiences", "Conversations"];

export default function WorkHero() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".work-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".work-eyebrow", { x: -20, opacity: 0, duration: 0.8 }, 0.1)
          .from(".work-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.14, ease: "power4.out" }, 0.2)
          .from([".work-trusted", ".work-cta"], { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.7);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-b border-graphite/50 bg-edge-black px-6 pb-16 pt-10 lg:px-10 lg:pb-20 lg:pt-14">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="work-crumb">
          <ol className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.2em]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">Work</li>
          </ol>
        </nav>

        <p className="work-eyebrow mt-14 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
          <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
            <span className="size-1.5 rounded-full bg-edge-stone" />
          </span>
          Our work &amp; case studies
        </p>

        <h1 className="mt-6 font-display text-[15vw] leading-[0.98] tracking-[-0.025em] sm:text-[clamp(4rem,10.4vw,12.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="work-line-inner block text-white">Work that moves</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="work-line-inner block min-h-[1em] whitespace-nowrap text-edge-stone-60">
              <Typewriter words={WORDS} />
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <p className="work-trusted font-display text-[clamp(1.4rem,1.8vw,2.2rem)] leading-snug text-concrete">
            Trusted by 1000+ brands across India, UAE, Australia, US, UK, Japan and more
          </p>

          <Magnetic className="work-cta shrink-0">
            <Link
              href="/contact"
              className={cn(
                "group flex h-15.5 w-fit items-center gap-4 rounded-full bg-white pl-6.5 pr-2 text-edge-black transition-[gap] duration-500 hover:gap-6",
                EASE_OUT
              )}
            >
              <span className="font-display text-[1.3rem] leading-none">Start yours</span>
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
      </div>
    </section>
  );
}
