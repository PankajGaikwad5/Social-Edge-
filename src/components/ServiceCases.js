"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

function CaseCard({ item }) {
  const cardRef = useRef(null);
  const hover = useRef(null);

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(cardRef.current, { y: -4, borderColor: "rgba(255,255,255,0.22)" }, 0)
        .to(".case-arrow", { x: 4 }, 0);
    },
    { scope: cardRef }
  );

  return (
    <Link
      ref={cardRef}
      href={item.href}
      onMouseEnter={() => hover.current?.timeScale(1).play()}
      onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
      onFocus={() => hover.current?.timeScale(1).play()}
      onBlur={() => hover.current?.timeScale(1.6).reverse()}
      className="surface-dark relative block aspect-[0.8] overflow-hidden rounded-lg border border-white/12 bg-black-depth will-change-transform"
    >
      {item.src && <img src={item.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />}
      <span className="wall-fade-bottom absolute inset-x-0 bottom-0 h-1/2" />

      <span className="absolute inset-x-5.5 bottom-6 block text-white">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">{item.sector}</span>
        <span className="mt-1.5 block font-display text-[clamp(1.6rem,1.6vw,1.95rem)] leading-tight">{item.client}</span>
        <span className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em]">
          Read the study
          <ArrowRight size={11} strokeWidth={2} className="case-arrow" />
        </span>
      </span>
    </Link>
  );
}

export default function ServiceCases({ title, cases }) {
  return (
    <section className="border-t border-graphite/50 bg-edge-black px-6 py-16 lg:px-10 lg:py-[72px]">
      <div className="mx-auto max-w-372">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.2rem,2.5vw,3rem)] leading-tight text-white">{title}</h2>
          <Link
            href="/work"
            className="mb-2 flex shrink-0 items-center gap-2 border-b border-edge-stone/60 pb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-edge-stone transition-colors duration-500 hover:border-edge-stone hover:text-edge-stone-80 sm:text-[11px]"
          >
            Need more case studies?
            <ArrowRight size={12} strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="mt-9 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <li key={item.client}>
              <CaseCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
