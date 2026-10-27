"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ROAS = [0.7, 0.95, 0.75, 0.55, 1.2, 1.35, 1.0, 1.15, 1.65, 1.65, 1.3, 1.8, 1.95, 2.3, 2.45, 2.7];
const AXIS = ["5.0", "3.8", "2.5", "1.3", "0.0"];
const W = 400;
const H = 220;
const MAX = 5;

const points = ROAS.map((v, i) => [(i / (ROAS.length - 1)) * W * 0.62, H - (v / MAX) * H]);
const LINE = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

// The ROAS line draws itself point by point; the tag rides the newest point and the headline figures keep pace
export default function RoasChart() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const line = root.querySelector(".roas-line");
      const glow = root.querySelector(".roas-glow");
      const tag = root.querySelector(".roas-tag");
      const marker = root.querySelector(".roas-marker");
      const length = line.getTotalLength();
      [line, glow].forEach((p) => (p.style.strokeDasharray = length));

      const update = (progress) => {
        [line, glow].forEach((p) => (p.style.strokeDashoffset = length * (1 - progress)));
        const p = line.getPointAtLength(length * progress);
        const xPct = (p.x / W) * 100;
        const yPct = (p.y / H) * 100;
        tag.style.left = marker.style.left = `${xPct}%`;
        tag.style.top = `${yPct}%`;

        const roas = (H - p.y) / H * MAX;
        tag.querySelector("b").textContent = `${roas.toFixed(1)}×`;
        root.querySelector(".kpi-roas").textContent = roas.toFixed(1);
        root.querySelector(".kpi-cpl").textContent = `-${Math.round(progress * 13)}%`;
        root.querySelector(".kpi-rev").textContent = `₹ ${(progress * 0.54).toFixed(2)} Cr`;
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { p: 0.02 };
        update(state.p);
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.4 })
          .to(state, { p: 1, duration: 5.5, ease: "sine.inOut", onUpdate: () => update(state.p) })
          .to(".roas-pulse", { scale: 2.4, opacity: 0, duration: 1, ease: "sine.out", repeat: 1 }, ">")
          .to(".roas-plot", { opacity: 0, duration: 0.6, ease: "sine.inOut" }, "+=0.6")
          .add(() => {
            state.p = 0.02;
            update(state.p);
            gsap.set(".roas-pulse", { scale: 1, opacity: 0.6 });
          })
          .to(".roas-plot", { opacity: 1, duration: 0.6, ease: "sine.inOut" });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => update(1));

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[15%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative grid grid-cols-3 gap-4">
        {[
          ["ROAS", <><span className="kpi-roas">2.7</span><span className="text-[0.6em]">×</span></>, "text-edge-stone-60"],
          ["CPL", <span key="c" className="kpi-cpl">-13%</span>, "text-white"],
          ["Revenue", <span key="r" className="kpi-rev">₹ 0.54 Cr</span>, "text-white"],
        ].map(([label, value, tone]) => (
          <div key={label}>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">{label}</p>
            <p className={`mt-1.5 whitespace-nowrap font-display text-[clamp(1.3rem,2.1vw,2rem)] leading-none tabular-nums ${tone}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-[7%] flex">
        <div className="flex w-[7%] shrink-0 flex-col justify-between py-0 text-[8px] font-medium text-white/40">
          {AXIS.map((tick) => (
            <span key={tick} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
              {tick}×
            </span>
          ))}
        </div>

        <div className="relative aspect-[1.82] flex-1">
          <div className="absolute inset-0 flex flex-col justify-between">
            {AXIS.map((tick) => (
              <span key={tick} className="h-px bg-white/[0.08]" />
            ))}
          </div>

          <div className="roas-plot absolute inset-0">
            <span className="roas-marker absolute inset-y-0 border-l border-dashed border-white/25" />
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
              <path className="roas-glow" d={LINE} fill="none" stroke="var(--edge-stone)" strokeWidth="8" strokeOpacity="0.25" strokeLinejoin="round" style={{ filter: "blur(4px)" }} vectorEffect="non-scaling-stroke" />
              <path className="roas-line" d={LINE} fill="none" stroke="var(--edge-stone)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>

            <span className="roas-tag absolute">
              <span className="roas-pulse absolute left-0 top-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-edge-stone/60" />
              <span className="absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-edge-stone bg-white" />
              <span className="absolute bottom-3 left-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-ink">
                ROAS <b className="font-bold">2.7×</b>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-[7%] flex items-center justify-between gap-4 pl-[7%]">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Meta · Google · Snapchat</span>
        <span className="text-[10px] text-white/50">100+ accounts, read every morning</span>
      </div>
    </div>
  );
}
