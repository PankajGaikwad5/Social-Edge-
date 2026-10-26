# Social Edge site: agent handoff guide

Read this together with `AGENTS.md` and `BRAND_GUIDELINES.md` before touching anything. It covers what exists, how it is built, the rules the owner enforces, and the traps already hit.

## 1. Stack

- Next.js 16 App Router (APIs differ from older versions: check `node_modules/next/dist/docs/` first), React 19, plain JavaScript.
- Tailwind CSS v4 (`@theme inline` in `src/app/globals.css`, no tailwind.config).
- Animation: GSAP 3 with `ScrollTrigger` and `SplitText` via `@gsap/react` `useGSAP`; framer-motion in a few places (home hero, tab and panel fades).
- Smooth scroll: Lenis (`lenis/react`), synced to ScrollTrigger in `src/components/SmoothScroll.js`.
- Icons: `lucide-react` only, outline, `strokeWidth` 1.5–2. lucide 1.x has no brand logos; social icons are hand-drawn outline SVGs in `Footer.js`.
- Fonts: Glacial Indifference (`font-display`, headings) and Poppins (`font-sans`, body), set in `src/app/layout.js`.

## 2. Owner preferences (enforced, read carefully)

1. **Brand guidelines win over references.** Palette (Edge Black / White / Soft Ivory core, greys for structure, Edge Stone accent sparingly), status colours only for status, approved 135° gradients only (`bg-black-depth`, `bg-warm-stone`, `bg-ivory-fade`), outline icons only. When rebuilding a reference screenshot, swap its off-brand colours for brand tokens and say so.
2. **Explicit exceptions:** the owner asked for the reference's multi-colour look on the About "What we stand for" cards (`AboutValues.js`). The Work "Work by service" gradient cards (`WorkServices.js`) use the same treatment but have not been explicitly confirmed. Do not "fix" either back to brand colours; do not extend the exception elsewhere without asking.
3. **Match references closely.** Measure the reference (sizes, spacing, line heights, alignment). Use the copy they give exactly; do not invent extra items (e.g. they wanted exactly two footer phrases).
4. **Animation: "subtle, smooth, spacious", not slow and not jumpy.**
   - Hovers: about 0.4–0.6s, curve `cubic-bezier(0.4,0,0.2,1)` (soft start, gentle landing). Avoid strong ease-out curves on size/position changes; they read as a jump.
   - Colour changes: cross-fade opacity between stacked layers rather than animating hue on moving elements.
   - Accordions/expanders: animate `grid-template-rows` 0fr→1fr with `cubic-bezier(0.45,0,0.2,1)`.
   - When asked to make something smoother, adjust timing/curves. **Never remove the effect itself.**
5. **Communication:** short updates, no wasted tokens, be honest about what was and was not verified.

## 3. Pages and sections

| Route | File | Sections (components, in order) |
|---|---|---|
| `/` | `src/app/page.js` | `Hero` → `ServicesMarquee` → `WhyChooseUs` → `WhatWeDo` → `CaseStudies` → `Testimonials` → `Partners` |
| `/about` | `src/app/about/page.js` | `AboutHero` → `AboutStats` → `AboutValues` → `AboutVision` → `AboutTeam` → `AboutFaq` → `AboutMore` |
| `/work` | `src/app/work/page.js` | `WorkHero` → `WorkCases` → `WorkServices` → `WorkIndustries` → `WorkStudio` |
| all | `src/app/layout.js` | `Navbar`, page, `Footer` (which renders `SayHello` first) inside `SmoothScroll` |

Notes on the trickier ones:
- **`Hero.js`**: desktop is a pinned scroll sequence (`lib/heroTimeline.js` holds the steps): media wall → centre film tile expands into a full-screen showreel (`ShowreelFilm.js`). Below `lg` a separate `MobileHero` renders (drifting photo wall, copy, showreel card). Don't merge them.
- **`WhatWeDo.js`**: service tiles with a GSAP hover that cycles three count-up stats; phones get a swipe row.
- **`SayHello.js`**: headline words flip colour/skew on hover; office rows open on hover with a hover-intent delay.
- **`Footer.js`**: SplitText flip between "let's build something." and "moves culture." (exactly two phrases).
- **`AboutMore.js`**: overview, at-a-glance cards, 01/02/03 pills that smooth-scroll (Lenis) to three chapter sections below and highlight on scroll, outline-text marquee.
- **`WorkIndustries.js`**: flex accordion; hovered panel grows and plays a video (only the open panel mounts its `<video>`).

