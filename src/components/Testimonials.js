"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Quote, Star } from "lucide-react";
import { leftwardMarquee } from "@/lib/marquee";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Sample reviews: replace with real client quotes before launch
const REVIEWS = {
  india: [
    { name: "Prakhar Sonkiya", company: "Sutra Fine Jewelry", quote: "Social Edge helped me launch my jewellery brand with dedication and skill. A year later, the experience remains excellent and highly recommendable." },
    { name: "Priyal Lakhotia", company: "Vamika Silver, Jaipur", quote: "The team is extremely patient and hardworking, consistently delivering quality work while ensuring smooth communication and an effortless overall experience." },
    { name: "Disha Parakh", company: "Atory.in", quote: "Working closely with the team has been wonderful. Their vision, commitment and attention to detail elevate every project they take on." },
    { name: "Aman Jhunjhunwala", company: "Dicassa, India", quote: "Fast learners, honest founders and an amazing team. They always support you fully and truly care about your growth and success throughout." },
    { name: "Rhea Kapoor", company: "Ember Table, Mumbai", quote: "Our reservations doubled within a season. They understood our food, our guests and the story we wanted to tell from day one." },
  ],
  global: [
    { name: "Sofia Martins", company: "Lumen Skin, Lisbon", quote: "They took a small skincare label and gave it a voice people remember. Every launch since has felt bigger than the last." },
    { name: "James Whitfield", company: "Northbound Coffee, London", quote: "Sharp strategy, beautiful content and genuinely responsive across timezones. It never feels like working with an agency abroad." },
    { name: "Lena Hoffmann", company: "Atelier Nord, Berlin", quote: "The campaign shoot exceeded every brief we gave them. Our engagement and sell-through both climbed in the very first month." },
    { name: "Omar Haddad", company: "Saffron & Sea, Dubai", quote: "Clear reporting, bold creative and a team that treats our budget like their own. We have renewed with them twice already." },
    { name: "Chloe Bennett", company: "Wild Fern Studio, Sydney", quote: "From packaging to performance ads, everything finally looks and sounds like one brand. Our customers noticed straight away." },
  ],
};

const REGIONS = [
  { id: "india", label: "India" },
  { id: "global", label: "Across the globe" },
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

function ReviewCard({ review }) {
  return (
    <li className="mr-6 shrink-0">
      <figure className="flex h-90 w-[82vw] flex-col rounded-2xl bg-black-depth px-7 pb-7 pt-7 ring-1 ring-inset ring-white/5 transition-shadow duration-500 hover:ring-graphite sm:h-[clamp(340px,19.8vw,380px)] sm:w-[clamp(320px,23vw,440px)]">
        <div className="flex items-start justify-between">
          <Quote size={22} strokeWidth={1.5} className="text-edge-stone" aria-hidden />
          <span className="mt-1 flex gap-1 text-edge-stone" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={10} strokeWidth={2} aria-hidden />
            ))}
          </span>
        </div>

        <blockquote className="mt-12 font-display text-[clamp(1.1rem,1.25vw,1.5rem)] leading-[1.34] text-white">
          &ldquo;{review.quote}&rdquo;
        </blockquote>

        <figcaption className="mt-auto flex items-center gap-3.5 border-t border-graphite/60 pt-6">
          <span className="flex size-10.5 shrink-0 items-center justify-center rounded-full bg-graphite text-xs font-semibold text-mist">
            {initials(review.name)}
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-white">{review.name}</span>
            <span className="block text-xs text-concrete">{review.company}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

function Row({ reviews, hidden }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {reviews.map((review) => (
        <ReviewCard key={review.name} review={review} />
      ))}
    </ul>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [region, setRegion] = useState("india");
  const reviews = REVIEWS[region];

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (trigger, start = "top 80%") => ({ trigger, start, once: true });

        gsap.from(".tm-line-inner", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: reveal(".tm-heading"),
        });

        gsap.from([".tm-eyebrow", ".tm-toggle", ".tm-cta"], {
          y: 18,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: reveal(".tm-heading"),
        });

        gsap.from(".tm-rail", {
          opacity: 0,
          x: 80,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: reveal(sectionRef.current, "top 75%"),
        });

        return leftwardMarquee(sectionRef.current.querySelector(".tm-track"), {
          trigger: sectionRef.current,
          duration: 60,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Fade the rail out, swap the reviews, fade back in
  const switchRegion = contextSafe((next) => {
    if (next === region) return;
    gsap.to(".tm-track", {
      opacity: 0,
      y: 12,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setRegion(next);
        gsap.to(".tm-track", { opacity: 1, y: 0, duration: 0.6, delay: 0.05, ease: "power3.out" });
      },
    });
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-edge-black pb-20 pt-14 lg:pt-19">
      <div className="relative flex flex-col lg:block">
        {/* Masked so cards dissolve as they slide out from behind the panel */}
        <div className="tm-rail mt-10 lg:mt-0 lg:[mask-image:linear-gradient(to_right,transparent_19%,black_37%)]">
          <div className="tm-track flex w-max">
            <Row reviews={reviews} />
            <Row reviews={reviews} hidden />
          </div>
        </div>

        <div className="relative -order-1 px-6 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:pt-6">
          <p className="tm-eyebrow flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
            <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
              <span className="size-1.5 rounded-full bg-edge-stone" />
            </span>
            Testimonials
          </p>

          <h2 className="tm-heading mt-6 font-display text-[8.6vw] uppercase leading-[0.95] tracking-tight text-white sm:text-[clamp(2.6rem,3.18vw,3.8rem)]">
            {["What our", "clients say"].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="tm-line-inner block">{line}</span>
              </span>
            ))}
          </h2>

          <div
            role="tablist"
            aria-label="Review region"
            className="tm-toggle pointer-events-auto mt-4 flex w-fit rounded-full border border-graphite/70 p-1"
          >
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={region === r.id}
                onClick={() => switchRegion(r.id)}
                className={cn(
                  "h-8.5 rounded-full px-4.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500",
                  region === r.id ? "bg-white text-edge-black" : "text-white hover:text-edge-stone"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <Link
            href="/work"
            className="tm-cta group pointer-events-auto relative mt-6 inline-flex w-fit items-center gap-3.5 pb-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white"
          >
            See our work
            <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/80 transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-edge-stone transition-transform delay-150 duration-500 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
