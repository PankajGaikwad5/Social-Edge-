"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

// Placeholder film supplied for now; swap for the Social Edge reel once it is cut
const FILM_SRC = "https://sagemedia.in/wp-content/uploads/sage-media/2026/09/sage-ad-mumbai-1.mp4";

export default function AboutHero() {
  const sectionRef = useRef(null);
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
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from(".about-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".about-eyebrow", { x: -20, opacity: 0, duration: 0.8 }, 0.1)
          .from(".about-line-inner", { yPercent: 112, duration: 1.2, stagger: 0.12, ease: "power4.out" }, 0.2)
          .from([".about-copy", ".about-cta"], { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)
          .from(".about-film", { clipPath: "inset(100% 0 0 0)", duration: 1.5, ease: "expo.inOut" }, 0)
          .from(".about-film video", { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0.4)
          .from(".about-sound", { y: 14, opacity: 0, duration: 0.7 }, 1.2);

        // The film drifts a touch slower than the page for depth
        gsap.to(".about-film", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const SoundIcon = muted ? VolumeX : Volume2;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-edge-black px-6 pb-20 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="about-crumb">
          <ol className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.2em]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">About</li>
          </ol>
        </nav>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="about-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
              <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
                <span className="size-1.5 rounded-full bg-edge-stone" />
              </span>
              About us
            </p>

            <h1 className="mt-8 font-display text-[13vw] leading-none tracking-[-0.02em] sm:text-[clamp(3.25rem,5vw,6rem)]">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="about-line-inner block text-white">Redefining trust</span>
              </span>
              <span className="-mt-[0.12em] block overflow-hidden pb-[0.14em]">
                <span className="about-line-inner block text-edge-stone-60">in marketing.</span>
              </span>
            </h1>

            <p className="about-copy mt-6 max-w-[36rem] font-display text-[clamp(1.1rem,1.05vw,1.3rem)] leading-[1.6] text-concrete">
              An in-house team across Mumbai, Pune and Dubai, working with brands in India, the UAE, Australia and
              the US, from founder-led labels to listed companies. Transparent processes, honest communication,
              results you can measure.
            </p>

            <Magnetic className="about-cta mt-5">
              <Link
                href="/contact"
                className={cn(
                  "group flex h-15.5 w-fit items-center gap-4 rounded-full bg-white pl-6.5 pr-2 text-edge-black transition-[gap] duration-500 hover:gap-6",
                  EASE_OUT
                )}
              >
                <span className={cn("font-display text-[1.3rem] leading-none", EASE_OUT)}>
                  Work with us
                </span>
                <span
                  data-magnetic-inner
                  className={cn(
                    "relative flex size-11.5 items-center justify-center overflow-hidden rounded-full bg-edge-stone text-white",
                    EASE_OUT
                  )}
                >
                  <ArrowRight size={18} strokeWidth={1.75} className={cn("absolute transition-transform duration-500 group-hover:translate-x-[220%]", EASE_OUT)} />
                  <ArrowRight size={18} strokeWidth={1.75} className={cn("absolute -translate-x-[220%] transition-transform duration-500 group-hover:translate-x-0", EASE_OUT)} />
                </span>
              </Link>
            </Magnetic>
          </div>

          <div className="about-film surface-dark relative aspect-4/5 overflow-hidden rounded-sm bg-black-depth will-change-transform">
            <video
              ref={videoRef}
              src={FILM_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 size-full object-cover"
            />

            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute film" : "Mute film"}
              className="about-sound absolute bottom-5 left-5 inline-flex h-9.5 items-center gap-2.5 rounded-full border border-white/40 bg-edge-black/25 px-4.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white lg:bottom-6 lg:left-6"
            >
              <SoundIcon size={14} strokeWidth={1.75} />
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
