"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ArrowRight, ArrowUpRight, MapPin, PenLine, Plus, Quote, Sparkle } from "lucide-react";
import BlogCover from "@/components/BlogCover";
import { leftwardMarquee } from "@/lib/marquee";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const pad = (i) => String(i + 1).padStart(2, "0");
const STONE_WASH = "color-mix(in srgb, var(--edge-stone) 40%, transparent)";

// A marker stroke that sweeps under the lead sentence as it scrolls into view
function Highlight({ children }) {
  return (
    <span
      style={{ backgroundImage: `linear-gradient(${STONE_WASH}, ${STONE_WASH})` }}
      className="guide-highlight bg-no-repeat [background-position:0_88%] [background-size:100%_0.38em]"
    >
      {children}
    </span>
  );
}

function ChapterHead({ index, title, className }) {
  return (
    <div className={className}>
      <p className="guide-number font-display text-[clamp(5rem,7vw,8.5rem)] font-light leading-[0.9] text-edge-stone-60">{pad(index)}</p>
      <h3 className="guide-title mt-3 max-w-[16ch] font-display text-[clamp(2rem,2.4vw,2.9rem)] leading-[1.1] text-white">{title}</h3>
    </div>
  );
}

/* 01 / 04: long-form copy, optional pull quote */
function ArticleChapter({ chapter, index }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <ChapterHead index={index} title={chapter.title} className="self-start lg:sticky lg:top-32" />
      <div>
        <p className="guide-fade text-[clamp(1.05rem,1.2vw,1.25rem)] leading-[1.75] text-white">
          <Highlight>{chapter.highlight}</Highlight> {chapter.lead}
        </p>

        {chapter.quote && (
          <figure className="guide-fade relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-black-depth py-9 pl-10 pr-8">
            <span aria-hidden className="absolute inset-y-0 left-0 w-0.75 bg-edge-stone" />
            <span aria-hidden className="pointer-events-none absolute -left-10 -top-10 size-56 rounded-full bg-edge-stone/15 blur-3xl" />
            <Quote size={40} strokeWidth={1.5} className="relative text-edge-stone" />
            <blockquote className="relative mt-4 max-w-[20ch] font-display text-[clamp(1.4rem,1.7vw,1.9rem)] leading-[1.25] text-white">
              {chapter.quote}
            </blockquote>
          </figure>
        )}

        {chapter.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="guide-fade mt-10 text-[15.5px] leading-[1.8] text-white/70 [&+p]:mt-6">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

/* 02: six step cards in a snake, joined by flowing dashed connectors */
function Connector() {
  return (
    <svg aria-hidden viewBox="0 0 70 14" className="h-3.5 w-[70px] overflow-visible text-edge-stone">
      <path className="guide-flow" d="M8 7 H56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="30" cy="7" r="2.5" fill="currentColor" />
      <path d="M56 2 L64 7 L56 12 Z" fill="currentColor" />
    </svg>
  );
}

function StepCard({ step, number, featured, connector }) {
  const cardRef = useRef(null);
  const hover = useRef(null);

  useGSAP(
    () => {
      hover.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "sine.inOut" } })
        .to(cardRef.current, { y: -6, borderColor: "rgba(165,148,124,0.55)" }, 0)
        .to(".step-glow", { opacity: 1 }, 0)
        .to(".step-number", { y: -8 }, 0);
    },
    { scope: cardRef }
  );

  return (
    <li className="guide-card relative flex">
      <div
        ref={cardRef}
        onMouseEnter={() => hover.current?.timeScale(1).play()}
        onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
        className={cn(
          "relative flex min-h-76 w-full flex-col overflow-hidden rounded-3xl border bg-black-depth px-7 pb-8 pt-8",
          featured
            ? "border-edge-stone/40 shadow-[0_34px_70px_-34px_color-mix(in_srgb,var(--edge-stone)_45%,transparent)] lg:-translate-y-1.5"
            : "border-white/10"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "step-glow pointer-events-none absolute -bottom-20 -right-16 size-64 rounded-full bg-edge-stone/20 blur-3xl",
            featured ? "opacity-100" : "opacity-50"
          )}
        />
        <span
          aria-hidden
          className="step-number pointer-events-none absolute -bottom-[0.2em] right-6 font-display text-[clamp(6rem,7vw,8rem)] leading-none text-edge-stone-60/70"
        >
          {number}
        </span>

        <p className="relative text-[10px] font-medium uppercase tracking-[0.24em] text-edge-stone">Step {number}</p>
        <h4 className="relative mt-3 font-display text-[clamp(1.3rem,1.45vw,1.55rem)] leading-tight text-white">{step.title}</h4>
        <span aria-hidden className={cn("relative mt-5 block h-px bg-edge-stone", featured ? "w-16" : "w-8")} />
        <p className="relative mt-5 max-w-[30ch] text-[15px] leading-relaxed text-white/75">{step.body}</p>
      </div>

      {connector && (
        <span className="absolute left-full top-1/2 hidden -translate-y-1/2 lg:block">
          <Connector />
        </span>
      )}
    </li>
  );
}

