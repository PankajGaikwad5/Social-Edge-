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
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  ShieldAlert,
  Info
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
    { label: "100", hex: "#A5947C", bg: "bg-[#A5947C]", text: "text-white" },
    { label: "80", hex: "#B7A996", bg: "bg-[#B7A996]", text: "text-white" },
    { label: "60", hex: "#C9BEB0", bg: "bg-[#C9BEB0]", text: "text-[#090909]" },
    { label: "40", hex: "#DBD4CB", bg: "bg-[#DBD4CB]", text: "text-[#090909]" },
    { label: "20", hex: "#EDEAE5", bg: "bg-[#EDEAE5]", text: "text-[#090909]" },
  ];

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#090909] text-[#F4F3EF] selection:bg-[#A5947C] selection:text-[#090909] font-sans antialiased"
    >
      {/* Top Brand Bar */}
      <header className="border-b border-[#4D4D4D]/30 backdrop-blur-md sticky top-0 z-50 bg-[#090909]/90">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-[#A5947C] flex items-center justify-center bg-[#090909]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#A5947C]" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">
                SOCIAL EDGE
              </span>
              <span className="ml-2 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-[#4D4D4D] text-[#848484]">
                Design System v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#848484]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#18B86A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B86A]" /> Active Brand Specification
            </span>
            <span className="text-[#A5947C]">80 / 15 / 5 Compliant</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 space-y-20">
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="brand-badge inline-flex items-center gap-2 px-3 py-1 rounded border border-[#A5947C]/40 bg-[#A5947C]/10 text-xs text-[#A5947C] font-mono uppercase tracking-wider mb-6">
            <span>BRAND DIRECTIVE</span>
          </div>

          <h1 className="brand-title text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            Most of the brand should feel monochrome.
          </h1>

          <p className="mt-5 text-[#848484] text-lg leading-relaxed font-light">
            Social Edge relies on high contrast, tactile depth, and strict chromatic discipline. Edge Stone is applied with extreme restraint (5%) as a signature focal point.
          </p>

          {/* Ratio bar */}
          <div className="mt-8 pt-6 border-t border-[#4D4D4D]/30">
            <div className="text-xs font-mono uppercase tracking-wider text-[#848484] mb-3 flex justify-between">
              <span>The 80 / 15 / 5 Rule</span>
              <span className="text-[#A5947C]">Visual Distribution</span>
            </div>
            <div className="w-full h-8 rounded overflow-hidden flex border border-[#4D4D4D]/40 text-xs font-mono">
              <div className="w-[80%] bg-[#1A1A1A] flex items-center justify-center text-white border-r border-[#4D4D4D]/40 font-semibold">
                80% Core (Monochrome)
              </div>
              <div className="w-[15%] bg-[#4D4D4D] flex items-center justify-center text-[#F4F3EF] border-r border-[#4D4D4D]/40 text-[11px]">
                15% Grey
              </div>
              <div className="w-[5%] bg-[#A5947C] flex items-center justify-center text-[#090909] font-bold text-[10px]">
                5%
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-[#848484]">
              <span>Edge Black / White / Soft Ivory</span>
              <span>Graphite / Concrete / Mist / Paper</span>
              <span className="text-[#A5947C]">Edge Stone</span>
            </div>
          </div>
        </div>

        {/* Section 1: The Palette */}
        <section className="space-y-8">
          <div className="border-b border-[#4D4D4D]/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">The Palette</h2>
            <p className="text-xs font-mono text-[#848484] mt-1">PRIMARY / SECONDARY / UTILITY</p>
          </div>

          {/* Primary Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="brand-card p-5 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-[#090909] border border-[#4D4D4D]/40" />
              <div>
                <p className="text-sm font-semibold text-white">EDGE BLACK</p>
                <p className="text-xs font-mono text-[#848484]">#090909</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-[#FFFFFF]" />
              <div>
                <p className="text-sm font-semibold text-white">WHITE</p>
                <p className="text-xs font-mono text-[#848484]">#FFFFFF</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col justify-between h-44">
              <div className="w-full h-16 rounded bg-[#F4F3EF]" />
              <div>
                <p className="text-sm font-semibold text-white">SOFT IVORY</p>
                <p className="text-xs font-mono text-[#848484]">#F4F3EF</p>
              </div>
            </div>

            <div className="brand-card p-5 rounded border border-[#A5947C]/50 bg-[#090909] flex flex-col justify-between h-44 relative">
              <span className="absolute top-3 right-3 text-[10px] font-mono text-[#A5947C] bg-[#A5947C]/10 border border-[#A5947C]/30 px-1.5 py-0.5 rounded">
                5% SIGNATURE
              </span>
              <div className="w-full h-16 rounded bg-[#A5947C]" />
              <div>
                <p className="text-sm font-semibold text-[#A5947C]">EDGE STONE</p>
                <p className="text-xs font-mono text-[#A5947C]/80">#A5947C</p>
              </div>
            </div>
          </div>

          {/* Secondary Greys */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#848484] mb-3">SECONDARY GREYS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-full h-12 rounded bg-[#4D4D4D] mb-3" />
                <p className="text-xs font-semibold text-white">GRAPHITE</p>
                <p className="text-[11px] font-mono text-[#848484]">#4D4D4D</p>
              </div>

              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-full h-12 rounded bg-[#848484] mb-3" />
                <p className="text-xs font-semibold text-white">CONCRETE</p>
                <p className="text-[11px] font-mono text-[#848484]">#848484</p>
              </div>

              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-full h-12 rounded bg-[#C9C9C7] mb-3" />
                <p className="text-xs font-semibold text-white">MIST</p>
                <p className="text-[11px] font-mono text-[#848484]">#C9C9C7</p>
              </div>

              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-full h-12 rounded bg-[#E8E7E3] mb-3" />
                <p className="text-xs font-semibold text-white">PAPER</p>
                <p className="text-[11px] font-mono text-[#848484]">#E8E7E3</p>
              </div>
            </div>
          </div>

          {/* Functional Swatches */}
          <div className="p-6 rounded border border-[#4D4D4D]/30 bg-[#121212]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#848484]">FUNCTIONAL ONLY</h3>
              <p className="text-xs text-[#848484] italic">
                Functional colours communicate meaning. They never become decorative brand colours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-8 h-8 rounded bg-[#18B86A] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">POSITIVE</p>
                  <p className="text-[11px] font-mono text-[#848484]">#18B86A</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-8 h-8 rounded bg-[#F04444] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">NEGATIVE</p>
                  <p className="text-[11px] font-mono text-[#848484]">#F04444</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div className="w-8 h-8 rounded bg-[#D89A38] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">WARNING</p>
                  <p className="text-[11px] font-mono text-[#848484]">#D89A38</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Shades + Gradients */}
        <section className="space-y-8">
          <div className="border-b border-[#4D4D4D]/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Shades + Gradients</h2>
            <p className="text-xs font-mono text-[#848484] mt-1">EDGE STONE SCALE & APPROVED GRADIENTS</p>
          </div>

          {/* Stone Scale */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#848484] mb-3">EDGE STONE SCALE</h3>
            <div className="grid grid-cols-5 gap-3">
              {stoneScale.map((step) => (
                <div key={step.label} className="text-center">
                  <div className={`w-full h-16 sm:h-20 rounded ${step.bg} border border-[#4D4D4D]/40 mb-2 flex items-center justify-center font-bold text-xs ${step.text}`}>
                    {step.label}
                  </div>
                  <span className="text-[11px] font-mono text-[#848484]">{step.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approved Gradients */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#848484]">APPROVED GRADIENTS (135°)</h3>
              <p className="text-xs text-[#848484] italic">
                They should feel like light, depth or material. Never use gradients just because a layout feels empty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div 
                  className="w-full h-24 rounded border border-[#4D4D4D]/40 mb-3"
                  style={{ background: "linear-gradient(135deg, #090909 0%, #242424 100%)" }}
                />
                <p className="text-xs font-semibold text-white">BLACK DEPTH / 135°</p>
                <p className="text-[11px] font-mono text-[#848484]">#090909 → #242424</p>
              </div>

              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div 
                  className="w-full h-24 rounded border border-[#4D4D4D]/40 mb-3"
                  style={{ background: "linear-gradient(135deg, #A5947C 0%, #C9BEB0 100%)" }}
                />
                <p className="text-xs font-semibold text-white">WARM STONE / 135°</p>
                <p className="text-[11px] font-mono text-[#848484]">#A5947C → #C9BEB0</p>
              </div>

              <div className="brand-card p-4 rounded border border-[#4D4D4D]/30 bg-[#090909]">
                <div 
                  className="w-full h-24 rounded border border-[#4D4D4D]/40 mb-3"
                  style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #EDEAE5 100%)" }}
                />
                <p className="text-xs font-semibold text-white">IVORY FADE / 135°</p>
                <p className="text-[11px] font-mono text-[#848484]">#FFFFFF → #EDEAE5</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Iconography */}
        <section className="space-y-6">
          <div className="border-b border-[#4D4D4D]/40 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Iconography</h2>
            <p className="text-xs font-mono text-[#848484] mt-1">ONE FAMILY / ONE WEIGHT — OUTLINE FIRST</p>
          </div>

          <div className="p-6 rounded border border-[#4D4D4D]/30 bg-[#121212]">
            <p className="text-sm text-[#F4F3EF] leading-relaxed mb-6">
              Icons are functional, not illustrative. Use simple geometric outline icons with a consistent <strong className="text-white">1.5–2 px visual stroke</strong>.
            </p>

            {/* Geometric Outline Examples */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-6 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-[#4D4D4D] flex items-center justify-center mb-3">
                  <Compass className="w-6 h-6 text-[#A5947C]" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-[#848484]">STRATEGY</span>
              </div>

              <div className="p-6 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-[#4D4D4D] flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-[#848484]">VIDEO</span>
              </div>

              <div className="p-6 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-[#4D4D4D] flex items-center justify-center mb-3">
                  <LayoutGrid className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-[#848484]">DESIGN</span>
              </div>

              <div className="p-6 rounded border border-[#4D4D4D]/40 bg-[#090909] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded border border-[#4D4D4D] flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-[#A5947C]" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-mono tracking-wider uppercase text-[#848484]">ANALYTICS</span>
              </div>
            </div>

            {/* Rules Do / Don't */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#4D4D4D]/30 text-xs">
              <div className="p-4 rounded border border-[#F04444]/30 bg-[#F04444]/5">
                <span className="font-mono text-[#F04444] font-bold block mb-1">DON&apos;T MIX</span>
                <p className="text-[#848484]">
                  Filled icons + outline icons + emoji + hand-drawn symbols in the same system.
                </p>
              </div>

              <div className="p-4 rounded border border-[#18B86A]/30 bg-[#18B86A]/5">
                <span className="font-mono text-[#18B86A] font-bold block mb-1">DO</span>
                <p className="text-[#848484]">
                  Choose one icon family per platform and keep size, weight, and optical alignment consistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Test Button */}
        <section className="pt-6 border-t border-[#4D4D4D]/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Ready for any AI agent or team member</p>
            <p className="text-xs text-[#848484]">See BRAND_GUIDELINES.md in the root directory for full details.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded px-5 py-2.5 bg-[#A5947C] text-[#090909] font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-[#B7A996] transition-colors"
          >
            <span>Verified Brand System</span>
            <CheckCircle2 className="w-4 h-4" />
          </motion.button>
        </section>
      </main>

      <footer className="border-t border-[#4D4D4D]/30 py-8 text-center text-xs font-mono text-[#848484]">
        Social Edge Brand System • 80% Core • 15% Structure • 5% Signature
      </footer>
    </div>
  );
}
