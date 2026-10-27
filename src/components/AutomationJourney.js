"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Journey in a 600 × 480 box: trigger → condition → yes (alert sales) / no (nurture email)
const YES = "M110 250 H360 V150 H530";
const NO = "M110 250 H360 V330 H530";
const RUNS = ["yes", "no", "no", "yes", "no"];
const TRAVEL = 2.6;
const GAP = 1.4;
// Share of each route travelled when a lead reaches the condition and the action node
const AT = { diamond: 180 / 520, yes: 390 / 520, no: 390 / 570 };

const pos = (x, y) => ({ left: `${(x / 600) * 100}%`, top: `${(y / 480) * 100}%` });

export default function AutomationJourney() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const routes = { yes: root.querySelector(".aj-yes"), no: root.querySelector(".aj-no") };
      const lengths = { yes: routes.yes.getTotalLength(), no: routes.no.getTotalLength() };
      const counter = root.querySelector(".aj-runs");
      let runs = 1242;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1 });

        gsap.utils.toArray(".aj-token").forEach((token, i) => {
          const branch = RUNS[i];
          const route = routes[branch];
          const length = lengths[branch];
          const state = { p: 0 };
          const at = i * GAP;
          const place = () => {
            const pt = route.getPointAtLength(length * state.p);
            gsap.set(token, { left: `${(pt.x / 600) * 100}%`, top: `${(pt.y / 480) * 100}%` });
          };

          tl.set(state, { p: 0 }, at)
            .add(place, at)
            .fromTo(token, { opacity: 0 }, { opacity: 1, duration: 0.25 }, at)
            .fromTo(".aj-trigger", { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, at)
            .to(state, { p: 1, duration: TRAVEL, ease: "sine.inOut", onUpdate: place }, at)
            .fromTo(".aj-diamond", { scale: 1 }, { scale: 1.14, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, at + TRAVEL * AT.diamond)
            .fromTo(
              `.aj-node-${branch}`,
              { borderColor: "rgba(255,255,255,0.3)" },
              { borderColor: "rgba(201,190,176,1)", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" },
              at + TRAVEL * AT[branch]
            )
            .to(token, { opacity: 0, duration: 0.25 }, at + TRAVEL - 0.2)
            .add(() => {
              runs += 1;
              counter.textContent = `${runs.toLocaleString("en-US")} runs this week`;
            }, at + TRAVEL);
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative aspect-[1.25] overflow-hidden rounded-lg border border-white/12 bg-black-depth"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="absolute inset-x-[14%] top-[14%] flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Journey · Lead to customer</span>
        <span className="aj-runs text-[10px] tabular-nums text-white/55">1,242 runs this week</span>
      </div>

      <svg viewBox="0 0 600 480" className="absolute inset-0 size-full">
        {[YES, NO].map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        <path className="aj-yes" d={YES} fill="none" stroke="none" />
        <path className="aj-no" d={NO} fill="none" stroke="none" />
        {[150, 330].map((y) => (
          <circle key={y} cx="530" cy={y} r="5" fill="rgba(255,255,255,0.35)" />
        ))}
      </svg>

      <span style={pos(343, 140)} className="absolute text-[8px] text-white/45">yes</span>
      <span style={pos(343, 352)} className="absolute text-[8px] text-white/45">no</span>

      {/* Trigger */}
      <span style={pos(110, 250)} className="absolute -translate-x-1/2 -translate-y-1/2">
        <span className="aj-trigger block size-11 rounded-full border border-white/40 bg-white/[0.04]" />
      </span>
      <span style={pos(110, 290)} className="absolute -translate-x-1/2 text-center text-[9px] leading-tight text-white/80">
        Form filled
        <span className="block text-white/40">Trigger</span>
      </span>

      {/* Condition */}
      <span style={pos(250, 250)} className="absolute -translate-x-1/2 -translate-y-1/2">
        <span className="aj-diamond flex size-9 rotate-45 items-center justify-center rounded-md border border-edge-stone-60 bg-edge-stone/60">
          <span className="size-2 rounded-full bg-white/90" />
        </span>
      </span>
      <span style={pos(250, 290)} className="absolute -translate-x-1/2 whitespace-nowrap text-center text-[9px] leading-tight text-white/80">
        Score &gt; 60?
        <span className="block text-white/40">Condition</span>
      </span>

      {/* Actions */}
      {[
        ["yes", 150, "Alert sales", "WhatsApp + CRM"],
        ["no", 330, "Nurture email", "Day 0 · 3 · 7"],
      ].map(([branch, y, title, meta]) => (
        <span
          key={branch}
          style={pos(430, y)}
          className={`aj-node-${branch} absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/30 bg-black-depth px-3 py-1.5 text-center text-[9px] leading-tight`}
        >
          <span className="block font-semibold text-white">{title}</span>
          <span className="block text-white/45">{meta}</span>
        </span>
      ))}

      {RUNS.map((_, i) => (
        <span key={i} className="aj-token absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-edge-stone-60 opacity-0 shadow-[0_0_12px_2px_rgba(165,148,124,0.6)]" />
      ))}

      <p className="absolute bottom-[10%] left-[14%] text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Zero manual steps</p>
    </div>
  );
}
