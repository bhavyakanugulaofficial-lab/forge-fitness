# FORGE Fitness Centre

A complete, multilingual, responsive marketing site for a premium fitness centre in
Vijayawada — dark theme, orange energy, and content in **English, Telugu, Hindi and Tamil**.

Built with React 18 + Vite 5 + TypeScript. No backend required: form submissions are
simulated in the browser and every integration point is documented below.

![FORGE](public/images/hero.jpg)

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18+ recommended.

## What's inside

| Section | Highlights |
| --- | --- |
| Home | Full-bleed hero, animated stat counters, "today's highlight" card, marquee |
| About | Mission / vision / philosophy pillars, why-choose-us, contact info bar |
| Programs | 10 programmes with live **search + level filter**, detail modal, difficulty, duration, benefits |
| Trainers | 4 coaches with certifications, experience, available hours, booking modal |
| Membership | Basic / Standard / Premium / Personal Training, monthly–quarterly–yearly billing toggle |
| Facilities | 9 facilities incl. equipment, cardio zone, yoga studio, lockers, showers, parking |
| Schedule | Mon–Sun tabs, morning + evening sessions, trainer, category, live slot status, booking |
| Assessment | Auto **BMI** with category gauge, educational interpretation and goal-based training ideas |
| Registration | Validated form (name, email, mobile, age, plan, trainer, schedule, goals, consent), success state |
| Contact | Address, phone, email, hours, social links, validated contact form, interactive map |
| Footer | Quick links, programme links, contact details, socials, privacy policy & terms modals |

## Multilingual

`src/i18n/` holds one dictionary per language, all typed against the English source so a
missing key is a compile error:

```
src/i18n/en.ts   src/i18n/te.ts   src/i18n/hi.ts   src/i18n/ta.ts
```

- The 🌐 menu in the navbar switches language instantly; the choice is stored in
  `localStorage` (`forge-lang`) and `<html lang>` / `document.title` / meta description
  are updated.
- Telugu, Tamil and Devanagari are served as **self-hosted variable woff2** fonts, loaded
  only when that script is actually on screen (`unicode-range`).
- Display type switches from Oswald to the Indic body font and drops letter-spacing /
  uppercase so the scripts render correctly.

## Project structure

```
public/            images (29, optimised) + fonts (woff2)
src/
  components/      one file per section + UI primitives (Modal, Toast, Reveal, Navbar…)
  data/content.ts  programmes, trainers, plans, facilities, weekly schedule, business info
  i18n/            dictionaries + LanguageContext
  lib/             bmi, validators, api (simulated backend), scroll helpers
  styles/          base.css → components.css → sections.css → responsive.css
```

Styling is plain CSS in four layers: design tokens and primitives, component patterns,
section-specific rules, and breakpoint-only overrides (`1200 / 1100 / 980 / 820 / 760 / 560`
plus a short-screen query). No CSS framework, no runtime styling library.

## Backend integration

This build is a frontend demo. Submissions are validated, stored in `localStorage` and a
reference number is generated (`FGE-…`, `TRN-…`, `MSG-…`).

`src/lib/api.ts` contains the three functions to replace:

| Function | Endpoint to wire |
| --- | --- |
| `submitRegistration()` | `POST /api/register` |
| `submitTrainerBooking()` | `POST /api/trainer-booking` |
| `submitContact()` | `POST /api/contact` |

Each function has a documented `fetch` replacement block in the file — swap the simulated
branch for the `fetch` call and keep the same return shape so the UI needs no changes.
The UI already shows success and error states, so only the transport layer moves.

## Content notice

Trainer profiles, certifications, pricing, testimonials-free copy and contact details are
**sample content** created for this demonstration. Replace `BUSINESS`, `TRAINERS`, `PLANS`
and `SCHEDULE` in `src/data/content.ts` with real values before going live.

The BMI tool is an educational screening estimate only — it is explicitly labelled as
*not* medical advice in the UI.

## Deployment

The site is a static SPA — deploy `dist/` anywhere. On Vercel, import the repo and the
Vite preset is detected automatically (`npm run build`, output `dist`).

## License

Sample project — use it, break it, make it yours.