function StepsChapter({ chapter, index }) {
  const rows = [chapter.steps.slice(0, 3), chapter.steps.slice(3, 6)];

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
        <ChapterHead index={index} title={chapter.title} />
        <p className="guide-fade max-w-[33rem] pb-2 text-base leading-[1.75] text-white/70">{chapter.intro}</p>
      </div>

      <div className="mt-14">
        {rows.map((row, r) => (
          <div key={r}>
            {r === 1 && (
              // Carries the flow from the end of the first row back to the start of the second
              <div aria-hidden className="relative my-4 hidden h-16 lg:block">
                <svg viewBox="0 0 100 64" preserveAspectRatio="none" className="absolute inset-0 size-full text-edge-stone">
                  <path
                    className="guide-flow"
                    d="M85 0 V24 Q85 32 79 32 H21 Q15 32 15 40 V56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="absolute left-[85%] top-0 size-2 -translate-x-1/2 rounded-full bg-edge-stone" />
                <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-edge-stone" />
                <svg viewBox="0 0 12 10" className="absolute bottom-0 left-[15%] h-2.5 w-3 -translate-x-1/2 text-edge-stone">
                  <path d="M1 1 L6 9 L11 1 Z" fill="currentColor" />
                </svg>
              </div>
            )}
            <ul className={cn("grid gap-5 lg:grid-cols-3 lg:gap-[70px]", r === 1 && "mt-5 lg:mt-0")}>
              {row.map((step, j) => (
                <StepCard key={step.title} step={step} number={pad(r * 3 + j)} featured={j === 1} connector={j < 2} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* 03: four numbered stops on a dashed track that light up in order */
function TimelineChapter({ chapter, index }) {
  return (
    <>
      <ChapterHead index={index} title={chapter.title} />
      <ol className="guide-timeline mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {chapter.steps.map((step, i) => (
          <li key={step.title}>
            <div className="flex items-center">
              <span
                className={cn(
                  "tl-circle flex size-19 shrink-0 items-center justify-center rounded-full border border-edge-stone/50 font-display text-2xl text-edge-stone-60",
                  i % 2 === 1 && "bg-edge-black ring-4 ring-edge-stone/15"
                )}
              >
                {pad(i)}
              </span>
              {i < chapter.steps.length - 1 && (
                <span aria-hidden className="tl-line relative ml-3 mr-1 hidden h-3 flex-1 origin-left items-center lg:flex">
                  <span className="h-0 flex-1 border-t border-dashed border-edge-stone/70" />
                  <span className="absolute right-6 size-1.5 rounded-full bg-edge-stone" />
                  <svg viewBox="0 0 10 12" className="h-3 w-2.5 text-edge-stone">
                    <path d="M1 1 L9 6 L1 11 Z" fill="currentColor" />
                  </svg>
                </span>
              )}
            </div>
            <div className="tl-copy">
              <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.24em] text-edge-stone">Step {pad(i)}</p>
              <h4 className="mt-2 font-display text-[clamp(1.3rem,1.45vw,1.55rem)] leading-tight text-white">{step.title}</h4>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-white/65">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* 05: numbered accordion */
function FaqChapter({ chapter, index }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="self-start lg:sticky lg:top-32">
        <ChapterHead index={index} title={chapter.title} />
        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-edge-stone">
          {chapter.faqs.length} questions, answered
        </p>
        <Link
          href="/contact"
          className="group mt-6 inline-flex h-11.5 items-center gap-3 rounded-full border border-white/40 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-white"
        >
          Ask us yours
          <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="border-t border-graphite/60">
        {chapter.faqs.map((item, i) => {
          const isOpen = open === i;
          const id = `${chapter.id}-faq-${i}`;
          return (
            <li key={item.q} className="guide-fade border-b border-graphite/60">
              <h4>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full cursor-pointer items-center gap-5 py-6 text-left"
                >
                  <span className="w-6 shrink-0 text-[10px] tracking-[0.2em] text-edge-stone">{pad(i)}</span>
                  <span
                    className={cn(
                      "flex-1 font-display text-[clamp(1.05rem,1.15vw,1.25rem)] leading-snug transition-colors duration-500",
                      isOpen ? "text-edge-stone-60" : "text-white group-hover:text-edge-stone-60"
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                      isOpen ? "border-white bg-white text-edge-black" : "border-white/35 text-white group-hover:border-white/70"
                    )}
                  >
                    <Plus
                      size={18}
                      strokeWidth={1.5}
                      className={cn("transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.2,1)]", isOpen && "rotate-45")}
                    />
                  </span>
                </button>
              </h4>
              <div
                id={id}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.45,0,0.2,1)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "max-w-[38rem] pb-7 pl-11 pr-16 text-[15px] leading-relaxed text-concrete transition-opacity duration-500",
                      isOpen ? "opacity-100 delay-100" : "opacity-0"
                    )}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* 06: latest articles with a paper cover */
function ArticleCard({ article }) {
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
    <li className="guide-card flex">
      <Link
        ref={cardRef}
        href={article.href}
        onMouseEnter={() => hover.current?.timeScale(1).play()}
        onMouseLeave={() => hover.current?.timeScale(1.6).reverse()}
        className="flex w-full flex-col rounded-3xl border border-white/10 bg-black-depth p-2.5 pb-7"
      >
        <BlogCover post={article} />

        <div className="px-4">
          <p className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-edge-stone">
            <PenLine size={13} strokeWidth={1.75} />
            {article.category}
            <span className="size-1 rounded-full bg-edge-stone/70" />
            {article.date}
          </p>
          <p className="mt-3 font-display text-[1.15rem] leading-snug text-white">{article.title}</p>
          <span className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            Read article
            <ArrowRight size={13} strokeWidth={1.75} className="read-arrow" />
          </span>
        </div>
      </Link>
    </li>
  );
}

function ArticlesChapter({ chapter, index }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead index={index} title={chapter.title} />
        <Link
          href="/blog"
          className="group mb-2 inline-flex h-11.5 items-center gap-3 rounded-full border border-white/40 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:border-white"
        >
          All articles
          <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {chapter.articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </ul>
    </>
  );
}

/* 07: related services and locations */
function RelatedChapter({ chapter, index }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <ChapterHead index={index} title={chapter.title} />
      <div>
        <p className="guide-fade text-base leading-[1.8] text-white/70">
          {chapter.intro.map((part, i) =>
            part.href ? (
              <Link key={i} href={part.href} className="border-b border-white/40 text-white transition-colors duration-500 hover:border-edge-stone">
                {part.text}
              </Link>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>

        <ul className="guide-fade mt-8 flex flex-wrap gap-3">
          {chapter.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group flex h-12 items-center gap-3 rounded-full border border-white/15 px-5.5 font-display text-[1.02rem] text-white transition-colors duration-500 hover:border-white/50"
              >
                {link.label}
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.75}
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>

        <p className="guide-fade mt-12 text-[11px] font-medium uppercase tracking-[0.24em] text-edge-stone">Available in</p>
        <ul className="guide-fade mt-4 flex flex-wrap gap-2.5">
          {chapter.locations.map((place) => (
            <li key={place.label}>
              <Link
                href={place.href}
                className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4.5 text-[13px] font-medium text-white transition-colors duration-500 hover:border-white/50"
              >
                <MapPin size={14} strokeWidth={1.75} className="text-concrete" />
                {place.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const RENDERERS = {
  article: ArticleChapter,
  steps: StepsChapter,
  timeline: TimelineChapter,
  faq: FaqChapter,
  articles: ArticlesChapter,
  related: RelatedChapter,
};

function MarqueeRow({ words, hidden }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="whitespace-nowrap font-display text-[clamp(2.75rem,3.6vw,4.4rem)] leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-white)_45%,transparent)]">
            {word}
          </span>
          <Sparkle size={20} strokeWidth={1.5} className="mx-12 shrink-0 text-edge-stone" />
        </li>
      ))}
    </ul>
  );
}

// Long-form "more about" block: overview, chapter pills that scroll to each chapter, outlined marquee, then the chapters.
// statement: [{ text, accent? }]; chapters: [{ id, type, title, ...fields for that type }]
export default function ServiceGuide({ eyebrow, tag, statement, marquee, chapters }) {
  const sectionRef = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(null);

  function jumpTo(e, id) {
    e.preventDefault();
    // Absolute position, clear of the sticky navbar
    const y = document.getElementById(id).getBoundingClientRect().top + window.scrollY - 110;
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  useGSAP(
    () => {
      // Highlight the pill for whichever chapter is crossing the middle of the screen
      gsap.utils.toArray(".guide-chapter").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(el.id),
          onLeaveBack: () => i === 0 && setActive(null),
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".guide-reveal", {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        });

        gsap.to(".guide-flow", { strokeDashoffset: -18, duration: 1.1, ease: "none", repeat: -1 });

        gsap.utils.toArray(".guide-chapter").forEach((chapter) => {
          const reveal = { trigger: chapter, start: "top 72%", once: true };
          gsap.from(chapter.querySelector(".guide-number"), { yPercent: 40, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: reveal });
          gsap.from(chapter.querySelector(".guide-title"), { y: 24, opacity: 0, duration: 1, delay: 0.15, ease: "power3.out", scrollTrigger: reveal });

          chapter.querySelectorAll(".guide-fade").forEach((el) => {
            gsap.from(el, { y: 24, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          });

          const cards = chapter.querySelectorAll(".guide-card");
          if (cards.length) {
            gsap.from(cards, {
              y: 40,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
            });
          }
        });

        gsap.utils.toArray(".guide-highlight").forEach((el) => {
          gsap.fromTo(
            el,
            { backgroundSize: "0% 0.38em" },
            { backgroundSize: "100% 0.38em", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 80%", once: true } }
          );
        });

        // Stops light up one after another as the dashed track draws between them
        gsap.utils.toArray(".guide-timeline").forEach((list) => {
          gsap
            .timeline({ scrollTrigger: { trigger: list, start: "top 78%", once: true }, defaults: { ease: "power3.out" } })
            .from(list.querySelectorAll(".tl-circle"), { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.35 }, 0)
            .from(list.querySelectorAll(".tl-line"), { scaleX: 0, duration: 0.6, stagger: 0.35, ease: "power2.inOut" }, 0.3)
            .from(list.querySelectorAll(".tl-copy"), { y: 20, opacity: 0, duration: 0.9, stagger: 0.35 }, 0.15);
        });

        return leftwardMarquee(sectionRef.current.querySelector(".guide-track"), {
          trigger: sectionRef.current.querySelector(".guide-marquee"),
          duration: 40,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-x-clip border-t border-graphite/50 bg-black-depth px-6 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-372">
        <p className="guide-reveal flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
          <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
            <span className="size-1.5 rounded-full bg-edge-stone" />
          </span>
          {eyebrow}
        </p>

        <div className="guide-reveal mt-9">
          <span className="inline-flex h-9 items-center rounded-full border border-white/70 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            {tag}
          </span>
          <h2 className="mt-7 max-w-[24ch] font-display text-[clamp(2rem,2.35vw,2.9rem)] leading-[1.15] tracking-[-0.01em] text-white">
            {statement.map((part) => (
              <span key={part.text} className={part.accent ? "text-edge-stone-60" : undefined}>
                {part.text}
              </span>
            ))}
          </h2>
        </div>

        <nav aria-label="Sections" className="guide-reveal mt-10">
          <ul className="flex flex-wrap gap-2.5">
            {chapters.map((chapter, i) => {
              const isActive = active ? active === chapter.id : i === 0;
              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    onClick={(e) => jumpTo(e, chapter.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-full border pl-1.5 pr-4.5 text-sm transition-colors duration-500",
                      isActive ? "border-white/60 text-white" : "border-graphite/60 text-concrete hover:border-graphite hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-500",
                        isActive ? "bg-edge-stone text-ink" : "bg-graphite/40 text-mist"
                      )}
                    >
                      {pad(i)}
                    </span>
                    {chapter.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="guide-marquee mt-18 overflow-hidden border-y border-graphite/50 py-9 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="guide-track flex w-max">
            <MarqueeRow words={marquee} />
            <MarqueeRow words={marquee} hidden />
          </div>
        </div>

        <div className="mt-6">
          {chapters.map((chapter, i) => {
            const Body = RENDERERS[chapter.type];
            return (
              <section
                key={chapter.id}
                id={chapter.id}
                aria-label={chapter.title}
                className="guide-chapter scroll-mt-28 border-t border-graphite/50 py-20 first:border-t-0 lg:py-28"
              >
                <Body chapter={chapter} index={i} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
