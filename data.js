/* =========================================================
   SK TECH 7 — CONTENT DATA LAYER
   Add new content by pushing objects into these arrays.
   Every page (home, category, article, search, visuals,
   ai-tools) reads from this file — nothing is hard-coded
   per page. Replace SAMPLE data with real content anytime.
   ========================================================= */

const CATEGORIES = [
  { slug: "ai",            name: "AI Tools",       icon: "spark",  blurb: "AI apps, models and workflows worth your time." },
  { slug: "smartphone",    name: "Smartphone",     icon: "phone",  blurb: "Tips and tricks for the phone in your pocket." },
  { slug: "android",       name: "Android",        icon: "droid",  blurb: "Hidden settings, apps and Android know-how." },
  { slug: "iphone",        name: "iPhone",         icon: "apple",  blurb: "iOS features, shortcuts and iPhone tricks." },
  { slug: "computer",      name: "Computer",       icon: "laptop", blurb: "Windows, Mac and everyday computer tricks." },
  { slug: "chrome",        name: "Chrome",         icon: "browser",blurb: "Browser tricks, extensions and shortcuts." },
  { slug: "apps",          name: "Apps",           icon: "grid",   blurb: "Useful apps worth installing this week." },
  { slug: "canva",         name: "Canva",          icon: "layers", blurb: "Design tricks and templates in Canva." },
  { slug: "video-editing", name: "Video Editing",  icon: "film",   blurb: "Editing tips for creators, fast and free." },
  { slug: "internet-tips", name: "Internet Tips",  icon: "globe",  blurb: "Get more out of the internet, safely." },
  { slug: "tech-news",     name: "Tech News",      icon: "news",   blurb: "What's happening in tech right now." },
  { slug: "future-tech",   name: "Future Tech",    icon: "rocket", blurb: "What's coming next in technology." },
];

/* Post: title, slug, image(gradient key), category, excerpt,
   content(html string), author, date, readingTime, tags,
   featured, views, trending */
