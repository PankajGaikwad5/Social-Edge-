"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Sparkle } from "lucide-react";
import { leftwardMarquee } from "@/lib/marquee";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Sample figures and copy: replace with the real ones before launch
const GLANCE = [
  { value: 2019, label: "Founded in Mumbai", plain: true },
  { value: 50, suffix: "+", label: "People across Mumbai, Pune and Dubai" },
  { value: 1000, suffix: "+", label: "Brands served" },
  { value: 95, suffix: "%", label: "Client retention" },
  { value: 7, suffix: "x", label: "Average ROAS across 100+ performance accounts" },
  { value: 3, label: "Offices: Mumbai (HQ), Pune, Dubai" },
];

const CHAPTERS = [
  {
    id: "redefining-trust",
    title: "Redefining Trust in Marketing",
    intro:
      "In a world where trust in marketing agencies has often been eroded by deception and miscommunication, Social Edge stands apart. We build relationships rooted in transparency, honest communication, and results-driven partnerships.",
    columns: "lg:grid-cols-3",
    cards: [
      { title: "Transparency", body: ["Open processes, clear pricing, and visible reporting: no smoke and mirrors."] },
      { title: "Honest Communication", body: ["We tell you what works, what doesn't, and what we'd do differently: always."] },
      { title: "Results-Driven Partnerships", body: ["Every campaign is measured against business outcomes that matter to you."] },
    ],
  },
  {
    id: "story-mission",
    title: "Our Story and Our Mission",
    columns: "lg:grid-cols-2",
    cards: [
      {
        title: "Our Vision",
        body: [
          "To be the most trusted and innovative digital marketing partner, empowering businesses through transparency, creativity, and strategic excellence, redefining the client-agency relationship with integrity and results-driven success.",
        ],
      },
      {
        title: "Our Mission",
        body: [
          "At Social Edge, we are dedicated to rebuilding trust in the marketing industry through transparent communication, expert-driven strategies, and culturally relevant creative solutions. We aim to deliver exceptional results that build brands and foster long-lasting, collaborative partnerships focused on mutual success.",
        ],
      },
    ],
  },
  {
    id: "our-values",
    title: "Our Values",
    columns: "sm:grid-cols-2 lg:grid-cols-4",
    cards: [
      { title: "Creativity", body: ["We challenge conventions with bold, innovative ideas that push boundaries and make brands stand out."] },
      { title: "Collaboration", body: ["We work hand-in-hand with our clients, aligning our efforts with their goals to achieve shared success."] },
      {
        title: "Strategic Excellence",
        body: [
          "Every solution we deliver is rooted in data-driven analysis and thoughtful planning, designed for long-term impact.",
          "We believe in open and honest communication, ensuring clarity at every step of our client partnerships.",
        ],
      },
      {
        title: "Client-Centricity",
        body: ["Our clients are at the heart of everything we do, and we are committed to delivering results that exceed their expectations."],
      },
    ],
  },
];

const MARQUEE_WORDS = ["Transparency", "Honest Communication", "Results-Driven Partnerships"];

const format = (v, plain) => (plain ? String(Math.round(v)) : Math.round(v).toLocaleString("en-US"));
const pad = (i) => String(i + 1).padStart(2, "0");

function MarqueeRow({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {MARQUEE_WORDS.map((word) => (
        <li key={word} className="flex items-center">
          <span className="whitespace-nowrap font-display text-[clamp(2.75rem,3.6vw,4.4rem)] leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-white)_45%,transparent)]">
            {word}
          </span>
          <Sparkle size={20} strokeWidth={1.5} className="mx-12 shrink-0 text-edge-stone" />
        </li>
      ))}
    </ul>
  );
}

function ChapterCard({ card, index }) {
  return (
    // The li carries the scroll reveal; the inner card owns the hover lift, so the two never fight
    <li className="chapter-item flex">
      <div className="chapter-card relative flex w-full flex-col rounded-2xl border border-graphite/60 px-7 pb-9 pt-8 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-edge-stone/40">
      <span className="text-[11px] tracking-[0.2em] text-concrete">{pad(index)}</span>
      <h4 className="mt-3 font-display text-2xl leading-tight text-white">{card.title}</h4>
      {card.body.map((paragraph) => (
        <p key={paragraph} className="mt-3.5 text-[15px] leading-relaxed text-white/80 [&+p]:mt-4">
          {paragraph}
        </p>
      ))}
      </div>
    </li>
  );
}

