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

// Brand materials stand in for the reference's per-service colours
const TILES = {
  stone: { surface: "bg-warm-stone", number: "text-white/75" },
  depth: { surface: "bg-black-depth ring-1 ring-inset ring-graphite/70", number: "text-white/45" },
  ivory: { surface: "bg-ivory-fade ring-1 ring-inset ring-concrete/25", number: "text-edge-black/25" },
  graphite: { surface: "bg-graphite", number: "text-white/50" },
};

// Sample figures for layout — swap in real numbers before launch
export const SERVICES = [
  {
    title: "Social Media Marketing",
    href: "/services/social-media",
    body: "Amplify your brand presence and drive engagement across all major social platforms.",
    stats: [
      { value: 2.4, decimals: 1, suffix: "B", label: "Views" },
      { value: 640, suffix: "+", label: "Brands" },
      { value: 12, suffix: "x", label: "Growth" },
    ],
    tile: "stone",
  },
  {
    title: "PR and Influencer Marketing",
    href: "/services/influencer-marketing",
    body: "Build trust and expand your reach through strategic public relations and authentic influencer collaborations.",
    stats: [
      { value: 96, suffix: "M+", label: "Impressions" },
      { value: 410, suffix: "+", label: "Creators" },
      { value: 4.2, decimals: 1, suffix: "x", label: "ROI" },
    ],
    tile: "depth",
  },
  {
    title: "Campaign Shoot",
    href: "/services/campaign-shoot",
    body: "Bring your campaigns to life with high-quality, creative shoots built for multi-channel success.",
    stats: [
      { value: 72, suffix: "+", label: "Shoots" },
      { value: 3.6, decimals: 1, suffix: "x", label: "Higher CTR" },
      { value: 1200, suffix: "+", label: "Creatives" },
    ],
    tile: "ivory",
  },
  {
    title: "Branding, Design & Packaging",
    href: "/services/branding",
    body: "Craft a memorable brand identity and packaging that differentiates in competitive markets.",
    stats: [
      { value: 180, suffix: "+", label: "Brands" },
      { value: 1400, suffix: "+", label: "Designs" },
      { value: 78, suffix: "%", label: "Recall" },
    ],
    tile: "graphite",
  },
  {
    title: "Photography & Videography",
    href: "/services/photography",
    body: "Capture brand moments with professional visuals tailored for maximum engagement.",
    stats: [
      { value: 2100, suffix: "+", label: "Shoots" },
      { value: 7, suffix: "x", label: "Engagement" },
      { value: 9500, suffix: "+", label: "Edits" },
    ],
    tile: "depth",
  },
  {
    title: "Website Development",
    href: "/services/web-development",
    body: "Design and develop seamless, user-friendly websites that convert visitors into loyal customers.",
    stats: [
      { value: 140, suffix: "+", label: "Websites" },
      { value: 1.8, decimals: 1, suffix: "s", label: "Avg load" },
      { value: 92, suffix: "%", label: "Retention" },
    ],
    tile: "stone",
  },
  {
    title: "Event Marketing",
    href: "/services/event-marketing",
    body: "Plan and execute brand events that create real-world moments and lasting connections.",
    stats: [
      { value: 85, suffix: "+", label: "Events" },
      { value: 3.4, decimals: 1, suffix: "x", label: "Engagement" },
      { value: 30, suffix: "%", label: "Lower CPL" },
    ],
    tile: "graphite",
  },
  {
    title: "Performance Marketing",
    href: "/services/performance-marketing",
    body: "Drive ROI-focused ad campaigns using data-driven strategies and real-time optimisation.",
    stats: [
      { value: 8.5, decimals: 1, suffix: "x", label: "ROAS" },
      { value: 6, suffix: "L+", label: "Leads" },
      { value: 40, suffix: "Cr+", label: "Ad spend managed" },
    ],
    tile: "ivory",
  },
];

// How long each stat holds in the hover overlay before the next one counts in
const STAT_HOLD = 2.2;

const COPY_LINES = [
  { text: "At Social Edge, we offer a comprehensive suite", lead: "At Social Edge,", justify: true },
  { text: "of marketing solutions tailored to your unique", justify: true },
  { text: "business goals, backed by data, creativity, and", justify: true },
  { text: "proven strategies." },
];

const formatStat = (value, decimals = 0) =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const statText = (stat) => `${formatStat(stat.value, stat.decimals)}${stat.suffix} ${stat.label}`;