const POSTS = [
  {
    slug: "5-ai-tools-2026",
    title: "5 AI Tools That Will Actually Save You Time in 2026",
    category: "ai",
    image: "grad-1",
    excerpt: "From writing to video, these five tools cut real hours off your week — not just hype.",
    author: "SK Tech 7 Team",
    date: "2026-08-24",
    readingTime: "6 min read",
    tags: ["AI", "Productivity", "Tools"],
    featured: true,
    trending: true,
    views: 18400,
    content: `
      <p>Every year brings a flood of new AI launches, but only a handful actually change how you work day to day. Here are five that have earned a permanent spot in our toolkit.</p>
      <h2>1. A writing assistant that keeps your voice</h2>
      <p>Most writing tools flatten your tone into the same generic corporate voice. The better ones now let you feed in past writing so suggestions sound like you, not a template.</p>
      <h2>2. One-click background removal for video</h2>
      <p>What used to need a green screen and an editing suite now runs in the browser in seconds, using on-device models that don't need a powerful computer.</p>
      <h2>3. A research assistant that shows its sources</h2>
      <p>The difference between a useful research tool and a risky one is whether it links back to where an answer came from. Always check the sources before you trust the summary.</p>
      <h2>4. Meeting notes that actually get read</h2>
      <p>Transcription is old news — what matters now is a tool that pulls out decisions and action items automatically, so nobody has to re-read a 40 minute transcript.</p>
      <h2>5. An image tool built for quick social edits</h2>
      <p>Not every image needs a full design tool. A fast, mobile-first editor for resizing, cropping and cleaning up photos wins for everyday posting.</p>
      <p>None of these tools are perfect, and all of them are moving fast — treat this list as a starting point, not a final answer.</p>
    `,
  },
  {
    slug: "android-hidden-features",
    title: "10 Android Hidden Features Almost Nobody Uses",
    category: "android",
    image: "grad-2",
    excerpt: "Your Android phone can do more than you think. Here's what's buried in the settings.",
    author: "SK Tech 7 Team",
    date: "2026-08-20",
    readingTime: "5 min read",
    tags: ["Android", "Tips"],
    featured: false,
    trending: true,
    views: 22100,
    content: `
      <p>Android hides some genuinely useful features a few menus deep. Here are ten worth digging for.</p>
      <h2>Partial screenshots</h2>
      <p>Long-press the screenshot notification to scroll and capture an entire webpage or chat thread, not just what's visible.</p>
      <h2>App-specific notification control</h2>
      <p>You can mute individual notification types within a single app instead of turning off all alerts from it.</p>
      <h2>One-handed mode</h2>
      <p>Most phones have a hidden gesture to shrink the display for one-handed use — check your gesture settings.</p>
      <h2>Private space for sensitive apps</h2>
      <p>A separate, lockable space keeps certain apps out of your regular app drawer entirely.</p>
      <p>Try a few of these today — most take less than a minute to turn on.</p>
    `,
  },
  {
    slug: "chrome-download-trick",
    title: "The Chrome Trick That Fixes Slow Downloads",
    category: "chrome",
    image: "grad-3",
    excerpt: "One overlooked setting is usually the reason your downloads crawl. Here's the fix.",
    author: "SK Tech 7 Team",
    date: "2026-08-15",
    readingTime: "3 min read",
    tags: ["Chrome", "Internet Tips"],
    featured: false,
    trending: false,
    views: 9700,
    content: `
      <p>Slow downloads are rarely about your internet speed — they're usually about how the browser is handling the connection.</p>
      <h2>Check parallel downloading</h2>
      <p>Chrome can split a single file into multiple simultaneous connections. If this is switched off, large files crawl.</p>
      <h2>Clear out extensions quietly grabbing bandwidth</h2>
      <p>Some extensions scan every request in the background. Disabling unused ones often speeds things up immediately.</p>
      <h2>Use a fresh download location</h2>
      <p>A cluttered or near-full download folder can slow file writes. Pointing downloads to a clean folder helps more than people expect.</p>
    `,
  },
  {
    slug: "iphone-battery-tips",
    title: "iPhone Battery Draining Fast? Try This First",
    category: "iphone",
    image: "grad-4",
    excerpt: "Before you blame the battery, check these three settings most people miss.",
    author: "SK Tech 7 Team",
    date: "2026-08-10",
    readingTime: "4 min read",
    tags: ["iPhone", "Tips"],
    featured: false,
    trending: true,
    views: 15200,
    content: `
      <p>A sudden battery drop is usually one app or setting, not a failing battery.</p>
      <h2>Check Background App Refresh</h2>
      <p>Go into Settings and see which apps are refreshing content constantly in the background — this is the most common culprit.</p>
      <h2>Look at Screen Time's battery breakdown</h2>
      <p>Settings shows exactly which app used the most battery in the last 24 hours, which usually points straight at the problem.</p>
      <h2>Turn off Always-On Display temporarily</h2>
      <p>If your model has it, switching it off for a day is a quick way to test how much it's really costing you.</p>
    `,
  },
  {
    slug: "canva-free-templates",
    title: "Free Canva Templates That Look Premium",
    category: "canva",
    image: "grad-5",
    excerpt: "You don't need Canva Pro to design like a professional. Here's how to find the good free templates.",
    author: "SK Tech 7 Team",
    date: "2026-08-05",
    readingTime: "4 min read",
    tags: ["Canva", "Design"],
    featured: false,
    trending: false,
    views: 8300,
    content: `
      <p>Canva's free tier has more premium-looking templates than people realize — you just have to know where to filter.</p>
      <h2>Filter by "Free" before you fall in love with a design</h2>
      <p>Sort results by the free filter first so you're never disappointed by a paywalled template.</p>
      <h2>Reuse a strong layout across formats</h2>
      <p>Resize any design to different formats in one click, which is the fastest way to build a consistent look across your posts.</p>
    `,
  },
  {
    slug: "capcut-editing-tricks",
    title: "5 Video Editing Tricks You Can Learn in 10 Minutes",
    category: "video-editing",
    image: "grad-6",
    excerpt: "Small edits that make a huge difference in how professional your videos look.",
    author: "SK Tech 7 Team",
    date: "2026-07-29",
    readingTime: "5 min read",
    tags: ["Video Editing", "Creators"],
    featured: false,
    trending: false,
    views: 11400,
    content: `
      <p>You don't need years of editing experience to make your videos look sharp. Start with these.</p>
      <h2>Match cuts to the beat</h2>
      <p>Cutting on the beat of your background audio instantly makes pacing feel intentional.</p>
      <h2>Use jump cuts to remove dead air</h2>
      <p>Trimming pauses between sentences keeps talking-head videos feeling tight and energetic.</p>
      <h2>Add subtle zoom on key moments</h2>
      <p>A slow, small zoom on an important line draws the eye without feeling gimmicky.</p>
    `,
  },
  {
    slug: "windows-shortcuts-2026",
    title: "Windows Shortcuts That Will Save You Hours",
    category: "computer",
    image: "grad-7",
    excerpt: "Stop reaching for the mouse. These shortcuts cut real time off everyday tasks.",
    author: "SK Tech 7 Team",
    date: "2026-07-22",
    readingTime: "4 min read",
    tags: ["Computer", "Windows"],
    featured: false,
    trending: false,
    views: 10200,
    content: `
      <p>A handful of shortcuts handle most of what people do with a mouse every day.</p>
      <h2>Snap windows without dragging</h2>
      <p>Use the window-snap keys to arrange two or four windows side by side instantly.</p>
      <h2>Search instead of browsing folders</h2>
      <p>The built-in search is faster than digging through folders once you trust it.</p>
      <h2>Clipboard history</h2>
      <p>Turning on clipboard history lets you paste from anything you've copied recently, not just the last item.</p>
    `,
  },
  {
    slug: "future-of-ai-agents",
    title: "What AI Agents Actually Mean for Your Daily Life",
    category: "future-tech",
    image: "grad-8",
    excerpt: "Beyond the buzzword — a grounded look at how AI agents will change everyday tasks.",
    author: "SK Tech 7 Team",
    date: "2026-08-27",
    readingTime: "7 min read",
    tags: ["Future Tech", "AI"],
    featured: true,
    trending: true,
    views: 26800,
    content: `
      <p>"AI agent" gets used to describe everything from a chatbot to a fully autonomous assistant. Here's what's realistic in the near term.</p>
      <h2>Booking and scheduling get quietly automated</h2>
      <p>The clearest early win is agents handling multi-step bookings — comparing options and confirming — with a human approving the final choice.</p>
      <h2>Shopping comparisons get faster, not fully automatic</h2>
      <p>Expect agents to narrow choices and summarize trade-offs rather than complete purchases without you checking first.</p>
      <h2>Trust will be the real bottleneck</h2>
      <p>The technology is often ready before people are comfortable handing over control — adoption will follow trust, not capability.</p>
    `,
  },
  {
    slug: "tech-news-roundup-august",
    title: "This Week in Tech: What Actually Matters",
    category: "tech-news",
    image: "grad-9",
    excerpt: "Cutting through the noise — the stories worth actually knowing about this week.",
    author: "SK Tech 7 Team",
    date: "2026-08-29",
    readingTime: "5 min read",
    tags: ["Tech News"],
    featured: false,
    trending: true,
    views: 13900,
    content: `
      <p>A quick, no-fluff roundup of what mattered in tech this week.</p>
      <h2>Chip makers push for more on-device AI</h2>
      <p>Expect more processing to happen locally on your phone rather than in the cloud, which means faster responses and better privacy.</p>
      <h2>Browsers keep adding built-in AI features</h2>
      <p>Summarizing pages and answering questions inside the browser is becoming standard rather than an add-on.</p>
    `,
  },
  {
    slug: "best-free-apps-2026",
    title: "The Best Free Apps Nobody Talks About",
    category: "apps",
    image: "grad-10",
    excerpt: "Genuinely useful apps that don't need a subscription to be worth installing.",
    author: "SK Tech 7 Team",
    date: "2026-07-18",
    readingTime: "5 min read",
    tags: ["Apps"],
    featured: false,
    trending: false,
    views: 9100,
    content: `
      <p>Not every good app needs a subscription. Here are a few worth the install.</p>
      <h2>A scanner that actually cleans up documents</h2>
      <p>Good document scanning apps auto-crop and sharpen text, saving a trip to a real scanner.</p>
      <h2>An offline-first notes app</h2>
      <p>Notes that sync when you're online but never lock you out when you're not are worth the switch.</p>
    `,
  },
  {
    slug: "internet-privacy-basics",
    title: "5 Privacy Settings You Should Check Today",
    category: "internet-tips",
    image: "grad-11",
    excerpt: "A five-minute privacy check-up that closes the most common gaps.",
    author: "SK Tech 7 Team",
    date: "2026-07-10",
    readingTime: "4 min read",
    tags: ["Internet Tips", "Privacy"],
    featured: false,
    trending: false,
    views: 12700,
    content: `
      <p>Most privacy leaks come from a handful of default settings, not exotic hacks.</p>
      <h2>Review app permissions</h2>
      <p>Check which apps have access to your location, microphone and contacts — and remove anything that doesn't need it.</p>
      <h2>Turn on two-factor authentication</h2>
      <p>It's the single most effective step against account takeover, and takes minutes to set up.</p>
    `,
  },
];

