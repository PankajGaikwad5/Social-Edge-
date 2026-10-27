"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/components/WorkServices";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";

// Cards cycle through the Work-by-service card colours (approved off-palette exception)
const PALETTES = SERVICES.map((s) => s.colors);

// Card type scales with card width (cqw), tuned per column count
const SIZES = {
  6: { pad: "p-[8.5cqw]", letter: "text-[72cqw]", name: "text-[11.2cqw]", sub: "text-[max(9px,4.4cqw)]", num: "text-[max(8px,3.9cqw)]", arrow: "size-[13cqw]", icon: "size-[5.5cqw]", cols: "lg:grid-cols-6" },
  5: { pad: "p-[7.5cqw]", letter: "text-[60cqw]", name: "text-[8.4cqw]", sub: "text-[max(9px,3.9cqw)]", num: "text-[max(8px,3.5cqw)]", arrow: "size-[12cqw]", icon: "size-[4.8cqw]", cols: "lg:grid-cols-5" },
};

// A brand is { name, handle } (links to Instagram) or { name, site } (links to the website)
function BrandCard({ brand, index, size }) {
  const [base, light, deep] = PALETTES[index % PALETTES.length];
  const href = brand.site ? `https://${brand.site}` : `https://www.instagram.com/${brand.handle}/`;
  const caption = brand.site ?? `@${brand.handle}`;
  const itemRef = useRef(null);
  const hover = useRef(null);

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(".brand-card", { y: -8, scale: 1.025 }, 0)
        .to(".brand-glow", { opacity: 0.65, y: 10 }, 0)
        .to(".brand-letter", { xPercent: -3, yPercent: -3, scale: 1.02 }, 0)
        .to(".brand-arrow", { x: 2, y: -2, backgroundColor: "rgba(255,255,255,0.3)" }, 0)
        .to(".brand-text", { y: -2 }, 0);
    },
    { scope: itemRef }
  );

  // Symmetric ease so the reverse feels like the same motion, just quicker on the way back
  const enter = () => hover.current?.timeScale(1).play();
  const leave = () => hover.current?.timeScale(1.6).reverse();

  return (
    <li ref={itemRef} className="@container relative">
      <span
        aria-hidden
        style={{ backgroundColor: base }}
        className="brand-glow pointer-events-none absolute inset-x-[12%] bottom-0 top-[35%] rounded-[10px] opacity-0 blur-2xl"
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={enter}
        onBlur={leave}
        style={{
          backgroundImage: `radial-gradient(80% 70% at 92% 4%, ${light} 0%, transparent 62%), radial-gradient(95% 65% at 25% 100%, ${deep}e6 0%, transparent 72%), linear-gradient(165deg, ${base} 0%, ${deep} 100%)`,
        }}
        className={cn("brand-card surface-dark relative flex aspect-square flex-col overflow-hidden rounded-[10px] text-white will-change-transform", size.pad)}
      >
        <span
          aria-hidden
          className={cn("brand-letter pointer-events-none absolute -bottom-[0.26em] right-[4cqw] font-display leading-none text-white/15", size.letter)}
        >
          {brand.name[0]}
        </span>

        <div className="relative flex items-start justify-between">
          <span className={cn("pt-[1.5cqw] font-bold tracking-[0.2em] text-white/85", size.num)}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn("brand-arrow flex items-center justify-center rounded-full bg-white/22 backdrop-blur-sm", size.arrow)}>
            <ArrowUpRight strokeWidth={2} className={size.icon} />
          </span>
        </div>

        <div className="brand-text relative mt-auto">
          <h3 className={cn("max-w-[73%] font-display leading-[1.05] tracking-[-0.01em]", size.name)}>{brand.name}</h3>
          <p className={cn("mt-[3.5cqw] truncate font-medium text-white/85", size.sub)}>{caption}</p>
        </div>
      </a>
    </li>
  );
}

// action: optional { label, href } button beside the heading
export default function BrandGrid({ title, eyebrow, action, brands, columns = 6 }) {
  const sectionRef = useRef(null);
  const size = SIZES[columns];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".brands-line-inner", {
          yPercent: 112,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".brands-heading", start: "top 85%", once: true },
        });

        gsap.from(".brands-cta", {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".brands-cta", start: "top 92%", once: true },
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
          <div>
            {eyebrow && (
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-edge-stone sm:text-[11px]">{eyebrow}</p>
            )}
            <h2 className="brands-heading font-display text-[clamp(2.2rem,2.6vw,3.2rem)] leading-tight text-white">
              <span className="block overflow-hidden pb-[0.1em]">
                <span className="brands-line-inner block">{title}</span>
              </span>
            </h2>
          </div>

          {action && (
            <Link
              href={action.href}
              className={cn(
                "mb-2 hidden h-11.5 shrink-0 items-center gap-3 rounded-full bg-white px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-edge-black transition-[gap] duration-500 hover:gap-4.5 sm:inline-flex",
                EASE
              )}
            >
              {action.label}
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
          )}
        </div>

        <ul className={cn("mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-3.5", size.cols)}>
          {brands.map((brand, i) => (
            <BrandCard key={brand.handle ?? brand.site} brand={brand} index={i} size={size} />
          ))}
        </ul>

        <div className="brands-cta mt-12 flex justify-center">
          <Link
            href="/contact"
            className={cn(
              "group inline-flex h-12 items-center gap-3 rounded-full bg-edge-stone px-6.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-[background-color,gap] duration-500 hover:gap-4.5 hover:bg-edge-stone-80",
              EASE
            )}
          >
            Request more work
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
