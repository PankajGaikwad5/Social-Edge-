"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

// Stock team photo for now; the reference uses the real team shot ("Together, we can.")
const PHOTO = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=75&auto=format&fit=crop";

function ApplyButton() {
  const ref = useRef(null);
  const hover = useRef(null);

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(".apply-circle", { scale: 1.08 }, 0)
        .to(".apply-arrow", { x: 3 }, 0);
    },
    { scope: ref }
  );

  return (
    <Magnetic className="career-reveal">
      <Link
        ref={ref}
        href="/career/full-time"
        onMouseEnter={() => hover.current?.timeScale(1).play()}
        onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
        className="flex h-15 items-center gap-6 rounded-full bg-white pl-6.5 pr-2 text-edge-black"
      >
        <span className="font-display text-[1.2rem]">Apply full-time</span>
        <span data-magnetic-inner className="apply-circle flex size-11 items-center justify-center rounded-full bg-edge-stone text-ink">
          <ArrowRight size={18} strokeWidth={1.75} className="apply-arrow" />
        </span>
      </Link>
    </Magnetic>
  );
}

export default function CareerHero() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".career-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".career-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.14, ease: "power4.out" }, 0.1)
          .from(".career-reveal", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
          .from(".career-photo", { clipPath: "inset(100% 0% 0% 0% round 8px)", duration: 1.4, ease: "expo.inOut" }, 0.2)
          .from(".career-photo img", { scale: 1.15, duration: 1.8, ease: "expo.out" }, 0.5);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-edge-black px-6 pb-20 pt-4 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="career-crumb">
          <ol className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.2em]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">Careers</li>
          </ol>
        </nav>

        <div className="mt-12 grid items-center gap-14 lg:mt-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="career-reveal flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-edge-stone">
              <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
                <span className="size-1.5 rounded-full bg-edge-stone" />
              </span>
              Careers
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,5.3vw,5.6rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {[
                { text: "Do the best work", accent: false },
                { text: "of your life here.", accent: true },
              ].map((line) => (
                <span key={line.text} className="block overflow-hidden pb-[0.1em]">
                  <span className={line.accent ? "career-line-inner block text-edge-stone-60" : "career-line-inner block"}>{line.text}</span>
                </span>
              ))}
            </h1>
            <p className="career-reveal mt-6 max-w-[31rem] text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-concrete">
              Strategists, designers, editors, filmmakers and media buyers across three cities. Full-time roles and a freelance bench.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ApplyButton />
              <Link
                href="/career/freelance"
                className="career-reveal flex h-15 items-center rounded-full border border-white/20 px-6.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-white"
              >
                Join as a freelancer
              </Link>
            </div>
          </div>

          <div className="career-photo surface-dark relative aspect-[1.25] overflow-hidden rounded-lg bg-black-depth">
            <img src={PHOTO} alt="The Social Edge team" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