function ServiceCard({ service, index }) {
  const tile = TILES[service.tile];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="service-card group relative flex w-[82vw] shrink-0 snap-start flex-col border-r border-graphite/40 bg-edge-black p-6 first:ml-6 last:mr-6 sm:mx-0! sm:w-auto sm:border-0 sm:p-7.5">
      <div className="pointer-events-none absolute inset-0 bg-black-depth opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className={cn("service-tile surface-dark relative aspect-[1.46] overflow-hidden rounded-sm", tile.surface)}>
        <span className="tile-grid absolute inset-0" />
        <span
          className={cn(
            "service-tile-number absolute bottom-3 left-5.5 font-display text-[clamp(3rem,3.6vw,4.4rem)] leading-none",
            tile.number
          )}
        >
          {number}
        </span>

        {/* Revealed on hover */}
        <div className="service-overlay absolute inset-0 flex flex-col bg-edge-black/60 p-5 opacity-0" aria-hidden>
          <div className="service-overlay-head flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            <span>{number}</span>
            <span className="h-px w-4 bg-white/70" />
            <span className="min-w-0 flex-1 truncate">{service.title}</span>
            <span className="flex items-center gap-1">
              {service.stats.map((stat, i) => (
                <span
                  key={stat.label}
                  className={cn("service-dot h-0.5 bg-white", i === 0 ? "w-5" : "w-1.5 opacity-40")}
                />
              ))}
            </span>
          </div>

          <span className="service-overlay-rule mt-auto h-px w-[85%] origin-left bg-white/80" />
          <p className="service-overlay-stat mt-4 flex items-baseline gap-3 text-white">
            <span className="font-display text-[clamp(2.4rem,2.8vw,3.3rem)] leading-none">
              <span className="service-stat-value">
                {formatStat(service.stats[0].value, service.stats[0].decimals)}
              </span>
              <span className="service-stat-suffix">{service.stats[0].suffix}</span>
            </span>
            <span className="service-stat-label text-[10px] font-semibold uppercase tracking-[0.22em]">
              {service.stats[0].label}
            </span>
          </p>
        </div>
      </div>

      <p className="relative mt-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-mist">
        {number}
        <span className="service-index-rule h-px w-12 origin-left scale-x-0 bg-mist/70" />
      </p>
      <h3 className="relative mt-4 font-display text-[1.75rem] leading-[1.12] text-white">{service.title}</h3>
      <p className="relative mt-4 max-w-[34ch] text-[15px] leading-normal text-concrete">{service.body}</p>

      <div className="relative mt-auto pt-10">
        <p className="border-t border-graphite/50 pt-5 text-[10px] font-semibold uppercase leading-snug text-white">
          {service.stats.map(statText).join(" | ")}
        </p>
        <Link
          href={service.href}
          className="mt-5 inline-flex h-8 items-center gap-2 rounded-full border border-white/30 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:border-white group-hover:border-white group-hover:bg-white group-hover:text-edge-black"
        >
          View work
          <ArrowUpRight size={12} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        gsap.from(".wwd-eyebrow", { x: -24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: reveal(".wwd-eyebrow", "top 88%") });

        gsap.from(".wwd-line-inner", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: reveal(".wwd-heading"),
        });

        gsap.from(".wwd-divider", {
          scaleY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: reveal(".wwd-panel"),
        });

        SplitText.create(".wwd-copy", {
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
                scrollTrigger: { trigger: ".wwd-copy", start: "top 82%", end: "bottom 55%", scrub: 0.8 },
              }
            ),
        });

        gsap.from(".wwd-cta", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: reveal(".wwd-cta", "top 92%") });

        gsap.from(".wwd-rule", {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: ".wwd-rule", start: "top 98%", end: "top 60%", scrub: 1 },
        });

        // Cards rise in row by row; tiles unmask from the bottom
        ScrollTrigger.batch(".service-card", {
          start: "top 88%",
          once: true,
          onEnter: (cards) => {
            gsap.from(cards, { y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
            gsap.from(
              cards.map((card) => card.querySelector(".service-tile")),
              { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, stagger: 0.1, ease: "power4.out", clearProps: "clipPath" }
            );
          },
        });
      });

      // Hover: tile lifts, number slides away, overlay draws in and the stat counts up
      mm.add("(hover: hover)", () => {
        const cleanups = gsap.utils.toArray(".service-card").map((card, i) => {
          const q = gsap.utils.selector(card);
          const stats = SERVICES[i].stats;
          const [valueEl] = q(".service-stat-value");
          const [suffixEl] = q(".service-stat-suffix");
          const [labelEl] = q(".service-stat-label");
          const statEl = q(".service-overlay-stat");
          const dots = q(".service-dot");
          const counter = { v: 0 };
          let current = 0;
          let cycle;

          const intro = gsap
            .timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.6 } })
            .to(q(".service-tile"), { scale: 1.02, boxShadow: "0 24px 50px -20px rgb(0 0 0 / 0.9)", duration: 0.7 }, 0)
            .to(q(".service-tile-number"), { yPercent: 60, opacity: 0, duration: 0.4 }, 0)
            .to(q(".service-overlay"), { opacity: 1, duration: 0.4 }, 0)
            .fromTo(q(".service-overlay-head"), { y: -14, opacity: 0 }, { y: 0, opacity: 1 }, 0.1)
            .fromTo(q(".service-overlay-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0.15)
            .to(q(".service-index-rule"), { scaleX: 1 }, 0);

          // Swap the overlay to stat `index`: active dash stretches, number counts up from zero
          function showStat(index, delay = 0) {
            const stat = stats[index];
            current = index;
            dots.forEach((dot, d) =>
              gsap.to(dot, { width: d === index ? 20 : 6, opacity: d === index ? 1 : 0.4, duration: 0.5, delay })
            );
            gsap
              .timeline({ delay })
              .call(() => {
                suffixEl.textContent = stat.suffix;
                labelEl.textContent = stat.label;
              })
              .fromTo(statEl, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
              .fromTo(
                counter,
                { v: 0 },
                {
                  v: stat.value,
                  duration: 1.1,
                  ease: "power2.out",
                  onUpdate: () => (valueEl.textContent = formatStat(counter.v, stat.decimals)),
                },
                "<"
              );
            cycle = gsap.delayedCall(delay + STAT_HOLD, () => {
              gsap.to(statEl, { y: -18, opacity: 0, duration: 0.35, ease: "power2.in" });
              showStat((current + 1) % stats.length, 0.35);
            });
          }

          const enter = () => {
            intro.timeScale(1).play();
            showStat(0, 0.2);
          };
          const leave = () => {
            cycle?.kill();
            gsap.killTweensOf([statEl, counter, ...dots]);
            gsap.to(statEl, { opacity: 0, duration: 0.25 });
            intro.timeScale(1.6).reverse();
          };
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          };
        });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-graphite/50 bg-edge-black px-6 pb-14 lg:px-10">
      <div className="mx-auto grid max-w-372 border-b border-graphite/50 lg:grid-cols-2 lg:gap-20">
        <div className="pb-8 pt-12 lg:pb-12">
          <p className="wwd-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
            <span className="flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="size-1.5 rounded-full bg-edge-stone" />
            </span>
            What we do
          </p>

          <h2 className="wwd-heading mt-8 font-display text-[11vw] uppercase leading-none tracking-tight text-white sm:text-[clamp(3.5rem,5.6vw,6.75rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="wwd-line-inner block">Top-notch</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="wwd-line-inner block text-edge-stone-60">Services</span>
            </span>
          </h2>
        </div>

        <div className="wwd-panel relative flex pb-10 lg:bg-black-depth lg:py-11 lg:pr-16">
          <span className="wwd-divider absolute bottom-11 left-0 top-11 hidden w-px origin-top bg-graphite/60 lg:block" />
          <div className="relative flex flex-col pl-5 sm:pl-6 lg:ml-14 lg:pl-8">
            <span className="wwd-divider absolute bottom-0 left-0 top-0 w-px origin-top bg-graphite/80" />

            <p className="wwd-copy font-display text-[clamp(1.15rem,1.4vw,1.7rem)] leading-[1.4] text-white">
              {COPY_LINES.map((line) => (
                <span
                  key={line.text}
                  className={cn("lg:block", line.justify && "lg:[text-align-last:justify]")}
                >
                  {line.lead ? (
                    <>
                      <span className="text-edge-stone-60">{line.lead}</span>
                      {line.text.slice(line.lead.length)}
                    </>
                  ) : (
                    line.text
                  )}{" "}
                </span>
              ))}
            </p>

            <Link
              href="/services"
              className="wwd-cta group relative mt-12 inline-flex w-fit items-center gap-4 pb-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white lg:mt-auto"
            >
              Explore all services
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
      </div>

      {/* 1px gaps over a graphite backing draw the dividers; phones get a swipeable row instead */}
      <div className="no-scrollbar -mx-6 mt-11 flex snap-x snap-mandatory scroll-px-6 overflow-x-auto sm:mx-auto sm:grid sm:max-w-372 sm:gap-px sm:overflow-visible sm:bg-graphite/40 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.href} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
