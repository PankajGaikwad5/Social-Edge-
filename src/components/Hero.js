"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Award } from "lucide-react";
import ShowreelFilm, { FILMS } from "@/components/ShowreelFilm";
import { TIMELINE, WALL_COVERED, easeInOutCubic, phase } from "@/lib/heroTimeline";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/lib/useIsDesktop";

const image = (id) =>
  `https://images.unsplash.com/photo-${id}?w=640&q=72&auto=format&fit=crop`;

const video = (id) => ({
  type: "video",
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-360-0.jpg`,
});

const photo = (id) => ({ type: "image", src: image(id) });

// Stock media: Unsplash (images) and Mixkit (videos), kept to one warm editorial palette
const COLUMNS = [
  {
    direction: "up",
    speed: 40, // px per second
    tiles: [
      { ...photo("1617627143750-d86bc21e42bb"), shape: "portrait" },
      { ...photo("1524504388940-b1c1722653e1"), shape: "portrait" },
      { ...photo("1414235077428-338989a2e8c0"), shape: "square" },
      { ...photo("1558769132-cb1aea458c5e"), shape: "portrait" },
      { ...photo("1599643478518-a784e5dc4c8f"), shape: "portrait" },
    ],
  },
  {
    direction: "down",
    speed: 33,
    tiles: [
      { ...photo("1505693416388-ac5ce068fe85"), shape: "square" },
      { ...photo("1531746020798-e6953c6e8e04"), shape: "portrait" },
      { ...video("49231"), shape: "portrait" },
      { ...photo("1596462502278-27bfdc403348"), shape: "portrait" },
      { ...photo("1600091166971-7f9faad6c1e2"), shape: "square" },
    ],
  },
  {
    direction: "up",
    speed: 37,
    // This column parks its film tile at the centre, and that tile becomes the full-screen showreel
    settles: true,
    tiles: [
      { ...video("41165"), shape: "portrait", film: true },
      { ...photo("1476224203421-9ac39bcb3327"), shape: "portrait" },
      { ...photo("1581044777550-4cfa60707c03"), shape: "portrait" },
      { ...photo("1617038260897-41a1f14a8ca0"), shape: "square" },
      { ...video("35987"), shape: "portrait" },
    ],
  },
  {
    direction: "down",
    speed: 30,
    tiles: [
      { ...photo("1610030469983-98e550d6193c"), shape: "portrait" },
      { ...photo("1504674900247-0877df9cc836"), shape: "square" },
      { ...video("52055"), shape: "portrait" },
      { ...photo("1445205170230-053b83016050"), shape: "portrait" },
      { ...photo("1565958011703-44f9829ba187"), shape: "portrait" },
    ],
  },
  {
    direction: "up",
    speed: 35,
    tiles: [
      { ...photo("1515562141207-7a88fb7ce338"), shape: "portrait" },
      { ...video("23327"), shape: "portrait" },
      { ...photo("1583391733956-3750e0ff4e8b"), shape: "portrait" },
      { ...video("4860"), shape: "square" },
      { ...photo("1544005313-94ddf0286df2"), shape: "portrait" },
    ],
  },
];

// On desktop the first two columns sit behind the copy; on phones the two visible columns (incl. the
// film column) do. Wider screens show more columns.
const COLUMN_VISIBILITY = ["hidden md:block", "", "", "hidden lg:block", "hidden lg:block"];
const BEHIND_COPY = [true, true, false, false, false];

// How far (px) every column travels across the whole pinned scroll, on top of its drift.
const SCROLL_TRAVEL = 3830;

const WORDS = ["Campaigns", "Content", "Reels", "Branding", "Growth"];

// Scroll steps live in lib/heroTimeline.js

function Tile({ tile, paused }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {});
  }, [paused]);
  const media = cn(
    "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out",
    loaded ? "opacity-100" : "opacity-0"
  );

  return (
    <div className="pb-2.5">
      <div
        className={cn(
          "relative overflow-hidden bg-[#141414]",
          tile.shape === "portrait" ? "aspect-4/5" : "aspect-square"
        )}
      >
        {tile.type === "video" ? (
          <video
            src={tile.src}
            poster={tile.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            ref={(el) => {
              videoRef.current = el;
              if (el && el.readyState >= 2) setLoaded(true);
            }}
            onLoadedData={() => setLoaded(true)}
            className={media}
          />
        ) : (
          <Image
            src={tile.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
            ref={(el) => el?.complete && el.naturalWidth > 0 && setLoaded(true)}
            onLoad={() => setLoaded(true)}
            className={media}
          />
        )}
      </div>
    </div>
  );
}

/*
 * The film tile in the centre strip. Once its column has parked it at the vertical centre, this exact
 * tile grows from its spot into the full stage. The tile box scales to the stage; the video inside
 * counter-scales (kept at its own aspect) so it is never stretched and always covers the box.
 */
function FilmTile({ tile, progress, film, soundOn }) {
  const wrapRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  // Offset to the stage centre and sizes, measured once the tile is parked
  const geo = useRef(null);
  const aspect = useRef(16 / 9);
  const [videoBox, setVideoBox] = useState({ width: 0, height: 0 });

  function updateVideoBox() {
    const media = mediaRef.current;
    if (!media) return;
    const height = Math.max(media.offsetWidth / aspect.current, media.offsetHeight);
    setVideoBox({ width: height * aspect.current, height });
  }

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      geo.current = null;
      updateVideoBox();
    });
    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, []);

  function measure() {
    const wrap = wrapRef.current;
    const stage = wrap.closest("[data-hero-stage]").getBoundingClientRect();
    // The wrapper is never transformed itself, so its rect is the parked position
    const rect = wrap.getBoundingClientRect();
    // Layout size (fractional, unaffected by the tile's own transform)
    const style = getComputedStyle(mediaRef.current);
    const w = parseFloat(style.width);
    const h = parseFloat(style.height);
    const cx = rect.left + w / 2 - stage.left;
    const cy = rect.top + h / 2 - stage.top;
    geo.current = {
      dx: stage.width / 2 - cx,
      dy: stage.height / 2 - cy,
      w,
      h,
      W: stage.width,
      H: stage.height,
      // Only the copy parked at the centre expands; the other copy is a tile set away
      active: w > 0 && Math.abs(stage.height / 2 - cy) < h / 2,
    };
  }

  function expandAt(p) {
    if (p < TIMELINE.settle[1]) return null;
    if (!geo.current) measure();
    const g = geo.current;
    if (!g.active) return null;
    const e = easeInOutCubic(phase(p, TIMELINE.expand));
    const sx = lerp(1, g.W / g.w, e);
    const sy = lerp(1, g.H / g.h, e);
    const cover = (bw, bh) => Math.max(bw / aspect.current, bh);
    const k = lerp(1, cover(g.W, g.H) / cover(g.w, g.h), e);
    return { x: g.dx * e, y: g.dy * e, sx, sy, innerX: k / sx, innerY: k / sy };
  }

  useMotionValueEvent(progress, "change", (p) => {
    // The column is still moving before it parks, so measure afresh next time
    if (p < TIMELINE.settle[1]) geo.current = null;
  });

  const x = useTransform(progress, (p) => expandAt(p)?.x ?? 0);
  const y = useTransform(progress, (p) => expandAt(p)?.y ?? 0);
  const scaleX = useTransform(progress, (p) => expandAt(p)?.sx ?? 1);
  const scaleY = useTransform(progress, (p) => expandAt(p)?.sy ?? 1);
  const innerScaleX = useTransform(progress, (p) => expandAt(p)?.innerX ?? 1);
  const innerScaleY = useTransform(progress, (p) => expandAt(p)?.innerY ?? 1);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !soundOn;
  }, [soundOn, film.src]);

  return (
    <div ref={wrapRef} className="relative z-10 pb-2.5">
      <motion.div
        ref={mediaRef}
        data-film-box
        style={{ x, y, scaleX, scaleY }}
        className={cn(
          "relative overflow-hidden bg-[#141414] will-change-transform",
          tile.shape === "portrait" ? "aspect-4/5" : "aspect-square"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{
              width: videoBox.width,
              height: videoBox.height,
              scaleX: innerScaleX,
              scaleY: innerScaleY,
            }}
            className="relative shrink-0 will-change-transform"
          >
            <video
              ref={videoRef}
              key={film.src}
              src={film.src}
              poster={film.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (v.videoWidth && v.videoHeight) {
                  aspect.current = v.videoWidth / v.videoHeight;
                  updateVideoBox();
                }
              }}
              className="absolute inset-0 size-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Scroll travel curve for the settling column: unchanged until the settle step, then eases out
// (velocity falls smoothly to zero) and holds once the film tile is parked.
function settleCurve(p) {
  const [start, end] = TIMELINE.settle;
  if (p <= start) return p;
  const t = Math.min(p, end) - start;
  return start + t - (t * t) / (2 * (end - start));
}

// The settling column drifts like the others while the page is at rest. Once scrolling starts its
// drift freezes, and whatever distance is still needed to centre the film tile is blended in
// smoothly across the whole scroll up to the parking point (never all at once).
const IDLE_END = 0.01;
const smoothstep = (t) => t * t * (3 - 2 * t);

// Largest backward correction that still never makes the strip stop or reverse: near the parking
// point the strip's own speed and the correction's both taper linearly, so this keeps the ratio < 1.
function maxBackwardCorrection() {
  const range = TIMELINE.settle[1] - IDLE_END;
  const settleLength = TIMELINE.settle[1] - TIMELINE.settle[0];
  return 0.85 * (SCROLL_TRAVEL / settleLength) * (range * range) / 6;
}

function MediaColumn({ column, progress, dimmed, isDesktop, className, film, soundOn }) {
  const columnRef = useRef(null);
  const trackRef = useRef(null);
  const filmMediaRef = useRef(null);
  const setHeight = useRef(0);
  const drift = useRef(0);
  // Track position that centres the film tile (settling column only)
  const filmTarget = useRef(0);
  const correction = useRef(null);
  const reduceMotion = useReducedMotion();
  const [covered, setCovered] = useState(false);

  // Columns behind the copy start far back and come up as the copy leaves; the film column
  // reaches full strength while its tile expands so the film is never dimmed.
  const opacity = useTransform(
    progress,
    [0.02, TIMELINE.copyOut[1], TIMELINE.expand[0], TIMELINE.expand[1]],
    [dimmed ? (isDesktop ? 0.13 : 0.25) : 0.85, 0.85, 0.85, column.settles ? 1 : 0.85]
  );

  useMotionValueEvent(progress, "change", (v) => setCovered(v >= WALL_COVERED));

  useEffect(() => {
    const track = trackRef.current;
    const columnEl = columnRef.current;
    const observer = new ResizeObserver(() => {
      setHeight.current = track.scrollHeight / 2;
      const media = filmMediaRef.current;
      if (media) {
        // Centre the tile box itself (not its bottom gap) in the column
        const box = media.querySelector("[data-film-box]");
        filmTarget.current = columnEl.clientHeight / 2 - media.offsetTop - box.offsetHeight / 2;
        correction.current = null;
      }
    });
    observer.observe(track);
    observer.observe(columnEl);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const height = setHeight.current;
    const p = progress.get();
    if (!height || p >= WALL_COVERED) return;

    const dir = column.direction === "up" ? -1 : 1;
    let y;

    if (column.settles) {
      if (p <= IDLE_END) {
        if (!reduceMotion) drift.current += (delta / 1000) * column.speed;
        correction.current = null;
      } else if (correction.current === null) {
        // Distance (in the strip's direction, mod one tile set) still needed to land the film tile at
        // the centre. Mostly forward; a little backward is allowed, within what keeps it moving.
        const landing = dir * (drift.current + SCROLL_TRAVEL * settleCurve(TIMELINE.settle[1]));
        let ahead = ((((filmTarget.current - landing) * dir) % height) + height) % height;
        if (ahead > height - maxBackwardCorrection()) ahead -= height;
        correction.current = ahead * dir;
      }
      const blend = smoothstep(phase(p, [IDLE_END, TIMELINE.settle[1]]));
      y = dir * (drift.current + SCROLL_TRAVEL * settleCurve(p)) + (correction.current ?? 0) * blend;
    } else {
      if (!reduceMotion) drift.current += (delta / 1000) * column.speed;
      y = dir * (drift.current + p * SCROLL_TRAVEL);
    }

    // Wrap into one tile set so the doubled track never shows a seam
    y = (((y % height) + height) % height) - height;
    trackRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
  });

  return (
    <motion.div
      ref={columnRef}
      style={{ opacity }}
      // The film column is not clipped (the stage clips the wall) so its tile can grow past it
      className={cn(
        "relative h-full",
        column.settles ? "z-10" : "overflow-hidden",
        className
      )}
    >
      <div ref={trackRef} className="will-change-transform">
        {/* Rendered twice so the wrap-around is seamless */}
        {[...column.tiles, ...column.tiles].map((tile, i) =>
          tile.film ? (
            <div key={i} ref={i < column.tiles.length ? filmMediaRef : undefined}>
              <FilmTile tile={tile} progress={progress} film={film} soundOn={soundOn} />
            </div>
          ) : (
            <Tile key={i} tile={tile} paused={covered} />
          )
        )}
      </div>
    </motion.div>
  );
}

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let delay = deleting ? 60 : 120;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex]);

  return (
    <span className="inline-flex items-center" aria-label={WORDS.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-[0.06em] inline-block h-[0.9em] w-0.5 animate-pulse bg-edge-stone/80"
      />
    </span>
  );
}

const lerp = (a, b, t) => a + (b - a) * t;

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const sectionRef = useRef(null);
  const isDesktop = useIsDesktop();
  const stageRef = useRef(null);
  const stageWidth = useRef(1920);
  // The wall starts inset with a gutter either side and springs out to full width (with a little
  // overshoot) once the copy starts leaving. Transform only, so it stays smooth.
  const wallScale = useMotionValue(1 - 80 / 1920);
  const wallPopped = useRef(false);

  function insetScale() {
    const gutter = stageWidth.current >= 1024 ? 40 : 16;
    return 1 - (2 * gutter) / stageWidth.current;
  }

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      stageWidth.current = entry.contentRect.width;
      if (!wallPopped.current) wallScale.set(insetScale());
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [wallScale]);

  const [filmIndex, setFilmIndex] = useState(0);
  const [filmActive, setFilmActive] = useState(false);
  const [muted, setMuted] = useState(true);

  // The section starts right under the 82px navbar
  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start 82px", "end end"],
  });

  const copyOpacity = useTransform(progress, [0, TIMELINE.copyOut[1] * 0.875], [1, 0]);
  const copyX = useTransform(progress, TIMELINE.copyOut, [0, -80]);
  const cueOpacity = useTransform(progress, [0, TIMELINE.wallPop], [1, 0]);
  // Film controls appear once the tile fills the stage; shrinking back always returns to the first film
  useMotionValueEvent(progress, "change", (v) => {
    setFilmActive(v > TIMELINE.controls[0]);
    if (v < TIMELINE.expand[1]) setFilmIndex(0);
  });

  useMotionValueEvent(progress, "change", (v) => {
    const pop = v > TIMELINE.wallPop;
    if (pop === wallPopped.current) return;
    wallPopped.current = pop;
    animate(
      wallScale,
      pop ? 1 : insetScale(),
      pop
        ? { type: "spring", stiffness: 210, damping: 13, mass: 1 }
        : { type: "spring", stiffness: 260, damping: 26 }
    );
  });

  // Top/bottom falloff clears as the film tile grows, so nothing sits over the film
  const fadeOpacity = useTransform(progress, TIMELINE.expand, [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[545vh] w-full bg-edge-black">
      <div
        ref={stageRef}
        data-hero-stage
        className="sticky top-20.5 isolate h-[calc(100svh-82px)] min-h-150 w-full overflow-hidden">
        {/* Media wall */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ scale: wallScale }}
          className="absolute inset-0 -z-10 grid grid-cols-2 grid-rows-1 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-[0.8vw]"
        >
          {COLUMNS.map((column, i) => (
            <MediaColumn
              key={i}
              column={column}
              progress={progress}
              dimmed={BEHIND_COPY[i] || (!isDesktop && COLUMN_VISIBILITY[i] === "")}
              isDesktop={isDesktop}
              className={COLUMN_VISIBILITY[i]}
              film={FILMS[filmIndex]}
              soundOn={filmActive && !muted}
            />
          ))}
        </motion.div>

        {/* Static top/bottom falloff — cheap overlays instead of a mask over moving content */}
        <motion.div aria-hidden="true" style={{ opacity: fadeOpacity }} className="wall-fade-top pointer-events-none absolute inset-x-0 top-0 -z-10 h-[22%]" />
        <motion.div aria-hidden="true" style={{ opacity: fadeOpacity }} className="wall-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[32%]" />


        {/* Content — headline sizes track the viewport so they keep their proportion to the columns */}
        <motion.div
          style={{ opacity: copyOpacity, x: copyX }}
          className="flex h-full flex-col justify-center px-6 pb-[10svh] lg:px-10"
        >
          <div className="lg:max-w-[42vw]">
            <motion.div
              {...fadeUp(0.2)}
              className="inline-flex h-5.5 items-center gap-1.5 rounded-full border border-white/25 bg-edge-black/40 px-2.5"
            >
              <Award size={10} strokeWidth={2} className="text-edge-stone" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                #1 for growth-driven brands
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.35)} className="mt-6 font-display font-normal text-white">
              <span className="block text-[clamp(2rem,3.46vw,4.5rem)] leading-[1.15]">
                We help businesses with
              </span>
              <span className="mt-[0.12em] block min-h-[1.1em] whitespace-nowrap text-[clamp(3.75rem,10vw,13rem)] leading-[1.1] text-edge-stone">
                <Typewriter />
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-4 text-[clamp(0.84rem,1vw,1.1rem)] font-medium text-white"
            >
              Trusted by 1000+ brands across India, UAE, Australia, US, UK, Japan
              and more
            </motion.p>

            <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11.75 items-center rounded-full bg-white px-7.5 text-xs font-normal uppercase tracking-[0.2em] text-edge-black transition-colors duration-300 hover:bg-soft-ivory"
              >
                Schedule Call
              </Link>
              <Link
                href="/work"
                className="inline-flex h-11.75 items-center rounded-full border border-white/30 px-7.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/60"
              >
                Case Studies
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-11 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
            Scroll
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="scroll-cue absolute inset-0 bg-white/80" />
          </span>
        </motion.div>

        <ShowreelFilm
          progress={progress}
          active={filmActive}
          index={filmIndex}
          onIndexChange={setFilmIndex}
          soundOn={filmActive && !muted}
          onToggleSound={() => setMuted((m) => !m)}
        />
      </div>
    </section>
  );
}
