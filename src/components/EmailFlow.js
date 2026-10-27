"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mail, MailCheck } from "lucide-react";

const FLOWS = ["Welcome series", "Abandoned cart", "Post-purchase", "Win-back"];
// Flight path in a 600 × 480 box: from the send button up to the inbox
const ROUTE = "M150 345 C180 300 220 262 300 222 S392 200 420 206";
const RING = 2 * Math.PI * 44;

// Each loop: the next lifecycle flow lights up, the campaign sends, envelopes fly to the inbox and the open rate climbs
export default function EmailFlow() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const route = root.querySelector(".mail-route");
      const length = route.getTotalLength();
      const envelopes = gsap.utils.toArray(".mail-env");
      const flows = gsap.utils.toArray(".mail-flow");
      const ring = root.querySelector(".mail-ring");
      const rate = root.querySelector(".mail-rate");
      const open = { v: 0 };

      const setRate = () => {
        rate.textContent = `${Math.round(open.v)}%`;
        ring.style.strokeDashoffset = RING * (1 - open.v / 100);
      };

      const place = (el, p) => {
        const pt = route.getPointAtLength(length * p);
        gsap.set(el, { left: `${(pt.x / 600) * 100}%`, top: `${(pt.y / 480) * 100}%`, scale: 0.75 + p * 0.5, rotate: -12 + p * 12 });
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let flow = 0;
        const loop = gsap.timeline({ repeat: -1 });

        loop
          .add(() => {
            flows.forEach((el, i) => el.classList.toggle("is-on", i === flow));
            flow = (flow + 1) % FLOWS.length;
          })
          .set(open, { v: 0, onComplete: setRate })
          .to(".mail-send", { scale: 0.95, duration: 0.15, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.5);

        envelopes.forEach((el, i) => {
          const fly = { p: 0 };
          const at = 0.8 + i * 0.55;
          loop
            .set(el, { opacity: 0 }, at)
            .add(() => place(el, 0), at)
            .to(el, { opacity: 1, duration: 0.25 }, at)
            .to(fly, { p: 1, duration: 1.5, ease: "sine.inOut", onUpdate: () => place(el, fly.p) }, at)
            .to(el, { opacity: 0, duration: 0.3 }, at + 1.25)
            .to(".mail-inbox", { scale: 1.14, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 }, at + 1.4)
            .to(open, { v: 14 * (i + 1), duration: 0.6, ease: "sine.out", onUpdate: setRate }, at + 1.45);
        });

        loop.to({}, { duration: 1.6 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        flows[1].classList.add("is-on");
        open.v = 42;
        setRate();
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

      {/* Lifecycle flows */}
      <div className="absolute left-[14%] top-[17%]">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Lifecycle flows</p>
        <ul className="mt-3 space-y-2.5">
          {FLOWS.map((name, i) => (
            <li key={name} className={`mail-flow group flex items-center gap-2.5 text-[11px] text-white/45 transition-colors duration-500 [&.is-on]:text-white ${i === 1 ? "is-on" : ""}`}>
              <span className="flex size-3 items-center justify-center rounded-full border border-transparent transition-colors duration-500 group-[.is-on]:border-edge-stone-60">
                <span className="size-1.5 rounded-full bg-white/25 transition-colors duration-500 group-[.is-on]:bg-edge-stone-60" />
              </span>
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Open-rate ring */}
      <div className="absolute right-[14%] top-[15%] flex aspect-square w-[19%] items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
          <circle
            className="mail-ring"
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--edge-stone)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING}
          />
        </svg>
        <span className="text-center">
          <span className="mail-rate block font-display text-[clamp(1rem,1.6vw,1.5rem)] leading-none text-white">0%</span>
          <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50">Open rate</span>
        </span>
      </div>

      {/* Route, envelopes and inbox */}
      <svg viewBox="0 0 600 480" className="absolute inset-0 size-full">
        <path className="mail-route" d={ROUTE} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 5" />
      </svg>
      {[0, 1, 2].map((i) => (
        <span key={i} className="mail-env absolute -translate-x-1/2 -translate-y-1/2 text-white opacity-0">
          <Mail size={26} strokeWidth={1.5} />
        </span>
      ))}
      <span
        style={{ left: `${(420 / 600) * 100}%`, top: `${(206 / 480) * 100}%` }}
        className="mail-inbox absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-edge-stone/70 bg-edge-stone/25 text-edge-stone-60"
      >
        <MailCheck size={20} strokeWidth={1.5} />
      </span>

      {/* Send button */}
      <span className="mail-send absolute left-[14%] top-[69%] flex h-9.5 items-center gap-2 rounded-full bg-edge-stone-60 px-6 text-[11px] font-bold text-ink">
        Send campaign
        <ArrowRight size={12} strokeWidth={2} />
      </span>

      <div className="absolute inset-x-[14%] bottom-[12%] flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Klaviyo · Mailchimp · HubSpot</span>
        <span className="text-[10px] text-edge-stone-60">₹40 revenue / ₹1 sent</span>
      </div>
    </div>
  );
}
