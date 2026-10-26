"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { leftwardMarquee } from "@/lib/marquee";
import { SOCIALS } from "@/lib/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

// Supplied reel for now; swap for the Social Edge studio reel before launch
const REEL_SRC = "https://sagemedia.in/wp-content/uploads/sage-media/2026/09/Untitled-design-1.mp4";

const WORDS = ["Unskippable.", "Unforgettable.", "Unmissable.", "Unstoppable."];
const WORD_HOLD = 2800;

// The last word swaps letter by letter, with the tail of the word fading into stone
function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), WORD_HOLD);
    return () => clearInterval(id);
  }, []);

  const word = WORDS[index];

  return (
    <span className="relative block overflow-hidden pb-[0.08em]" aria-label={WORDS.join(", ")}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={word} aria-hidden className="block whitespace-nowrap">
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              // White fading to stone across the back half of the word
              style={{ color: `color-mix(in srgb, var(--edge-stone-60) ${Math.max(0, Math.min(100, ((i / (word.length - 1)) - 0.45) * 220))}%, var(--color-white))` }}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-105%", transition: { duration: 0.32, delay: i * 0.012, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.5, delay: i * 0.022, ease: [0, 0, 0.2, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const DISCIPLINES = ["Packaging", "Performance", "PR", "Websites", "Socials", "Campaigns", "Films", "Launches"];

function MarqueeRow({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {DISCIPLINES.map((item) => (
        <li key={item} className="flex items-center">
          <span className="whitespace-nowrap font-display text-[clamp(1.4rem,1.6vw,1.9rem)] uppercase leading-none text-white/90">
            {item}
          </span>
          <span className="mx-12 size-1.5 rounded-full bg-edge-stone-60/70 lg:mx-16" />
        </li>
      ))}
    </ul>
  );
}

export default function WorkStudio() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    video.muted = !muted;
    if (video.paused) video.play().catch(() => {});
    setMuted(!muted);
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = { trigger: sectionRef.current, start: "top 70%", once: true };

        gsap.from([".studio-eyebrow", ".studio-line", ".studio-copy", ".studio-actions"], {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: reveal,
        });

        gsap.from(".studio-phone-wrap", {
          y: 80,
          rotateX: 18,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: reveal,
        });

        // Idle float, then the phone leans toward the cursor anywhere in the section
        gsap.to(".studio-phone-float", { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Glows breathe slowly on their own
        gsap.utils.toArray(".studio-glow > span").forEach((el, i) =>
          gsap.to(el, { scale: 1.15, opacity: 0.75, duration: 5 + i, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.8 })
        );

        const section = sectionRef.current;
        const stopMarquee = leftwardMarquee(section.querySelector(".studio-track"), {
          trigger: section.querySelector(".studio-marquee"),
          duration: 45,
        });

        // Touch screens get the marquee and float, not the cursor tilt
        if (!window.matchMedia("(hover: hover)").matches) return stopMarquee;

        const phone = phoneRef.current;
        const glare = phone.querySelector(".studio-glare");
        const glows = gsap.utils.toArray(".studio-glow").map((el) => ({ el, depth: Number(el.dataset.depth) }));
        const setPhone = gsap.quickSetter(phone, "css");
        const setGlare = gsap.quickSetter(glare, "css");

        // Pointer is tracked on the window and the tilt is eased every frame toward it,
        // so it reacts instantly, never snaps, and keeps up while the page scrolls under a still cursor
        const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, inside: false };
        const target = { rx: 0, ry: 0, gx: 0, gy: 0 };
        const current = { rx: 0, ry: 0, gx: 0, gy: 0 };

        const onMove = (e) => {
          pointer.x = e.clientX;
          pointer.y = e.clientY;
        };
        const onEnter = () => (pointer.inside = true);
        const onLeave = () => (pointer.inside = false);

        const tick = () => {
          if (pointer.inside) {
            const box = phone.getBoundingClientRect();
            const nx = gsap.utils.clamp(-1, 1, (pointer.x - (box.left + box.width / 2)) / (window.innerWidth * 0.4));
            const ny = gsap.utils.clamp(-1, 1, (pointer.y - (box.top + box.height / 2)) / (window.innerHeight * 0.45));
            target.ry = nx * 26;
            target.rx = -ny * 18;
            target.gx = nx;
            target.gy = ny;
          } else {
            target.rx = target.ry = target.gx = target.gy = 0;
          }

          // Frame-rate independent ease toward the target
          const k = 1 - Math.pow(0.88, gsap.ticker.deltaRatio());
          for (const key in current) current[key] += (target[key] - current[key]) * k;

          setPhone({ rotationX: current.rx, rotationY: current.ry });
          setGlare({ xPercent: current.gx * 35, yPercent: current.gy * 35 });
          glows.forEach((g) => {
            gsap.set(g.el, { x: current.gx * g.depth, y: current.gy * g.depth * 0.7 });
          });
        };

        gsap.ticker.add(tick);
        window.addEventListener("pointermove", onMove);
        section.addEventListener("pointerenter", onEnter);
        section.addEventListener("pointerleave", onLeave);
        return () => {
          stopMarquee();
          gsap.ticker.remove(tick);
          window.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerenter", onEnter);
          section.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const SoundIcon = muted ? VolumeX : Volume2;
  const instagram = SOCIALS.find((s) => s.label === "Instagram")?.href ?? "#";

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-graphite/50 bg-edge-black px-6 pb-0 pt-20 lg:px-10 lg:pt-28">
      {/* Faint grid plus coloured ambient light, as in the reference (off-palette exception for this section) */}
      <span aria-hidden className="tile-grid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { left: "8%", top: "20%", size: "55rem", color: "rgb(36 58 30 / 0.35)", blur: 160, depth: 40 },
          { left: "55%", top: "72%", size: "30rem", color: "rgb(226 226 220 / 0.5)", blur: 95, depth: 220 },
          { left: "98%", top: "45%", size: "34rem", color: "rgb(112 66 230 / 0.6)", blur: 120, depth: -60 },
          { left: "86%", top: "98%", size: "36rem", color: "rgb(196 98 34 / 0.55)", blur: 120, depth: -80 },
          { left: "70%", top: "102%", size: "24rem", color: "rgb(150 34 40 / 0.4)", blur: 110, depth: 60 },
        ].map((glow) => (
          <span key={glow.left + glow.top} className="studio-glow absolute size-0" data-depth={glow.depth} style={{ left: glow.left, top: glow.top }}>
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: glow.size, height: glow.size, background: glow.color, filter: `blur(${glow.blur}px)` }}
            />
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-372 items-center gap-16 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
        <div>
          <p className="studio-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
            <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="size-1.5 animate-pulse rounded-full bg-edge-stone" />
            </span>
            Live from the studio
          </p>

          <h2 className="mt-7 font-display text-[11.5vw] uppercase leading-[1.02] tracking-[-0.01em] text-white sm:text-[clamp(3.25rem,5vw,6rem)]">
            <span className="studio-line block">We make brands</span>
            <span className="studio-line block">
              <CyclingWord />
            </span>
          </h2>

          <p className="studio-copy mt-7 max-w-[34rem] text-[clamp(1.05rem,1.15vw,1.35rem)] leading-[1.55] text-white/85">
            1.3 billion views and counting, across 1800+ shoots for 1000+ brands. Watch the reel, scroll the feed, then
            bring us the problem nobody else could crack.
          </p>

          <div className="studio-actions mt-9 flex flex-wrap items-center gap-6">
            <Magnetic>
              <Link
                href="/contact"
                className={cn(
                  "group flex h-13 w-fit items-center gap-4 rounded-full bg-white pl-6 pr-1.5 text-edge-black transition-[gap] duration-500 hover:gap-6",
                  EASE_OUT
                )}
              >
                <span className="font-display text-[1.15rem] uppercase leading-none">Bring us your problem</span>
                <span
                  data-magnetic-inner
                  className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-edge-stone text-white"
                >
                  <ArrowRight size={16} strokeWidth={1.75} className={cn("absolute transition-transform duration-500 group-hover:translate-x-[220%]", EASE_OUT)} />
                  <ArrowRight size={16} strokeWidth={1.75} className={cn("absolute -translate-x-[220%] transition-transform duration-500 group-hover:translate-x-0", EASE_OUT)} />
                </span>
              </Link>
            </Magnetic>

            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              Follow the feed
              <ArrowUpRight size={13} strokeWidth={1.75} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/80 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-edge-stone transition-transform delay-150 duration-500 group-hover:scale-x-100" />
            </a>
          </div>
        </div>

        {/* Phone: floats idly and leans toward the cursor */}
        <div className="studio-phone-wrap flex justify-center lg:justify-end lg:pr-[9.5rem]">
          <div className="studio-phone-float [perspective:1200px]">
            <div
              ref={phoneRef}
              className="surface-dark relative aspect-[9/17.5] w-[min(76vw,340px)] rounded-[2.6rem] border-[7px] border-[#5f5f5d] bg-[#5f5f5d] p-0 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.85),inset_0_0_0_1px_rgb(255_255_255/0.12)] [transform-style:preserve-3d] lg:w-[min(19.6vw,380px)]"
            >
              <div className="relative size-full overflow-hidden rounded-[2.1rem] bg-ink">
                <video
                  ref={videoRef}
                  src={REEL_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 size-full object-cover"
                />
                {/* Glass sheen that slides with the tilt */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="studio-glare absolute -inset-1/2 bg-[radial-gradient(circle_at_50%_50%,rgb(255_255_255/0.22),transparent_40%)]" />
                </span>

                <button
                  type="button"
                  onClick={toggleSound}
                  className="absolute inset-x-3 bottom-3 flex h-11 items-center justify-center gap-2.5 rounded-full border border-white/15 bg-edge-black/55 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-edge-black/75"
                >
                  <SoundIcon size={14} strokeWidth={1.75} />
                  {muted ? "Play with sound" : "Mute"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disciplines drift past, fading in from the left */}
      <div className="studio-marquee relative -mx-6 mt-20 border-t lg:-mx-10 border-graphite/40 py-7 lg:mt-24 [mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.35)_25%,black_75%)]">
        <div className="studio-track flex w-max">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  );
}