/* Visual Post: image(gradient key), title, caption, category, date, tags */
const VISUAL_POSTS = [
  { id: "v1", image: "grad-3", title: "Split screen on Android", caption: "Drag any app to the edge of the screen to snap it instantly.", category: "android", date: "2026-08-28", tags: ["Android", "Tips"] },
  { id: "v2", image: "grad-6", title: "Hidden iPhone shortcut", caption: "Tap the back of your iPhone twice to trigger a custom action.", category: "iphone", date: "2026-08-27", tags: ["iPhone"] },
  { id: "v3", image: "grad-9", title: "Chrome tab groups", caption: "Right-click a tab and group it with related ones to declutter instantly.", category: "chrome", date: "2026-08-26", tags: ["Chrome"] },
  { id: "v4", image: "grad-1", title: "AI prompt structure", caption: "Give your prompt a role, a task and a format — every time.", category: "ai", date: "2026-08-25", tags: ["AI"] },
  { id: "v5", image: "grad-5", title: "Canva grid trick", caption: "Hold Alt while resizing to keep elements aligned to the grid.", category: "canva", date: "2026-08-24", tags: ["Canva"] },
  { id: "v6", image: "grad-8", title: "Fast crop in editing apps", caption: "Double-tap any clip on the timeline to open crop instantly.", category: "video-editing", date: "2026-08-23", tags: ["Video Editing"] },
  { id: "v7", image: "grad-2", title: "Windows clipboard history", caption: "Press Win + V to see everything you've copied recently.", category: "computer", date: "2026-08-22", tags: ["Computer"] },
  { id: "v8", image: "grad-11", title: "Private browsing shortcut", caption: "Ctrl/Cmd + Shift + N opens a private window instantly.", category: "internet-tips", date: "2026-08-21", tags: ["Internet Tips"] },
  { id: "v9", image: "grad-4", title: "App-specific mute", caption: "Long-press a notification to mute just that alert type.", category: "smartphone", date: "2026-08-20", tags: ["Smartphone"] },
  { id: "v10", image: "grad-7", title: "One-tap screen record", caption: "Add screen recording to your control center for instant access.", category: "smartphone", date: "2026-08-19", tags: ["Smartphone"] },
  { id: "v11", image: "grad-10", title: "AI image cleanup", caption: "Remove backgrounds from photos in one tap with on-device AI.", category: "ai", date: "2026-08-18", tags: ["AI"] },
  { id: "v12", image: "grad-2", title: "Android battery saver", caption: "Schedule battery saver to turn on automatically below 30%.", category: "android", date: "2026-08-17", tags: ["Android"] },
];

