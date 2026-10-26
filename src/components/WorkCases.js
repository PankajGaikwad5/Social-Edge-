"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const image = (id) => `https://images.unsplash.com/photo-${id}?w=1100&q=75&auto=format&fit=crop`;

// Sample projects with stock imagery: replace with real case studies before launch
const PROJECTS = [
  { client: "Aari Tari", sector: "Fashion", id: "1610030469983-98e550d6193c" },
  { client: "Vamika Silver", sector: "Jewellery", id: "1599643478518-a784e5dc4c8f" },
  { client: "Dicassa", sector: "Interiors", id: "1505693416388-ac5ce068fe85" },
  { client: "Sutra Fine", sector: "Jewellery", id: "1617038260897-41a1f14a8ca0" },
  { client: "City Vibes", sector: "Fashion", id: "1558769132-cb1aea458c5e" },
  { client: "Tatvadhan", sector: "Fashion", id: "1583391733956-3750e0ff4e8b" },
  { client: "Ember Table", sector: "Hospitality", id: "1414235077428-338989a2e8c0" },
  { client: "Lumen Skin", sector: "Beauty", id: "1596462502278-27bfdc403348" },
  { client: "Atelier Nord", sector: "Fashion", id: "1524504388940-b1c1722653e1" },
].map((p) => ({ ...p, href: `/work/${p.client.toLowerCase().replace(/\s+/g, "-")}`, src: image(p.id) }));

const INITIAL = 6;
const EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";

function CaseCard({ project }) {
  return (
    <Link
      href={project.href}
      className="case-card surface-dark group relative block aspect-[1.6] overflow-hidden rounded-sm bg-black-depth"
    >
      <img
        src={project.src}
        alt=""
        loading="lazy"
        className={cn("absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", EASE)}
      />
      {/* Bottom scrim keeps the caption readable; it deepens slightly on hover */}
      <span className={cn("wall-fade-bottom absolute inset-x-0 bottom-0 h-3/5 opacity-85 transition-opacity duration-700 group-hover:opacity-100", EASE)} />

      <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <span className={cn("transition-transform duration-700 group-hover:-translate-y-1", EASE)}>
          <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">{project.sector}</span>
          <span className="mt-1 block font-display text-[clamp(1.6rem,1.6vw,1.9rem)] leading-tight text-white">
            {project.client}
          </span>
        </span>
        <span
          className={cn(
            "flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink",
            EASE
          )}
        >
          <ArrowRight size={15} strokeWidth={1.75} className={cn("transition-transform duration-500 group-hover:-rotate-45", EASE)} />
        </span>
      </span>
    </Link>
  );
}

export default function WorkCases() {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const projects = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cases-line-inner", {
          yPercent: 112,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cases-heading", start: "top 85%", once: true },
        });

        gsap.from(".cases-count", {
          opacity: 0,
          x: 16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cases-heading", start: "top 85%", once: true },
        });

        gsap.from(".cases-initial", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: { each: 0.08, grid: "auto", from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: ".cases-grid", start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <div className="flex items-end justify-between gap-6">
          <h2 className="cases-heading font-display text-[clamp(2.4rem,2.6vw,3.2rem)] leading-tight text-white">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="cases-line-inner block">Case studies</span>
            </span>
          </h2>
          <p className="cases-count pb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">
            {String(PROJECTS.length).padStart(2, "0")} projects
          </p>
        </div>

        <ul className="cases-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) =>
            i < INITIAL ? (
              <li key={project.href} className="cases-initial">
                <CaseCard project={project} />
              </li>
            ) : (
              <motion.li
                key={project.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i - INITIAL) * 0.08, ease: [0.4, 0, 0.2, 1] }}
              >
                <CaseCard project={project} />
              </motion.li>
            )
          )}
        </ul>

        {!showAll && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-graphite px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-white"
            >
              View more
              <ArrowDown size={14} strokeWidth={1.75} className={cn("transition-transform duration-500 group-hover:translate-y-0.5", EASE)} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
