"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { leftwardMarquee } from "@/lib/marquee";

gsap.registerPlugin(ScrollTrigger);

const image = (id) => `https://images.unsplash.com/photo-${id}?w=1080&q=75&auto=format&fit=crop`;

// Sample projects: swap names, sectors and imagery for real case studies before launch
const CASES = [
  { client: "Vamika Silver", sector: "Jewellery", href: "/work/vamika-silver", src: image("1599643478518-a784e5dc4c8f") },
  { client: "Dicassa", sector: "Interiors", href: "/work/dicassa", src: image("1505693416388-ac5ce068fe85") },
  { client: "Sutra Fine Jewelry", sector: "Jewellery", href: "/work/sutra", src: image("1617038260897-41a1f14a8ca0") },
  { client: "Atory", sector: "Fashion", href: "/work/atory", src: image("1558769132-cb1aea458c5e") },
  { client: "Ember Table", sector: "Hospitality", href: "/work/ember-table", src: image("1414235077428-338989a2e8c0") },
  { client: "Lumen Skin", sector: "Beauty", href: "/work/lumen-skin", src: image("1596462502278-27bfdc403348") },
];

const STATS = [
  { value: 1000, suffix: "+", label: "Worked over" },
  { value: 95, suffix: "%", label: "Retention rate" },
  { value: 5, suffix: "+", label: "Timezones" },
];

function CaseCard({ item }) {
  return (
    <li className="mr-4 shrink-0">
      <Link
        href={item.href}
        className="surface-dark group relative block aspect-[1.5] w-[78vw] overflow-hidden bg-black-depth sm:w-[clamp(320px,28vw,540px)]"
      >
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-edge-black/35 transition-colors duration-700 group-hover:bg-edge-black/15" />
        <span className="absolute left-5.5 top-[52%]">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            {item.sector}
          </span>
          <span className="mt-1.5 block font-display text-[clamp(1.5rem,1.6vw,1.9rem)] leading-tight text-white">
            {item.client}
          </span>
        </span>
      </Link>
    </li>
  );
}

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {CASES.map((item) => (
        <CaseCard key={item.href} item={item} />
      ))}
    </ul>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        gsap.from(".cs-line-inner", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: reveal(".cs-heading"),
        });

        gsap.from([".cs-eyebrow", ".cs-cta", ".cs-stat"], {
          y: 18,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: reveal(".cs-heading"),
        });

        // Stats count up from zero once the panel is in view
        gsap.utils.toArray(".cs-stat-value").forEach((el) => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: Number(el.dataset.value),
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => (el.textContent = Math.round(counter.v)),
            scrollTrigger: reveal(".cs-stats", "top 90%"),
          });
        });

        gsap.from(".cs-rail", {
          clipPath: "inset(0 0 0 100%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: reveal(sectionRef.current, "top 75%"),
        });

        return leftwardMarquee(sectionRef.current.querySelector(".cs-track"), {
          trigger: sectionRef.current,
          duration: 48,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden border-b border-graphite/50 bg-edge-black pb-16 pt-14 lg:block lg:pb-18 lg:pt-0"
    >
      {/* The rail runs full width under the panel; a mask (not a colour wash) fades it out behind the heading */}
      <div className="cs-rail mt-10 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:[mask-image:linear-gradient(to_right,transparent_29%,black_38%)]">
        <div className="cs-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>

      <div className="relative -order-1 px-6 lg:min-h-[clamp(213px,18.67vw,360px)] lg:px-10 lg:pt-9">
        <p className="cs-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
          <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
            <span className="size-1.5 rounded-full bg-edge-stone" />
          </span>
          Case studies
        </p>

        <h2 className="cs-heading mt-6 font-display text-[8.6vw] uppercase leading-[0.95] tracking-tight text-white sm:text-[clamp(2.6rem,3.18vw,3.8rem)]">
          {["Work that", "moves the culture"].map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="cs-line-inner block">{line}</span>
            </span>
          ))}
        </h2>

        <Link
          href="/work"
          className="cs-cta group relative mt-4 inline-flex w-fit items-center gap-3.5 pb-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white"
        >
          All case studies
          <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/80 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-edge-stone transition-transform delay-150 duration-500 group-hover:scale-x-100" />
        </Link>

        <dl className="cs-stats mt-7 flex gap-9 sm:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="cs-stat flex flex-col-reverse">
              <dt className="mt-2 whitespace-nowrap text-[9.5px] font-medium uppercase tracking-[0.2em] text-concrete">{stat.label}</dt>
              <dd className="font-display text-[clamp(1.6rem,1.5vw,1.85rem)] leading-none text-white">
                <span className="cs-stat-value" data-value={stat.value}>
                  {stat.value}
                </span>
                <span className="text-edge-stone">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
