"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Locations", href: "/locations" },
  { label: "Career", href: "/career" },
];

export const SERVICES = [
  { label: "Social Media Management", href: "/services/social-media" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
  { label: "Content & Video Production", href: "/services/content-production" },
  { label: "Branding & Design", href: "/services/branding" },
  { label: "Influencer Marketing", href: "/services/influencer-marketing" },
  { label: "Web Development", href: "/services/web-development" },
];

export const SERVICE_GROUPS = [
  {
    title: "Tailored for Your Business",
    featured: true,
    links: [
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "Project Video Shoot", href: "/services/project-video-shoot" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "Event Marketing", href: "/services/event-marketing" },
    ],
  },
  {
    title: "Brand Solution",
    links: [
      { label: "Social Media Management", href: "/services/social-media-management" },
      { label: "Original Content & Copy", href: "/services/original-content-copy" },
      { label: "Graphic Designing", href: "/services/graphic-designing" },
      { label: "Video Editing & Animation", href: "/services/video-editing-animation" },
      { label: "Campaign Planning", href: "/services/campaign-planning" },
      { label: "New Brand Launch & Rebranding", href: "/services/brand-launch-rebranding" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
    ],
  },
  {
    title: "Tech Solution",
    links: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "Marketing Automation", href: "/services/marketing-automation" },
    ],
  },
  {
    title: "Film & Videography",
    links: [
      { label: "Creative Shoot", href: "/services/creative-shoot" },
      { label: "Campaign Shoot", href: "/services/campaign-shoot" },
      { label: "Event Shoot", href: "/services/event-shoot" },
      { label: "Project Shoot", href: "/services/project-shoot" },
      { label: "Interviews / Testimonials", href: "/services/interviews-testimonials" },
    ],
  },
];

const EASE = [0.4, 0, 0.2, 1];

const iconButton =
  "flex size-9 items-center sm:size-9.5 justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/50";

const linkText = "text-[13px] font-medium uppercase tracking-[0.02em] text-white transition-colors duration-300 hover:text-edge-stone";

function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="Social Edge home">
      <img src="/logos/logowhite.png" alt="social edge logo" className="logo-adaptive w-23 sm:w-[140px]" />
    </Link>
  );
}

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function show() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }

  // Short grace period so the pointer can cross from the trigger into the panel
  function hide() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <li className="flex h-[82px] items-center" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn("relative flex items-center gap-1 py-1.5", linkText, open && "text-concrete")}
      >
        Services
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={cn("transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]", open && "rotate-180")}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "scale-x-100" : "scale-x-0"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-white/10 bg-edge-black"
          >
            <div className="mx-auto grid max-w-372 grid-cols-5 gap-x-8 px-10 pb-12 pt-12 2xl:px-0">
              {SERVICE_GROUPS.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <p
                    className={cn(
                      "border-b pb-3.5",
                      group.featured
                        ? "border-white/60 font-display text-[20px] font-bold uppercase leading-[1.1] text-edge-stone"
                        : "border-white/15 font-display text-[21px] leading-[1.3] text-white"
                    )}
                  >
                    <span className={cn("block", group.featured && "max-w-[9em]")}>{group.title}</span>
                  </p>
                  <ul className="mt-5 flex flex-col gap-[9px]">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block w-fit text-[13px] leading-[1.35] transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                            group.featured
                              ? "font-semibold text-white hover:text-edge-stone"
                              : "text-white/60 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

const LIGHT_QUERY = "(prefers-color-scheme: light)";

// Follows the OS until the visitor picks a theme; the pick is applied before paint by the script in layout.js
function subscribeToTheme(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  const media = window.matchMedia(LIGHT_QUERY);
  media.addEventListener("change", callback);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", callback);
  };
}

function getTheme() {
  return document.documentElement.dataset.theme ?? (window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark");
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => null);

  function toggle() {
    const next = getTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Cross-fade colours for the switch only, so normal hovers keep their own timing
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    setTimeout(() => root.classList.remove("theme-switching"), 450);

    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${iconButton} cursor-pointer`}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Icon size={15} strokeWidth={1.75} className={cn("transition-opacity duration-300", !theme && "opacity-0")} />
    </button>
  );
}

function SearchPanel({ onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full border-b border-graphite bg-edge-black"
    >
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-5"
      >
        <Search size={18} strokeWidth={1.75} className="text-concrete" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search services, work, articles..."
          className="flex-1 bg-transparent text-base text-white placeholder:text-concrete focus:outline-none"
        />
        <button type="button" onClick={onClose} className={iconButton} aria-label="Close search">
          <X size={16} strokeWidth={1.75} />
        </button>
      </form>
    </motion.div>
  );
}

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -28 }),
};

const mobileRow = "flex w-full items-center justify-between border-b border-white/10 py-4 text-left font-display text-white";

// Drill-down: main links → service groups → a group's links
function MobileMenu({ onNavigate }) {
  const [path, setPath] = useState([]);
  const [dir, setDir] = useState(1);

  function go(next) {
    setDir(next.length > path.length ? 1 : -1);
    setPath(next);
  }

  const group = path.length === 2 ? SERVICE_GROUPS[path[1]] : null;
  const title = group ? group.title : "Services";

  return (
    <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={path.join("/") || "root"}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: EASE }}
        >
          {path.length === 0 ? (
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {link.hasMenu ? (
                    <button type="button" onClick={() => go(["services"])} className={cn(mobileRow, "text-3xl")}>
                      {link.label}
                      <ChevronRight size={22} strokeWidth={1.5} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block border-b border-white/10 py-4 font-display text-3xl text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          ) : (
            <>
              <button
                type="button"
                onClick={() => go(path.slice(0, -1))}
                className="flex w-full items-center justify-between border-b border-white/10 pb-4 text-white"
              >
                <span className="flex items-center gap-3 font-display text-2xl">
                  <ChevronLeft size={18} strokeWidth={1.75} />
                  {title}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-concrete">Back</span>
              </button>

              <ul>
                {group
                  ? group.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} onClick={onNavigate} className={cn(mobileRow, "text-xl")}>
                          {link.label}
                        </Link>
                      </li>
                    ))
                  : SERVICE_GROUPS.map((g, i) => (
                      <li key={g.title}>
                        <button type="button" onClick={() => go(["services", i])} className={cn(mobileRow, "text-xl")}>
                          {g.title}
                          <ChevronRight size={18} strokeWidth={1.5} />
                        </button>
                      </li>
                    ))}
              </ul>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-edge-black">
      <nav className="flex h-[82px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <div className="flex items-center gap-6 xl:gap-10">
          <ul className="hidden items-center gap-4 lg:flex xl:gap-5">
            {NAV_LINKS.map((link) =>
              link.hasMenu ? (
                <ServicesMenu key={link.href} />
              ) : (
                <li key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className={linkText}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 xl:gap-10">
            {/* <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={iconButton}
              aria-label="Search"
            >
              <Search size={15} strokeWidth={1.75} />
            </button> */}
            <div className="cursor-pointer">
              <ThemeToggle />
            </div>
            <Link
              href="/contact"
              className="inline-flex h-9 items-center rounded-full bg-edge-stone px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-edge-stone-80 sm:h-11 sm:px-6 sm:text-xs sm:tracking-[0.12em]"
            >
              Hire Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(iconButton, "lg:hidden")}
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-edge-black lg:hidden"
          >
            <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className={iconButton}
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
            <MobileMenu onNavigate={() => setMobileOpen(false)} />
            <div className="flex items-center gap-3 px-6 pb-10">
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-full bg-edge-stone py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink"
              >
                Hire Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
