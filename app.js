/* =========================================================
   SK TECH 7 — APP / ROUTER
   Hash-based router so the site works from a static file
   host with zero server config. URL pattern mirrors clean
   paths (e.g. #/article/ai/5-ai-tools-2026) so it maps 1:1
   onto real server routes if you later deploy with rewrites
   (see /deploy-notes.md and /sitemap.xml for that path plan).
   ========================================================= */

const SITE = {
  name: "SK Tech 7",
  tagline: "Tech • AI • Tips • Future",
  domain: "https://sktech7.com",
  description: "AI tools, smartphone tricks, tech news, hidden features, useful apps and the latest digital trends — explained simply.",
};

const app = document.getElementById("app");
let toastTimer = null;

/* ---------------- Helpers ---------------- */
function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function views(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : n;
}
function savedVisuals() {
  return JSON.parse(localStorage.getItem("sk_saved_visuals") || "[]");
}
function toggleSavedVisual(id) {
  let s = savedVisuals();
  s = s.includes(id) ? s.filter((x) => x !== id) : [...s, id];
  localStorage.setItem("sk_saved_visuals", JSON.stringify(s));
  return s.includes(id);
}
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.style.cssText = "position:fixed;left:50%;bottom:88px;transform:translateX(-50%);background:#12162a;border:1px solid rgba(255,255,255,.15);color:#e9ecfb;padding:11px 18px;border-radius:999px;font-size:.85rem;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.4);transition:opacity .2s ease;";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.style.opacity = "0"), 1800);
}
function shareContent(title, url) {
  const fullUrl = url.startsWith("http") ? url : location.origin + location.pathname + url;
  if (navigator.share) {
    navigator.share({ title, url: fullUrl }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(fullUrl);
    toast("Link copied");
  }
}
function shareLinks(title, url) {
  const fullUrl = encodeURIComponent(url.startsWith("http") ? url : location.origin + location.pathname + url);
  const t = encodeURIComponent(title);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`,
    whatsapp: `https://wa.me/?text=${t}%20${fullUrl}`,
    x: `https://twitter.com/intent/tweet?text=${t}&url=${fullUrl}`,
  };
}

/* ---------------- SEO meta injection ---------------- */
function setMeta({ title, description, path, type = "website", schema = null }) {
  document.title = title;
  const url = SITE.domain + path;
  setTag('meta[name="description"]', "content", description);
  setTag('link[rel="canonical"]', "href", url);
  setTag('meta[property="og:title"]', "content", title);
  setTag('meta[property="og:description"]', "content", description);
  setTag('meta[property="og:url"]', "content", url);
  setTag('meta[property="og:type"]', "content", type);
  let script = document.getElementById("schema-ld");
  if (script) script.remove();
  if (schema) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-ld";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
function setTag(selector, attr, value) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    if (selector.includes("name=")) el.setAttribute("name", selector.match(/name="([^"]+)"/)[1]);
    if (selector.includes("property=")) el.setAttribute("property", selector.match(/property="([^"]+)"/)[1]);
    if (selector.includes("rel=")) el.setAttribute("rel", selector.match(/rel="([^"]+)"/)[1]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.domain + it.path,
    })),
  };
}

/* ---------------- Shared UI fragments ---------------- */
function adSlot(label = "Advertisement", wide = false) {
  return `<div class="ad-slot glass ${wide ? "wide" : ""}">${esc(label)} space</div>`;
}

function cardTpl(post) {
  return `
  <a class="card glass" href="#/article/${post.category}/${post.slug}">
    <div class="media ${post.image}">${icon("compass", "media-icon")}</div>
    <div class="card-body">
      <span class="card-cat">${icon("tag")} ${esc(getCategory(post.category)?.name || "")}</span>
      <h3 class="card-title">${esc(post.title)}</h3>
      <p class="card-excerpt">${esc(post.excerpt)}</p>
      <div class="card-meta">
        <span>${esc(post.readingTime)}</span><span class="dot-sep"></span><span>${esc(formatDate(post.date))}</span>
      </div>
    </div>
  </a>`;
}

function visualCardTpl(vp) {
  const saved = savedVisuals().includes(vp.id);
  return `
  <div class="card glass visual-card">
    <a href="#/visual/${vp.id}" class="media ${vp.image}">
      <span class="card-cat">${esc(getCategory(vp.category)?.name || "")}</span>
    </a>
    <div class="card-body" style="padding-bottom:6px">
      <h3 class="card-title" style="font-size:.95rem">${esc(vp.title)}</h3>
      <p class="card-excerpt">${esc(vp.caption)}</p>
      <div class="card-meta"><span>${esc(formatDate(vp.date))}</span></div>
    </div>
    <div class="visual-actions">
      <button class="btn btn-sm btn-icon" title="Share" data-share="${vp.id}">${icon("share")}</button>
      <button class="btn btn-sm btn-icon" title="Save" data-save="${vp.id}" style="${saved ? "color:var(--blue-bright);border-color:var(--blue-bright)" : ""}">${icon("bookmark")}</button>
      <a class="btn btn-sm btn-primary" href="#/visual/${vp.id}">View Post</a>
    </div>
  </div>`;
}

