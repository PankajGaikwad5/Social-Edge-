"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Search, Sun, X } from "lucide-react";
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

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn("flex items-center gap-1", linkText)}
      >
        Services
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 rounded-2xl border border-graphite bg-edge-black p-2 shadow-2xl"
          >
            {SERVICES.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="block rounded-xl px-4 py-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </motion.ul>
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
      className={iconButton}
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
                <li key={link.href}>
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
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={iconButton}
              aria-label="Search"
            >
              <Search size={15} strokeWidth={1.75} />
            </button>
            <div>
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
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-graphite/40 py-4 font-display text-3xl text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
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