## 4. Shared building blocks

- `components/Magnetic.js`: wrapper that eases a button toward the cursor; mark inner parts with `data-magnetic-inner` to drift slightly further. Used on Start a project, Work with us, Start yours, Join our team.
- `components/Typewriter.js`: `<Typewriter words={[...]} />` (home hero, Work hero).
- `lib/marquee.js`: `leftwardMarquee(track, { trigger, duration })` for a track holding two identical rows; scroll boosts speed, hover pauses. Returns a cleanup.
- `lib/contact.js`: email, WhatsApp, calendar link, socials (single source, used by Say Hello and Footer).
- Recurring patterns: eyebrow label with a stone dot; masked headline lines that rise in (`overflow-hidden` wrapper + inner `yPercent` tween); button underline swap; breadcrumb row on inner pages.

## 5. Theming (light/dark)

- `globals.css` defines raw values (`--ink`, `--snow`, …) and **theme roles**. In light theme `edge-black`↔canvas and `white`↔ink swap, greys swap, `bg-black-depth` becomes a light gradient. Components mostly need no theme-specific classes.
- Theme = system preference until the user clicks the navbar toggle; choice saved in `localStorage("theme")` and applied pre-paint by an inline script in `layout.js`.
- `.surface-dark` pins an area to dark roles in both themes (photo/video cards, showreel, service tiles, values cards).
- Use `text-ink` / `bg-snow` for colours that must not swap (e.g. dark text on stone buttons).
- `.logo-adaptive` inverts the white logo in light theme.

## 6. Known traps (already hit)

- **A broken rule in `globals.css` silently drops every rule after it.** A nested `@utility` (`&::-webkit-scrollbar`) did this once. After editing globals, confirm the new class actually reaches the compiled CSS. Plain classes + separate pseudo rules are safest.
- A new `.service-gradient` rule with per-card `--c-*` variables never reached the compiled CSS; per-element gradients are now set inline via `style={{ backgroundImage }}`. Prefer inline styles for per-item dynamic gradients.
- **Don't let a GSAP scroll reveal and a CSS hover animate the same property on the same element.** Put the reveal on a wrapper (`li`) and the hover on the inner element, or `clearProps` after the reveal.
- **Lenis overrides native scrolling.** Use `lenis.scrollTo(absoluteY)` (computed from `getBoundingClientRect().top + scrollY - navOffset`); passing the element with an offset overshot. In Playwright, scroll with `mouse.wheel`, not `window.scrollTo`.
- Tall-ascender headlines need `pb-[0.06em]`+ on masked lines or descenders clip; avoid descender words on the first line of tightly leaded headlines.
- Next `<img>` lint warnings are expected (stock remote images); not errors.

## 7. Verifying work

- `npx eslint src` (warnings for `<img>` are fine) and `npx next build`.
- The owner usually has `next dev` running on `http://localhost:3000`; don't start another on the same port.
- Visual checks: Playwright (`playwright-core`) driving installed Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`, 1920×1000 and 375×812, both colour schemes. Keep screenshots and scripts outside the repo.
- Check mobile for horizontal overflow (`document.documentElement.scrollWidth === innerWidth`).

## 8. Placeholder content to replace before launch

- All stats, testimonials, case studies, client names (several are from the Sage Media reference, i.e. not Social Edge clients), office addresses/phones, email, WhatsApp number, social URLs (`lib/contact.js`).
- Stock media: Unsplash photos, Mixkit videos, and the About hero video (currently a Sage Media URL, `AboutHero.js` `FILM_SRC`).
- Market figures in `WorkIndustries.js` are unsourced.
- Partner logos are icon stand-ins (`Partners.js`).
- Draft copy: FAQ answers, story/mission/vision text, at-a-glance numbers.

## 9. Not built yet (links point here)

`/services` and `/services/*`, `/work/<slug>`, `/work/industries/<slug>`, `/blog`, `/locations`, `/career` (+ `/career/freelance`, `/career/full-time`), `/contact` (incl. `#schedule`), `/terms`, `/privacy`. The navbar search panel UI exists; the owner has been editing `Navbar.js` directly, so check its current state before changing it. Nothing has been committed yet; commit only when the owner asks.
