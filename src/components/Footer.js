"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ArrowUp, Send } from "lucide-react";
import { SERVICES } from "@/components/WhatWeDo";
import { CALENDAR, EMAIL, SOCIALS } from "@/lib/contact";
import SayHello from "@/components/SayHello";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE_OUT = "ease-[cubic-bezier(0.25,1,0.5,1)]";

// Seconds each phrase rests before flipping to the next
const PHRASE_HOLD = 2.6;

const PHRASES = [
  { lines: ["let's build", "something."], tone: "text-white" },
  { lines: ["moves", "culture."], tone: "text-edge-stone-60" },
];

const COLUMNS = [
  {
    title: "Solutions",
    large: true,
    links: SERVICES.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Company",
    large: true,
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Freelance", href: "/career/freelance" },
      { label: "Full Time", href: "/career/full-time" },
    ],
  },
  {
    title: "Brand solutions",
    links: [
      "Social Media Management",
      "Original Content and Copywriting",
      "Graphic Design, Iconography and Illustrations",
      "Video Editing and Animation",
      "Film Production, AVs and Product Photography",
      "Campaign Planning",
      "Influencer Marketing & ORM",
      "Print, OOH, Mainline Advertising",
      "New Brand Launch and Rebranding",
    ],
  },
  {
    title: "Tech solutions",
    links: [
      "Custom Web Development",
      "Web Personalization",
      "UI/UX",
      "Search Engine Optimization",
      "CRM & ERP Solutions",
      "E-Commerce",
      "Email Marketing",
      "Marketing Automation",
      "Chatbots",
    ],
  },
  {
    title: "Media solutions",
    links: ["Media Buying", "Media Planning", "Performance Marketing", "MarTech for Media"],
  },
  {
    title: "Film and photography",
    links: [
      "Product Photoshoot",
      "UGC (User Generated Content)",
      "Model Shoot",
      "Creative Shoots",
      "Campaign Shoots",
      "Ad Films",
      "Factory Shoots",
      "Interviews",
      "Testimonials",
    ],
  },
].map((col) => ({
  ...col,
  links: col.links.map((link) =>
    typeof link === "string"
      ? { label: link, href: `/services#${link.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }
      : link
  ),
}));

// lucide dropped brand marks, so these follow its outline style (24 grid, round caps)
const SOCIAL_ICONS = {
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  YouTube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

function SocialIcon({ name, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden
    >
      {SOCIAL_ICONS[name]}
    </svg>
  );
}

// Two copies stacked in a clipped box; hover rolls the second up into place
function Roll({ children, className }) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <span className={cn("block transition-transform duration-500 group-hover:-translate-y-full", EASE_OUT)}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn("absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 group-hover:translate-y-0", EASE_OUT)}
      >
        {children}
      </span>
    </span>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const phrases = gsap.utils.toArray(".footer-phrase");
        const splits = phrases.map((el) => SplitText.create(el, { type: "words,chars" }));
        const chars = splits.map((s) => s.chars);

        gsap.set(phrases, { opacity: 1 });
        chars.slice(1).forEach((c) => gsap.set(c, { opacity: 0 }));

        // Each phrase flips away letter by letter while the next flips in behind it.
        // The cycle ends back on the first phrase, so the loop has no seam.
        const flip = gsap.timeline({ repeat: -1, paused: true });
        chars.forEach((current, i) => {
          const next = chars[(i + 1) % chars.length];
          flip.to(current, {
            yPercent: -60,
            rotateX: 90,
            opacity: 0,
            duration: 0.55,
            stagger: 0.018,
            ease: "power2.in",
          }, `+=${PHRASE_HOLD}`);
          flip.fromTo(
            next,
            { yPercent: 60, rotateX: -90, opacity: 0 },
            { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.022, ease: "power3.out", immediateRender: false },
            "<0.3"
          );
        });

        // Only flip while the footer is on screen
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 85%",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? flip.play() : flip.pause()),
        });

        const reveal = (trigger, start = "top 85%") => ({ trigger, start, once: true });

        gsap.from([".footer-eyebrow", ".footer-brief > *"], {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: reveal(".footer-phrases"),
        });

        gsap.from(".footer-rule", {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.inOut",
          stagger: 0.2,
          scrollTrigger: reveal(".footer-rule", "top 95%"),
        });

        gsap.from(".footer-col", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: reveal(".footer-cols"),
        });

        return () => splits.forEach((s) => s.revert());
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <>
      {/* Say Hello opens the footer, so every page ends with the contact block */}
      <SayHello />
      <footer ref={footerRef} className="overflow-hidden border-t border-graphite/50 bg-edge-black px-6 lg:px-10">
        <div className="mx-auto max-w-372">
          <div className="grid gap-10 pb-12 pt-9 sm:gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14">
            <div>
              <p className="footer-eyebrow text-[11px] font-medium uppercase tracking-[0.28em] text-mist">
                A partner in your growth
              </p>
  
              <p
                aria-label={PHRASES.map((p) => p.lines.join(" ")).join(", ")}
                className="footer-phrases mt-8 grid font-display text-[15vw] sm:mt-12 leading-[0.84] tracking-[-0.02em] [perspective:900px] sm:text-[clamp(5rem,8.3vw,10rem)]"
              >
                {PHRASES.map((phrase, i) => (
                  <span
                    key={phrase.lines.join(" ")}
                    aria-hidden
                    className={cn("footer-phrase col-start-1 row-start-1 block", phrase.tone, i > 0 && "opacity-0")}
                  >
                    {phrase.lines.map((line) => (
                      <span key={line} className="block whitespace-nowrap pb-[0.06em]">
                        {line}
                      </span>
                    ))}
                  </span>
                ))}
              </p>
            </div>
  
            <div className="footer-brief group/brief flex flex-col items-start lg:items-end lg:pb-3">
              <span className="flex size-14 items-center sm:size-18 justify-center rounded-full border border-graphite text-edge-stone transition-colors duration-500 group-hover/brief:border-edge-stone">
                <Send
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden
                  className={cn("transition-transform duration-500 group-hover/brief:-translate-y-1 group-hover/brief:translate-x-1", EASE_OUT)}
                />
              </span>
  
              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-mist">Send your brief at</p>
  
              <a
                href={`mailto:${EMAIL}`}
                className="group relative mt-3 pb-2.5 font-display text-[clamp(1.75rem,2.1vw,2.6rem)] leading-tight text-white"
              >
                {EMAIL}
                <span className="absolute inset-x-0 bottom-0 h-px bg-graphite" />
                <span className={cn("absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-edge-stone transition-transform duration-700 group-hover:scale-x-100", EASE_OUT)} />
              </a>
  
              <div className="mt-7 flex items-center gap-2 sm:flex-wrap sm:gap-2.5">
                <Link
                  href={CALENDAR}
                  className={cn(
                    "group relative flex h-10 shrink-0 items-center overflow-hidden rounded-full bg-edge-stone px-4 text-[10.5px] font-bold uppercase tracking-[0.14em] sm:h-11.5 sm:px-7 sm:text-xs sm:tracking-[0.2em] text-ink transition-transform duration-500 hover:-translate-y-0.5",
                    EASE_OUT
                  )}
                >
                  <span className={cn("absolute inset-0 origin-left scale-x-0 rounded-full bg-snow transition-transform duration-500 group-hover:scale-x-100", EASE_OUT)} />
                  <Roll className="relative">Schedule call</Roll>
                </Link>
  
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "group flex size-9 shrink-0 items-center sm:size-11.5 justify-center rounded-full border border-graphite text-white transition-[background-color,border-color,color,transform] duration-500 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-edge-black",
                      EASE_OUT
                    )}
                  >
                    <Roll className="size-4">
                      <SocialIcon name={social.label} />
                    </Roll>
                  </a>
                ))}
              </div>
            </div>
          </div>
  
          <div className="footer-rule h-px origin-left bg-graphite/60" />
  
          <nav aria-label="Footer" className="footer-cols grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[1.35fr_1fr_1.3fr_1.3fr_1.3fr_1.1fr] lg:gap-x-0 lg:pb-18 lg:pt-19">
            {COLUMNS.map((col) => (
              <div key={col.title} className={cn("footer-col lg:pr-8", !col.large && "hidden sm:block", col.title === "Company" && "max-sm:text-right")}>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-edge-stone">{col.title}</h3>
                <ul className={cn("mt-5 flex flex-col", col.large ? "gap-1.5" : "gap-[9px]")}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-block text-white transition-[color,transform] duration-500 hover:translate-x-1 hover:text-edge-stone-60",
                          EASE_OUT,
                          col.large ? "text-sm leading-snug sm:text-[15px]" : "text-[13px] leading-snug"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
  
          <div className="footer-rule h-px origin-left bg-graphite/60" />
  
          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <img src="/logos/logowhite.png" alt="Social Edge" className="logo-adaptive h-9 w-auto opacity-80" />
              <p className="text-[13px] text-concrete">© 2026 Social Edge. All rights reserved.</p>
            </div>
  
            <div className="flex items-center gap-6 text-xs text-concrete">
              <Link href="/terms" className="transition-colors duration-300 hover:text-white">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="transition-colors duration-300 hover:text-white">
                Privacy Policy
              </Link>
              <button
                type="button"
                onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                className="group flex items-center gap-1.5 text-[13px] font-semibold text-white"
              >
                Back to top
                <ArrowUp
                  size={13}
                  strokeWidth={2}
                  className={cn("transition-transform duration-500 group-hover:-translate-y-1", EASE_OUT)}
                />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
