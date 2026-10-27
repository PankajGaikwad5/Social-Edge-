"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { serviceTheme } from "@/lib/serviceTheme";
import { cn } from "@/lib/utils";

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

export default function ServiceHero({ href, title, lines, tags, blurb }) {
  const sectionRef = useRef(null);
  const { number, colors } = serviceTheme(href);
  const [base, light, deep] = colors;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".svc-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".svc-card", { y: 40, opacity: 0, duration: 1.2 }, 0.1)
          .from(".svc-meta", { x: -20, opacity: 0, duration: 0.8 }, 0.45)
          .from(".svc-tag", { y: 10, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.55)
          .from(".svc-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.14, ease: "power4.out" }, 0.5)
          .from(".svc-aside > *", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.9);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-b border-graphite/50 bg-edge-black px-6 pt-10 lg:px-10 lg:pt-14">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="svc-crumb">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium uppercase tracking-[0.2em] sm:text-[13px]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li>
              <Link href="/services" className="text-concrete transition-colors duration-300 hover:text-white">
                Services
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">{title}</li>
          </ol>
        </nav>

        <div
          style={{
            // Bright corner light over a base-to-deep wash, as on the Work-by-service card
            backgroundImage: `radial-gradient(60% 75% at 92% 4%, ${light} 0%, transparent 62%), radial-gradient(80% 65% at 30% 100%, ${deep}e6 0%, transparent 72%), linear-gradient(170deg, ${base} 0%, ${deep} 100%)`,
          }}
          className="svc-card surface-dark mt-8 flex min-h-[34rem] flex-col overflow-hidden rounded-lg px-6 pb-8 pt-8 text-white sm:px-10 sm:pt-11 lg:min-h-[clamp(40rem,39.5vw,47.5rem)] lg:pb-10"
        >
          <div className="svc-meta flex items-center gap-4.5">
            <span className="font-display text-[2.75rem] leading-none">{number}</span>
            <span aria-hidden className="h-px w-10 bg-white/80" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-[11px]">Services · {title}</span>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="svc-tag rounded-full border border-white/55 px-3 py-[9px] text-[9.5px] font-bold uppercase leading-none tracking-[0.12em]"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-8 pt-16 lg:grid-cols-[62%_1fr] lg:items-end lg:gap-0">
            <h1 className="font-display text-[clamp(3.4rem,7.75vw,9.4rem)] leading-[0.9] tracking-[-0.02em]">
              {lines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <span className="svc-line-inner block">{line}</span>
                </span>
              ))}
            </h1>

            <div className="svc-aside lg:pb-[0.4rem]">
              <p className="max-w-[29rem] font-display text-[clamp(1.15rem,1.17vw,1.4rem)] leading-[1.45]">{blurb}</p>

              <Magnetic className="mt-6 w-fit">
                <Link
                  href="/contact"
                  className={cn(
                    "group flex h-14.5 w-fit items-center gap-4 rounded-full bg-white pl-6 pr-2 text-ink transition-[gap] duration-500 hover:gap-6",
                    EASE_OUT
                  )}
                >
                  <span className="font-display text-[1.25rem] leading-none">Start a project</span>
                  <span
                    data-magnetic-inner
                    style={{ backgroundColor: deep }}
                    className="relative flex size-10.5 items-center justify-center overflow-hidden rounded-full text-white"
                  >
                    <ArrowRight size={17} strokeWidth={1.75} className={cn("absolute transition-transform duration-500 group-hover:translate-x-[220%]", EASE_OUT)} />
                    <ArrowRight size={17} strokeWidth={1.75} className={cn("absolute -translate-x-[220%] transition-transform duration-500 group-hover:translate-x-0", EASE_OUT)} />
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
