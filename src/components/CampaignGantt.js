"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
// start / end in months across the year
const ROWS = [
  { label: "Insight", start: 0, end: 2 },
  { label: "Big Idea", start: 1.5, end: 3.5 },
  { label: "Social", start: 3, end: 8 },
  { label: "OOH", start: 4.5, end: 9 },
  { label: "Launch", start: 5.5, end: 11 },
];

const pct = (months) => `${(months / 12) * 100}%`;

// "Today" sweeps across the year; each bar fills as it passes, the live one in stone, finished ones grey with a milestone
export default function CampaignGantt({ label = "Q3 launch plan · 12 weeks" }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const today = root.querySelector(".gantt-today");
      const rows = [...root.querySelectorAll(".gantt-row")];

      const update = (t) => {
        today.style.left = pct(t);
        rows.forEach((row, i) => {
          const { start, end } = ROWS[i];
          const done = Math.min(Math.max(t - start, 0), end - start);
          row.querySelector(".gantt-fill").style.width = pct(done);
          row.classList.toggle("is-live", t > start && t < end);
          row.classList.toggle("is-done", t >= end);
        });
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const clock = { t: 0 };
        update(0);
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6 })
          .to(clock, { t: 12, duration: 11, ease: "none", onUpdate: () => update(clock.t) })
          .to(".gantt-bars", { opacity: 0, duration: 0.6, ease: "sine.inOut" }, "+=1.2")
          .add(() => update(0))
          .to(".gantt-bars", { opacity: 1, duration: 0.6, ease: "sine.inOut" });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => update(3.5));

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] items-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[13%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative w-full">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">{label}</p>

        <div className="mt-[7%] flex">
          <span className="w-[22%] shrink-0" />
          <div className="relative flex-1">
            <div className="grid grid-cols-12 text-center text-[9px] font-bold tracking-[0.1em] text-white/45">
              {MONTHS.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-3">
          {/* Month grid lines behind the rows */}
          <div className="pointer-events-none absolute inset-y-0 left-[22%] right-0 grid grid-cols-12">
            {MONTHS.map((_, i) => (
              <span key={i} className="border-l border-white/[0.06]" />
            ))}
          </div>

          <div className="gantt-bars">
            {ROWS.map((row) => (
              <div key={row.label} className="gantt-row group flex h-12 items-center border-b border-white/[0.07]">
                <span className="w-[22%] shrink-0 font-display text-sm text-white/85">{row.label}</span>
                <div className="relative h-full flex-1">
                  <span
                    style={{ left: pct(row.start), width: pct(row.end - row.start) }}
                    className="absolute top-1/2 h-6 -translate-y-1/2 rounded-sm bg-white/[0.05]"
                  />
                  <span
                    style={{ left: pct(row.start) }}
                    className="gantt-fill absolute top-1/2 h-6 w-0 -translate-y-1/2 rounded-sm bg-white/20 transition-colors duration-500 group-[.is-live]:bg-edge-stone group-[.is-done]:bg-graphite"
                  />
                  <span
                    style={{ left: pct(row.end) }}
                    className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white opacity-0 transition-opacity duration-500 group-[.is-done]:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute -bottom-9 left-[22%] right-0 top-0">
            <span className="gantt-today absolute inset-y-0 left-0">
              <span className="absolute bottom-6 top-0 border-l border-dashed border-white/70" />
              <span className="absolute bottom-0 -translate-x-1/2 rounded-full bg-edge-stone-60 px-2 py-0.5 text-[9px] font-bold text-ink">
                Today
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
