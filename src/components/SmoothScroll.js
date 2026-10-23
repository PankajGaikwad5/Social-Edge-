"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
