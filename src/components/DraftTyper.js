"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LIMIT = 60;
const DRAFTS = [
  "Words that sound like you, and sell like you mean it.",
  "Captions people save, not scroll past.",
  "Scripts that hold the first three seconds.",
];

// A draft that types itself, pauses, erases and moves to the next line, with a live character count
export default function DraftTyper({ start = 3 }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".draft-caret", { opacity: 0, duration: 0.5, ease: "steps(1)", repeat: -1, yoyo: true });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const root = rootRef.current;
    const text = root.querySelector(".draft-text");
    const count = root.querySelector(".draft-count");
    const label = root.querySelector(".draft-no");

    const render = (value, index) => {
      text.textContent = value;
      count.textContent = `${value.length} / ${LIMIT}`;
      label.textContent = String(start + index).padStart(2, "0");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(DRAFTS[0], 0);
      return;
    }

    let draft = 0;
    let chars = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const full = DRAFTS[draft];
      chars += deleting ? -1 : 1;
      render(full.slice(0, chars), draft);

      let delay = deleting ? 28 : 55 + Math.random() * 70;
      if (!deleting && chars === full.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && chars === 0) {
        deleting = false;
        draft = (draft + 1) % DRAFTS.length;
        delay = 500;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [start]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] items-center justify-center overflow-hidden rounded-lg border border-white/12 bg-black-depth"
    >
      <span className="pointer-events-none absolute -right-10 top-[8%] size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[12%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative h-[70%] w-[70%] rounded-lg border border-white/12 bg-white/[0.03] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-white/10 px-[5%] py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
          <span>
            Draft <span className="draft-no">03</span> · Brand voice
          </span>
          <span className="draft-count font-medium normal-case tracking-[0.08em] tabular-nums">0 / 60</span>
        </div>
        <p className="px-[5%] pt-[6%] font-display text-[clamp(1.4rem,2.3vw,2.2rem)] leading-[1.45] text-white/90">
          <span className="draft-text" />
          <span className="draft-caret ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-[0.15em] bg-edge-stone" />
        </p>
      </div>
    </div>
  );
}
