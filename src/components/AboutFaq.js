"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Same even, rounded curve as the office rows on the home page
const EASE_GLIDE = "ease-[cubic-bezier(0.45,0,0.2,1)]";

// Draft answers: confirm the wording before launch
const FAQS = [
  {
    q: "Which industries do you work with?",
    a: "Fashion, jewellery, beauty, hospitality, real estate, D2C and B2B tech, among others. If your customers are online, we can reach them.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We work with founder-led brands from launch, with scopes that grow as you do.",
  },
  {
    q: "How is pricing structured?",
    a: "Monthly retainers built around the services you need, plus fixed-fee projects for launches, shoots and websites. You get a clear proposal before anything starts.",
  },
  {
    q: "How do we get started?",
    a: "Tell us about your brand and goals through the contact form or WhatsApp. We set up a call within one business day and send a proposal after it.",
  },
];

export default function AboutFaq() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-line-inner", {
          yPercent: 112,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".faq-heading", start: "top 85%", once: true },
        });

        gsap.from(".faq-item", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-edge-black px-6 py-20 lg:px-10 lg:py-22">
      <div className="mx-auto grid max-w-372 gap-10 lg:grid-cols-2 lg:gap-20">
        <h2 className="faq-heading font-display text-[clamp(2.6rem,3.4vw,4rem)] leading-[1.02] text-white">
          {["Common", "questions"].map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.12em]">
              <span className="faq-line-inner block">{line}</span>
            </span>
          ))}
        </h2>

        <ul className="faq-list border-t border-graphite/60">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={item.q} className="faq-item border-b border-graphite/60 ">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group cursor-pointer flex w-full items-center justify-between gap-6 py-6.5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[clamp(1.2rem,1.15vw,1.4rem)] leading-snug transition-colors duration-500 ",
                        isOpen ? "text-edge-stone-60" : "text-white group-hover:text-edge-stone-60"
                      )}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden
                      className={cn(
                        "shrink-0 text-edge-stone transition-transform duration-500",
                        EASE_GLIDE,
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={id}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500",
                    EASE_GLIDE,
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "max-w-[36rem] pb-7 text-[15px] leading-relaxed text-concrete transition-[opacity,transform] duration-500",
                        EASE_GLIDE,
                        isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1 opacity-0"
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
    </section>
  );
}
