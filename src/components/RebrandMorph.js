"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MorphSVGPlugin);

const TOUCHPOINTS = ["Site", "Social", "Packaging", "Signage", "Deck", "Email", "Uniform", "Print", "App", "Store", "Ads", "Cards"];

// Old mark: an uneven, jagged star. New mark: a smooth six-petal flower. Both centred in a 200 × 200 box.
const OLD_RADII = [92, 58, 84, 62, 90, 55, 80, 64, 94, 57, 86, 60, 88, 54, 82, 63];
const OLD_MARK = OLD_RADII.map((r, i) => {
  const a = (i / OLD_RADII.length) * Math.PI * 2 - Math.PI / 2;
  return `${i ? "L" : "M"}${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ") + " Z";

const NEW_MARK = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2 - Math.PI / 2;
  const r = 58 + 26 * Math.cos(6 * a);
  return `${i ? "L" : "M"}${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ") + " Z";

const TILE_OFF = { backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" };
const TILE_ON = { backgroundColor: "rgba(165,148,124,0.28)", borderColor: "rgba(165,148,124,0.75)" };

export default function RebrandMorph() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tiles = gsap.utils.toArray(".rb-tile");
        const names = gsap.utils.toArray(".rb-name");

        gsap
          .timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power2.inOut" } })
          .to({}, { duration: 1.2 })
          .to(".rb-mark", { morphSVG: NEW_MARK, fill: "rgba(165,148,124,0.4)", stroke: "rgba(201,190,176,0.95)", duration: 1.6 })
          .to(".rb-before", { opacity: 0, y: -6, duration: 0.6 }, "<0.4")
          .to(".rb-after", { opacity: 1, y: 0, duration: 0.6 }, "<")
          .to(".rb-mark", { rotate: 30, transformOrigin: "50% 50%", duration: 1.6 }, "<-0.4")
          // Rollout: each touchpoint picks up the new identity in turn
          .to(tiles, { ...TILE_ON, duration: 0.45, stagger: 0.12 }, ">-0.2")
          .to(names, { color: "rgba(255,255,255,0.9)", duration: 0.45, stagger: 0.12 }, "<")
          .to({}, { duration: 1.8 })
          .to(tiles, { ...TILE_OFF, duration: 0.6 })
          .to(names, { color: "rgba(255,255,255,0.4)", duration: 0.6 }, "<")
          .to(".rb-mark", { morphSVG: OLD_MARK, fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.8)", rotate: 0, duration: 1.4 }, "<")
          .to(".rb-after", { opacity: 0, y: 6, duration: 0.5 }, "<0.3")
          .to(".rb-before", { opacity: 1, y: 0, duration: 0.5 }, "<");
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] items-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[6%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex w-full items-center gap-[6%]">
        <div className="flex flex-1 flex-col items-center">
          <svg viewBox="0 0 200 200" className="w-[88%]">
            <path className="rb-mark" d={OLD_MARK} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.25" strokeLinejoin="round" />
          </svg>
          <p className="relative mt-4 h-4 w-full text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
            <span className="rb-before absolute inset-x-0">Before · 2014 mark</span>
            <span className="rb-after absolute inset-x-0 translate-y-1.5 text-edge-stone-60 opacity-0">After · new mark</span>
          </p>
        </div>

        <div className="w-[38%] shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Rollout · Touchpoints</p>
          <ul className="mt-4 grid grid-cols-3 gap-x-2.5 gap-y-3">
            {TOUCHPOINTS.map((name) => (
              <li key={name} className="text-center">
                <span style={TILE_OFF} className="rb-tile block aspect-square rounded-md border" />
                <span className="rb-name mt-1.5 block truncate text-[9px] text-white/40">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
