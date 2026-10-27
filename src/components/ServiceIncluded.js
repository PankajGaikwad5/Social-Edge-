"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/components/WorkServices";

// Card accents cycle through the Work-by-service card colours (approved off-palette exception)
function IncludedCard({ item, index }) {
  const cardRef = useRef(null);
  const hover = useRef(null);
  const [base] = SERVICES[index % SERVICES.length].colors;
  const number = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(".inc-glow", { opacity: 1 }, 0)
        .to(".inc-number", { opacity: 1, y: -6 }, 0)
        .to(".inc-dash", { width: 44 }, 0);
    },
    { scope: cardRef }
  );

  return (
    <li
      ref={cardRef}
      onMouseEnter={() => hover.current?.timeScale(1).play()}
      onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
      className="relative min-h-52 overflow-hidden rounded-lg border border-white/10 bg-black-depth px-8.5 pb-10 pt-9"
    >
      <span
        aria-hidden
        style={{ backgroundImage: `radial-gradient(75% 95% at 100% 0%, ${base}d9 0%, ${base}4d 38%, transparent 72%)` }}
        className="inc-glow pointer-events-none absolute inset-0 opacity-20"
      />
      <span
        aria-hidden
        style={{ color: base }}
        className="inc-number pointer-events-none absolute -bottom-[0.24em] right-6 font-display text-[clamp(6rem,8vw,9.5rem)] leading-none opacity-15"
      >
        {number}
      </span>

      <div className="relative">
        <p style={{ color: base }} className="text-[11px] font-semibold tracking-[0.2em]">
          {number}
        </p>
        <h3 className="mt-3.5 font-display text-[clamp(1.45rem,1.6vw,1.8rem)] leading-tight text-white">{item.title}</h3>
        <span aria-hidden style={{ backgroundColor: base }} className="inc-dash mt-4 block h-px w-6" />
        <p className="mt-5 max-w-[34rem] text-sm leading-relaxed text-white/85">{item.body}</p>
      </div>
    </li>
  );
}

export default function ServiceIncluded({ title, items }) {
  return (
    <section className="bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <h2 className="font-display text-[clamp(2.2rem,2.6vw,3.2rem)] leading-tight text-white">{title}</h2>
        <ul className="mt-8 grid gap-4.5 md:grid-cols-2">
          {items.map((item, i) => (
            <IncludedCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
