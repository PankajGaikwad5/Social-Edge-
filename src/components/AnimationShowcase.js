"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Compass, 
  Video, 
  LayoutGrid, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function AnimationShowcase() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".brand-badge", {
        opacity: 0,
        y: -16,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".brand-title", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".brand-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const stoneScale = [
    { label: "100", hex: "#A5947C", bg: "bg-edge-stone", text: "text-white" },
    { label: "80", hex: "#B7A996", bg: "bg-edge-stone-80", text: "text-white" },
    { label: "60", hex: "#C9BEB0", bg: "bg-edge-stone-60", text: "text-edge-black" },
    { label: "40", hex: "#DBD4CB", bg: "bg-edge-stone-40", text: "text-edge-black" },
    { label: "20", hex: "#EDEAE5", bg: "bg-edge-stone-20", text: "text-edge-black" },
  ];

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-edge-black text-soft-ivory selection:bg-edge-stone selection:text-edge-black font-sans antialiased"
    >
      {/* Top Brand Bar */}
      <header className="border-b border-graphite/30 backdrop-blur-md sticky top-0 z-50 bg-edge-black/90">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-edge-stone flex items-center justify-center bg-edge-black">
              <div className="w-2.5 h-2.5 rounded-full bg-edge-stone" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">
                SOCIAL EDGE
              </span>
              <span className="ml-2 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-graphite text-concrete">
                Design System v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-concrete">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-status-positive">
              <span className="w-1.5 h-1.5 rounded-full bg-status-positive" /> Active Brand Specification
            </span>
            <span className="text-edge-stone">80 / 15 / 5 Compliant</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 space-y-20">
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="brand-badge inline-flex items-center gap-2 px-3 py-1 rounded border border-edge-stone/40 bg-edge-stone/10 text-xs text-edge-stone font-mono uppercase tracking-wider mb-6">
            <span>BRAND DIRECTIVE</span>
          </div>

          <h1 className="brand-title text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            Most of the brand should feel monochrome.
          </h1>

          <p className="mt-5 text-concrete text-lg leading-relaxed font-light">
            Social Edge relies on high contrast, tactile depth, and strict chromatic discipline. Edge Stone is applied with extreme restraint (5%) as a signature focal point.
          </p>

          {/* Ratio bar */}
          <div className="mt-8 pt-6 border-t border-graphite/30">
            <div className="text-xs font-mono uppercase tracking-wider text-concrete mb-3 flex justify-between">
              <span>The 80 / 15 / 5 Rule</span>
              <span className="text-edge-stone">Visual Distribution</span>
            </div>
            <div className="w-full h-8 rounded overflow-hidden flex border border-graphite/40 text-xs font-mono">
              <div className="w-[80%] bg-edge-black flex items-center justify-center text-white border-r border-graphite/40 font-semibold">
                80% Core (Monochrome)
              </div>
              <div className="w-[15%] bg-graphite flex items-center justify-center text-soft-ivory border-r border-graphite/40 text-[11px]">
                15% Grey
              </div>
              <div className="w-[5%] bg-edge-stone flex items-center justify-center text-edge-black font-bold text-[10px]">
                5%
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-concrete">
              <span>Edge Black / White / Soft Ivory</span>
              <span>Graphite / Concrete / Mist / Paper</span>
              <span className="text-edge-stone">Edge Stone</span>
            </div>
          </div>
        </div>

        {/* Section 1: The Palette */}
        <section className="space-y-8">
          <div className="border-b border-graphite/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">The Palette</h2>
            <p className="text-xs font-mono text-concrete mt-1">PRIMARY / SECONDARY / UTILITY</p>
          </div>

          {/* Primary Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="brand-card p-5 rounded border border-graphite/40 bg-edge-black flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-edge-black border border-graphite/40" />
              <div>
                <p className="text-sm font-semibold text-white">EDGE BLACK</p>
                <p className="text-xs font-mono text-concrete">#090909</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-graphite/40 bg-edge-black flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-white" />
              <div>
                <p className="text-sm font-semibold text-white">WHITE</p>
                <p className="text-xs font-mono text-concrete">#FFFFFF</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-graphite/40 bg-edge-black flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-soft-ivory" />
              <div>
                <p className="text-sm font-semibold text-white">SOFT IVORY</p>
                <p className="text-xs font-mono text-concrete">#F4F3EF</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-edge-stone/50 bg-edge-black flex flex-col justify-between h-44 relative">
              <span className="absolute top-3 right-3 text-[10px] font-mono text-edge-stone bg-edge-stone/10 border border-edge-stone/30 px-1.5 py-0.5 rounded">
                5% SIGNATURE
              </span>
              <div className="w-full h-16 rounded bg-edge-stone" />
              <div>
                <p className="text-sm font-semibold text-edge-stone">EDGE STONE</p>
                <p className="text-xs font-mono text-edge-stone/80">#A5947C</p>
              </div>
            </div>
          </div>

          {/* Secondary Greys */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-concrete mb-3">SECONDARY GREYS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-12 rounded bg-graphite mb-3" />
                <p className="text-xs font-semibold text-white">GRAPHITE</p>
                <p className="text-[11px] font-mono text-concrete">#4D4D4D</p>
              </div>

              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-12 rounded bg-concrete mb-3" />
                <p className="text-xs font-semibold text-white">CONCRETE</p>
                <p className="text-[11px] font-mono text-concrete">#848484</p>
              </div>

              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-12 rounded bg-mist mb-3" />
                <p className="text-xs font-semibold text-white">MIST</p>
                <p className="text-[11px] font-mono text-concrete">#C9C9C7</p>
              </div>

              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-12 rounded bg-paper mb-3" />
                <p className="text-xs font-semibold text-white">PAPER</p>
                <p className="text-[11px] font-mono text-concrete">#E8E7E3</p>
              </div>
            </div>
          </div>

          {/* Functional Swatches */}
          <div className="p-6 rounded border border-graphite/30 bg-black-depth">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-concrete">FUNCTIONAL ONLY</h3>
              <p className="text-xs text-concrete italic">
                Functional colours communicate meaning. They never become decorative brand colours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded border border-graphite/30 bg-edge-black">
                <div className="w-8 h-8 rounded bg-status-positive shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">POSITIVE</p>
                  <p className="text-[11px] font-mono text-concrete">#18B86A</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-graphite/30 bg-edge-black">
                <div className="w-8 h-8 rounded bg-status-negative shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">NEGATIVE</p>
                  <p className="text-[11px] font-mono text-concrete">#F04444</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-graphite/30 bg-edge-black">
                <div className="w-8 h-8 rounded bg-status-warning shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">WARNING</p>
                  <p className="text-[11px] font-mono text-concrete">#D89A38</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Shades + Gradients */}
        <section className="space-y-8">
          <div className="border-b border-graphite/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Shades + Gradients</h2>
            <p className="text-xs font-mono text-concrete mt-1">EDGE STONE SCALE & APPROVED GRADIENTS</p>
          </div>

          {/* Stone Scale */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-concrete mb-3">EDGE STONE SCALE</h3>
            <div className="grid grid-cols-5 gap-3">
              {stoneScale.map((step) => (
                <div key={step.label} className="text-center">
                  <div className={`w-full h-16 sm:h-20 rounded ${step.bg} border border-graphite/40 mb-2 flex items-center justify-center font-bold text-xs ${step.text}`}>
                    {step.label}
                  </div>
                  <span className="text-[11px] font-mono text-concrete">{step.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approved Gradients */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-concrete">APPROVED GRADIENTS (135°)</h3>
              <p className="text-xs text-concrete italic">
                They should feel like light, depth or material. Never use gradients just because a layout feels empty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-24 rounded border border-graphite/40 mb-3 bg-black-depth" />
                <p className="text-xs font-semibold text-white">BLACK DEPTH / 135°</p>
                <p className="text-[11px] font-mono text-concrete">#090909 → #1A1A1A</p>
              </div>

              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-24 rounded border border-graphite/40 mb-3 bg-warm-stone" />
                <p className="text-xs font-semibold text-white">WARM STONE / 135°</p>
                <p className="text-[11px] font-mono text-concrete">#A5947C → #C9BEB0</p>
              </div>

              <div className="brand-card p-4 rounded border border-graphite/30 bg-edge-black">
                <div className="w-full h-24 rounded border border-graphite/40 mb-3 bg-ivory-fade" />
                <p className="text-xs font-semibold text-white">IVORY FADE / 135°</p>
                <p className="text-[11px] font-mono text-concrete">#FFFFFF → #F4F3EF</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Iconography */}
        <section className="space-y-6">
          <div className="border-b border-graphite/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Iconography</h2>
            <p className="text-xs font-mono text-concrete mt-1">ONE FAMILY / ONE WEIGHT — OUTLINE FIRST</p>
          </div>

          <div className="p-6 rounded border border-graphite/30 bg-black-depth">
            <p className="text-sm text-soft-ivory leading-relaxed mb-6">
              Icons are functional, not illustrative. Use simple geometric outline icons with a consistent <strong className="text-white">1.5–2 px visual stroke</strong>.
            </p>

            {/* Geometric Outline Examples */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-6 rounded border border-graphite/40 bg-edge-black flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-graphite flex items-center justify-center mb-3">
                  <Compass className="w-6 h-6 text-edge-stone" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-concrete">STRATEGY</span>
              </div>

              <div className="p-6 rounded border border-graphite/40 bg-edge-black flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-graphite flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-concrete">VIDEO</span>
              </div>

              <div className="p-6 rounded border border-graphite/40 bg-edge-black flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-graphite flex items-center justify-center mb-3">
                  <LayoutGrid className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-concrete">DESIGN</span>
              </div>

              <div className="p-6 rounded border border-graphite/40 bg-edge-black flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-graphite flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-edge-stone" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-concrete">ANALYTICS</span>
              </div>
            </div>

            {/* Rules Do / Don't */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-graphite/30 text-xs">
              <div className="p-4 rounded border border-status-negative/30 bg-status-negative/5">
                <span className="font-mono text-status-negative font-bold block mb-1">DON&apos;T MIX</span>
                <p className="text-concrete">
                  Filled icons + outline icons + emoji + hand-drawn symbols in the same system.
                </p>
              </div>

              <div className="p-4 rounded border border-status-positive/30 bg-status-positive/5">
                <span className="font-mono text-status-positive font-bold block mb-1">DO</span>
                <p className="text-concrete">
                  Choose one icon family per platform and keep size, weight, and optical alignment consistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Test Button */}
        <section className="pt-6 border-t border-graphite/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Ready for any AI agent or team member</p>
            <p className="text-xs text-concrete">See BRAND_GUIDELINES.md in the root directory for full details.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded px-5 py-2.5 bg-edge-stone text-edge-black font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-edge-stone-80 transition-colors"
          >
            <span>Verified Brand System</span>
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
          </motion.button>
        </section>
      </main>

      <footer className="border-t border-graphite/30 py-8 text-center text-xs font-mono text-concrete">
        Social Edge Brand System • 80% Core • 15% Structure • 5% Signature
      </footer>
    </div>
  );
}