/* Quick Tech Tips: short cards */
const TIPS = [
  { id: "t1", title: "Double-tap to translate", body: "Select any text and double-tap for an instant on-screen translation.", category: "smartphone" },
  { id: "t2", title: "Screenshot the whole page", body: "Long-press your screenshot preview to capture a full scrolling page.", category: "android" },
  { id: "t3", title: "Undo send on email", body: "Most mail apps let you recall a sent email within a short window — turn it on.", category: "internet-tips" },
  { id: "t4", title: "Search inside a video", body: "Some platforms let you search spoken words inside a video's transcript.", category: "apps" },
  { id: "t5", title: "Batch rename files", body: "Select multiple files and rename them all at once with auto-numbering.", category: "computer" },
  { id: "t6", title: "Pin a tab forever", body: "Pinned browser tabs reopen automatically every time you relaunch.", category: "chrome" },
];

/* YouTube-style video cards */
const VIDEOS = [
  { id: "y1", title: "10 AI Tools You Haven't Tried Yet", image: "grad-1", duration: "8:42", url: "#" },
  { id: "y2", title: "iPhone vs Android: Hidden Features Compared", image: "grad-4", duration: "12:05", url: "#" },
  { id: "y3", title: "Speed Up Any Old Laptop in 10 Minutes", image: "grad-7", duration: "6:18", url: "#" },
  { id: "y4", title: "Canva Tricks Designers Don't Share", image: "grad-5", duration: "9:33", url: "#" },
];

