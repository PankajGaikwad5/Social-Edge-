import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreMore({ links }) {
  return (
    <section className="border-t border-graphite/50 bg-edge-black px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-372 flex-wrap items-center gap-x-8 gap-y-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-edge-stone">Explore more</p>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-center gap-1.5 border-b border-white/25 pb-1.5 font-display text-[clamp(1.05rem,1.2vw,1.3rem)] text-white transition-colors duration-500 hover:border-white"
          >
            {link.label}
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
