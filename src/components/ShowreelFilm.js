"use client";

import Link from "next/link";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { FILM_TILE_SRC, TIMELINE } from "@/lib/heroTimeline";

// Stock clips from Mixkit. The first one is the film tile in the wall's centre strip, which expands
// into the full stage; the others play in that same tile once it is full screen.
export const FILMS = [
  {
    src: FILM_TILE_SRC,
    poster: "https://assets.mixkit.co/videos/41165/41165-thumb-720-0.jpg",
    label: "Social Campaign | Feed Content",
  },
  {
    src: "https://assets.mixkit.co/videos/52055/52055-1080.mp4",
    poster: "https://assets.mixkit.co/videos/52055/52055-thumb-720-0.jpg",
    label: "Brand Film | Beauty",
  },
  {
    src: "https://assets.mixkit.co/videos/50782/50782-1080.mp4",
    poster: "https://assets.mixkit.co/videos/50782/50782-thumb-720-0.jpg",
    label: "Campaign Film | Fine Jewellery",
  },
  {
    src: "https://assets.mixkit.co/videos/49231/49231-720.mp4",
    poster: "https://assets.mixkit.co/videos/49231/49231-thumb-720-0.jpg",
    label: "Food Film | Restaurant",
  },
];

// Controls shown over the full-screen film tile. No video and no shade of its own.
export default function ShowreelFilm({ progress, active, index, onIndexChange, soundOn, onToggleSound }) {
  const opacity = useTransform(progress, TIMELINE.controls, [0, 1]);
  const film = FILMS[index];
  const SoundIcon = soundOn ? Volume2 : VolumeX;

  return (
    <motion.div
      style={{ opacity }}
      className={cn("surface-dark absolute inset-0 z-20", active ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* Next film + progress dots */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4 lg:right-10">
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % FILMS.length)}
          className="flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-white lg:size-15"
          aria-label="Next film"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
        <div className="flex flex-col gap-2">
          {FILMS.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Show film ${i + 1}`}
              className={cn(
                "size-1.5 rounded-full transition-colors duration-300",
                i === index ? "bg-white" : "bg-white/35 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:px-13 lg:pb-12">
        <div>
          <button
            type="button"
            onClick={onToggleSound}
            className="inline-flex h-9.5 items-center gap-2.5 rounded-full border border-white/40 px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white"
          >
            <SoundIcon size={14} strokeWidth={1.75} />
            {soundOn ? "Sound off" : "Sound on"}
          </button>

          <AnimatePresence mode="wait">
            <motion.p
              key={film.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-edge-stone"
            >
              {film.label}
            </motion.p>
          </AnimatePresence>

          <h2 className="mt-3 font-display text-[clamp(2.25rem,3.2vw,4rem)] leading-[1.1] text-white">
            Work that moves
          </h2>
        </div>

        <Link
          href="/work"
          className="inline-flex h-11 w-fit items-center rounded-full border border-white/50 px-6.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-edge-black"
        >
          View Portfolio
        </Link>
      </div>
    </motion.div>
  );
}
