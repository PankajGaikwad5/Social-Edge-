import { cn } from "@/lib/utils";

// Paper cover shared by blog cards and the service-guide article chapter. Parents animate .cover-blob on hover
export default function BlogCover({ post, className, titleClassName = "text-[clamp(1.2rem,1.45vw,1.6rem)]", glyphClassName = "text-[11rem]" }) {
  return (
    <div
      style={{
        backgroundColor: "#F4F3EF",
        backgroundImage:
          "linear-gradient(rgba(9,9,9,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,9,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
      className={cn("relative flex aspect-[1.75] flex-col justify-between overflow-hidden rounded-2xl px-6 pb-5 pt-5 text-ink", className)}
    >
      <span aria-hidden className="cover-blob pointer-events-none absolute left-[18%] top-[30%] aspect-square w-[45%] rounded-full bg-edge-stone-60/70 blur-3xl" />
      <span aria-hidden className={cn("pointer-events-none absolute -bottom-[0.3em] right-4 font-display leading-none text-edge-stone/15", glyphClassName)}>
        S
      </span>

      <span className="relative flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.22em] text-ink/55">
        <span className="flex items-center gap-2">
          <span className="h-px w-5 bg-ink/40" />
          {post.category}
        </span>
        <span className="normal-case tracking-[0.08em] text-ink/75">No. {post.no}</span>
      </span>

      <span className="relative">
        <span className={cn("block max-w-[22ch] font-display leading-[1.15]", titleClassName)}>{post.title}</span>
        <span className="mt-3 flex justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-ink/45">
          <span>Social Edge · Blog</span>
          <span>{post.read}</span>
        </span>
      </span>
    </div>
  );
}
