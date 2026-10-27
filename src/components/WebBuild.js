"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Code bars: [indent, [[width, tone], ...]]; tones: k = keyword (stone), s = string (light stone), p = plain
const CODE = [
  [0, [[28, "p"], [40, "k"]]],
  [1, [[48, "s"], [26, "p"]]],
  [2, [[52, "k"], [26, "p"]]],
  [0, [[62, "s"]]],
  [1, [[16, "p"], [40, "k"], [28, "s"]]],
  [1, [[74, "p"]]],
  [0, [[26, "k"], [30, "p"]]],
];
const TONE = { k: "bg-edge-stone", s: "bg-edge-stone-60/80", p: "bg-white/25" };

// As each line of code lands, the matching part of the site appears behind it
export default function WebBuild() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const build = { v: 0 };
        const label = root.querySelector(".wb-build");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { ease: "sine.inOut" } });

        gsap.utils.toArray(".wb-line").forEach((line, i) => {
          tl.fromTo(line.querySelectorAll(".wb-seg"), { scaleX: 0 }, { scaleX: 1, duration: 0.28, stagger: 0.1 }, 0.2 + i * 0.4);
        });

        gsap.utils.toArray(".wb-part").forEach((part, i) => {
          tl.fromTo(part, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.35 + i * 0.42);
        });

        tl.fromTo(
          build,
          { v: 0 },
          { v: 100, duration: 3.2, ease: "none", onUpdate: () => (label.textContent = `Build · ${Math.round(build.v)}%`) },
          0.2
        )
          .to({}, { duration: 1.8 })
          .to([".wb-part", ".wb-seg"], { opacity: 0, duration: 0.6 })
          .set([".wb-part", ".wb-seg"], { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[12%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative">
        {/* Browser */}
        <div className="overflow-hidden rounded-md border border-white/15 bg-black/60">
          <div className="flex items-center gap-3 border-b border-white/10 px-2.5 py-2">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-white/30" />
              ))}
            </span>
            <span className="flex-1 truncate rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[8px] text-white/60">https://yourbrand.com</span>
          </div>

          <div className="space-y-2.5 p-3.5 pr-[42%]">
            <div className="wb-part flex h-4 items-center rounded-sm bg-white/[0.06] px-1.5">
              <span className="size-1.5 rounded-full bg-edge-stone-60" />
            </div>
            <div className="wb-part relative overflow-hidden rounded-sm bg-warm-stone p-3.5">
              <p className="wb-part font-display text-[clamp(0.9rem,1.5vw,1.45rem)] leading-[1.15] text-ink">
                Websites that
                <br />
                actually convert.
              </p>
              <span className="wb-part mt-3 block h-3.5 w-[42%] rounded-full bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {["bg-white/15", "bg-edge-stone/35"].map((tone) => (
                <div key={tone} className="wb-part rounded-sm border border-white/10 bg-white/[0.03] p-2">
                  <span className={cn("block h-6 rounded-sm", tone)} />
                  <span className="mt-2 block h-1 w-[85%] rounded-full bg-white/20" />
                  <span className="mt-1 block h-1 w-[55%] rounded-full bg-white/15" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="absolute right-[-3%] top-[16%] w-[40%] rounded-md border border-white/15 bg-black/85 p-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">index.tsx</p>
          <div className="mt-3 space-y-2">
            {CODE.map(([indent, segs], i) => (
              <div key={i} className="wb-line flex gap-1.5" style={{ paddingLeft: `${indent * 10}px` }}>
                {segs.map(([w, tone], j) => (
                  <span key={j} style={{ width: `${w}%` }} className={cn("wb-seg block h-1.5 origin-left rounded-full", TONE[tone])} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-[5%] flex items-center justify-between gap-4">
        <span className="wb-build text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Build · 70%</span>
        <span className="text-[10px] text-white/60">LCP 1.2s · 100/100</span>
      </div>
    </div>
  );
}
