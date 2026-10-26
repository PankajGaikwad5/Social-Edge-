"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeCheck, ChartColumnIncreasing, Infinity as InfinityIcon, ShoppingBag, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Monochrome wordmarks; swap for the official partner badge files in /public/logos once approved
const PARTNERS = [
  { name: "Shopify", line: "partners", Icon: ShoppingBag },
  { name: "Google Ads", line: "Certified Partner", Icon: Target },
  { name: "Google", line: "Analytics", Icon: ChartColumnIncreasing },
  { name: "Google", line: "Partner", Icon: BadgeCheck },
  { name: "Meta", line: "Business Partner", Icon: InfinityIcon },
];

export default function Partners() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from([".partners-eyebrow", ".partner"], {
          y: 22,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="border-y border-graphite/50 bg-edge-black px-6 pb-8 pt-10 sm:pb-11 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-372">
        <p className="partners-eyebrow text-[11px] font-medium uppercase tracking-[0.28em] text-concrete">
          Certified &amp; partnered with
        </p>

        <ul className="no-scrollbar -mx-6 mt-6 flex items-center gap-9 overflow-x-auto px-6 sm:mx-0 sm:mt-7 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-9 sm:overflow-visible sm:px-0 lg:flex lg:justify-between">
          {PARTNERS.map(({ name, line, Icon }) => (
            <li
              key={name + line}
              className="partner group flex h-14 shrink-0 cursor-default items-center gap-2.5 whitespace-nowrap text-concrete last:pr-6 sm:gap-3 sm:last:pr-0 transition-colors duration-500 hover:text-white"
            >
              <Icon
                size={26}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <span className="leading-none">
                <span className="block text-base font-semibold tracking-[-0.01em] sm:text-[19px]">{name}</span>
                <span className="mt-1 block text-[11px] sm:text-[13px]">{line}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
