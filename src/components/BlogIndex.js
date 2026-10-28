"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogCover from "@/components/BlogCover";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blogPosts";
import { cn } from "@/lib/utils";

const EASE = [0.4, 0, 0.2, 1];
const PER_PAGE = 15;
const DASHES = 12;
const pad = (n, size = 2) => String(n).padStart(size, "0");

/* Latest post card with a carousel through every post in the current filter */
function Featured({ posts }) {
  const cardRef = useRef(null);
  const hover = useRef(null);
  const firstRun = useRef(true);
  const [index, setIndex] = useState(0);
  const post = posts[index];
  const total = posts.length;
  const progress = total > 1 ? index / (total - 1) : 0;

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(".cover-blob", { xPercent: 18, yPercent: -10, scale: 1.15 }, 0)
        .to(".featured-cover", { y: -6 }, 0)
        .to(".read-arrow", { x: 4 }, 0);
    },
    { scope: cardRef }
  );

  // Same elements stay mounted between slides: the new content fades up at once, so rapid clicks never queue
  useGSAP(
    () => {
      const marker = { left: `${progress * 100}%`, xPercent: -progress * 100 };
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (firstRun.current || still) {
        firstRun.current = false;
        gsap.set(".progress-marker", marker);
        return;
      }
      gsap.to(".progress-marker", { ...marker, duration: 0.6, ease: "power3.out", overwrite: true });
      gsap.fromTo(
        ".slide-in",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out", overwrite: true }
      );
    },
    { scope: cardRef, dependencies: [index] }
  );

  const hoverIn = () => hover.current?.timeScale(1).play();
  const hoverOut = () => hover.current?.timeScale(1.6).reverse();
  const go = (step) => setIndex((i) => (i + step + total) % total);

  // Clicking anywhere on the track jumps to the post at that point
  function jump(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setIndex(Math.round(ratio * (total - 1)));
  }

  return (
    <div
      ref={cardRef}
      className="blog-featured relative mt-10 overflow-hidden rounded-2xl border border-white/12 bg-black-depth p-4 sm:p-7 lg:mt-12"
    >
      <span aria-hidden className="tile-grid pointer-events-none absolute inset-0" />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[30%] size-[60%] rounded-full bg-edge-stone/20 blur-[120px]"
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Link
          href={post.href}
          tabIndex={-1}
          aria-hidden
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
          className="featured-cover block rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
        >
          <div className="slide-in">
            <BlogCover
              post={post}
              className="rounded-xl px-6 pb-6 pt-7 sm:px-8"
              titleClassName="text-[clamp(1.5rem,2.3vw,2.4rem)]"
              glyphClassName="text-[clamp(11rem,20vw,22rem)]"
            />
          </div>
        </Link>

        <div className="lg:pr-6">
          <p className="slide-in flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.24em]">
            <span className="text-edge-stone">{index === 0 ? "Latest" : `No. ${post.no}`}</span>
            <span className="h-px w-8 bg-graphite" />
            <span className="text-concrete">{post.category}</span>
          </p>
          <h2 className="slide-in mt-6 font-display text-[clamp(1.9rem,2.7vw,2.6rem)] leading-[1.12] text-white">
            <Link href={post.href} className="transition-colors duration-500 hover:text-edge-stone-60">
              {post.title}
            </Link>
          </h2>
          <p className="slide-in mt-6 line-clamp-3 max-w-[36rem] text-sm leading-[1.75] text-concrete lg:mt-14">{post.excerpt}</p>
          <div className="slide-in mt-6 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.24em]">
            <span className="text-concrete">{post.date}</span>
            <Link href={post.href} onMouseEnter={hoverIn} onMouseLeave={hoverOut} className="flex items-center gap-2.5 text-edge-stone">
              Read
              <ArrowRight size={13} strokeWidth={1.75} className="read-arrow" />
            </Link>
          </div>

          {total > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              {/* Dashed track; the stone marker sits at this post's exact position in the list */}
              <button
                type="button"
                aria-label={`Post ${index + 1} of ${total}. Click the track to jump`}
                onClick={jump}
                className="relative flex h-5 w-56 cursor-pointer items-center justify-between"
              >
                {Array.from({ length: DASHES }, (_, d) => (
                  <span key={d} className="block h-px w-3 bg-graphite" />
                ))}
                <span className="progress-marker absolute top-1/2 h-0.5 w-7 -translate-y-1/2 rounded-full bg-edge-stone" />
              </button>

              <div className="flex items-center gap-4">
                <span className="mr-2 text-xs font-medium tracking-[0.2em] text-mist">
                  {pad(index + 1, 3)} / {pad(total, 3)}
                </span>
                {[
                  { icon: ArrowLeft, label: "Previous post", step: -1 },
                  { icon: ArrowRight, label: "Next post", step: 1 },
                ].map(({ icon: Icon, label, step }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => go(step)}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-edge-black"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const cardRef = useRef(null);
  const hover = useRef(null);

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(cardRef.current, { y: -6, borderColor: "rgba(165,148,124,0.5)" }, 0)
        .to(".cover-blob", { xPercent: 18, yPercent: -10, scale: 1.15 }, 0)
        .to(".read-arrow", { x: 4 }, 0);
    },
    { scope: cardRef }
  );

  return (
    <li className="flex">
      <Link
        ref={cardRef}
        href={post.href}
        onMouseEnter={() => hover.current?.timeScale(1).play()}
        onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
        className="flex w-full flex-col rounded-xl border border-white/10 bg-black-depth p-2 pb-7"
      >
        <BlogCover
          post={post}
          className="rounded-lg px-4.5 pb-3.5 pt-4"
          titleClassName="text-[clamp(1rem,1.1vw,1.15rem)]"
          glyphClassName="text-[9rem]"
        />
        <div className="px-3">
          <h3 className="mt-3.5 font-display text-[clamp(1.2rem,1.4vw,1.4rem)] leading-[1.2] text-white">{post.title}</h3>
          <p className="mt-3.5 line-clamp-3 text-sm leading-[1.7] text-concrete">{post.excerpt}</p>
          <p className="mt-5 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-mist">
            <span>{post.date}</span>
            <span className="flex items-center gap-2">
              Read
              <ArrowRight size={13} strokeWidth={1.75} className="read-arrow" />
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function BlogIndex() {
  const sectionRef = useRef(null);
  const listTopRef = useRef(null);
  const lenis = useLenis();
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const posts = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);
  // The grid starts after the featured post, like the reference
  const rest = posts.slice(1);
  const pages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const shown = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".blog-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".blog-line-inner", { yPercent: 110, duration: 1.3, ease: "power4.out" }, 0.1)
          .from(".blog-reveal", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
          .from(".blog-featured", { y: 40, opacity: 0, duration: 1.2 }, 0.6);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function choose(next) {
    setFilter(next);
    setPage(1);
  }

  function goToPage(n) {
    setPage(n);
    const y = listTopRef.current.getBoundingClientRect().top + window.scrollY - 110;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} className="bg-edge-black px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="blog-crumb">
          <ol className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.2em]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">Blog</li>
          </ol>
        </nav>

        <p className="blog-reveal mt-12 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-edge-stone lg:mt-14">
          <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
            <span className="size-1.5 rounded-full bg-edge-stone" />
          </span>
          Journal
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,7.2vw,7.5rem)] leading-[1.02] tracking-[-0.02em] text-white">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="blog-line-inner block">
              Notes from <span className="text-edge-stone">the studio</span>
            </span>
          </span>
        </h1>
        <p className="blog-reveal mt-6 max-w-[62rem] text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.65] text-concrete">
          Thinking on brand, content and growth from the people who ship it. Read what we&apos;ve learned running campaigns across India, the UAE, the UK, the US, Australia and Japan.
        </p>

        <div ref={listTopRef} className="blog-reveal mt-12 flex items-center gap-6 border-t border-graphite/60 pt-7">
          <ul className="no-scrollbar -mx-6 flex flex-1 gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-wrap lg:px-0">
            {["All", ...BLOG_CATEGORIES].map((label) => (
              <li key={label} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={filter === label}
                  onClick={() => choose(label)}
                  className={cn(
                    "h-9.5 cursor-pointer rounded-full border px-4.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
                    filter === label ? "border-white bg-white text-edge-black" : "border-white/20 text-white hover:border-white/60"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <p className="hidden shrink-0 text-[11px] font-medium uppercase tracking-[0.24em] text-concrete sm:block">
            {posts.length} posts
          </p>
        </div>

        {/* Keyed so the carousel restarts at the latest post when the filter changes */}
        <Featured key={filter} posts={posts} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${filter}-${page}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {shown.length > 0 && (
              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {shown.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 border-t border-graphite/60 pt-7">
            <ul className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    aria-current={n === page ? "page" : undefined}
                    onClick={() => goToPage(n)}
                    className={cn(
                      "flex size-11 cursor-pointer items-center justify-center rounded-full border font-display text-[15px] transition-colors duration-500",
                      n === page ? "border-white bg-white text-edge-black" : "border-white/15 text-white hover:border-white/60"
                    )}
                  >
                    {pad(n)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
