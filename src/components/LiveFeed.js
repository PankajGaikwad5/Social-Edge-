"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Stand-in posts: three columns drift past like a feed being scrolled
const COLUMNS = [
  [{ shape: "aspect-[1.6]" }, { shape: "aspect-[1.2]" }, { shape: "aspect-[0.9]" }, { shape: "aspect-[1.4]" }],
  [{ shape: "aspect-[1]" }, { shape: "aspect-[1.6]", featured: true }, { shape: "aspect-[1.2]" }, { shape: "aspect-[1.5]" }],
  [{ shape: "aspect-[1.4]" }, { shape: "aspect-[1.1]" }, { shape: "aspect-[1.6]" }, { shape: "aspect-[1]" }],
];

const HEARTS = [
  { left: "62%", bottom: "22%", stone: true },
  { left: "71%", bottom: "38%" },
  { left: "84%", bottom: "30%", stone: true },
  { left: "58%", bottom: "46%" },
  { left: "78%", bottom: "16%" },
  { left: "88%", bottom: "52%", stone: true },
];

function Post({ post }) {
  return (
    <div className="mb-[6%] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
      <div
        className={cn(post.shape, post.featured ? "bg-warm-stone" : "bg-linear-160 from-white/14 to-white/[0.04]")}
      />
      <div className="flex items-end justify-between gap-2 border-t border-black/60 px-3 py-2.5">
        <div className="space-y-1.5">
          <span className="block h-1 w-14 max-w-full rounded-full bg-white/25" />
          <span className="block h-1 w-8 rounded-full bg-white/15" />
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80">
          {post.featured && <span className="feed-count tabular-nums">2,818</span>}
          <Heart size={12} strokeWidth={2} className={post.featured ? "text-edge-stone" : "text-white/35"} />
        </span>
      </div>
    </div>
  );
}

export default function LiveFeed() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".feed-track").forEach((track, i) => {
          // Each track holds its posts twice, so moving half its height loops seamlessly
          const down = i === 1;
          gsap.fromTo(
            track,
            { yPercent: down ? -50 : 0 },
            { yPercent: down ? 0 : -50, duration: 26 + i * 5, ease: "none", repeat: -1 }
          );
        });

        gsap.utils.toArray(".feed-heart").forEach((heart, i) => {
          gsap
            .timeline({ repeat: -1, delay: i * 0.9, repeatDelay: 1.6 + (i % 3) * 0.7 })
            .fromTo(heart, { y: 0, x: 0, scale: 0.6 }, { y: -150, x: i % 2 ? 14 : -14, scale: 1.1, duration: 2.8, ease: "sine.out" }, 0)
            .fromTo(heart, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "sine.inOut" }, 0)
            .to(heart, { opacity: 0, duration: 0.9, ease: "sine.inOut" }, 1.9);
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  // The like count on the highlighted post keeps ticking up
  useEffect(() => {
    let count = 2818;
    const id = setInterval(() => {
      count += 1 + Math.floor(Math.random() * 4);
      rootRef.current?.querySelectorAll(".feed-count").forEach((el) => (el.textContent = count.toLocaleString("en-US")));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="surface-dark relative aspect-[1.25] overflow-hidden rounded-lg border border-white/12 bg-black-depth"
    >
      <span className="pointer-events-none absolute -right-16 top-[18%] size-80 rounded-full bg-edge-stone/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-white/[0.05] blur-3xl" />

      <div className="absolute inset-x-[12%] -top-[4%] bottom-0 grid grid-cols-3 gap-[5%] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_86%,transparent)]">
        {COLUMNS.map((column, c) => (
          <div key={c} className="overflow-hidden">
            <div className="feed-track">
              {[...column, ...column].map((post, i) => (
                <Post key={i} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        {HEARTS.map((heart, i) => (
          <Heart
            key={i}
            size={18}
            strokeWidth={2}
            style={{ left: heart.left, bottom: heart.bottom }}
            className={cn("feed-heart absolute opacity-0", heart.stone ? "text-edge-stone" : "text-white/80")}
          />
        ))}
      </div>

      <span className="absolute left-[5%] top-[7%] flex h-8 items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-status-positive/70" />
          <span className="relative size-1.5 rounded-full bg-status-positive" />
        </span>
        Live feed
      </span>
    </div>
  );
}
