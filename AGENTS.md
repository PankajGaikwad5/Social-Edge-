<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Brand & Design System Rules (MANDATORY FOR ALL AGENTS)

Before generating or modifying any UI component or style, **YOU MUST READ AND ADHERE TO [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)**.

### Summary of Non-Negotiable Rules:
1. **The 80 / 15 / 5 Rule:**
   - **80% Core (Monochrome):** `Edge Black` (`#090909`), `White` (`#FFFFFF`), `Soft Ivory` (`#F4F3EF`).
   - **15% Structure:** Secondary greys: `Graphite` (`#4D4D4D`), `Concrete` (`#848484`), `Mist` (`#C9C9C7`), `Paper` (`#E8E7E3`).
   - **5% Signature:** `Edge Stone` (`#A5947C`) — **Used strictly with restraint**.
2. **Functional Colors are NOT Decorative:**
   - `Positive` (`#18B86A`), `Negative` (`#F04444`), and `Warning` (`#D89A38`) are strictly for status indicators, never decorative accents.
3. **Outline-First Iconography:**
   - Use `lucide-react` with 1.5–2px stroke weight.
   - **NEVER MIX** filled icons, outline icons, emojis, or hand-drawn icons in the same interface.
4. **Gradients (135°):**
   - Only use approved 135° gradients (`Black Depth`, `Warm Stone`, `Ivory Fade`) for light/depth/material — never to fill empty space.

---

# Project handoff

Before starting work, also read [AGENT_GUIDE.md](./AGENT_GUIDE.md): page map, shared components, owner preferences, theming and known traps.
