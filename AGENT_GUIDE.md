# Social Edge site: agent handoff guide

Read this together with `AGENTS.md` and `BRAND_GUIDELINES.md` before touching anything. It covers what exists, how it is built, the rules the owner enforces, and the traps already hit.

## 0. Where we left off (2026-10-27)

- Built the **Services mega menu** (desktop panel + phone drill-down), **every service page in the menu**, and **`/contact`** (form → opens a pre-filled email in the visitor's mail app). Navbar "Career" was replaced by "Contact".
- Fixed: footer **Say Hello sometimes rendered empty** after client-side navigation (stale ScrollTrigger positions). `SmoothScroll.js` now refreshes ScrollTrigger on every route change and page-height change.
- Nothing has been committed yet (owner commits when they ask).
- Likely next asks: per-service copy for the shared sections (they all reuse the Social Media Management copy), real hero copy where we invented it (Event Shoot, Project Shoot, Interviews & Testimonials), `/services` index, `/blog`, `/locations`, `/career`, case-study pages.

## 1. Stack

- Next.js 16 App Router (APIs differ from older versions: check `node_modules/next/dist/docs/` first), React 19, plain JavaScript. **Cache Components is on**: `dynamicParams` etc. are unavailable; page files may only export Next's allowed names (`metadata`, `default`, …), so shared page data lives in `src/lib/`.
- Tailwind CSS v4 (`@theme inline` in `src/app/globals.css`, no tailwind.config).
- Animation: GSAP 3.15 (`ScrollTrigger`, `SplitText`, `MorphSVGPlugin` all bundled) via `@gsap/react` `useGSAP`; framer-motion for simple enter/exit fades.
- Smooth scroll: Lenis (`lenis/react`), synced to ScrollTrigger in `src/components/SmoothScroll.js`.
- Icons: `lucide-react` only, outline, `strokeWidth` 1.5–2. lucide 1.x has no brand logos; social icons are hand-drawn outline SVGs in `Footer.js`.
- Fonts: Glacial Indifference (`font-display`, headings) and Poppins (`font-sans`, body), set in `src/app/layout.js`.

## 2. Owner preferences (enforced, read carefully)

1. **Brand guidelines win over references.** Palette (Edge Black / White / Soft Ivory core, greys for structure, Edge Stone accent sparingly), status colours only for status, approved 135° gradients only (`bg-black-depth`, `bg-warm-stone`, `bg-ivory-fade`), outline icons only. When rebuilding a reference screenshot, swap its off-brand colours for brand tokens and say so (reference green → Edge Stone, pink/purple/yellow → stone/greys, filled icons → outline).
2. **Explicit colour exceptions (card colours copied "as is"):** About "What we stand for" cards (`AboutValues.js`); Work "Work by service" cards (`WorkServices.js` `SERVICES[].colors`); and everything derived from those colours: service gradient heroes (`ServiceHero`), brand/website cards (`BrandGrid`), "What's included" cards (`ServiceIncluded`), "More of our work" accents (`ServiceNext`). Don't extend further without asking.
3. **Match references closely.** Measure the reference. Use the copy they give exactly; don't invent extra items. When a screenshot is cut off or an image didn't arrive, say so and mark placeholders.
4. **Animation: "subtle, smooth, spacious".**
   - **Use GSAP (or framer-motion) for hover/interaction animation, not CSS transitions** (the owner asked for this). Pattern that was approved: one paused GSAP timeline per card, `ease: "sine.inOut"`, ~0.6s, `play()` on enter and `timeScale(1.6).reverse()` on leave (quicker return).
   - Scroll reveals on long grids (e.g. 35 brand cards) glitched (late, black flashes): the owner asked for **no scroll animation** there. Keep reveals for headings/small groups only.
   - Accordions: animate `grid-template-rows` 0fr→1fr with `cubic-bezier(0.45,0,0.2,1)`.
   - When asked to make something smoother, adjust timing/curves. **Never remove the effect itself** (unless they ask).
5. **Never open or use Chrome** (no Playwright screenshots). Verify with lint, build and `curl` status codes, and say what wasn't seen.
6. **Communication:** short updates, be honest about what was and was not verified.

## 3. Pages and sections

| Route | File | Sections (components, in order) |
|---|---|---|
| `/` | `src/app/page.js` | `Hero` → `ServicesMarquee` → `WhyChooseUs` → `WhatWeDo` → `CaseStudies` → `Testimonials` → `Partners` |
| `/about` | `src/app/about/page.js` | `AboutHero` → `AboutStats` → `AboutValues` → `AboutVision` → `AboutTeam` → `AboutFaq` → `AboutMore` |
| `/work` | `src/app/work/page.js` | `WorkHero` → `WorkCases` → `WorkServices` → `WorkIndustries` → `WorkStudio` |
| `/contact` | `src/app/contact/page.js` | `ContactForm` (intro + direct links with `#schedule`, form → "send with" step: email app / Gmail / Outlook.com) |
| `/blog` | `src/app/blog/page.js` | `BlogIndex` (header, category pills, featured carousel through every post in the filter, 4-col grid of the rest, 15 per page, numbered pagination). Posts in `lib/blogPosts.js` |
| `/career` | `src/app/career/page.js` | `CareerHero` → `ServiceIncluded` ("Why Social Edge" cards, copy in the page file) → `AboutTeam` (with `lines` + `cta` props) |
| `/services/*` | one folder per service | see below |
| all | `src/app/layout.js` | `Navbar`, page, `Footer` (which renders `SayHello` first) inside `SmoothScroll` |

**Service pages** (each is its own `page.js` composing shared sections; no `[slug]` template, the owner prefers per-page composition):

- *Portfolio style* (gradient card hero): `social-media-marketing` (`ServiceHero` → `BrandGrid` (Instagram cards) → `ServiceCases` → `ServiceNext`), `website-development` (same, `BrandGrid columns={5}` with `site` items), `project-video-shoot` and `event-marketing` (`ServiceHero` → `SelectedWork` → `ServiceCases` → `ServiceNext`).
- *Split-hero style* (copy left, animated panel right) then shared sections `AboutStats` → `ServiceIncluded` → `ServiceProcess` → `AboutFaq` → `ExploreMore` → `ServiceGuide`, all fed from `src/lib/brandServiceContent.js`:
  `social-media-management` (`LiveFeed`), `original-content-copy` (`DraftTyper`), `graphic-designing` (`PenToolCanvas`), `video-editing-animation` (`VideoTimeline`), `campaign-planning` (`CampaignGantt`), `brand-launch-rebranding` (`RebrandMorph`, MorphSVG), `performance-marketing` (`RoasChart`), `custom-web-development` (`WebBuild`), `email-marketing` (`EmailFlow`), `marketing-automation` (`AutomationJourney`), `creative-shoot` (`CreativeMood`), `campaign-shoot` (`CampaignCrop`), `event-shoot` (`EventCoverage`), `project-shoot` (`ShootCallSheet`), `interviews-testimonials` (`InterviewStories`, combines two reference heroes with a toggle).
- New split-hero page = copy any of these page files, change hero props and the `visual` component. Panels share a frame: `surface-dark aspect-[1.25] rounded-lg border border-white/12 bg-black-depth` + two blurred glows, loop with GSAP and offer a reduced-motion still.

Notes on the trickier ones:
- **`Hero.js`**: desktop is a pinned scroll sequence (`lib/heroTimeline.js`). Below `lg` a separate `MobileHero` renders. Don't merge them.
- **`Navbar.js`**: exports `SERVICE_GROUPS` (single source for the mega menu, phone drill-down `MobileMenu`, `ServiceNext`, `serviceTheme`, contact form). Mega menu sits in the `max-w-372` container on a 5-column grid like the reference.
- **`SayHello.js`**, **`Footer.js`**, **`AboutMore.js`**, **`WorkIndustries.js`**: see component comments.
- **`ServiceGuide.js`**: long-form block with chapter pills (Lenis scroll), outline marquee and chapter renderers by `type`: `article` (marker highlight sweep, sticky left), `steps` (snake of 6 cards with flowing dashed connectors), `timeline`, `faq` (sticky left), `articles`, `related`.

## 4. Shared building blocks

- `components/Magnetic.js`: eases a button toward the cursor; `data-magnetic-inner` drifts further.
- `components/Typewriter.js`: `<Typewriter words={[...]} />`.
- `lib/marquee.js`: `leftwardMarquee(track, { trigger, duration })`.
- `lib/contact.js`: email, WhatsApp, calendar link, socials (Say Hello, Footer, contact page).
- `lib/serviceTheme.js`: `serviceTheme(href)` → `{ number, colors }` from the service's position in the navbar menu (colours from `WorkServices` `SERVICES`).
- `lib/sampleWork.js`: shared sample case lists (`PROOF_CASES`, `WEB_CASES`, `SELECTED_FILMS`).
- `lib/brandServiceContent.js`: `STATS`, `INCLUDED`, `PROCESS`, `EXPLORE`, `GUIDE` for split-hero service pages. The guide's "Latest" articles come from `lib/blogPosts.js` via `postsBySlug`.
- `lib/blogPosts.js`: `BLOG_POSTS` (newest first, `no` counts up from the oldest), `BLOG_CATEGORIES`, `postsBySlug`.
- `components/BlogCover.js`: the ivory grid-paper post cover (blog cards, featured card, ServiceGuide articles). Hover timelines move its `.cover-blob`.
- `components/ServiceSplitHero.js`: `crumb` (optional breadcrumb), `eyebrow`, `lines`, `body`, `visual`.
- `AboutStats` takes an optional `stats` prop (About uses its defaults).
- Recurring patterns: eyebrow label with a stone dot; masked headline lines that rise in; breadcrumb row on inner pages.

## 5. Theming (light/dark)

- `globals.css` defines raw values and **theme roles**. In light theme `edge-black`↔canvas and `white`↔ink swap, greys swap, `bg-black-depth` becomes a light gradient.
- `.surface-dark` pins an area to dark roles in both themes (photo/video cards, service cards, all hero panels).
- Use `text-ink` / `bg-snow` for colours that must not swap. Pair `bg-white` with `text-edge-black` so both swap together.

## 6. Known traps (already hit)

- **A broken rule in `globals.css` silently drops every rule after it.** After editing globals, confirm the new class reaches the compiled CSS (`grep` `.next/static/**/*.css`).
- Per-element dynamic gradients: set inline via `style={{ backgroundImage }}`.
- **Tailwind v4 `translate-*`/`scale-*`/`rotate-*` use the CSS `translate`/`scale`/`rotate` properties**, so `transition-[transform,...]` does NOT animate them (they snap). `transition-transform` is fine; arbitrary lists must name `translate`, `scale`, `rotate`. Several older components still list `transform` (WorkServices, SayHello, AboutStats, AboutMore, AboutFaq, Footer); converting their hovers to GSAP was offered, not done.
- **`position: sticky` fails inside an `overflow: hidden` ancestor.** Use `overflow-x-clip` for sections that only need to clip a marquee.
- **The footer persists across client navigations**: its ScrollTriggers need `ScrollTrigger.refresh()` after route/height changes (handled in `SmoothScroll.js`; don't remove it).
- Don't let a GSAP scroll reveal and a hover animate the same element: reveal on the wrapper, hover on the inner.
- **Lenis overrides native scrolling.** Use `lenis.scrollTo(absoluteY)`. Scrollable panels inside the page need `data-lenis-prevent`.
- Deleting a route folder while `next dev` runs can freeze its file watcher (stale 500s): ask the owner to restart dev.
- Run `next build` from the project root; a shell sitting inside `.next/` makes the build fail with `EBUSY`.
- `react-hooks/refs` lint flags `contextSafe(() => ref.current...)` at render: use plain handlers (`() => tl.current?.play()`).
- Next `<img>` lint warnings are expected; not errors.

## 7. Verifying work

- `npx eslint src` (warnings for `<img>` are fine) and `npx next build`.
- The owner usually has `next dev` running on `http://localhost:3000`; don't start another. `curl` the route for a 200.
- No browser checks (see owner preference 5).

## 8. Placeholder content to replace before launch

- All stats, testimonials, case studies, client names/handles/sites (many from the Sage Media reference), office addresses/phones, email (`hello@socialedge.in`, the contact form sends there), WhatsApp number, social URLs (`lib/contact.js`).
- Locations disagree: service pages say Jaipur, Mumbai, Dubai (reference copy); About/Say Hello say Mumbai, Pune, Dubai.
- Stock media: Unsplash photos (incl. the Careers hero, which should be the real team photo), Mixkit videos, About hero video (Sage Media URL).
- Draft copy: all FAQ answers, Social Media Management FAQ questions 01–03/10/11, hero copy for Event Shoot / Project Shoot / Interviews & Testimonials, Draft Typer lines 2–3, all hero-panel labels and figures.
- Blog posts (`lib/blogPosts.js`): 19 placeholder posts. Titles/excerpts of 12 follow the Sage Media reference (excerpts completed where cut off), 4 are invented drafts, 3 are the existing service-guide articles.
- Website Development grid shows 10 sites while the eyebrow says 15 (only 10 were visible in the reference).

## 9. Not built yet (links point here)

`/services` index, related-service links that aren't in the menu (`/services/influencer-marketing`, `/services/martech`, `/services/media-buying`, `/services/media-planning`), `/work/<slug>`, `/work/industries/<slug>`, `/blog/<slug>` (post pages), `/locations` (incl. `#jaipur` etc.), `/career/full-time` and `/career/freelance` (linked from the Careers page buttons), `/terms`, `/privacy`.
