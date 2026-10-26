"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Asterisk } from "lucide-react";
import { SERVICES } from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

// Seconds for one full loop at rest
const LOOP_DURATION = 38;

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {SERVICES.map((service) => (
        <li key={service.href} className="flex items-center">
          <Asterisk
            size={22}
            strokeWidth={1.5}
            className="marquee-star mx-8 text-edge-stone lg:mx-12"
          />
          <span className="whitespace-nowrap font-display text-[clamp(1.4rem,1.9vw,2.25rem)] uppercase leading-none tracking-[-0.01em] text-white">
            {service.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesMarquee() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(".marquee-track", {
          xPercent: -50,
          duration: LOOP_DURATION,
          ease: "none",
          repeat: -1,
        });

        // Scrolling pushes the loop faster in the scroll direction, then it eases back to cruising speed
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 400);
            gsap.to(loop, {
              timeScale: boost * self.direction,
              duration: 0.2,
              overwrite: true,
              onComplete: () =>
                gsap.to(loop, { timeScale: self.direction, duration: 1.2, ease: "power2.out" }),
            });
          },
        });

        gsap.to(".marquee-star", {
          rotation: 360,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="overflow-hidden border-y border-graphite/50 bg-edge-black py-6">
      <p className="sr-only">Our services: {SERVICES.map((s) => s.label).join(", ")}</p>
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
