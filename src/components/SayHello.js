"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { EMAIL, WHATSAPP } from "@/lib/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";
// Even, rounded curve for the city rows so they glide rather than jolt open
const EASE_GLIDE = "ease-[cubic-bezier(0.45,0,0.2,1)]";

// Tiny pause before a city opens, so sweeping the cursor across the list doesn't flick rows open and shut
const HOVER_INTENT_MS = 60;

// Each word swaps to the opposite tone and leans into a faux italic on hover
const HEADLINE = [
  { words: ["You've", "built"] },
  { words: ["something"] },
  { words: ["real."] },
  { words: ["Let's", "make", "it"], accent: true },
  { words: ["impossible", "to"], accent: true },
  { words: ["ignore."], accent: true },
];

// Sample offices: replace with the real numbers and addresses before launch

const OFFICES = [
  { city: "Mumbai", tag: "HQ · India", zone: "Asia/Kolkata", phone: "+91 98765 43210", address: "1204, Edge House, Bandra Kurla Complex, Mumbai, Maharashtra" },
  { city: "Pune", tag: "India", zone: "Asia/Kolkata", phone: "+91 98220 11223", address: "5th Floor, Baner Business Bay, Baner, Pune, Maharashtra" },
  { city: "Dubai", tag: "UAE", zone: "Asia/Dubai", phone: "+971 50 123 4567", address: "Office 1702, Bay Square 4, Business Bay, Dubai" },
];

function subscribeToMinute(callback) {
  const id = setInterval(callback, 15000);
  return () => clearInterval(id);
}

function useClock(timeZone) {
  return useSyncExternalStore(
    subscribeToMinute,
    () => new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date()),
    () => "--:--"
  );
}

function HeadlineWord({ word, accent }) {
  return (
    <span
      className={cn(
        "inline-block cursor-default transition-[transform,color,text-shadow] duration-[650ms] hover:-skew-x-7 hover:scale-[1.02] hover:[text-shadow:0_0_42px_rgb(255_255_255/0.12)]",
        EASE_OUT,
        accent ? "text-edge-stone-60 hover:text-white" : "text-white hover:text-edge-stone-60"
      )}
    >
      {word}
    </span>
  );
}

