"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

/*
 * Leans its child toward the cursor and settles back on leave.
 * The wrapper pads the hit area, so the pull starts just before the cursor reaches the button.
 * Children marked data-magnetic-inner travel a bit further, so parts of the button drift apart slightly.
 */
export default function Magnetic({ children, strength = 0.15, className }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;

      const inner = el.querySelectorAll("[data-magnetic-inner]");

      const onMove = (e) => {
        const box = el.getBoundingClientRect();
        const dx = e.clientX - box.left - box.width / 2;
        const dy = e.clientY - box.top - box.height / 2;
        gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.7, ease: "power3.out", overwrite: "auto" });
        gsap.to(inner, { x: dx * strength * 0.5, y: dy * strength * 0.5, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      };

      const onLeave = () => {
        gsap.to([el, ...inner], { x: 0, y: 0, duration: 0.9, ease: "power3.out", overwrite: "auto" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("-m-5 w-fit p-5", className)}>
      {children}
    </div>
  );
}
