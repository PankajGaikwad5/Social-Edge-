"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICE_GROUPS } from "@/components/Navbar";
import { SERVICES } from "@/components/WorkServices";

// Follows the navbar's "Tailored for Your Business" list
const LIST = SERVICE_GROUPS[0].links;

// Accent bar and hover tint use the Work-by-service card colour at the same position (approved off-palette exception)
function NextCard({ service, number, index }) {
  const cardRef = useRef(null);
  const hover = useRef(null);
  const [base] = SERVICES[index % SERVICES.length].colors;

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(".next-tint", { opacity: 1 }, 0)
        .fromTo(".next-number", { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0)
        .to(".next-title", { x: 8 }, 0)
        .to(".next-arrow", { x: 3, y: -3, scale: 1.06 }, 0)
        .to(".next-arrow-fill", { opacity: 1 }, 0)
        .to(".next-icon-out", { opacity: 0 }, 0)
        .to(".next-icon-in", { opacity: 1 }, 0);
    },
    { scope: cardRef }
  );

  return (
    <Link
      ref={cardRef}
      href={service.href}
      onMouseEnter={() => hover.current?.timeScale(1).play()}
      onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
      onFocus={() => hover.current?.timeScale(1).play()}
      onBlur={() => hover.current?.timeScale(1.6).reverse()}
      style={{ borderLeftColor: base }}
      className="relative flex min-h-38 flex-col justify-between overflow-hidden border-l-[3px] px-6.5 pb-7 pt-8"
    >
      <span
        aria-hidden
        style={{ backgroundImage: `linear-gradient(90deg, ${base}38 0%, ${base}14 100%)` }}
        className="next-tint pointer-events-none absolute inset-0 opacity-0"
      />
      <span
        aria-hidden
        className="next-number pointer-events-none absolute -bottom-[0.3em] right-[14%] font-display text-[9rem] leading-none text-white/[0.07] opacity-0"
      >
        {number}
      </span>

      <span className="relative flex justify-between text-[10px] font-medium uppercase tracking-[0.24em] text-concrete">
        <span className="text-[11px]">{number}</span>
        Next
      </span>

      <span className="relative mt-10 flex items-end justify-between gap-4">
        <span className="next-title font-display text-[clamp(1.5rem,1.5vw,1.85rem)] leading-tight text-white">{service.label}</span>
        <span className="next-arrow relative flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/60 text-white">
          <span className="next-arrow-fill absolute -inset-px rounded-full bg-white opacity-0" />
          <ArrowRight size={14} strokeWidth={1.75} className="next-icon-out absolute" />
          <ArrowUpRight size={14} strokeWidth={1.75} className="next-icon-in absolute text-edge-black opacity-0" />
        </span>
      </span>
    </Link>
  );
}

export default function ServiceNext({ current, count = 3 }) {
  const start = LIST.findIndex((s) => s.href === current) + 1;
  const next = Array.from({ length: count }, (_, i) => {
    const index = (start + i) % LIST.length;
    return { service: LIST[index], index, number: String(index + 1).padStart(2, "0") };
  });

  return (
    <section className="border-t border-graphite/50 bg-edge-black px-6 py-16 lg:px-10 lg:py-[68px]">
      <div className="mx-auto max-w-372">
        <div className="flex items-center justify-between gap-6 text-[10px] font-medium uppercase tracking-[0.24em] sm:text-[11px]">
          <p className="text-edge-stone">More of our work</p>
          <Link href="/work" className="flex items-center gap-1.5 text-concrete transition-colors duration-500 hover:text-white">
            All work
            <ArrowRight size={12} strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="mt-6 grid border border-white/20 md:grid-cols-3">
          {next.map(({ service, index, number }) => (
            <li key={service.href}>
              <NextCard service={service} index={index} number={number} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
