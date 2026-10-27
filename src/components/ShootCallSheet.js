"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

const SHOTS = ["Wide establishing", "Product hero", "Detail macro", "Team at work", "Founder interview", "B-roll set"];

// A shot list that ticks off one shot at a time; the clapperboard claps and the take moves on for each
export default function ShootCallSheet() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const rows = gsap.utils.toArray(".cs-row");
      const take = root.querySelector(".cs-take");
      const done = root.querySelector(".cs-done");

      const tick = (n) => {
        rows.forEach((row, i) => row.classList.toggle("is-done", i < n));
        done.textContent = `${n} / ${SHOTS.length} shots`;
        take.textContent = `Scene ${String(Math.min(n + 1, SHOTS.length)).padStart(2, "0")} · Take 0${(n % 3) + 1}`;
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.add(() => tick(0)).set(".cs-bar", { scaleX: 0 });

        SHOTS.forEach((_, i) => {
          const at = 0.7 + i * 1.1;
          tl.fromTo(".cs-stick", { rotate: -24 }, { rotate: 0, duration: 0.22, ease: "power3.in" }, at)
            .to(".cs-board", { y: 2, duration: 0.08, yoyo: true, repeat: 1, ease: "sine.inOut" }, at + 0.22)
            .add(() => tick(i + 1), at + 0.25)
            .to(".cs-bar", { scaleX: (i + 1) / SHOTS.length, duration: 0.5, ease: "sine.inOut" }, at + 0.25)
            .to(".cs-stick", { rotate: -24, duration: 0.5, ease: "sine.inOut" }, at + 0.55);
        });

        tl.to({}, { duration: 1.6 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        tick(4);
        gsap.set(".cs-bar", { scaleX: 4 / SHOTS.length });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[13%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Call sheet · Day 01</span>
        <span className="text-[10px] text-white/55">Crew 06 · Wrap 18:00</span>
      </div>

      <div className="relative mt-6 flex items-center gap-[7%]">
        <ul className="flex-1 space-y-1">
          {SHOTS.map((shot, i) => (
            <li key={shot} className="cs-row group flex items-center gap-3 border-b border-white/[0.07] py-2 text-[11px] text-white/45 transition-colors duration-500 [&.is-done]:text-white">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-white/25 transition-colors duration-500 group-[.is-done]:border-edge-stone group-[.is-done]:bg-edge-stone">
                <Check size={11} strokeWidth={2.5} className="text-ink opacity-0 transition-opacity duration-300 group-[.is-done]:opacity-100" />
              </span>
              <span className="flex-1">{shot}</span>
              <span className="text-[9px] tabular-nums text-white/30">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>

        {/* Clapperboard */}
        <div className="cs-board w-[38%] shrink-0">
          <span
            className="cs-stick block h-5 origin-bottom-left rounded-t-sm"
            style={{ backgroundImage: "repeating-linear-gradient(120deg, #F4F3EF 0 12px, #090909 12px 24px)" }}
          />
          <div className="rounded-b-sm border border-white/15 bg-[#121212] p-3">
            <span
              className="block h-3 rounded-sm"
              style={{ backgroundImage: "repeating-linear-gradient(120deg, #A5947C 0 12px, #090909 12px 24px)" }}
            />
            <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">Social Edge · Project</p>
            <p className="cs-take mt-1.5 font-display text-[clamp(0.8rem,1.2vw,1.1rem)] text-white">Scene 01 · Take 01</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[8px] text-white/45">
              <span className="border-t border-white/10 pt-1">Roll A</span>
              <span className="border-t border-white/10 pt-1">4K · 25p</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold uppercase tracking-[0.22em] text-white/55">On schedule</span>
          <span className="cs-done tabular-nums text-edge-stone-60">0 / 6 shots</span>
        </div>
        <div className="mt-2.5 h-px bg-white/15">
          <span className="cs-bar block h-full origin-left scale-x-0 bg-edge-stone" />
        </div>
      </div>
    </div>
  );
}
