"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// A logo outline traced in a loop: the pen rides the stroke, anchors appear as it reaches them,
// and a dashed guide stretches from the pen to the next anchor
const SHAPE = "M232 164 C250 140 275 128 302 128 C380 128 432 150 424 196 C418 270 386 356 326 356 C260 356 196 320 196 250 C196 214 210 188 232 164 Z";
const ANCHORS = [
  [302, 128],
  [424, 196],
  [326, 356],
  [196, 250],
];
const HANDLE = { from: [196, 250], to: [208, 178] };

// Fraction of the stroke at which the pen passes each anchor
function anchorFractions(path, length) {
  return ANCHORS.map(([ax, ay]) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i <= 240; i++) {
      const p = path.getPointAtLength((length * i) / 240);
      const d = (p.x - ax) ** 2 + (p.y - ay) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i / 240;
      }
    }
    return best;
  });
}

export default function PenToolCanvas({ label = "Pen tool · Logo mark v4" }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const path = root.querySelector(".pen-shape");
      const pen = root.querySelector(".pen-cursor");
      const guide = root.querySelector(".pen-guide");
      const drawing = root.querySelector(".pen-drawing");
      const anchors = root.querySelectorAll(".pen-anchor");
      const handle = root.querySelector(".pen-handle");
      const length = path.getTotalLength();
      const fractions = anchorFractions(path, length);

      const place = (progress) => {
        const p = path.getPointAtLength(length * progress);
        path.style.strokeDashoffset = length * (1 - progress);
        pen.setAttribute("transform", `translate(${p.x} ${p.y})`);

        anchors.forEach((a, i) => (a.style.opacity = progress >= fractions[i] ? 1 : 0));
        handle.style.opacity = progress >= fractions[3] ? 1 : 0;

        const next = fractions.findIndex((f) => f > progress);
        const [nx, ny] = next === -1 ? [232, 164] : ANCHORS[next];
        guide.setAttribute("x1", p.x);
        guide.setAttribute("y1", p.y);
        guide.setAttribute("x2", nx);
        guide.setAttribute("y2", ny);
      };

      path.style.strokeDasharray = length;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { p: 0 };
        place(0);
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.3 })
          .set(drawing, { opacity: 1 })
          .set(state, { p: 0 })
          .to(state, { p: 1, duration: 4.4, ease: "sine.inOut", onUpdate: () => place(state.p) })
          .to(guide, { opacity: 0, duration: 0.4 }, "<4")
          .to({}, { duration: 1.4 })
          .to(drawing, { opacity: 0, duration: 0.7, ease: "sine.inOut" })
          .set(guide, { opacity: 1 });
      });

      // Without motion the finished mark is shown
      mm.add("(prefers-reduced-motion: reduce)", () => place(1));

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
      <span
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      <p className="absolute left-[15%] top-[12%] text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">{label}</p>

      <svg viewBox="0 0 600 480" className="absolute inset-0 size-full">
        <g className="pen-drawing">
          <path className="pen-shape" d={SHAPE} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />

          <g className="pen-handle transition-opacity duration-300" style={{ opacity: 0 }}>
            <line x1={HANDLE.from[0]} y1={HANDLE.from[1]} x2={HANDLE.to[0]} y2={HANDLE.to[1]} stroke="var(--edge-stone)" strokeWidth="1.25" />
            <circle cx={HANDLE.to[0]} cy={HANDLE.to[1]} r="3.5" fill="var(--edge-stone)" />
          </g>

          {ANCHORS.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              className="pen-anchor transition-opacity duration-300"
              style={{ opacity: 0 }}
              x={x - 4}
              y={y - 4}
              width="8"
              height="8"
              fill="#0d0d0d"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.25"
            />
          ))}
          <circle cx="232" cy="164" r="5" fill="#0d0d0d" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        </g>

        <line className="pen-guide" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="3 4" />

        {/* Outline pen (lucide "pen" geometry), tip sitting on the stroke */}
        <g className="pen-cursor">
          <g transform="translate(-2 -22) scale(1.15)" fill="none" stroke="var(--edge-stone)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </g>
        </g>
      </svg>
    </div>
  );
}
