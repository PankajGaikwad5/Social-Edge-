"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";

const clip = (id) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

// Stock Mixkit clips and sample market figures for now: replace with real work and sourced data before launch
const INDUSTRIES = [
  { name: "Fashion & Lifestyle", slug: "fashion-lifestyle", video: clip("23327"), stats: [["Global apparel market", "$1.8T / 4.1% CAGR"], ["India fashion e-commerce", "$35B by 2028"]] },
  { name: "Jewellery", slug: "jewellery", video: clip("50782"), stats: [["Global jewellery market", "$353B / 4.7% CAGR"], ["India gems & jewellery", "$100B by 2027"]] },
  { name: "F&B (Cafe & Restro)", slug: "food-beverage", video: clip("49231"), stats: [["India food services", "$80B by 2028"], ["Cafe segment growth", "10.5% CAGR"]] },
  { name: "Health & Fitness", slug: "health-fitness", video: clip("35987"), stats: [["World fitness club market", "$131.3B / 9.7% CAGR"], ["India fitness market", "$4.5B by 2030 / 15% CAGR"]] },
  { name: "Real Estate", slug: "real-estate", video: clip("4860"), stats: [["India real estate", "$1T by 2030"], ["Digital-first home buyers", "70%+"]] },
  { name: "Hospitality", slug: "hospitality", video: clip("41165"), stats: [["India hospitality market", "$32B by 2028"], ["Online travel bookings", "12% CAGR"]] },
  { name: "Automation", slug: "automation", video: clip("52055"), stats: [["Industrial automation", "$395B by 2029"], ["Marketing automation", "19% CAGR"]] },
  { name: "Skincare & Personal Care", slug: "skincare", video: clip("52055"), stats: [["India beauty & personal care", "$34B by 2028"], ["D2C beauty share", "30%+"]] },
  { name: "D2C Brands", slug: "d2c", video: clip("23327"), stats: [["India D2C market", "$60B by 2027"], ["Brands launched since 2020", "800+"]] },
];

function IndustryPanel({ industry, index, open, onOpen }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      onMouseEnter={onOpen}
      className={cn(
        "relative overflow-hidden rounded-md border transition-[flex-grow,height,border-color] duration-700",
        EASE,
        open
          ? "h-104 grow-[6] border-edge-stone/40 lg:h-auto"
          : "h-15 grow border-graphite/50 hover:border-graphite lg:h-auto"
      )}
      style={{ flexBasis: 0 }}
    >
      <Link
        href={`/work/industries/${industry.slug}`}
        onFocus={onOpen}
        onClick={(e) => {
          // On touch, the first tap opens the panel; the next one follows the link
          if (!open) {
            e.preventDefault();
            onOpen();
          }
        }}
        className="surface-dark absolute inset-0 block bg-black-depth"
      >
        {/* Collapsed face: number on top, label running up the side */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-300 lg:flex-col lg:px-0 lg:py-6",
            open ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
          )}
        >
          <span className="text-[13px] font-medium tracking-[0.12em] text-white/80">{number}</span>
          <span className="truncate text-[11px] font-medium uppercase tracking-[0.28em] text-concrete lg:rotate-180 lg:[writing-mode:vertical-rl]">
            {industry.name}
          </span>
        </span>

        {/* Open face: video, market figures and title */}
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          )}
        >
          {open && (
            <video
              src={industry.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 size-full object-cover opacity-70"
            />
          )}
          <span className="wall-fade-top absolute inset-x-0 top-0 h-2/5" />
          <span className="wall-fade-bottom absolute inset-x-0 bottom-0 h-3/5" />

          <span className="absolute left-7 right-7 top-7 space-y-3">
            {industry.stats.map(([label, value]) => (
              <span key={label} className="block">
                <span className="block text-[8.5px] font-semibold uppercase tracking-[0.2em] text-white/70">{label}</span>
                <span className="mt-0.5 block text-[13px] font-medium text-white">{value}</span>
              </span>
            ))}
          </span>

          <span className="absolute bottom-7 left-7 right-7">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-edge-stone-60">
              {number} · Industry
            </span>
            <span className="mt-2.5 block font-display text-[clamp(1.9rem,2.1vw,2.6rem)] leading-tight text-white">
              {industry.name}
            </span>
            <span className="group/see mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              See the work
              <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-500 group-hover/see:translate-x-1" />
            </span>
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function WorkIndustries() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".industries-line-inner", {
          yPercent: 112,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".industries-heading", start: "top 85%", once: true },
        });

        gsap.from(".industries-row > li", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ".industries-row", start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-t border-graphite/50 bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <div className="flex items-end justify-between gap-6">
          <h2 className="industries-heading font-display text-[clamp(2.4rem,2.6vw,3.2rem)] leading-tight text-white">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="industries-line-inner block">Work by industry</span>
            </span>
          </h2>
          <p className="pb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">
            {INDUSTRIES.length} sectors<span className="hidden lg:inline"> · hover to open</span>
          </p>
        </div>

        <ul className="industries-row mt-8 flex flex-col gap-1.5 lg:h-115 lg:flex-row">
          {INDUSTRIES.map((industry, i) => (
            <IndustryPanel key={industry.slug} industry={industry} index={i} open={open === i} onOpen={() => setOpen(i)} />
          ))}

          {/* The closing panel invites sectors not listed */}
          <li className="h-15 grow lg:h-auto" style={{ flexBasis: 0 }}>
            <Link
              href="/contact"
              className="group relative flex h-full items-center justify-between overflow-hidden rounded-md bg-edge-stone px-5 text-ink transition-colors duration-500 hover:bg-edge-stone-80 lg:flex-col lg:px-0 lg:py-6"
            >
              <span aria-hidden className="pointer-events-none absolute -right-2 top-6 hidden font-display text-[9rem] leading-none text-ink/12 transition-transform duration-700 group-hover:-translate-y-2 lg:block">
                ?
              </span>
              <span className="relative text-[13px] font-medium tracking-[0.12em]">{String(INDUSTRIES.length + 1).padStart(2, "0")}</span>
              <span className="relative text-[11px] font-semibold uppercase tracking-[0.28em] lg:rotate-180 lg:[writing-mode:vertical-rl]">
                Your industry?
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
