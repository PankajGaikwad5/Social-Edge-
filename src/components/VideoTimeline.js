"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const LOOP = 6; // seconds of "footage" the playhead sweeps
const FPS = 24;
const V1 = [
  [0, 35],
  [36, 70],
  [71, 100],
];
const V2 = [30, 58];
const WAVE = Array.from({ length: 64 }, (_, i) => {
  const quiet = i < 22 ? 0.35 : 1;
  return Math.max(0.12, quiet * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 0.9 + 0.1);
});

const pad = (n) => String(Math.floor(n)).padStart(2, "0");
const STRIP = { backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 4px, transparent 4px 9px)" };

function Clip({ from, to, className, children }) {
  return (
    <span style={{ left: `${from}%`, width: `${to - from}%` }} className={cn("absolute inset-y-0 rounded-md border p-1.5", className)}>
      {children}
    </span>
  );
}

export default function VideoTimeline() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const timecode = root.querySelector(".vt-timecode");
      const v2 = root.querySelector(".vt-v2");
      const tones = root.querySelectorAll(".vt-tone");
      let shot = -1;

      const update = (progress) => {
        const t = progress * LOOP;
        timecode.textContent = `00:00:${pad(t)}:${pad((t % 1) * FPS)}`;
        v2.classList.toggle("is-live", progress * 100 >= V2[0] && progress * 100 <= V2[1]);

        // Cross-fade the preview to the tone of the clip under the playhead
        const next = V1.findIndex(([a, b]) => progress * 100 >= a && progress * 100 <= b + 1);
        if (next !== shot && next !== -1) {
          shot = next;
          tones.forEach((tone, i) => gsap.to(tone, { opacity: i === next ? 1 : 0, duration: 0.6, ease: "sine.inOut", overwrite: true }));
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const head = { p: 0 };
        gsap.to(head, {
          p: 1,
          duration: LOOP,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            gsap.set(".vt-playhead", { left: `${head.p * 100}%` });
            update(head.p);
          },
        });

        const render = { v: 0 };
        gsap.to(render, {
          v: 100,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 0.8,
          onUpdate: () => {
            root.querySelector(".vt-render").textContent = `Render ${Math.round(render.v)}%`;
            gsap.set(".vt-render-bar", { scaleX: render.v / 100 });
          },
        });

        gsap.to(".vt-wave", {
          scaleY: 0.35,
          duration: 0.45,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.03, from: "random", repeat: -1, yoyo: true },
        });

        gsap.to(".vt-rec", { opacity: 0.25, duration: 0.7, ease: "sine.inOut", repeat: -1, yoyo: true });
      });

      // Without motion: a still frame partway through the sequence
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".vt-playhead", { left: "36%" });
        gsap.set(".vt-render-bar", { scaleX: 0.35 });
        update(0.36);
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] items-center justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative w-[78%]">
        {/* Preview monitor */}
        <div className="relative mx-auto w-[88%] overflow-hidden rounded-md border border-white/15 bg-black">
          <div className="relative aspect-[2.6]">
            <span className="vt-tone absolute inset-0 bg-warm-stone" />
            <span className="vt-tone absolute inset-0 bg-linear-135 from-graphite to-edge-stone/60 opacity-0" />
            <span className="vt-tone absolute inset-0 bg-linear-135 from-edge-stone-80 via-graphite to-black opacity-0" />
            <span className="absolute inset-x-0 top-[18%] h-px bg-white/15" />
            <span className="absolute inset-x-0 bottom-[22%] h-px bg-white/10" />
            <span className="absolute bottom-0 left-1/2 h-[30%] w-[24%] -translate-x-1/2 rounded-t-full bg-ink" />
            <span className="absolute bottom-[34%] left-1/2 aspect-square w-[10%] -translate-x-1/2 rounded-full bg-ink" />
            <span className="vt-rec absolute left-2.5 top-2.5 size-1.5 rounded-full bg-status-negative" />
          </div>
          <span className="vt-timecode absolute right-1.5 top-1 rounded-sm bg-black/70 px-1.5 text-[9px] font-semibold tabular-nums text-white">
            00:00:00:00
          </span>
          <span className="block h-2 bg-black" />
        </div>

        {/* Ruler and tracks */}
        <div className="mt-[5%] flex gap-[2%]">
          <div className="w-[6%] shrink-0 text-[10px] font-semibold text-white/45">
            <span className="block h-3" />
            {["V2", "V1", "A1"].map((name) => (
              <span key={name} className="mt-2.5 flex h-8 items-center">
                {name}
              </span>
            ))}
          </div>

          <div className="relative flex-1">
            <div
              className="h-3 border-b border-white/25"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 1px, transparent 1px 20px)",
                backgroundSize: "100% 40%",
                backgroundPosition: "bottom",
                backgroundRepeat: "repeat-x",
              }}
            />

            <div className="relative mt-2.5 h-8">
              <Clip
                from={V2[0]}
                to={V2[1]}
                className="vt-v2 border-edge-stone/60 bg-edge-stone/45 transition-[background-color,border-color] duration-500 [&.is-live]:border-white [&.is-live]:bg-edge-stone/80"
              >
                <span className="block size-full rounded-sm" style={STRIP} />
              </Clip>
            </div>

            <div className="relative mt-2.5 h-8">
              {V1.map(([a, b]) => (
                <Clip key={a} from={a} to={b} className="border-white/15 bg-white/[0.07]">
                  <span className="block size-full rounded-sm opacity-70" style={STRIP} />
                </Clip>
              ))}
            </div>

            <div className="mt-2.5 flex h-8 items-center gap-[0.35%] rounded-md border border-white/15 bg-edge-stone/[0.08] px-1.5">
              {WAVE.map((h, j) => (
                <span key={j} style={{ height: `${h * 70}%` }} className="vt-wave flex-1 rounded-full bg-edge-stone-60/80" />
              ))}
            </div>

            {/* Playhead spans the ruler and every track */}
            <span className="vt-playhead pointer-events-none absolute inset-y-0 left-[36%] w-px bg-white">
              <svg viewBox="0 0 10 8" className="absolute -left-[5px] -top-1 h-2 w-2.5 text-white">
                <path d="M0 0 H10 L5 8 Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="ml-[8%] mt-[5%]">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold uppercase tracking-[0.22em] text-white/60">Sequence 01 · 24 fps</span>
            <span className="vt-render font-medium tabular-nums text-edge-stone-60">Render 35%</span>
          </div>
          <div className="mt-2.5 h-px bg-white/15">
            <span className="vt-render-bar block h-full origin-left scale-x-[0.35] bg-edge-stone" />
          </div>
        </div>
      </div>
    </div>
  );
}
