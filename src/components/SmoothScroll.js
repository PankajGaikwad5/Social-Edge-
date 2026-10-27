"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Keeps GSAP ScrollTrigger in step with Lenis' smoothed scroll position
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  const pathname = usePathname();

  // The footer lives in the layout and survives page changes, so its scroll reveals keep the trigger
  // positions measured on the previous page. Re-measure after every navigation and whenever the page
  // height changes (images, fonts, expanding sections), or those reveals can sit unplayed and invisible.
  useEffect(() => {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    refresh();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
