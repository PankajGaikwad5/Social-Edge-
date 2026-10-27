"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SCENE = 1.47; // scene width / height
// Each placement as a frame size in % of the scene: [label, ratio, height %]
const CROPS = [
  ["Story", "9:16", 9 / 16, 92],
  ["Feed", "1:1", 1, 88],
  ["YouTube", "16:9", 16 / 9, 70],
  ["Portrait", "4:5", 4 / 5, 92],
];
const frame = ([, , r, h]) => ({ height: `${h}%`, width: `${(r * h) / SCENE}%` });

// One frame, re-cropped for every placement in turn
export default function CampaignCrop() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const tag = root.querySelector(".crop-tag");
      const count = root.querySelector(".crop-count");
      const thumbs = gsap.utils.toArray(".crop-thumb");

      const label = (i) => {
        tag.textContent = `${CROPS[i][0]} · ${CROPS[i][1]}`;
        count.textContent = `Crop ${String(i + 1).padStart(2, "0")} / 04`;
        thumbs.forEach((t, j) => t.classList.toggle("is-on", j === i));
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1 });
        CROPS.forEach((crop, i) => {
          tl.to(".crop-frame", { ...frame(crop), duration: 0.9, ease: "power2.inOut" })
            .add(() => label(i), "<0.3")
            .to({}, { duration: 1.5 });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => label(1));

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[18%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">One shoot · every placement</span>
        <span className="crop-count text-[10px] tabular-nums text-white/55">Crop 02 / 04</span>
      </div>

      {/* Scene */}
      <div className="relative mt-4 overflow-hidden rounded-sm" style={{ aspectRatio: SCENE }}>
        <span className="absolute inset-0 bg-linear-180 from-graphite via-edge-stone/70 to-edge-stone-60/60" />
        <span className="absolute inset-x-0 bottom-0 h-[32%] bg-ink/90" />
        <span className="absolute right-[16%] top-[18%] aspect-square w-[16%] rounded-full bg-soft-ivory/90" />
        <span className="absolute bottom-[32%] left-1/2 aspect-square w-[9%] -translate-x-1/2 translate-y-[20%] rounded-full bg-ink" />
        <span className="absolute bottom-0 left-1/2 h-[24%] w-[22%] -translate-x-1/2 rounded-t-full bg-ink" />

        {/* Crop frame: everything outside it is dimmed */}
        <span
          style={frame(CROPS[1])}
          className="crop-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/90 shadow-[0_0_0_999px_rgba(0,0,0,0.5)]"
        >
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`absolute size-2.5 -m-px border-white ${c}`} />
          ))}
          <span className="crop-tag absolute -top-3 left-0 -translate-y-full whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[8px] font-bold text-ink">
            Feed · 1:1
          </span>
        </span>
      </div>

      {/* Placements */}
      <ul className="relative mt-6 flex items-end gap-[6%]">
        {CROPS.map(([, ratio, r]) => (
          <li key={ratio} className="crop-thumb group text-center">
            <span
              style={{ width: `${Math.round(r * 40)}px` }}
              className="block h-10 rounded-sm border border-white/12 bg-white/[0.05] transition-colors duration-500 group-[.is-on]:border-edge-stone group-[.is-on]:bg-edge-stone/60"
            />
            <span className="mt-1.5 block text-[8px] font-semibold text-white/40 transition-colors duration-500 group-[.is-on]:text-white">
              {ratio}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
