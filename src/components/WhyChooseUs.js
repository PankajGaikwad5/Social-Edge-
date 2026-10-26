"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PILLARS = [
  { title: "Marketing", body: "Strategic campaigns that build visibility, engagement and growth." },
  { title: "Creative Direction", body: "Distinctive visual identities shaped by vision and purpose." },
  { title: "Content & Strategy", body: "Meaningful storytelling backed by thoughtful strategy." },
  { title: "Video Production", body: "Compelling films that bring brand stories to life." },
];

// Desktop line breaks follow the design; full lines are justified, sentence ends stay ragged
const COPY_LINES = [
  { text: "Our approach is deeply data-driven, combining strategic insight with", justify: true },
  { text: "creative execution to craft campaigns that resonate and perform." },
  { text: "We engage closely with each client to understand their unique", justify: true },
  { text: "story and business goals, tailoring every strategy to drive bold,", justify: true },
  { text: "authentic growth." },
];

const BADGE_TEXT = "MARKETING • CREATIVE • CONTENT • VIDEO • ";

// Each headline line is masked so its text can rise into place
function Line({ children }) {
  return (
    <span className="why-line block overflow-hidden pb-[0.06em]">
      <span className="why-line-inner block will-change-transform">{children}</span>
    </span>
  );
}

function RotatingBadge() {
  const badgeRef = useRef(null);

  // Magnetic pull towards the cursor
  function onMove(e) {
    const box = badgeRef.current.getBoundingClientRect();
    gsap.to(badgeRef.current, {
      x: (e.clientX - box.left - box.width / 2) * 0.25,
      y: (e.clientY - box.top - box.height / 2) * 0.25,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function onLeave() {
    gsap.to(badgeRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <div
      ref={badgeRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="why-badge relative size-24 shrink-0 sm:size-36"
    >
      <svg viewBox="0 0 144 144" className="why-badge-ring absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="why-badge-path" d="M72,72 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text className="fill-mist font-sans text-[10.5px] font-medium tracking-[0.32em]">
          <textPath href="#why-badge-path">{BADGE_TEXT}</textPath>
        </text>
      </svg>

      <Link
        href="/contact"
        aria-label="Start a project with us"
        className="group absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-graphite bg-black-depth text-white transition-colors duration-500 hover:border-white sm:size-20 hover:bg-white hover:text-edge-black"
      >
        <ArrowUpRight
          size={24}
          strokeWidth={1.5}
          className="transition-transform duration-500 group-hover:rotate-45"
        />
      </Link>
    </div>
  );
}

function PillarCard({ pillar, index }) {
  return (
    <article className="why-card group relative overflow-hidden rounded-2xl border border-graphite/60 bg-black-depth px-3.5 pb-3.5 pt-8 transition-colors sm:px-5.5 sm:pb-4.5 sm:pt-10 duration-500 hover:border-graphite">
      <span
        aria-hidden
        className="why-card-number pointer-events-none absolute right-3.5 top-1 font-display text-[2.6rem] leading-none text-graphite/45 sm:text-[clamp(3.25rem,4vw,4.75rem)] transition-colors duration-500 group-hover:text-graphite"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="relative flex items-center gap-2 font-display text-lg leading-tight text-white sm:gap-3 sm:text-[1.375rem]">
        {pillar.title}
        <span className="h-px w-5 bg-white/70 transition-all duration-500 group-hover:w-10 group-hover:bg-edge-stone" />
      </h3>
      <p className="relative mt-1.5 max-w-[36ch] text-xs leading-normal text-concrete sm:text-[13px]">{pillar.body}</p>
    </article>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        gsap.from(".why-eyebrow", {
          x: -24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: reveal(".why-eyebrow", "top 88%"),
        });

        gsap.to(".why-eyebrow-dot", {
          scale: 1.6,
          opacity: 0.35,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Headline lines rise straight up out of their masks, keeping a clean left edge
        gsap.from(".why-line-inner", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: reveal(".why-heading"),
        });

        // Copy lights up word by word, tied to scroll
        SplitText.create(".why-copy", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: ".why-copy", start: "top 82%", end: "bottom 55%", scrub: 0.8 },
              }
            ),
        });

        gsap.from(".why-card", {
          y: 70,
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          stagger: { each: 0.12, grid: [2, 2], from: "start" },
          ease: "power3.out",
          scrollTrigger: reveal(".why-cards", "top 85%"),
        });

        gsap.from(".why-card-number", {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.12,
          delay: 0.25,
          ease: "power4.out",
          scrollTrigger: reveal(".why-cards", "top 85%"),
        });

        // Numbers slide within their cards for a little depth while scrolling
        gsap.utils.toArray(".why-card-number").forEach((number) => {
          gsap.fromTo(
            number,
            { y: 14 },
            {
              y: -14,
              ease: "none",
              scrollTrigger: { trigger: number.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        gsap.from(".why-badge", {
          scale: 0,
          rotate: -160,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: reveal(".why-actions", "top 90%"),
        });

        // The ring turns steadily and speeds up with scroll velocity
        const spin = gsap.to(".why-badge-ring", {
          rotation: 360,
          duration: 16,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 300);
            gsap.to(spin, {
              timeScale: boost * self.direction,
              duration: 0.2,
              overwrite: true,
              onComplete: () =>
                gsap.to(spin, { timeScale: self.direction, duration: 1.4, ease: "power2.out" }),
            });
          },
        });

        gsap.from(".why-cta", {
          opacity: 0,
          y: 20,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: reveal(".why-actions", "top 90%"),
        });

        gsap.from(".why-rule", {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: ".why-rule", start: "top 98%", end: "top 60%", scrub: 1 },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-edge-black px-6 pt-20 lg:px-10 lg:pt-24">
      <div className="mx-auto grid max-w-372 gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="why-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
            <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="why-eyebrow-dot size-1.5 rounded-full bg-edge-stone" />
            </span>
            Why visionary brands choose us?
          </p>

          <h2 className="why-heading mt-8 font-display text-[9vw] uppercase leading-[0.98] tracking-tight text-white sm:text-[clamp(3rem,4.6vw,5.5rem)]">
            {/* Two short statements, the second set in stone and given a little air above it */}
            <Line>A distinct</Line>
            <Line>perspective.</Line>
            <span className="mt-[0.1em] block text-edge-stone-60">
              <Line>A more</Line>
              <Line>considered</Line>
              <Line>approach.</Line>
            </span>
          </h2>

          <div className="why-actions mt-9 flex items-center gap-6 sm:gap-11">
            <RotatingBadge />

            <Link
              href="/contact"
              className="why-cta group relative inline-flex items-center gap-3 whitespace-nowrap pb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:gap-4 sm:text-xs sm:tracking-[0.24em]"
            >
              Let&apos;s build together
              <ArrowRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/80 transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-edge-stone transition-transform delay-150 duration-500 group-hover:scale-x-100" />
            </Link>
          </div>
        </div>

        <div className="lg:pt-9">
          <p className="why-copy font-display text-[clamp(1.05rem,1.25vw,1.5rem)] leading-normal text-white">
            {COPY_LINES.map((line) => (
              <span
                key={line.text}
                className={cn("lg:block", line.justify && "lg:[text-align-last:justify]")}
              >
                {line.text}{" "}
              </span>
            ))}
          </p>

          <div className="why-cards mt-10 grid grid-cols-2 gap-2.5 sm:gap-3">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="why-rule mx-auto mt-20 h-px max-w-372 origin-left bg-graphite/60 lg:mt-16" />
    </section>
  );
}
