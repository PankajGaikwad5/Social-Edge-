"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { serviceTheme } from "@/lib/serviceTheme";
import { cn } from "@/lib/utils";

const DESKTOP = "(min-width: 1024px)";
const TWEEN = { duration: 0.6, ease: "sine.inOut", overwrite: "auto" };

// Desktop: a flex row where the active card widens and grows slightly taller (first card open by default).
// Phones/tablets: a plain two-column grid.
export default function SelectedWork({ href, title, items }) {
  const listRef = useRef(null);
  const active = useRef(0);
  const [base] = serviceTheme(href).colors;

  function activate(next) {
    if (active.current === next || !window.matchMedia(DESKTOP).matches) return;
    active.current = next;
    // Closing cards ease back a little faster than the opening one, like the other hovers on these pages
    listRef.current.querySelectorAll(".sw-item").forEach((item, i) => {
      const on = i === next;
      const t = { ...TWEEN, duration: on ? 0.6 : 0.45 };
      gsap.to(item, { flexGrow: on ? 2.07 : 1, height: on ? 359 : 347, ...t });
      gsap.to(item.querySelector(".sw-img"), { scale: on ? 1.04 : 1, ...t });
      gsap.to(item.querySelector(".sw-view-fill"), { opacity: on ? 1 : 0, ...t });
      gsap.to(item.querySelector(".sw-view-text"), { color: on ? "#090909" : "#ffffff", ...t });
    });
  }

  return (
    <section className="bg-edge-black px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-372">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.2rem,2.5vw,3rem)] leading-tight text-white">{title}</h2>
          <Link
            href="/contact"
            className="mb-2 flex shrink-0 items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-concrete transition-colors duration-500 hover:text-white sm:text-[11px]"
          >
            Start a project
            <ArrowRight size={12} strokeWidth={1.75} />
          </Link>
        </div>

        <ul
          ref={listRef}
          onMouseLeave={() => activate(0)}
          className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-start lg:gap-5"
        >
          {items.map((item, i) => (
            <li
              key={item.client}
              onMouseEnter={() => activate(i)}
              className={cn(
                "sw-item aspect-[0.8] sm:aspect-[0.85] lg:aspect-auto lg:basis-0",
                i === 0 ? "lg:h-[359px] lg:grow-[2.07]" : "lg:h-[347px] lg:grow"
              )}
            >
              <Link
                href={item.href}
                onFocus={() => activate(i)}
                className="surface-dark relative flex size-full flex-col justify-between overflow-hidden rounded-lg border border-white/12 bg-black-depth p-6.5 text-white"
              >
                <img src={item.src} alt="" loading="lazy" className="sw-img absolute inset-0 size-full object-cover" />
                <span className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70" />

                <span className="relative flex items-start justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  <span className="text-white/90">{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: base }} className="truncate">{item.meta}</span>
                </span>

                <span className="relative flex items-end justify-between gap-4">
                  <span className="font-display text-[clamp(2rem,2.1vw,2.6rem)] leading-[1.02]">{item.client}</span>
                  <span className="relative flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/45 px-3.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    <span className={cn("sw-view-fill absolute -inset-px rounded-full bg-white", "opacity-0", i === 0 && "lg:opacity-100")} />
                    <span className={cn("sw-view-text relative flex items-center gap-2", i === 0 && "lg:text-ink")}>
                      View
                      <ArrowRight size={11} strokeWidth={2} />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-edge-stone px-6.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-[background-color,gap] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:gap-4.5 hover:bg-edge-stone-80"
          >
            Request more work
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
