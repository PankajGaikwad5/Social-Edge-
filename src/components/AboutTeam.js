"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { leftwardMarquee } from "@/lib/marquee";

gsap.registerPlugin(ScrollTrigger);

const image = (id) => `https://images.unsplash.com/photo-${id}?w=520&q=72&auto=format&fit=crop`;

// Stock team photos for now; swap for the real team shots before launch
const PHOTOS = [
  "1522071820081-009f0129c71c",
  "1573497019940-1c28c88b4f3e",
  "1552664730-d307ca884978",
  "1531482615713-2afd69097998",
  "1600880292203-757bb62b4baf",
  "1556761175-5973dc0f32e7",
  "1517245386807-bb43f82c33c4",
  "1542744173-8e7e53415bb0",
  "1521737604893-d14cc237f11d",
  "1559136555-9303baea8ebd",
];

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {PHOTOS.map((id) => (
        <li key={id} className="mr-4.5 shrink-0">
          <div className="group relative aspect-4/5 w-[46vw] overflow-hidden rounded-sm bg-black-depth sm:w-52">
            <img
              src={image(id)}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AboutTeam() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        gsap.from(".team-line-inner", {
          yPercent: 112,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: reveal(".team-heading"),
        });

        gsap.from([".team-copy", ".team-cta"], {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: reveal(".team-heading"),
        });

        gsap.from(".team-strip", {
          x: 120,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: reveal(".team-strip", "top 90%"),
        });

        return leftwardMarquee(sectionRef.current.querySelector(".team-track"), {
          trigger: sectionRef.current,
          duration: 55,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-graphite/50 bg-edge-black px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-372">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 className="team-heading font-display text-[11vw] uppercase leading-[1.02] tracking-tight text-white sm:text-[clamp(3rem,4.6vw,5.5rem)]">
            {[
              { text: "The brains", accent: false },
              { text: "behind", accent: false },
              { text: "the magic", accent: true },
            ].map((line) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <span className={line.accent ? "team-line-inner block text-edge-stone-60" : "team-line-inner block"}>
                  {line.text}
                </span>
              </span>
            ))}
          </h2>

          <div className="flex flex-col items-start lg:pt-3">
            <p className="team-copy max-w-[33rem] text-[17px] leading-[1.6] text-white">
              We work hard to bring together the best people in their field: strategists, designers, editors,
              filmmakers and media buyers who care about the work as much as you do.
            </p>

            <Magnetic className="team-cta mt-10 lg:mt-auto">
              <Link
                href="/career"
                className="group relative inline-flex h-11 items-center gap-3 overflow-hidden rounded-full border border-white/40 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-white hover:text-edge-black"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
                <span className="relative">Join our team</span>
                <ArrowRight size={14} strokeWidth={1.75} className="relative transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Photos drift past inside the content width, dissolving at the left edge */}
        <div className="team-strip mt-9 [mask-image:linear-gradient(to_right,transparent,black_9%)]">
          <div className="team-track flex w-max">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
