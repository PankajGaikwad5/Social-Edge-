"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Quote, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBTITLE = "We doubled repeat orders in a quarter.";
const WAVE = Array.from({ length: 44 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)) * 0.75);
const STORIES = [
  { quote: "They shot, cut and delivered in ten days. Our best launch yet.", name: "Aarti · Founder, jewellery" },
  { quote: "The reel did the selling for us. Bookings went up 3× in a month.", name: "Karan · Director, hospitality" },
  { quote: "Finally an agency that reports numbers we can actually check.", name: "Nidhi · CMO, D2C skincare" },
];

function Cam({ label, close, children, className }) {
  return (
    <div className={cn("relative overflow-hidden rounded-sm border border-white/15 bg-linear-160 from-graphite/70 to-black", className)}>
      <span
        className={cn(
          "absolute left-1/2 aspect-square -translate-x-1/2 rounded-full bg-ink",
          close ? "bottom-[30%] w-[38%]" : "bottom-[34%] left-[62%] w-[14%]"
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 -translate-x-1/2 rounded-t-full bg-ink",
          close ? "left-1/2 h-[30%] w-[76%]" : "left-[62%] h-[30%] w-[34%]"
        )}
      />
      {children}
      <span className="absolute bottom-1.5 right-2 text-[7px] font-bold tracking-[0.14em] text-white/60">{label}</span>
    </div>
  );
}

// One panel for both services: an interview set-up, then customer stories, switching on a loop
export default function InterviewStories() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const subtitle = root.querySelector(".is-sub");
      const cams = gsap.utils.toArray(".is-cam");
      const cards = gsap.utils.toArray(".is-card");
      const tabs = gsap.utils.toArray(".is-tab");
      let first = 0;

      const setCam = (live) => cams.forEach((cam, i) => cam.classList.toggle("is-live", i === live));
      const setTab = (i) => {
        tabs.forEach((tab, j) => tab.classList.toggle("is-on", j === i));
        gsap.to(".is-pill", { xPercent: i * 100, duration: 0.5, ease: "power2.inOut" });
      };
      // Centre card is the featured story; the others sit dimmed either side
      const arrange = (instant) =>
        cards.forEach((card, i) => {
          const slot = ((i - first + 4) % 3) - 1;
          gsap.to(card, {
            xPercent: -50 + slot * 106,
            scale: slot ? 0.88 : 1,
            opacity: slot ? 0.45 : 1,
            borderColor: slot ? "rgba(255,255,255,0.1)" : "rgba(165,148,124,0.8)",
            duration: instant ? 0 : 0.7,
            ease: "power2.inOut",
          });
        });

      setCam(0);
      arrange(true);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".is-wave", { scaleY: 0.3, duration: 0.4, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: 0.04, from: "random", repeat: -1, yoyo: true } });
        gsap.to(".is-rec", { opacity: 0.2, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true });

        const type = { n: 0 };
        gsap
          .timeline({ repeat: -1 })
          // Interviews
          .add(() => setTab(0), 0)
          .to(".is-interview", { opacity: 1, duration: 0.6, ease: "sine.inOut" }, 0)
          .to(".is-stories", { opacity: 0, duration: 0.6, ease: "sine.inOut" }, 0)
          .fromTo(type, { n: 0 }, { n: SUBTITLE.length, duration: 2.4, ease: "none", onUpdate: () => (subtitle.textContent = SUBTITLE.slice(0, Math.round(type.n))) }, 0.6)
          .add(() => setCam(1), 2)
          .add(() => setCam(0), 3.8)
          .add(() => setCam(1), 5.4)
          // Testimonials
          .add(() => {
            setTab(1);
            setCam(0);
          }, 7)
          .to(".is-interview", { opacity: 0, duration: 0.6, ease: "sine.inOut" }, 7)
          .to(".is-stories", { opacity: 1, duration: 0.6, ease: "sine.inOut" }, 7)
          .add(() => {
            first = (first + 1) % 3;
            arrange();
          }, 9)
          .add(() => {
            first = (first + 1) % 3;
            arrange();
          }, 11.2)
          .add(() => {
            first = (first + 1) % 3;
            arrange();
          }, 13.4)
          .to({}, { duration: 1.2 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        subtitle.textContent = SUBTITLE;
        gsap.set(".is-stories", { opacity: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative flex aspect-[1.25] flex-col overflow-hidden rounded-lg border border-white/12 bg-black-depth px-[12%] pb-[8%] pt-[10%]"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-96 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-[10%] size-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="relative grid grid-cols-2 rounded-full border border-white/15 p-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">
          <span className="is-pill absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-edge-stone" />
          {["Interviews", "Testimonials"].map((tab, i) => (
            <span key={tab} className={cn("is-tab relative px-3 py-1.5 text-center text-white/55 transition-colors duration-500 [&.is-on]:text-ink", i === 0 && "is-on")}>
              {tab}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-edge-stone-60">
          4.9 <Star size={10} strokeWidth={2} /> across 200+ reviews
        </span>
      </div>

      <div className="relative mt-[6%] flex-1">
        {/* Interviews */}
        <div className="is-interview absolute inset-0 flex flex-col">
          <div className="flex gap-3">
            <Cam label="A CAM · wide" className="is-cam aspect-[1.5] flex-[1.8] transition-colors duration-300 [&.is-live]:border-white/90">
              <span className="absolute left-2 top-1.5 flex items-center gap-1 text-[7px] font-bold text-white/80">
                <span className="is-rec size-1 rounded-full bg-status-negative" />
                REC
              </span>
              <span className="absolute bottom-[18%] left-[6%] border-l-2 border-edge-stone bg-black/75 px-2 py-1 text-[8px] leading-tight text-white">
                Founder &amp; CEO
                <span className="block text-[7px] text-white/50">Your Brand</span>
              </span>
            </Cam>
            <Cam label="B CAM · close" close className="is-cam aspect-[1.05] flex-1 transition-colors duration-300 [&.is-live]:border-white/90" />
          </div>

          <div className="mt-[7%] flex h-7 items-center justify-between gap-[0.5%]">
            {WAVE.map((h, i) => (
              <span key={i} style={{ height: `${h * 100}%` }} className="is-wave w-[1.4%] rounded-full bg-edge-stone-60/70" />
            ))}
          </div>
          <p className="mx-auto mt-3 min-h-6 min-w-[55%] bg-black/70 px-3 py-1 text-center text-[10px] font-semibold text-white">
            <span className="is-sub" />
          </p>
        </div>

        {/* Testimonials */}
        <div className="is-stories absolute inset-0 opacity-0">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className="is-card absolute left-1/2 top-[6%] w-[38%] rounded-lg border bg-[#0d0d0d] p-[3.5%]"
            >
              <Quote size={20} strokeWidth={1.75} className="text-edge-stone" />
              <p className="mt-3 font-display text-[clamp(0.7rem,1.1vw,1rem)] leading-snug text-white">{story.quote}</p>
              <span className="mt-3 flex gap-0.5 text-edge-stone">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={10} strokeWidth={2} />
                ))}
              </span>
              <span className="mt-3 flex items-center gap-1.5 text-[8px] text-white/60">
                <span className="flex size-4 items-center justify-center rounded-full bg-white/15">
                  <User size={9} strokeWidth={2} />
                </span>
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Two-cam · Lav + boom · 4K</span>
        <span className="text-[10px] text-white/55">Long-form + 9:16 cut-downs</span>
      </div>
    </div>
  );
}
