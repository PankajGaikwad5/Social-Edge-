# Social Edge — Brand & Design System Guidelines

> **AI / Agent Instruction:**  
> When designing, styling, or creating components for Social Edge, **YOU MUST ADHERE STRICTLY TO THIS SYSTEM**.  
> Do not introduce arbitrary colors, saturated background tints, or mixed icon styles.

---

## 1. Quick Copy-Paste Prompt for New Chats
When starting a new conversation with any AI agent, use this directive:
```text
Please read and follow BRAND_GUIDELINES.md strictly for all UI styling, color usage, typography, and iconography. Adhere to the 80/15/5 monochrome rule and exact brand tokens.
```

---

## 2. Core Philosophy: The 80 / 15 / 5 Rule
> **"MOST OF THE BRAND SHOULD FEEL MONOCHROME."**

Visual hierarchy is maintained through restraint, high contrast, and disciplined color ratios:

| Ratio | Layer | Palette Elements | Purpose |
| :---: | :--- | :--- | :--- |
| **80%** | **Core** | `Edge Black`, `White`, `Soft Ivory` | Canvas, base backgrounds, deep contrast, primary typography. Dominates every layout. |
| **15%** | **Structure** | `Graphite`, `Concrete`, `Mist`, `Paper` | Borders, subtle dividers, cards, secondary text, muted metadata, structural lines. |
| **5%** | **Signature** | `Edge Stone` (used with restraint) | Strategic focal points, subtle badges, active states, key interactive highlights. |

---

## 3. Official Color Palette

### A. Primary / Core & Signature (80% & 5%)
| Name | Hex Code | Tailwind Token | Usage & Role |
| :--- | :--- | :--- | :--- |
| **Edge Black** | `#090909` | `bg-edge-black`, `text-edge-black` | Core brand black. Default dark background and high-contrast text. |
| **White** | `#FFFFFF` | `bg-white`, `text-white` | Core pure white for high contrast text and clean cards. |
| **Soft Ivory** | `#F4F3EF` | `bg-soft-ivory`, `text-soft-ivory` | Warm off-white canvas for light mode backgrounds or soft light containers. |
| **Edge Stone** | `#A5947C` | `bg-edge-stone`, `text-edge-stone` | **Signature brand accent**. Used strictly with restraint (5% max). |

### B. Secondary Greys / Structure (15%)
| Name | Hex Code | Tailwind Token | Usage & Role |
| :--- | :--- | :--- | :--- |
| **Graphite** | `#4D4D4D` | `bg-graphite`, `border-graphite` | Dark borders, muted headlines, secondary dark containers. |
| **Concrete** | `#848484` | `bg-concrete`, `text-concrete` | Secondary/placeholder text, subtle icons, inactive tabs. |
| **Mist** | `#C9C9C7` | `bg-mist`, `border-mist` | Subtle light borders, card separators, muted outlines. |
| **Paper** | `#E8E7E3` | `bg-paper`, `border-paper` | Neutral surface backgrounds, pill tags, light subtle fills. |

### C. Functional Colors (Strict Meaning Only)
> **Rule:** *Functional colours communicate status and meaning only. They NEVER become decorative brand colors or background splashes.*

| Name | Hex Code | Tailwind Token | Usage |
| :--- | :--- | :--- | :--- |
| **Positive** | `#18B86A` | `text-status-positive`, `bg-status-positive/10` | Success states, active online status, confirmations. |
| **Negative** | `#F04444` | `text-status-negative`, `bg-status-negative/10` | Error messages, destructive actions, critical alerts. |
| **Warning** | `#D89A38` | `text-status-warning`, `bg-status-warning/10` | Pending states, alerts, cautionary notices. |

---

## 4. Shades & Gradients

### Edge Stone Scale
Used for progressive depth and tone without breaking palette harmony:
- **100**: `#A5947C` (Full base tone)
- **80**: `#B7A996`
- **60**: `#C9BEB0`
- **40**: `#DBD4CB`
- **20**: `#EDEAE5` (Lightest tint)

### Approved Gradients (135° Angle)
> **Gradient Rule:** *"Gradients should feel like light, depth, or material. Never use gradients just because a layout feels empty."*

1. **Black Depth (`135deg`)**:
   - `linear-gradient(135deg, #090909 0%, #1A1A1A 100%)`
   - Use for deep background surfaces, dark mode cards.
2. **Warm Stone (`135deg`)**:
   - `linear-gradient(135deg, #A5947C 0%, #C9BEB0 100%)`
   - Use sparingly for signature accents, active indicators.
3. **Ivory Fade (`135deg`)**:
   - `linear-gradient(135deg, #FFFFFF 0%, #F4F3EF 100%)`
   - Use for soft light-mode cards, subtle content panels.

---

## 5. Iconography System

### Core Rule: **"OUTLINE FIRST. ONE FAMILY / ONE WEIGHT."**
- **Geometry**: Simple, precise, geometric outline icons.
- **Stroke**: Consistent **1.5px – 2px** stroke width.
- **Library**: `lucide-react` (clean, un-styled, consistent outline stroke).
- **Alignment**: Optical alignment inside consistent bounding boxes (e.g. `20x20` or `24x24`).

### Strict Icon Rules:
* ✅ **DO**: Choose one icon family and maintain identical stroke width, size, and optical alignment across all platforms.
* ❌ **DON'T MIX**: Never combine filled icons + outline icons + emoji + hand-drawn symbols within the same system.

---

## 6. Tailwind CSS v4 Configuration Reference

In `src/app/globals.css`, these tokens are mapped into the `@theme inline` block:

```css
@import "tailwindcss";

@theme inline {
  /* Core & Signature */
  --color-edge-black: #090909;
  --color-soft-ivory: #F4F3EF;
  --color-edge-stone: #A5947C;
  --color-edge-stone-80: #B7A996;
  --color-edge-stone-60: #C9BEB0;
  --color-edge-stone-40: #DBD4CB;
  --color-edge-stone-20: #EDEAE5;

  /* Structure / Secondary Greys */
  --color-graphite: #4D4D4D;
  --color-concrete: #848484;
  --color-mist: #C9C9C7;
  --color-paper: #E8E7E3;

  /* Functional Only */
  --color-status-positive: #18B86A;
  --color-status-negative: #F04444;
  --color-status-warning: #D89A38;
}
```

---

## 7. Component Checklist for Any Agent

Before writing or modifying any component:
- [ ] Is the overall composition predominantly monochrome (80% Edge Black / White / Soft Ivory)?
- [ ] Are structural borders and subtle dividers using Graphite (`#4D4D4D`), Concrete (`#848484`), or Mist (`#C9C9C7`)?
- [ ] Is Edge Stone (`#A5947C`) limited to signature accent moments (<= 5%)?
- [ ] Are functional colors (Positive/Negative/Warning) used *only* for status messages and never as decorative elements?
- [ ] Are all icons outline-style with uniform 1.5–2px stroke weight (`lucide-react`)?
- [ ] Are gradients applied only for lighting/material depth at 135° rather than visual clutter?