function tipCardTpl(tip) {
  return `
  <div class="card glass tip-card">
    <div class="tip-num">${icon("spark")}</div>
    <h3>${esc(tip.title)}</h3>
    <p>${esc(tip.body)}</p>
  </div>`;
}

function videoCardTpl(v) {
  return `
  <a class="card glass video-card" href="${v.url}" target="_blank" rel="noopener">
    <div class="media ${v.image}">
      <span class="play-badge">${icon("play")}</span>
      <span class="duration-badge">${esc(v.duration)}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title" style="font-size:.95rem">${esc(v.title)}</h3>
      <span class="btn btn-sm" style="width:fit-content">${icon("play")} Watch</span>
    </div>
  </a>`;
}

function toolCardTpl(tool) {
  const pc = tool.pricing === "Free" ? "free" : tool.pricing === "Paid" ? "paid" : "";
  return `
  <div class="card glass tool-card">
    <div class="tool-top">
      <div class="tool-logo ${tool.grad}">${esc(tool.name[0])}</div>
      <div>
        <div class="tool-name">${esc(tool.name)}</div>
        <div class="tool-cat">${esc(tool.category)}</div>
      </div>
    </div>
    <p style="font-size:.87rem;margin:0">${esc(tool.description)}</p>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto">
      <span class="pricing-badge ${pc}">${esc(tool.pricing)}</span>
      <a class="btn btn-sm btn-primary" href="${tool.website}" target="_blank" rel="noopener">Visit ${icon("arrow")}</a>
    </div>
  </div>`;
}

/* ---------------- Header / Footer / Nav ---------------- */
function renderChrome() {
  document.getElementById("header").innerHTML = `
    <div class="container header-inner">
      <a href="#/" class="brand">
        <span class="brand-mark">SK</span>
        <span>
          <span class="brand-name">SK <span>Tech 7</span></span><br/>
          <span class="brand-tagline">${SITE.tagline}</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="Primary">
        <ul>
          <li><a href="#/latest" data-nav="latest">Tech</a></li>
          <li><a href="#/category/ai" data-nav="ai">AI</a></li>
          <li><a href="#/tips" data-nav="tips">Tips</a></li>
          <li><a href="#/category/future-tech" data-nav="future">Future</a></li>
          <li><a href="#/videos" data-nav="videos">Videos</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="search-trigger" id="searchTrigger">${icon("search")}<span>Search</span></button>
      </div>
    </div>`;

  document.getElementById("mobileNav").innerHTML = `
    <a href="#/" data-nav="home">${icon("home")}Home</a>
    <a href="#/latest" data-nav="latest">${icon("compass")}Latest</a>
    <a href="#/category/ai" data-nav="ai">${icon("spark")}AI</a>
    <a href="#/tips" data-nav="tips">${icon("tag")}Tips</a>
    <button id="moreTrigger" style="background:none;border:none;color:var(--text-faint);display:flex;flex-direction:column;align-items:center;gap:3px;font-size:.65rem;flex:1">${icon("more")}More</button>`;

  document.getElementById("footer").innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="brand"><span class="brand-mark">SK</span><span class="brand-name">SK <span>Tech 7</span></span></div>
          <p class="footer-brand-blurb">${SITE.description}</p>
        </div>
        <div class="footer-col"><h4>Explore</h4><ul>
          <li><a href="#/latest">Latest Tech</a></li>
          <li><a href="#/visuals">SK Tech Visuals</a></li>
          <li><a href="#/ai-tools">AI Tools</a></li>
          <li><a href="#/videos">Videos</a></li>
        </ul></div>
        <div class="footer-col"><h4>Categories</h4><ul>
          ${CATEGORIES.slice(0, 5).map((c) => `<li><a href="#/category/${c.slug}">${esc(c.name)}</a></li>`).join("")}
        </ul></div>
        <div class="footer-col"><h4>Company</h4><ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/contact">Contact</a></li>
          <li><a href="#/privacy">Privacy Policy</a></li>
          <li><a href="#/terms">Terms &amp; Conditions</a></li>
          <li><a href="#/disclaimer">Disclaimer</a></li>
          <li><a href="#/affiliate-disclosure">Affiliate Disclosure</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} SK Tech 7. All rights reserved.</span>
        <div class="social-links">
          <a class="btn btn-icon btn-sm" href="#" aria-label="Facebook">${icon("facebook")}</a>
          <a class="btn btn-icon btn-sm" href="#" aria-label="X">${icon("x")}</a>
          <a class="btn btn-icon btn-sm" href="#" aria-label="WhatsApp">${icon("whatsapp")}</a>
        </div>
      </div>
    </div>`;

  document.getElementById("searchTrigger").addEventListener("click", openSearch);
  document.getElementById("moreTrigger").addEventListener("click", openMoreSheet);
}

function setActiveNav(key) {
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
}

/* ---------------- More sheet (mobile) ---------------- */
function openMoreSheet() {
  const links = [
    ["Visuals", "#/visuals"], ["AI Tools", "#/ai-tools"], ["Videos", "#/videos"],
    ["Categories", "#/categories"], ["About", "#/about"], ["Contact", "#/contact"], ["Search", "__search__"],
  ];
  const wrap = document.createElement("div");
  wrap.className = "search-overlay";
  wrap.style.alignItems = "flex-end";
  wrap.style.padding = "0";
  wrap.innerHTML = `
    <div class="glass search-panel" style="max-width:100%;border-radius:20px 20px 0 0;padding:10px 6px 24px">
      <div style="display:flex;justify-content:center;padding:10px"><div style="width:36px;height:4px;border-radius:2px;background:var(--border-strong)"></div></div>
      <ul>${links.map(([l, h]) => `<li><a href="${h === "__search__" ? "#" : h}" data-more="${h}" style="display:flex;padding:14px 18px;font-size:.95rem">${esc(l)}</a></li>`).join("")}</ul>
    </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener("click", (e) => {
    if (e.target === wrap) wrap.remove();
    const a = e.target.closest("[data-more]");
    if (a) {
      wrap.remove();
      if (a.dataset.more === "__search__") openSearch();
    }
  });
}

