"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Sample figures: replace with real numbers before launch
const STATS = [
  { value: 3, label: "Locations, 2 timezones", body: "Mumbai, Pune and Dubai, serving India, the UAE, Australia, the US, the UK and Japan." },
  { value: 1000, suffix: "+", label: "Brands served", body: "From boutique founders to listed companies across four countries." },
  { value: 7, suffix: "×", label: "Average ROAS", body: "Across 100+ performance accounts on Meta, Google and beyond." },
  { value: 95, suffix: "%", label: "Client retention", body: "Most brands that start with us are still with us years later." },
];

// Service pages pass their own figures; the About page uses the defaults
export default function AboutStats({ stats = STATS }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = { trigger: ".stats-grid", start: "top 80%", once: true };

        // The wave draws itself across the band as it scrolls through
        const path = sectionRef.current.querySelector(".stats-wave");
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "bottom 40%", scrub: 1 },
          }
        );

        gsap.from(".stat-card", {
          y: 50,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: reveal,
        });

        gsap.from(".stat-dash", {
          scaleX: 0,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: reveal,
        });

        gsap.utils.toArray(".stat-value").forEach((el) => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: Number(el.dataset.value),
            duration: 2,
            ease: "power2.out",
            onUpdate: () => (el.textContent = Math.round(counter.v)),
            scrollTrigger: reveal,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-depth px-6 py-20 lg:px-10 lg:py-28">
      <svg
        aria-hidden
        viewBox="0 0 1920 460"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[80%] w-full -translate-y-1/2"
      >
        <path
          className="stats-wave"
          d="M-20 430 C 260 340, 420 160, 640 110 S 1040 360, 1280 290 S 1640 40, 1940 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ color: "color-mix(in srgb, var(--edge-stone) 55%, transparent)" }}
        />
      </svg>

      <ul className="stats-grid relative mx-auto grid max-w-372 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="stat-card group rounded-md border border-graphite/50 bg-edge-black p-7 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-graphite lg:p-8"
          >
            <span className="stat-dash block h-0.75 w-7 origin-left rounded-full bg-edge-stone transition-[width] duration-500 group-hover:w-11" />

            <p className="mt-6 font-display text-[clamp(4rem,5.4vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.02em] text-white">
              <span className="stat-value" data-value={stat.value}>
                {stat.value}
              </span>
              {stat.suffix}
            </p>

            <h3 className="mt-5 border-b border-graphite/60 pb-5 font-display text-2xl leading-tight text-white">
              {stat.label}
            </h3>
            <p className="mt-6 text-[13px] leading-relaxed text-concrete">{stat.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
