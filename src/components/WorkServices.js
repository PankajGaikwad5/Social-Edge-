"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";

// Per-card colours follow the reference (approved off-palette exception, like the About values cards).
// Figures and project chips are samples: replace with real work before launch.
const SERVICES = [
  { title: "Social Media Marketing", slug: "social-media", stat: "1.3B views", reach: "2.4B views, 12x growth", colors: ["#e8457c", "#f4a585", "#6e1d3a"] },
  { title: "PR & Influencer Marketing", slug: "pr-influencer", stat: "85M+ impressions", reach: "320+ collabs, 3.8x ROI", colors: ["#6d4cff", "#a48bff", "#33248f"] },
  { title: "Campaign Shoot", slug: "campaign-shoot", stat: "62 pieces", reach: "72+ shoots, 3.6x CTR", colors: ["#d9752a", "#f4bf73", "#5e2e10"] },
  { title: "Branding, Design & Packaging", slug: "branding", stat: "21 pieces", reach: "180+ brands, 78% recall", colors: ["#16a596", "#86e6d8", "#0a4d46"] },
  { title: "Photo & Videography", slug: "photo-video", stat: "04 pieces", reach: "2,100+ shoots, 7x engagement", colors: ["#2d65dd", "#a2c6ff", "#173a90"] },
  { title: "Website Development", slug: "web-development", stat: "15 pieces", reach: "140+ sites, 1.8s avg load", colors: ["#d4a024", "#f4df90", "#93690e"] },
  { title: "Event Marketing", slug: "events", stat: "02 pieces", reach: "85+ events, 3.4x engagement", colors: ["#d4444f", "#f5a9ad", "#9c2232"] },
  { title: "Performance Marketing", slug: "performance", stat: "03 pieces", reach: "8.5x ROAS, 6L+ leads", colors: ["#4b7552", "#cfe0c8", "#294a2e"] },
];

const PROJECTS = [
  { name: "City Vibes", meta: "Fashion · Celebrity" },
  { name: "Celebrity Feature", meta: "Jewellery · HT City" },
  { name: "Disha Parakh", meta: "Celebrity · PR" },
  { name: "Maharatan", meta: "Jewellery · Launch" },
  { name: "GlobalSpa", meta: "Press" },
  { name: "Sutra Fine", meta: "Jewellery · Royals" },
  { name: "Aari Tari", meta: "Fashion · Bridal" },
  { name: "Ember Table", meta: "Hospitality · Reels" },
  { name: "Lumen Skin", meta: "Beauty · Launch" },
  { name: "Dicassa", meta: "Interiors · Shoot" },
  { name: "Vamika Silver", meta: "Jewellery · Film" },
  { name: "Atelier Nord", meta: "Fashion · Lookbook" },
];

// Each card shows its own rotation of the sample projects in three drifting columns
function projectColumns(offset) {
  const list = PROJECTS.map((_, i) => PROJECTS[(i + offset * 3) % PROJECTS.length]);
  return [list.slice(0, 4), list.slice(4, 8), list.slice(8, 12)];
}

function ProjectChip({ project }) {
  return (
    <div className="mb-2 rounded-md border border-white/25 bg-white/12 px-2.5 py-2.5 backdrop-blur-sm">
      <span className="block size-2.5 rounded-full bg-white/85" />
      <span className="mt-2 block truncate text-[11px] font-medium leading-tight text-white">{project.name}</span>
      <span className="mt-0.5 block truncate text-[8.5px] text-white/65">{project.meta}</span>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [base, light, deep] = service.colors;
  const columns = projectColumns(index);

  return (
    <Link
      href={`/work/${service.slug}`}
      style={{
        "--c-base": base,
        // Bright corner light over a base-to-deep wash
        backgroundImage: `radial-gradient(85% 70% at 88% 6%, ${light} 0%, transparent 62%), radial-gradient(90% 60% at 30% 100%, ${deep}d9 0%, transparent 70%), linear-gradient(165deg, ${base} 0%, ${deep} 100%)`,
      }}
      className={cn(
        "group relative flex aspect-[0.8] flex-col overflow-hidden rounded-sm p-6.5 text-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_var(--c-base)]",
        EASE
      )}
    >
      <div className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.24em] text-white/85">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{service.stat}</span>
      </div>

      {/* The title shrinks into a small heading to make room for the project wall */}
      <h3
        className={cn(
          "mt-5 max-w-[9ch] origin-top-left font-display text-[clamp(2.2rem,2.35vw,2.8rem)] leading-[1.05] transition-transform duration-500 group-hover:scale-[0.42]",
          EASE
        )}
      >
        {service.title}
      </h3>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-6.5 top-[29%] bottom-[22%] grid translate-y-4 grid-cols-3 gap-2 overflow-hidden opacity-0 transition-[opacity,transform] duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] group-hover:translate-y-0 group-hover:opacity-100",
          EASE
        )}
      >
        {columns.map((col, c) => (
          <div key={c} className="overflow-hidden">
            <div
              className={cn(
                "drift-column [animation-play-state:paused] group-hover:[animation-play-state:running]",
                c === 1 && "[animation-direction:reverse]"
              )}
              style={{ animationDuration: `${18 + c * 4}s` }}
            >
              {[...col, ...col].map((project, i) => (
                <ProjectChip key={i} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-auto h-10">
        <span
          className={cn(
            "absolute bottom-0 left-0 inline-flex h-9.5 items-center gap-2.5 rounded-full border border-white/80 px-4.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-[opacity,transform] duration-500 group-hover:translate-y-2 group-hover:opacity-0",
            EASE
          )}
        >
          View work
          <ArrowRight size={12} strokeWidth={2} />
        </span>

        <span
          className={cn(
            "absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100",
            EASE
          )}
        >
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/80">Earned reach</span>
            <span className="mt-1.5 block font-display text-lg leading-tight">{service.reach}</span>
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/80">
            <ArrowRight size={13} strokeWidth={1.75} />
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function WorkServices() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".services-line-inner", {
          yPercent: 112,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".services-heading", start: "top 85%", once: true },
        });

        gsap.from(".services-item", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: { each: 0.07, grid: "auto", from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-grid", start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-t border-graphite/50 bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <div className="flex items-end justify-between gap-6">
          <h2 className="services-heading font-display text-[clamp(2.4rem,2.6vw,3.2rem)] leading-tight text-white">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="services-line-inner block">Work by service</span>
            </span>
          </h2>
          <p className="pb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete">
            {String(SERVICES.length).padStart(2, "0")} disciplines
          </p>
        </div>

        <ul className="services-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <li key={service.slug} className="services-item">
              <ServiceCard service={service} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