/* ---------------- Search overlay ---------------- */
function searchAll(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  POSTS.forEach((p) => { if (p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))) results.push({ type: "Article", title: p.title, href: `#/article/${p.category}/${p.slug}`, image: p.image }); });
  VISUAL_POSTS.forEach((v) => { if (v.title.toLowerCase().includes(q) || v.caption.toLowerCase().includes(q)) results.push({ type: "Visual Post", title: v.title, href: `#/visual/${v.id}`, image: v.image }); });
  AI_TOOLS.forEach((t) => { if (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) results.push({ type: "AI Tool", title: t.name, href: `#/ai-tools`, image: t.grad }); });
  CATEGORIES.forEach((c) => { if (c.name.toLowerCase().includes(q)) results.push({ type: "Category", title: c.name, href: `#/category/${c.slug}`, image: "grad-1" }); });
  TIPS.forEach((t) => { if (t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q)) results.push({ type: "Tech Tip", title: t.title, href: `#/tips`, image: "grad-4" }); });
  return results;
}

function openSearch() {
  const wrap = document.createElement("div");
  wrap.className = "search-overlay";
  wrap.innerHTML = `
    <div class="glass search-panel">
      <div class="search-input-row">
        ${icon("search")}
        <input type="text" id="searchInput" placeholder="Search articles, visuals, AI tools, categories…" autofocus />
        <button class="search-close" id="searchCloseBtn">${icon("close")}</button>
      </div>
      <div class="search-results-list" id="searchResultsList">
        <div class="search-empty">Start typing to search SK Tech 7</div>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  const input = wrap.querySelector("#searchInput");
  const list = wrap.querySelector("#searchResultsList");
  input.addEventListener("input", () => renderResults(input.value, list));
  wrap.addEventListener("click", (e) => { if (e.target === wrap) wrap.remove(); });
  wrap.querySelector("#searchCloseBtn").addEventListener("click", () => wrap.remove());
  document.addEventListener("keydown", function esc1(e) { if (e.key === "Escape") { wrap.remove(); document.removeEventListener("keydown", esc1); } });
}
function renderResults(q, list) {
  const results = searchAll(q).slice(0, 20);
  if (!q.trim()) { list.innerHTML = `<div class="search-empty">Start typing to search SK Tech 7</div>`; return; }
  if (!results.length) { list.innerHTML = `<div class="search-empty">No results for "${esc(q)}"</div>`; return; }
  list.innerHTML = results.map((r) => `
    <a class="search-result-item" href="${r.href}">
      <div class="media ${r.image}"></div>
      <div><div class="search-result-title">${esc(r.title)}</div><div class="search-result-type">${esc(r.type)}</div></div>
    </a>`).join("");
}

/* ---------------- Page renderers ---------------- */
function renderHome() {
  const trending = POSTS.filter((p) => p.trending);
  const latest = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
  const aiFeature = POSTS.find((p) => p.category === "ai" && p.featured) || POSTS.find((p) => p.category === "ai");
  const aiSide = POSTS.filter((p) => p.category === "ai" && p.slug !== aiFeature?.slug).slice(0, 2);

  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <span class="hero-badge"><span class="dot"></span>${esc(SITE.tagline)}</span>
        <h1>Discover What's Next in Tech.</h1>
        <p class="hero-sub">${esc(SITE.description)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/latest">Explore Latest ${icon("arrow")}</a>
          <a class="btn" href="#/ai-tools">Explore AI Tools</a>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>Trending Now</h2><a class="see-all" href="#/latest">See all ${icon("arrow")}</a></div>
        <div class="scroller">${trending.map(cardTpl).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">${adSlot("Homepage banner", true)}</div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>Latest Tech</h2><a class="see-all" href="#/latest">See all ${icon("arrow")}</a></div>
        <div class="grid">${latest.map(cardTpl).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>AI &amp; Future</h2><a class="see-all" href="#/category/ai">See all ${icon("arrow")}</a></div>
        <div class="feature-split">
          <a class="feature-main" href="#/article/${aiFeature.category}/${aiFeature.slug}">
            <div class="media ${aiFeature.image}">
              <div>
                <span class="card-cat">${icon("spark")} Featured AI</span>
                <h3>${esc(aiFeature.title)}</h3>
              </div>
            </div>
          </a>
          <div class="feature-side">
            ${aiSide.map(cardTpl).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>Quick Tech Tips</h2><a class="see-all" href="#/tips">See all ${icon("arrow")}</a></div>
        <div class="tips-grid">${TIPS.slice(0, 6).map(tipCardTpl).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>SK Tech Visuals</h2><a class="see-all" href="#/visuals">See all ${icon("arrow")}</a></div>
        <div class="scroller">${VISUAL_POSTS.slice(0, 6).map((v) => `<div style="min-width:200px;max-width:200px">${visualCardTpl(v)}</div>`).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><h2>Watch SK Tech</h2><a class="see-all" href="#/videos">See all ${icon("arrow")}</a></div>
        <div class="video-grid">${VIDEOS.map(videoCardTpl).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">${adSlot("Sponsored / AI tool promotion", true)}</div>
    </section>
  `;
  bindVisualActions();
  setMeta({
    title: `${SITE.name} — Discover What's Next in Tech`,
    description: SITE.description,
    path: "/",
    schema: { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.domain },
  });
  setActiveNav("home");
}

