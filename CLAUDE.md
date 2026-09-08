# Triforce Quartet Website — Project Guide

## What this is
Astro static site for Triforce Quartet, a video game music string quartet (Washington,
D.C. area). Hosted on GitHub Pages at the custom domain www.triforcequartet.com.
The owner is a non-developer.

## How to work with the owner
- The owner is not a developer. Explain changes in plain language, and say what each
  change does and why.
- Add brief comments to any code you change so it is understandable later. Match the file
  type: CSS `/* */`, HTML/Astro markup `<!-- -->`, JavaScript `//`.
- Make small, reviewable changes. Prefer one clear change at a time and let the owner
  review before moving on. If a change spans multiple files, say so up front.
- Propose changes and let the owner commit and push. Do not assume anything is final
  until the owner says so.

## Brand principle (do not drift from this)
- Lead with "video game music" as the primary identity and differentiator. Do NOT
  genericize the messaging toward a generic "string quartet for events" framing. The
  owner has deliberately chosen to lead with the video game music specialty; keep it
  central in all copy.

## Deploy workflow (critical)
- Only ever work on the `dev` branch. Never edit or commit to `main`.
- Pushing to `dev` triggers `.github/workflows/deploy.yml`, which builds the site and
  force-deploys the built output to `main`. `main` is machine-generated; never touch it.
- GitHub Pages serves `main` at www.triforcequartet.com.
- Deploy runs `npm ci` then `npm run build`. Local preview is `npm run dev`.
- The owner reviews changes in GitHub Desktop and pushes manually.

## NEVER do these
- Do NOT delete or modify `public/CNAME`. It holds `www.triforcequartet.com` and keeps
  the custom domain attached through every deploy.
- Do NOT commit or modify `package.json` or `package-lock.json`. There is an unexplained
  Astro version bump (5.12.0 -> 5.16.6) sitting uncommitted; leave it alone until it is
  deliberately investigated (see Known issues #6).
- Do NOT touch anything related to DNS or email. booking@triforcequartet.com forwards to
  gmail via HostGator; the mail DNS records (MX, mail A record, SPF, DKIM) and the
  HostGator account must stay exactly as they are.
- Do NOT invent or reproduce testimonials, credentials, numbers, or venue names. Only
  state facts the owner confirms are true.

## Project structure
- `src/content/` — Markdown content collections: `albums/`, `bios/`, `events/`, and the
  service pages `conventions/`, `corporates/`, `otherservices/`, `schools/`, `weddings/`.
- Service pages are built from one Markdown file per section, ordered by the `section`
  frontmatter number. A filename prefixed with `_` is hidden from the collection
  (e.g. `_testimonials.md`).
- `src/content.config.ts` — content collection schemas. These are strict: a new
  frontmatter field must be added here first, or the build fails.
- `src/pages/*.astro` — one file per page. The top "hero" block (headline, intro text,
  image, CTA button) is hardcoded HTML in each page file, NOT in the content Markdown.
- `src/layouts/Layout.astro` — shared `<head>` (title, meta tags).
- `src/styles/global.css` — all site styles.
- `public/` — static assets: images in `public/img/`, bio photos in `public/bios/`,
  album covers in `public/albums/`. `public/CNAME` holds the custom domain.

## Known issues / queued tasks
1. SEO pass: `Layout.astro` has no meta description and the viewport lacks
   `initial-scale=1`; the homepage has no `<h1>` (the hero is an `<h2>`); bio and album
   images (rendered in loops in `src/pages/index.astro`) have no alt text; there are no
   Open Graph tags; there is no sitemap; and the bio card has a mismatched heading tag
   (`<h3 ...>` closed with `</h2>`). Add unique meta descriptions per page and fix these.
2. Bio image cropping: styled by two overlapping rules (`.bio-card img` for small
   screens, `.bio-image img` for desktop) plus a dead leftover rule referencing
   `.tracklist-expand`/`.bio-cover` copied from the album cards. Bio photos are 2400x3600
   (portrait). Goal: a good portrait crop on desktop and an un-zoomed image on mobile,
   correct in both the closed and expanded ("Read bio") states. Currently set to
   `object-fit: contain` as a temporary no-crop workaround. Untangle and fix it properly,
   and remove the dead rule.
3. Event date off-by-one: in `src/pages/index.astro`, event dates use `.getDate()` and
   `toLocaleString('default', { month: 'short' })`, which render in the build machine's
   local timezone. Dates are stored as strings parsed via `new Date(str)` (UTC midnight),
   so they show correctly on the UTC build server but off by one in local preview. Fix by
   using `.getUTCDate()` and adding `timeZone: 'UTC'` to the month formatting so it is
   timezone-stable.
4. Nav bar sizing: in `global.css` the `header` height is `2.5rem` with a small logo.
   Optionally make the bar taller with a proportionally larger logo and good mobile tap
   targets. The site already has a working mobile hamburger menu.
5. Events time field: events have no `time` field. Either add `time` to the events schema
   in `content.config.ts` and display it in the event card, or continue putting the time
   in the event body text.
6. Astro version bump: investigate why `package.json`/`package-lock.json` changed Astro
   from 5.12.0 to 5.16.6 (currently uncommitted). Decide whether to keep or revert. Do
   not commit these files until this is resolved.

## Ops notes
- The deploy workflow authenticates with a personal access token stored as the
  `CHRIS_TOKEN` GitHub secret (it belongs to the original developer). If deploys ever
  start failing for no code-related reason, an expired or revoked token is a likely cause.