/* AI Tool: name, logo(letter/grad), description, category, pricing(Free/Paid/Freemium), website */
const AI_TOOLS = [
  { name: "WriteFlow AI", category: "Writing", pricing: "Freemium", grad: "grad-1", description: "An AI writing assistant that learns your tone from past work instead of flattening it.", website: "#" },
  { name: "PixCraft", category: "Image", pricing: "Free", grad: "grad-2", description: "One-click background removal and upscaling for everyday photo edits.", website: "#" },
  { name: "ClipGenie", category: "Video", pricing: "Freemium", grad: "grad-3", description: "Auto-cuts long recordings into short, ready-to-post highlight clips.", website: "#" },
  { name: "VoicelyAI", category: "Audio", pricing: "Paid", grad: "grad-4", description: "Realistic text-to-speech voices for narration and video content.", website: "#" },
  { name: "TaskPilot", category: "Productivity", pricing: "Free", grad: "grad-5", description: "Turns a messy to-do list into a scheduled plan based on your calendar.", website: "#" },
  { name: "LayoutLab", category: "Design", pricing: "Freemium", grad: "grad-6", description: "Generates layout variations from a single design brief in seconds.", website: "#" },
  { name: "CodeMate", category: "Coding", pricing: "Freemium", grad: "grad-7", description: "An in-editor assistant that explains and refactors code as you write.", website: "#" },
  { name: "SummarEase", category: "Writing", pricing: "Free", grad: "grad-8", description: "Condenses long articles and PDFs into a clean, sourced summary.", website: "#" },
  { name: "FrameSnap", category: "Image", pricing: "Paid", grad: "grad-9", description: "Turns rough sketches into polished product mockups instantly.", website: "#" },
  { name: "AudioClean", category: "Audio", pricing: "Free", grad: "grad-10", description: "Removes background noise from recordings in one upload.", website: "#" },
  { name: "MeetingBrief", category: "Productivity", pricing: "Freemium", grad: "grad-11", description: "Turns meeting transcripts into decisions and action items automatically.", website: "#" },
  { name: "MotionKit", category: "Video", pricing: "Paid", grad: "grad-2", description: "Adds smooth motion graphics templates to any short-form video.", website: "#" },
];

/* Helpers -------------------------------------------------- */
function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
function getPostsByCategory(slug) {
  return POSTS.filter((p) => p.category === slug);
}
function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}
function getRelatedPosts(post, count = 3) {
  return POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, count);
}
function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