function renderLatest() {
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Latest Tech</div>
      <h1>Everything, freshly published.</h1>
      <p>The newest articles from across SK Tech 7 — AI, smartphones, computers and more.</p>
    </header>
    <div class="container">
      <div class="layout-with-sidebar">
        <div>
          <div class="grid">${sorted.map(cardTpl).join("")}</div>
        </div>
        ${sidebarTpl()}
      </div>
    </div>`;
  setMeta({ title: `Latest Tech Articles — ${SITE.name}`, description: "The newest tech, AI and how-to articles from SK Tech 7.", path: "/latest" });
  setActiveNav("latest");
}

function renderCategories() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Browse</div>
      <h1>All categories.</h1>
      <p>Jump straight to the topic you're after.</p>
    </header>
    <div class="container section" style="padding-top:0">
      <div class="grid">
        ${CATEGORIES.map((c) => `
          <a class="card glass" href="#/category/${c.slug}" style="padding:22px">
            <span class="tip-num" style="margin-bottom:12px">${icon(c.icon)}</span>
            <h3 class="card-title">${esc(c.name)}</h3>
            <p class="card-excerpt">${esc(c.blurb)}</p>
          </a>`).join("")}
      </div>
    </div>`;
  setMeta({ title: `Categories — ${SITE.name}`, description: "Browse every SK Tech 7 category.", path: "/categories" });
}

function renderCategory(slug) {
  const cat = getCategory(slug);
  if (!cat) return renderNotFound();
  const posts = getPostsByCategory(slug);
  app.innerHTML = `
    <header class="page-header container">
      <div class="breadcrumb"><a href="#/">Home</a> ${icon("arrow", "icon")} <span>${esc(cat.name)}</span></div>
      <div class="page-eyebrow">Category</div>
      <h1>${esc(cat.name)}</h1>
      <p>${esc(cat.blurb)}</p>
    </header>
    <div class="container">
      <div class="category-pill-row">
        ${CATEGORIES.map((c) => `<a class="category-pill ${c.slug === slug ? "active" : ""}" href="#/category/${c.slug}">${esc(c.name)}</a>`).join("")}
      </div>
      <div class="layout-with-sidebar">
        <div>
          ${posts.length ? `<div class="grid">${posts.map(cardTpl).join("")}</div>` : `<div class="empty-state">No posts in this category yet — check back soon.</div>`}
        </div>
        ${sidebarTpl()}
      </div>
    </div>`;
  setMeta({
    title: `${cat.name} — ${SITE.name}`,
    description: cat.blurb,
    path: `/category/${slug}`,
    schema: breadcrumbSchema([{ name: "Home", path: "/" }, { name: cat.name, path: `/category/${slug}` }]),
  });
}

