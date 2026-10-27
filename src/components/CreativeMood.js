"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const STRIPES = (c) => `repeating-linear-gradient(135deg, ${c} 0 8px, transparent 8px 16px)`;
const DOTS = "radial-gradient(rgba(9,9,9,0.35) 1.2px, transparent 1.4px)";

// Swatch tiles on a 12-column board: [col start, col span, row start, row span, fill]
const TILES = [
  [1, 5, 1, 4, { backgroundImage: "linear-gradient(135deg, #A5947C, #6f6252)" }],
  [6, 4, 1, 4, { backgroundColor: "#4D4D4D", backgroundImage: STRIPES("rgba(201,190,176,0.55)") }],
  [10, 3, 1, 6, { backgroundColor: "#F4F3EF", backgroundImage: DOTS, backgroundSize: "11px 11px" }],
  [1, 3, 5, 3, { backgroundImage: "linear-gradient(135deg, #C9BEB0, #848484)" }],
  [4, 6, 5, 4, { backgroundColor: "#1A1A1A", backgroundImage: STRIPES("rgba(165,148,124,0.75)") }],
  [10, 3, 7, 2, { backgroundImage: "linear-gradient(135deg, #4D4D4D, #1A1A1A)" }],
];
const MOODS = ["Desert Brass", "Studio Linen", "Night Market"];

// A moodboard pins up tile by tile, the palette is pulled, then it clears for the next mood
export default function CreativeMood() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = root.querySelector(".mood-label");
      const tiles = gsap.utils.toArray(".mood-tile");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let mood = 0;
        gsap
          .timeline({ repeat: -1, defaults: { ease: "power2.out" } })
          .add(() => {
            label.textContent = `Mood ${String(mood + 1).padStart(2, "0")} · ${MOODS[mood]}`;
            // Each mood reshuffles which swatch sits where
            tiles.forEach((tile, i) => (tile.style.filter = `hue-rotate(0deg) brightness(${1 - ((i + mood) % 3) * 0.12})`));
            mood = (mood + 1) % MOODS.length;
          })
          .fromTo(
            tiles,
            { opacity: 0, y: -24, rotate: (i) => (i % 2 ? 6 : -6), scale: 0.94 },
            { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 0.7, stagger: 0.18 }
          )
          .fromTo(".mood-pin", { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.18, ease: "back.out(2)" }, "<0.4")
          .fromTo(".mood-strip", { opacity: 0, x: -40, rotate: 0 }, { opacity: 1, x: 0, rotate: 3, duration: 0.8 }, ">-0.2")
          .fromTo(".mood-picker", { left: "4%" }, { left: "88%", duration: 1.8, ease: "sine.inOut" }, ">")
          .fromTo(".mood-pulled", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<1.2")
          .to({}, { duration: 1.4 })
          .to([tiles, ".mood-strip", ".mood-pulled"], { opacity: 0, y: 12, duration: 0.5, stagger: 0.04, ease: "sine.in" });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[16%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="mood-label text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Mood 02 · Desert Brass</span>
        <span className="text-[10px] text-white/50">Treatment → shoot day</span>
      </div>

      <div className="relative mt-4 grid aspect-[1.6] grid-cols-12 grid-rows-8 gap-2.5">
        {TILES.map(([col, cspan, row, rspan, fill], i) => (
          <span
            key={i}
            style={{ gridColumn: `${col} / span ${cspan}`, gridRow: `${row} / span ${rspan}`, ...fill }}
            className="mood-tile relative rounded-sm shadow-[0_10px_24px_-12px_rgba(0,0,0,0.8)]"
          >
            {i < 5 && <span className="mood-pin absolute right-1.5 top-1.5 size-2 rounded-full border border-ink/50 bg-white" />}
          </span>
        ))}
      </div>

      <div className="relative -ml-[8%] mt-5 h-12 w-[70%]">
        <span
          className="mood-strip absolute inset-0 rounded-sm bg-graphite"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1.3px)", backgroundSize: "9px 9px" }}
        >
          <span className="mood-picker absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-white bg-edge-stone" />
        </span>
      </div>
      <span className={cn("mood-pulled absolute bottom-[19%] right-[16%] text-[10px] font-bold uppercase tracking-[0.22em] text-white/50")}>
        Palette pulled
      </span>
    </div>
  );
}
