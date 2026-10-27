"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SHOTS = 5;
const THUMBS = [
  "linear-gradient(135deg, #A5947C, #1A1A1A)",
  "linear-gradient(135deg, #4D4D4D, #C9BEB0)",
  "linear-gradient(135deg, #1A1A1A, #A5947C)",
  "linear-gradient(135deg, #C9BEB0, #4D4D4D)",
  "linear-gradient(135deg, #848484, #1A1A1A)",
];

// A viewfinder on a live stage: spotlights sway, the shutter fires and each frame drops into the strip below
export default function EventCoverage() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const counter = root.querySelector(".ev-count");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".ev-beam").forEach((beam, i) => {
          gsap.fromTo(
            beam,
            { rotate: i % 2 ? 14 : -14 },
            { rotate: i % 2 ? -10 : 10, duration: 2.6 + i * 0.5, ease: "sine.inOut", repeat: -1, yoyo: true }
          );
        });
        gsap.to(".ev-rec", { opacity: 0.2, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true });

        let shots = 408;
        const tl = gsap.timeline({ repeat: -1 });
        gsap.utils.toArray(".ev-thumb").forEach((thumb, i) => {
          const at = 0.6 + i * 1.3;
          tl.fromTo(".ev-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.45, ease: "power2.out" }, at)
            .fromTo(".ev-focus", { scale: 1.25 }, { scale: 1, duration: 0.35, ease: "power2.out" }, at - 0.3)
            .fromTo(thumb, { opacity: 0, y: -14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, at + 0.1)
            .add(() => {
              shots += 1;
              counter.textContent = `Shots ${String(shots).padStart(4, "0")}`;
            }, at);
        });
        tl.to({}, { duration: 1.2 }).to(".ev-thumb", { opacity: 0, duration: 0.5, stagger: 0.05 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[14%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Live coverage · Launch night</span>
        <span className="ev-count text-[10px] tabular-nums text-white/55">Shots 0408</span>
      </div>

      {/* Viewfinder */}
      <div className="relative mt-4 aspect-[1.6] overflow-hidden rounded-sm bg-[#0d0d0d]">
        {[22, 50, 78].map((left, i) => (
          <span
            key={left}
            style={{ left: `${left}%`, background: "linear-gradient(to bottom, rgba(244,243,239,0.35), rgba(165,148,124,0.12) 60%, transparent)" }}
            className="ev-beam absolute -top-[6%] h-[95%] w-[22%] origin-top -translate-x-1/2 [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)]"
          />
        ))}
        <span className="absolute inset-x-0 bottom-[22%] h-[3%] bg-edge-stone/40" />
        <span className="absolute bottom-[25%] left-1/2 aspect-square w-[6%] -translate-x-1/2 -translate-y-[160%] rounded-full bg-ink ring-1 ring-edge-stone/30" />
        <span className="absolute bottom-[25%] left-1/2 h-[20%] w-[11%] -translate-x-1/2 rounded-t-full bg-ink ring-1 ring-edge-stone/30" />
        {/* Crowd */}
        <div className="absolute inset-x-0 bottom-0 flex h-[24%] items-end justify-around px-[2%]">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className="relative h-full w-[7%]">
              <span className="absolute bottom-[42%] left-1/2 aspect-square w-[70%] -translate-x-1/2 rounded-full bg-black" />
              <span className="absolute bottom-0 h-[48%] w-full rounded-t-full bg-black" />
            </span>
          ))}
        </div>

        {/* Overlay */}
        <span className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[8px] font-bold tracking-[0.16em] text-white/80">
          <span className="ev-rec size-1.5 rounded-full bg-status-negative" />
          REC
        </span>
        <span className="absolute right-3 top-2.5 text-[8px] font-semibold tabular-nums text-white/70">ISO 3200 · 1/250</span>
        <span className="ev-focus absolute left-1/2 top-[44%] size-10 -translate-x-1/2 -translate-y-1/2 border border-white/80" />
        {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((c) => (
          <span key={c} className={`absolute size-3.5 border-white/70 ${c}`} />
        ))}
        <span className="ev-flash pointer-events-none absolute inset-0 bg-white opacity-0" />
      </div>

      {/* Captured frames */}
      <div className="relative mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: SHOTS }, (_, i) => (
          <span key={i} className="relative aspect-[1.5] rounded-sm border border-white/10 bg-white/[0.03]">
            <span style={{ backgroundImage: THUMBS[i] }} className="ev-thumb absolute inset-0 rounded-sm opacity-0" />
          </span>
        ))}
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Photo · Video · Same-day edits</span>
        <span className="text-[10px] text-edge-stone-60">Delivered in 24h</span>
      </div>
    </div>
  );
}