function renderTips() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Quick Tech Tips</div>
      <h1>Small tricks, real time saved.</h1>
      <p>Bite-sized tips you can use in under a minute.</p>
    </header>
    <div class="container section" style="padding-top:0">
      <div class="tips-grid">${TIPS.map(tipCardTpl).join("")}</div>
      <div class="section-head" style="margin-top:48px"><h2>Related articles</h2></div>
      <div class="grid">${POSTS.filter((p) => p.tags.includes("Tips")).length ? POSTS.filter((p) => p.tags.includes("Tips")).map(cardTpl).join("") : POSTS.slice(0, 3).map(cardTpl).join("")}</div>
    </div>`;
  setMeta({ title: `Quick Tech Tips — ${SITE.name}`, description: "Fast, practical tech tips explained simply.", path: "/tips" });
  setActiveNav("tips");
}

function renderVisuals() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Visual Feed</div>
      <h1>SK Tech Visuals</h1>
      <p>Bite-sized, picture-first tech tips made for scrolling.</p>
    </header>
    <div class="container section" style="padding-top:0">
      <div class="visual-grid">${VISUAL_POSTS.map(visualCardTpl).join("")}</div>
    </div>`;
  bindVisualActions();
  setMeta({ title: `SK Tech Visuals — ${SITE.name}`, description: "Picture-based tech tips and tricks, one post at a time.", path: "/visuals" });
}

function renderVisualDetail(id) {
  const vp = VISUAL_POSTS.find((v) => v.id === id);
  if (!vp) return renderNotFound();
  const related = VISUAL_POSTS.filter((v) => v.category === vp.category && v.id !== id).slice(0, 4);
  const saved = savedVisuals().includes(vp.id);
  const s = shareLinks(vp.title, `#/visual/${vp.id}`);
  app.innerHTML = `
    <div class="container article-hero">
      <div class="breadcrumb"><a href="#/">Home</a> ${icon("arrow")} <a href="#/visuals">Visuals</a> ${icon("arrow")} <span>${esc(vp.title)}</span></div>
      <div style="max-width:520px;margin:0 auto">
        <div class="media ${vp.image} glass" style="aspect-ratio:4/5;border-radius:var(--radius-lg);padding:18px">
          <span class="card-cat" style="color:#fff;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:999px;backdrop-filter:blur(6px)">${esc(getCategory(vp.category)?.name || "")}</span>
        </div>
        <h1 style="font-size:1.4rem;margin:20px 0 8px">${esc(vp.title)}</h1>
        <p>${esc(vp.caption)}</p>
        <div class="card-meta" style="margin-bottom:20px">${esc(formatDate(vp.date))}</div>
        <div class="share-bar" style="border-top:none;padding-top:0">
          <span>Share:</span>
          <a class="btn btn-icon" href="${s.facebook}" target="_blank" rel="noopener">${icon("facebook")}</a>
          <a class="btn btn-icon" href="${s.whatsapp}" target="_blank" rel="noopener">${icon("whatsapp")}</a>
          <a class="btn btn-icon" href="${s.x}" target="_blank" rel="noopener">${icon("x")}</a>
          <button class="btn btn-icon" id="copyLinkBtn">${icon("link")}</button>
          <button class="btn btn-icon" id="saveVisualBtn" style="margin-left:auto;${saved ? "color:var(--blue-bright);border-color:var(--blue-bright)" : ""}">${icon("bookmark")}</button>
        </div>
      </div>
    </div>
    ${related.length ? `
    <div class="container section">
      <div class="section-head"><h2>More like this</h2></div>
      <div class="visual-grid">${related.map(visualCardTpl).join("")}</div>
    </div>` : ""}
  `;
  document.getElementById("copyLinkBtn").addEventListener("click", () => shareContent(vp.title, `#/visual/${vp.id}`));
  document.getElementById("saveVisualBtn").addEventListener("click", (e) => {
    const on = toggleSavedVisual(vp.id);
    e.currentTarget.style.color = on ? "var(--blue-bright)" : "";
    e.currentTarget.style.borderColor = on ? "var(--blue-bright)" : "";
    toast(on ? "Saved" : "Removed from saved");
  });
  bindVisualActions();
  setMeta({ title: `${vp.title} — ${SITE.name}`, description: vp.caption, path: `/visual/${vp.id}`, type: "article" });
}