function Chapter({ chapter, index }) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="chapter scroll-mt-28 border-t border-graphite/50 py-24 first:border-t-0 lg:py-30"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
        <div>
          <p className="chapter-number font-display text-[clamp(5rem,7vw,8.5rem)] font-light leading-[0.9] text-edge-stone-60">
            {pad(index)}
          </p>
          <h3 id={`${chapter.id}-title`} className="mt-3 font-display text-[clamp(2rem,2.4vw,2.9rem)] leading-tight text-white">
            {chapter.title}
          </h3>
        </div>
        {chapter.intro && (
          <p className="chapter-intro max-w-[33rem] pb-2 text-base leading-[1.7] text-white/80">{chapter.intro}</p>
        )}
      </div>

      <ul className={cn("mt-14 grid gap-4", chapter.columns)}>
        {chapter.cards.map((card, i) => (
          <ChapterCard key={card.title} card={card} index={i} />
        ))}
      </ul>
    </section>
  );
}

export default function AboutMore() {
  const sectionRef = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(null);

  function jumpTo(e, id) {
    e.preventDefault();
    // Absolute position, clear of the sticky navbar
    const y = document.getElementById(id).getBoundingClientRect().top + window.scrollY - 110;
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  useGSAP(
    () => {
      // Highlight the pill for whichever chapter is crossing the middle of the screen
      gsap.utils.toArray(".chapter").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(el.id),
          // Scrolling back above the first chapter returns to the default highlight
          onLeaveBack: () => i === 0 && setActive(null),
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".more-reveal", {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });

        gsap.utils.toArray(".glance-value").forEach((el) => {
          const target = Number(el.dataset.value);
          const plain = Boolean(el.dataset.plain);
          // The founding year counts up from a few years earlier rather than from zero
          const counter = { v: plain ? target - 12 : 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => (el.textContent = format(counter.v, plain)),
            scrollTrigger: { trigger: ".glance-value", start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray(".chapter").forEach((chapter) => {
          const reveal = { trigger: chapter, start: "top 72%", once: true };
          gsap.from(chapter.querySelector(".chapter-number"), { yPercent: 40, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: reveal });
          gsap.from(chapter.querySelectorAll("h3, .chapter-intro"), {
            y: 24,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: reveal,
          });
          gsap.from(chapter.querySelectorAll(".chapter-item"), {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: { trigger: chapter.querySelector("ul"), start: "top 85%", once: true },
          });
        });

        return leftwardMarquee(sectionRef.current.querySelector(".more-track"), {
          trigger: sectionRef.current.querySelector(".more-marquee"),
          duration: 40,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-graphite/50 bg-black-depth px-6 pt-20 lg:px-10 lg:pt-28"
    >
      <div className="mx-auto max-w-334">
        <p className="more-reveal flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
          <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
            <span className="size-1.5 rounded-full bg-edge-stone" />
          </span>
          More about us
        </p>

        <div className="more-reveal mt-9">
          <span className="inline-flex h-9 items-center rounded-full border border-white/70 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            About Social Edge
          </span>
          <h2 className="mt-7 font-display text-[clamp(2rem,2.35vw,2.9rem)] leading-[1.15] tracking-[-0.01em] text-white">
            <span className="lg:block">50+ dedicated professionals </span>
            <span className="lg:block">working with brands across </span>
            <span className="lg:block">
              India, <span className="text-edge-stone-60">UAE, Australia and the US.</span>
            </span>
          </h2>

          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">Social Edge at a glance</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GLANCE.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-graphite/60 bg-black-depth px-6 pb-6 pt-6 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-graphite"
              >
                <p className="font-display text-[clamp(2.75rem,3.2vw,3.9rem)] font-light leading-none text-edge-stone-60">
                  <span className="glance-value" data-value={item.value} data-plain={item.plain ? "1" : ""}>
                    {format(item.value, item.plain)}
                  </span>
                  {item.suffix}
                </p>
                <p className="mt-3 text-sm text-white/85">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="About sections" className="more-reveal mt-9">
          <ul className="flex flex-wrap gap-2.5">
            {CHAPTERS.map((chapter, i) => {
              const isActive = active ? active === chapter.id : i === 0;
              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    onClick={(e) => jumpTo(e, chapter.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-full border pl-1.5 pr-4.5 text-sm transition-colors duration-500",
                      isActive ? "border-white/60 text-white" : "border-graphite/60 text-concrete hover:border-graphite hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-500",
                        isActive ? "bg-edge-stone text-ink" : "bg-graphite/40 text-mist"
                      )}
                    >
                      {pad(i)}
                    </span>
                    {chapter.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Outlined principles drift past between the overview and the chapters */}
        <div className="more-marquee mt-18 overflow-hidden border-y border-graphite/50 py-9 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="more-track flex w-max">
            <MarqueeRow />
            <MarqueeRow hidden />
          </div>
        </div>

        <div className="mt-6">
          {CHAPTERS.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
