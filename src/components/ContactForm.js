"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Mail, MessageCircle, X } from "lucide-react";
import { SERVICE_GROUPS } from "@/components/Navbar";
import { EMAIL, WHATSAPP } from "@/lib/contact";
import { cn } from "@/lib/utils";

const EASE = [0.4, 0, 0.2, 1];

// Menu groups with each service listed once (a few appear in two groups in the navbar)
const seen = new Set();
const GROUPS = [
  ...SERVICE_GROUPS.map((g) => ({
    title: g.title,
    options: g.links.map((l) => l.label).filter((label) => !seen.has(label) && seen.add(label)),
  })),
  { title: "Other", options: ["Something else"] },
].filter((g) => g.options.length);

const EMPTY = { name: "", email: "", phone: "", company: "", services: [], message: "" };

function compose(form) {
  const services = form.services.join(", ");
  const subject = `New project enquiry: ${form.services.length > 2 ? `${form.services.length} services` : services || "General"} · ${form.name}`;
  const details = [
    ["Name", form.name],
    ["Email", form.email],
    ["Phone", form.phone],
    ["Company", form.company],
    [form.services.length > 1 ? "Services" : "Service", services],
  ]
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`);
  const body = ["Hi Social Edge,", "", form.message.trim(), "", ...details].join("\r\n");
  return { subject, body };
}

// Each option opens a new message with everything filled in; the visitor only has to press send
function sendOptions(form) {
  const { subject, body } = compose(form);
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  const to = encodeURIComponent(EMAIL);
  return [
    { label: "Email app", note: "Mail, Outlook or your default app", href: `mailto:${EMAIL}?subject=${s}&body=${b}`, external: false },
    { label: "Gmail", note: "Opens in your browser", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${s}&body=${b}`, external: true },
    { label: "Outlook.com", note: "Opens in your browser", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${s}&body=${b}`, external: true },
  ];
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-concrete">
        {label}
        {required && <span className="text-edge-stone"> *</span>}
      </span>
      {children}
      <span className={cn("mt-1.5 block min-h-4 text-xs text-status-negative transition-opacity duration-300", error ? "opacity-100" : "opacity-0")}>
        {error}
      </span>
    </label>
  );
}

const inputClass =
  "mt-2 w-full border-b border-graphite bg-transparent py-3 text-base text-white outline-none transition-colors duration-500 placeholder:text-graphite focus:border-edge-stone";

// Multi-select styled like the other fields: chosen services sit as removable chips, the list opens as a grouped panel
function ServicePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (label) => onChange(value.includes(label) ? value.filter((v) => v !== label) : [...value, label]);

  return (
    <div ref={rootRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((v) => !v))}
        className={cn(
          "mt-2 flex min-h-[3.25rem] w-full cursor-pointer items-center gap-3 border-b py-2.5 text-left outline-none transition-colors duration-500",
          open ? "border-edge-stone" : "border-graphite focus-visible:border-edge-stone"
        )}
      >
        <span className="flex flex-1 flex-wrap gap-1.5">
          {value.length === 0 && <span className="py-0.5 text-base text-graphite">What do you need help with?</span>}
          {value.map((label) => (
            <span key={label} className="flex h-8 items-center gap-1.5 rounded-full border border-edge-stone/60 bg-edge-stone/15 pl-3 pr-1.5 text-[13px] text-white">
              {label}
              <button
                type="button"
                aria-label={`Remove ${label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(label);
                }}
                className="flex size-5 cursor-pointer items-center justify-center rounded-full text-mist transition-colors duration-300 hover:bg-white/10 hover:text-white"
              >
                <X size={12} strokeWidth={2} />
              </button>
            </span>
          ))}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={cn("shrink-0 text-concrete transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]", open && "rotate-180")}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-multiselectable="true"
            data-lenis-prevent
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-graphite bg-edge-black p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
          >
            {GROUPS.map((group) => (
              <div key={group.title} className="py-1">
                <p className="px-3 pb-1.5 pt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-edge-stone">{group.title}</p>
                {group.options.map((label) => {
                  const on = value.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      role="option"
                      aria-selected={on}
                      onClick={() => toggle(label)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-300",
                        on ? "text-white" : "text-mist hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300",
                          on ? "border-edge-stone bg-edge-stone text-ink" : "border-graphite"
                        )}
                      >
                        {on && <Check size={12} strokeWidth={2.5} />}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".contact-crumb", { y: 12, opacity: 0, duration: 0.8 })
          .from(".contact-line-inner", { yPercent: 110, duration: 1.3, stagger: 0.14, ease: "power4.out" }, 0.1)
          .from(".contact-reveal", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
          .from(".contact-card", { y: 40, opacity: 0, duration: 1.2 }, 0.3);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Please add a valid email.";
    if (form.message.trim().length < 10) next.message = "A line or two about the project helps us reply properly.";
    setErrors(next);
    if (Object.keys(next).length === 0) setReady(true);
  }

  const { subject } = compose(form);

  return (
    <section ref={sectionRef} className="bg-edge-black px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-372">
        <nav aria-label="Breadcrumb" className="contact-crumb">
          <ol className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.2em]">
            <li>
              <Link href="/" className="text-concrete transition-colors duration-300 hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-graphite">/</li>
            <li aria-current="page" className="text-white">Contact</li>
          </ol>
        </nav>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Intro and direct routes */}
          <div>
            <p className="contact-reveal flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-edge-stone">
              <span className="relative flex size-3 items-center justify-center rounded-full border border-edge-stone/40">
                <span className="size-1.5 rounded-full bg-edge-stone" />
              </span>
              Start a project
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,5.4vw,6.4rem)] leading-[1.02] tracking-[-0.02em] text-white">
              {["Let's build", "something."].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.1em]">
                  <span className="contact-line-inner block">{line}</span>
                </span>
              ))}
            </h1>
            <p className="contact-reveal mt-6 max-w-[30rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.65] text-concrete">
              Tell us what you&apos;re working on. Fill in the form and we&apos;ll open a ready-to-send email in the app you use, or reach us directly below. We reply within one business day.
            </p>

            <ul id="schedule" className="mt-10 scroll-mt-28 border-t border-graphite/60">
              {[
                { icon: Mail, label: "Email us", value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with the team", href: WHATSAPP, external: true },
                { icon: CalendarDays, label: "Book a call", value: "Mention a time in your message and we'll send an invite", href: `mailto:${EMAIL}?subject=${encodeURIComponent("Book a call")}` },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="contact-reveal border-b border-graphite/60">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-graphite text-edge-stone transition-colors duration-500 group-hover:border-edge-stone">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-concrete">{label}</span>
                      <span className="mt-1 block font-display text-lg text-white">{value}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="text-concrete transition-[translate,color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form, then the send step */}
          <div className="contact-card rounded-2xl border border-graphite/60 bg-black-depth p-6 sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {!ready ? (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    <Field label="Name" required error={errors.name}>
                      <input value={form.name} onChange={update("name")} autoComplete="name" placeholder="Your full name" className={inputClass} />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input type="email" value={form.email} onChange={update("email")} autoComplete="email" placeholder="you@brand.com" className={inputClass} />
                    </Field>
                    <Field label="Phone">
                      <input type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" placeholder="+91" className={inputClass} />
                    </Field>
                    <Field label="Company">
                      <input value={form.company} onChange={update("company")} autoComplete="organization" placeholder="Brand or company" className={inputClass} />
                    </Field>
                  </div>

                  <div className="mt-3">
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-concrete">Services</span>
                    <ServicePicker value={form.services} onChange={(services) => setForm((f) => ({ ...f, services }))} />
                    <span className="mt-1.5 block text-xs text-concrete">Pick as many as you like.</span>
                  </div>

                  <div className="mt-7">
                    <Field label="Project details" required error={errors.message}>
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        rows={4}
                        placeholder="Goals, timelines, links, anything useful"
                        className={cn(inputClass, "resize-none leading-relaxed")}
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="group mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white text-edge-black transition-[gap] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:gap-5 sm:w-auto sm:px-8"
                  >
                    <span className="font-display text-lg">Continue to email</span>
                    <ArrowRight size={18} strokeWidth={1.75} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="send"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-edge-stone">Your email is ready</p>
                  <h2 className="mt-3 font-display text-[clamp(1.8rem,2.2vw,2.4rem)] leading-tight text-white">Choose how to send it</h2>
                  <p className="mt-3 max-w-[30rem] text-[15px] leading-relaxed text-concrete">
                    We&apos;ll open a new message with your details filled in. Just press send.
                  </p>

                  <dl className="mt-7 space-y-2 rounded-xl border border-graphite/60 p-5 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 text-concrete">To</dt>
                      <dd className="text-white">{EMAIL}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 text-concrete">Subject</dt>
                      <dd className="text-white">{subject}</dd>
                    </div>
                  </dl>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                    {sendOptions(form).map((opt) => (
                      <li key={opt.label}>
                        <a
                          href={opt.href}
                          target={opt.external ? "_blank" : undefined}
                          rel={opt.external ? "noopener noreferrer" : undefined}
                          className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-graphite/60 p-5 transition-colors duration-500 hover:border-edge-stone"
                        >
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="self-end text-concrete transition-[translate,color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-edge-stone"
                          />
                          <span>
                            <span className="block font-display text-xl text-white">{opt.label}</span>
                            <span className="mt-1 block text-xs text-concrete">{opt.note}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setReady(false)}
                    className="mt-7 flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-concrete transition-colors duration-500 hover:text-white"
                  >
                    <ArrowLeft size={14} strokeWidth={1.75} />
                    Edit details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