function renderArticle(catSlug, slug) {
  const post = getPost(slug);
  if (!post || post.category !== catSlug) return renderNotFound();
  const cat = getCategory(post.category);
  const related = getRelatedPosts(post);
  const s = shareLinks(post.title, `#/article/${post.category}/${post.slug}`);
  app.innerHTML = `
    <div class="container article-hero">
      <div class="breadcrumb">
        <a href="#/">Home</a> ${icon("arrow")} <a href="#/category/${cat.slug}">${esc(cat.name)}</a> ${icon("arrow")} <span>${esc(post.title)}</span>
      </div>
      <span class="card-cat">${icon("tag")} ${esc(cat.name)}</span>
      <h1 class="article-title">${esc(post.title)}</h1>
      <div class="article-meta-row">
        <div class="author-block">
          <div class="author-avatar">SK</div>
          <div><div class="author-name">${esc(post.author)}</div><div class="author-sub">Published ${esc(formatDate(post.date))} · ${esc(post.readingTime)}</div></div>
        </div>
        <div class="meta-spacer"></div>
        <div class="article-actions">
          <button class="btn btn-icon" id="shareBtn" title="Share">${icon("share")}</button>
          <button class="btn btn-icon" id="bookmarkBtn" title="Bookmark">${icon("bookmark")}</button>
        </div>
      </div>
      <div class="article-featured-media media ${post.image} glass"></div>
    </div>
    <div class="container">
      <div class="layout-with-sidebar">
        <div>
          <article class="article-body">
            ${post.content}
            <div class="article-tags">${post.tags.map((t) => `<span class="tag-pill">${esc(t)}</span>`).join("")}</div>
            <div class="share-bar">
              <span>Share this article:</span>
              <a class="btn btn-icon" href="${s.facebook}" target="_blank" rel="noopener">${icon("facebook")}</a>
              <a class="btn btn-icon" href="${s.whatsapp}" target="_blank" rel="noopener">${icon("whatsapp")}</a>
              <a class="btn btn-icon" href="${s.x}" target="_blank" rel="noopener">${icon("x")}</a>
              <button class="btn btn-icon" id="copyLinkBtn2">${icon("link")}</button>
            </div>
          </article>
          ${adSlot("Between-article placement", true)}
          <div class="section-head" style="margin-top:36px"><h2>Related posts</h2></div>
          <div class="grid">${related.map(cardTpl).join("")}</div>
          <div class="section-head" style="margin-top:36px"><h2>Recommended for you</h2></div>
          <div class="grid">${POSTS.filter((p) => p.slug !== post.slug).sort(() => 0.5 - Math.random()).slice(0, 3).map(cardTpl).join("")}</div>
        </div>
        ${sidebarTpl()}
      </div>
    </div>`;
  document.getElementById("shareBtn").addEventListener("click", () => shareContent(post.title, `#/article/${post.category}/${post.slug}`));
  document.getElementById("copyLinkBtn2").addEventListener("click", () => shareContent(post.title, `#/article/${post.category}/${post.slug}`));
  document.getElementById("bookmarkBtn").addEventListener("click", (e) => {
    const on = toggleSavedVisual("post:" + post.slug);
    e.currentTarget.style.color = on ? "var(--blue-bright)" : "";
    toast(on ? "Bookmarked" : "Removed from bookmarks");
  });
  setMeta({
    title: `${post.title} — ${SITE.name}`,
    description: post.excerpt,
    path: `/article/${post.category}/${post.slug}`,
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Organization", name: post.author },
      datePublished: post.date,
      publisher: { "@type": "Organization", name: SITE.name },
    },
  });
}

function renderAITools() {
  const cats = ["All", "Writing", "Image", "Video", "Audio", "Productivity", "Design", "Coding"];
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Directory</div>
      <h1>AI Tools</h1>
      <p>A growing directory of AI tools worth trying — filtered by what you actually need.</p>
    </header>
    <div class="container section" style="padding-top:0">
      <div class="tools-toolbar">
        <div class="filter-row" id="toolFilters">
          ${cats.map((c, i) => `<button class="category-pill ${i === 0 ? "active" : ""}" data-filter="${c}">${esc(c)}</button>`).join("")}
        </div>
        <div class="glass" style="display:flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;min-width:220px">
          ${icon("search")}<input id="toolSearch" placeholder="Search AI tools…" style="background:none;border:none;outline:none;color:var(--text);font-family:inherit;flex:1" />
        </div>
      </div>
      <div class="tools-grid" id="toolsGrid">${AI_TOOLS.map(toolCardTpl).join("")}</div>
    </div>`;
  let activeFilter = "All";
  function apply() {
    const q = document.getElementById("toolSearch").value.toLowerCase();
    const filtered = AI_TOOLS.filter((t) => (activeFilter === "All" || t.category === activeFilter) && (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)));
    document.getElementById("toolsGrid").innerHTML = filtered.length ? filtered.map(toolCardTpl).join("") : `<div class="empty-state">No tools match your search.</div>`;
  }
  document.getElementById("toolFilters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    document.querySelectorAll("#toolFilters .category-pill").forEach((p) => p.classList.toggle("active", p === btn));
    apply();
  });
  document.getElementById("toolSearch").addEventListener("input", apply);
  setMeta({ title: `AI Tools Directory — ${SITE.name}`, description: "Browse and filter AI tools for writing, image, video, audio, productivity, design and coding.", path: "/ai-tools" });
}

function renderVideos() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Watch</div>
      <h1>Watch SK Tech</h1>
      <p>Video breakdowns of the tips and tools we cover.</p>
    </header>
    <div class="container section" style="padding-top:0"><div class="video-grid">${VIDEOS.map(videoCardTpl).join("")}</div></div>`;
  setMeta({ title: `Videos — ${SITE.name}`, description: "Watch SK Tech 7 video breakdowns.", path: "/videos" });
  setActiveNav("videos");
}