function Office({ office, open, onOpen, onHover, onHoverEnd }) {
  const time = useClock(office.zone);
  const panelId = `office-${office.city.toLowerCase()}`;

  return (
    <li onMouseEnter={onHover} onMouseLeave={onHoverEnd} className="hello-office cursor-pointer border-b border-graphite/60">
      <div className="flex items-center justify-between gap-6 pb-7 pt-8">
        <h3>
          <button
            type="button"
            onClick={onOpen}
            onFocus={onOpen}
            aria-expanded={open}
            aria-controls={panelId}
            className={cn(
              "block cursor-pointer font-display text-[clamp(2.75rem,4.4vw,5.25rem)] leading-none transition-[transform,color] duration-[520ms] will-change-transform",
              EASE_GLIDE,
              open
                ? "translate-x-2 text-edge-stone-60"
                : "text-white"
            )}
          >
            {office.city}
          </button>
        </h3>
        <p className="text-right">
          <span
            className={cn(
              "block font-display text-[clamp(1.25rem,1.2vw,1.45rem)] leading-none tabular-nums transition-colors duration-[520ms]",
              open ? "text-edge-stone-60" : "text-white"
            )}
          >
            {time}
          </span>
          <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-concrete">{office.tag}</span>
        </p>
      </div>

      {/* Animating grid rows from 0fr to 1fr opens the panel to its natural height */}
      <div
        id={panelId}
        className={cn("grid transition-[grid-template-rows] duration-[520ms]", EASE_GLIDE, open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "grid gap-4 pb-8 pl-3 transition-[opacity,transform] sm:grid-cols-[3fr_2fr] sm:items-center",
              EASE_OUT,
              open ? "translate-y-0 opacity-100 delay-100 duration-[460ms]" : "translate-y-1.5 opacity-0 duration-200"
            )}
          >
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              tabIndex={open ? 0 : -1}
              className="group flex w-fit items-center gap-3 font-display text-[clamp(1.5rem,1.5vw,1.85rem)] leading-none text-white"
            >
              {office.phone}
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="text-edge-stone transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="max-w-68 text-[13px] leading-normal text-mist">{office.address}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function SayHello() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const intentRef = useRef(null);

  const hoverCity = (i) => {
    clearTimeout(intentRef.current);
    intentRef.current = setTimeout(() => setActive(i), HOVER_INTENT_MS);
  };
  const cancelHover = () => clearTimeout(intentRef.current);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        // Lines are only masked while rising, so hovered words can pop past their line box afterwards
        gsap.set(".hello-line", { overflow: "hidden" });
        gsap.from(".hello-line-inner", {
          yPercent: 112,
          duration: 1.3,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: reveal(".hello-heading"),
          onComplete: () => gsap.set(".hello-line", { clearProps: "overflow" }),
        });

        gsap.from([".hello-eyebrow", ".hello-copy", ".hello-actions", ".hello-meta"], {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: reveal(".hello-heading"),
        });

        gsap.from(".hello-rule", {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: reveal(".hello-offices", "top 85%"),
        });

        gsap.from(".hello-office", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: reveal(".hello-offices", "top 85%"),
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-depth px-6 py-16 lg:px-10 lg:pb-20 lg:pt-14">
      <div className="mx-auto grid max-w-372 gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="hello-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
            <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="size-1.5 rounded-full bg-edge-stone" />
            </span>
            Say hello
          </p>

          <h2 className="hello-heading mt-8 font-display text-[9.6vw] sm:mt-10 uppercase leading-[0.93] tracking-tight sm:text-[clamp(3.25rem,4.8vw,5.75rem)]">
            {HEADLINE.map((line) => (
              <span key={line.words.join(" ")} className="hello-line block pb-[0.04em]">
                <span className="hello-line-inner block">
                  {line.words.map((word, i) => (
                    <span key={word}>
                      {i > 0 && " "}
                      <HeadlineWord word={word} accent={line.accent} />
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h2>

          <p className="hello-copy mt-10 max-w-[29rem] font-display text-[clamp(1.1rem,1.05vw,1.3rem)] leading-[1.6] text-concrete">
            One message, and a real human replies within one business day with a point of view, not a sales script.
          </p>

          <div className="hello-actions mt-11 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className={cn(
                "group flex h-16 items-center gap-5 rounded-full bg-white pl-7 pr-2 sm:h-20 sm:gap-6 sm:pl-9 sm:pr-2.5 text-edge-black transition-transform duration-500 hover:-translate-y-0.5 lg:h-22",
                EASE_OUT
              )}
            >
              <span className={cn("font-display text-xl sm:text-[clamp(1.5rem,1.55vw,1.9rem)] leading-none transition-transform duration-500 group-hover:translate-x-1", EASE_OUT)}>
                Start a project
              </span>
              <span
                className={cn(
                  "relative flex size-12 items-center sm:size-15 justify-center overflow-hidden rounded-full bg-edge-stone text-white transition-transform duration-500 group-hover:scale-[1.03] lg:size-17",
                  EASE_OUT
                )}
              >
                <ArrowRight size={22} strokeWidth={1.75} className={cn("absolute transition-transform duration-500 group-hover:translate-x-[220%]", EASE_OUT)} />
                <ArrowRight size={22} strokeWidth={1.75} className={cn("absolute -translate-x-[220%] transition-transform duration-500 group-hover:translate-x-0", EASE_OUT)} />
              </span>
            </Link>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-full border border-graphite px-7 sm:h-17 sm:px-9 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-white hover:text-edge-black"
            >
              <span className={cn("absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 group-hover:translate-y-0", EASE_OUT)} />
              <MessageCircle size={17} strokeWidth={1.75} className={cn("relative transition-transform duration-500 group-hover:-rotate-8", EASE_OUT)} />
              <span className="relative">WhatsApp us</span>
            </a>
          </div>

          <div className="hello-meta mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${EMAIL}`}
              className="border-b border-white/70 pb-0.5 text-[13px] font-semibold text-white transition-colors duration-500 hover:border-edge-stone hover:text-edge-stone"
            >
              {EMAIL}
            </a>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">
              Replies within 1 business day
            </span>
          </div>
        </div>

        <div className="hello-offices">
          <div className="hello-rule h-px origin-left bg-graphite/60" />
          <div className="flex justify-between gap-4 pt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">
            <span>Three offices, 2 timezones</span>
            <span className="hidden sm:inline">Hover a city</span>
          </div>
          <ul className="mt-2">
            {OFFICES.map((office, i) => (
              <Office
                key={office.city}
                office={office}
                open={active === i}
                onOpen={() => setActive(i)}
                onHover={() => hoverCity(i)}
                onHoverEnd={cancelHover}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
