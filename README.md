# SK Tech 7 — Website

A complete, production-ready static website for the SK Tech 7 brand: homepage, categories,
visual feed, articles, AI tools directory, search, and all standard pages — built entirely
from a single content data file, so you can add new posts without touching any page code.

## Structure

```
index.html          → app shell (header/footer containers + <main id="app">)
css/style.css        → the entire design system (dark, glassmorphism, blue/purple)
js/data.js            → ALL content lives here: POSTS, VISUAL_POSTS, AI_TOOLS, TIPS, VIDEOS, CATEGORIES
js/icons.js           → small inline icon set (no external icon requests)
js/app.js             → router + page renderers + search + share/save + SEO tags
sitemap.xml / robots.txt → SEO files, ready for a real domain
```

## Adding content (no code required)

Open `js/data.js` and add a new object to the relevant array:

- **Article** → add to `POSTS` (title, slug, image, category, excerpt, content, author, date, readingTime, tags, featured, trending, views). The article, its category page, homepage sections, related posts, search and sitemap all update automatically.
- **Visual post** → add to `VISUAL_POSTS` (image, title, caption, category, date, tags).
- **AI tool** → add to `AI_TOOLS` (name, category, pricing, grad, description, website).
- **Quick tip** → add to `TIPS`.
- **Video** → add to `VIDEOS`.

`image` / `grad` values reference the gradient placeholder classes in `style.css`
(`grad-1` … `grad-11`) — swap any of them for a real photo by replacing the `<div class="media grad-x">`
usage in `app.js` with an `<img>` tag once you have real images to use.

## Routing & clean URLs

The site uses hash-based routing (`#/article/ai/slug`) so it works instantly from any static
host or even opened directly as a file — no server configuration needed. The path structure
already mirrors clean URLs (`/article/ai/slug`, `/category/android`, etc.).

To get **real** clean URLs (no `#`) after deploying:
1. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
2. Add a catch-all rewrite to `index.html` (e.g. Netlify `_redirects`: `/* /index.html 200`).
3. Switch `js/app.js` from `location.hash` to the History API (`pushState` + `popstate`) — the
   route-matching logic itself doesn't need to change, only how the path is read/written.

## Monetization slots

Ad placeholders (`.ad-slot`) are already placed on the homepage, between article sections,
in the sidebar, and on category pages. Replace the placeholder `<div class="ad-slot">` with
your ad network's embed code, or with sponsored/affiliate cards using the existing `.card` styles.

## Notes

- Saved/bookmarked posts and visuals are stored in the visitor's browser (`localStorage`) —
  no backend required for that feature to work.
- All sample content (articles, tools, tips) is placeholder text to demonstrate the structure —
  replace it with real content anytime.