function renderSearchPage(initialQ = "") {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Search</div>
      <h1>Search SK Tech 7</h1>
    </header>
    <div class="container">
      <div class="glass search-page-input">${icon("search")}<input id="pageSearchInput" placeholder="Search articles, visuals, AI tools, categories…" value="${esc(initialQ)}" /></div>
      <div id="pageSearchResults" class="grid"></div>
    </div>`;
  const input = document.getElementById("pageSearchInput");
  function run() {
    const results = searchAll(input.value);
    const el = document.getElementById("pageSearchResults");
    el.innerHTML = results.length ? results.map((r) => `
      <a class="card glass" href="${r.href}">
        <div class="media ${r.image}"></div>
        <div class="card-body"><span class="card-cat">${esc(r.type)}</span><h3 class="card-title">${esc(r.title)}</h3></div>
      </a>`).join("") : `<div class="empty-state">${input.value ? "No results found." : "Start typing to search."}</div>`;
  }
  input.addEventListener("input", run);
  run();
  setMeta({ title: `Search — ${SITE.name}`, description: "Search SK Tech 7 articles, visuals, AI tools and categories.", path: "/search" });
}

function renderAbout() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">About</div>
      <h1>About SK Tech 7</h1>
    </header>
    <div class="container section prose" style="padding-top:0">
      <p>SK Tech 7 shares practical, easy-to-follow technology content — the kind you can actually use the same day you read it.</p>
      <p>We cover technology news, AI tools, smartphone tips, computer tricks, apps, digital tools and future technology, explained simply and without unnecessary jargon.</p>
      <h2>What we cover</h2>
      <ul>
        <li>AI tools and how to use them well</li>
        <li>Smartphone, Android and iPhone tips</li>
        <li>Computer and Chrome tricks</li>
        <li>Apps, Canva and video editing shortcuts</li>
        <li>Internet tips, tech news and future technology</li>
      </ul>
      <h2>How we work</h2>
      <p>Content is produced by the SK Tech 7 team and reviewed for accuracy before publishing. We link to original sources where relevant and update posts when things change.</p>
    </div>`;
  setMeta({ title: `About — ${SITE.name}`, description: "Learn what SK Tech 7 covers and how the team works.", path: "/about" });
}

function renderContact() {
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Contact</div>
      <h1>Get in touch</h1>
      <p>Questions, tips or partnership ideas — we read every message.</p>
    </header>
    <div class="container section" style="padding-top:0">
      <div class="contact-grid">
        <form id="contactForm" class="glass" style="padding:28px">
          <div class="form-field"><label for="cName">Name</label><input id="cName" required /></div>
          <div class="form-field"><label for="cEmail">Email</label><input id="cEmail" type="email" required /></div>
          <div class="form-field"><label for="cMsg">Message</label><textarea id="cMsg" required></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">Send Message</button>
        </form>
        <div>
          <div class="glass sidebar-box">
            <h4>Follow SK Tech 7</h4>
            <div class="social-links">
              <a class="btn" href="#">${icon("facebook")} Facebook</a>
              <a class="btn" href="#">${icon("x")} X</a>
              <a class="btn" href="#">${icon("whatsapp")} WhatsApp</a>
            </div>
          </div>
          <div class="glass sidebar-box" style="margin-top:16px">
            <h4>Email</h4>
            <p style="margin:0">${icon("mail")} hello@sktech7.com</p>
          </div>
        </div>
      </div>
    </div>`;
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    toast("Message sent — thanks for reaching out!");
    e.target.reset();
  });
  setMeta({ title: `Contact — ${SITE.name}`, description: "Get in touch with the SK Tech 7 team.", path: "/contact" });
}

const LEGAL = {
  privacy: {
    title: "Privacy Policy",
    body: `
      <p>This Privacy Policy explains what information SK Tech 7 collects and how it's used.</p>
      <h2>Information we collect</h2>
      <p>We may collect basic analytics data (such as pages visited and general location) and any information you submit through the contact form.</p>
      <h2>How we use it</h2>
      <p>Information is used to improve the site, respond to messages, and understand which content is useful.</p>
      <h2>Cookies</h2>
      <p>We may use cookies for analytics and to remember basic preferences like saved posts.</p>
      <h2>Third parties</h2>
      <p>We may use third-party services (such as analytics or advertising providers) that collect data under their own privacy policies.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent through the Contact page.</p>`,
  },
  terms: {
    title: "Terms & Conditions",
    body: `
      <p>By using SK Tech 7, you agree to the following terms.</p>
      <h2>Use of content</h2>
      <p>Content on this site is for general informational purposes. You may share links to our articles, but republishing full content requires permission.</p>
      <h2>No guarantees</h2>
      <p>Tech tips and settings can change between software versions — we do our best to keep content current but can't guarantee every trick works on every device.</p>
      <h2>Changes</h2>
      <p>These terms may be updated periodically. Continued use of the site means you accept the current version.</p>`,
  },
  disclaimer: {
    title: "Disclaimer",
    body: `
      <p>The information on SK Tech 7 is provided for general informational purposes only.</p>
      <h2>Not professional advice</h2>
      <p>Nothing on this site should be treated as professional technical, legal or financial advice. Always verify critical settings changes on your own device before relying on them.</p>
      <h2>External links</h2>
      <p>We link to external tools and sites for convenience. We aren't responsible for the content or practices of external websites.</p>`,
  },
  "affiliate-disclosure": {
    title: "Affiliate Disclosure",
    body: `
      <p>SK Tech 7 may include affiliate links or sponsored content in some posts.</p>
      <h2>What this means</h2>
      <p>If you click certain links and make a purchase or sign up, we may earn a commission at no extra cost to you.</p>
      <h2>Our approach</h2>
      <p>We only recommend tools and products we believe are genuinely useful, and sponsored content is always labeled as such.</p>`,
  },
};
function renderLegal(key) {
  const page = LEGAL[key];
  if (!page) return renderNotFound();
  app.innerHTML = `
    <header class="page-header container">
      <div class="page-eyebrow">Legal</div>
      <h1>${esc(page.title)}</h1>
    </header>
    <div class="container section prose" style="padding-top:0">${page.body}</div>`;
  setMeta({ title: `${page.title} — ${SITE.name}`, description: `${page.title} for SK Tech 7.`, path: `/${key}` });
}

function renderNotFound() {
  app.innerHTML = `<div class="container section empty-state"><h2>Page not found</h2><p>That page doesn't exist.</p><a class="btn btn-primary" href="#/">Back to home</a></div>`;
  setMeta({ title: `Page not found — ${SITE.name}`, description: "Page not found.", path: "/404" });
}

function sidebarTpl() {
  const popular = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 4);
  return `
  <aside class="sidebar">
    ${adSlot("Sidebar", false)}
    <div class="glass sidebar-box">
      <h4>Popular this month</h4>
      <ul style="display:flex;flex-direction:column;gap:12px">
        ${popular.map((p) => `<li><a href="#/article/${p.category}/${p.slug}" style="display:flex;gap:10px;align-items:center">
          <div class="media ${p.image}" style="width:56px;height:56px;border-radius:8px;aspect-ratio:auto;flex-shrink:0"></div>
          <span style="font-size:.85rem;line-height:1.3">${esc(p.title)}</span>
        </a></li>`).join("")}
      </ul>
    </div>
    <div class="glass sidebar-box">
      <h4>AI Tool of the week</h4>
      <div class="tool-top" style="margin-bottom:10px">
        <div class="tool-logo ${AI_TOOLS[0].grad}">${esc(AI_TOOLS[0].name[0])}</div>
        <div><div class="tool-name" style="font-size:.9rem">${esc(AI_TOOLS[0].name)}</div><div class="tool-cat">${esc(AI_TOOLS[0].category)}</div></div>
      </div>
      <a class="btn btn-sm btn-primary btn-block" href="#/ai-tools">View AI Tools</a>
    </div>
    ${adSlot("Sidebar — sponsored", false)}
  </aside>`;
}

function bindVisualActions() {
  document.querySelectorAll("[data-share]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const vp = VISUAL_POSTS.find((v) => v.id === btn.dataset.share);
      if (vp) shareContent(vp.title, `#/visual/${vp.id}`);
    });
  });
  document.querySelectorAll("[data-save]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const on = toggleSavedVisual(btn.dataset.save);
      btn.style.color = on ? "var(--blue-bright)" : "";
      btn.style.borderColor = on ? "var(--blue-bright)" : "";
      toast(on ? "Saved" : "Removed from saved");
    });
  });
}

/* ---------------- Router ---------------- */
function router() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [path, query] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  window.scrollTo(0, 0);

  if (!parts.length) return renderHome();
  if (parts[0] === "latest") return renderLatest();
  if (parts[0] === "categories") return renderCategories();
  if (parts[0] === "category" && parts[1]) return renderCategory(parts[1]);
  if (parts[0] === "tips") return renderTips();
  if (parts[0] === "visuals") return renderVisuals();
  if (parts[0] === "visual" && parts[1]) return renderVisualDetail(parts[1]);
  if (parts[0] === "article" && parts[1] && parts[2]) return renderArticle(parts[1], parts[2]);
  if (parts[0] === "ai-tools") return renderAITools();
  if (parts[0] === "videos") return renderVideos();
  if (parts[0] === "search") return renderSearchPage(new URLSearchParams(query).get("q") || "");
  if (parts[0] === "about") return renderAbout();
  if (parts[0] === "contact") return renderContact();
  if (["privacy", "terms", "disclaimer", "affiliate-disclosure"].includes(parts[0])) return renderLegal(parts[0]);
  return renderNotFound();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  router();
});
