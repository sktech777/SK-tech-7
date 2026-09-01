/* Minimal inline icon set — no external requests needed. */
const ICON_PATHS = {
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  droid: '<path d="M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"/><path d="M9 5l-1.5-1.5M15 5l1.5-1.5M9 9V7M15 9V7"/><path d="M4 12v3M20 12v3"/>',
  apple: '<path d="M16.5 8c-1.2-1-2.3-1-3.5 0-1-.7-2.2-.7-3.2 0C7.5 9 7 11 8 13.5c1 2.5 2.5 5 3.5 5s1.4-.7 2.3-.7 1.3.7 2.3.7c1 0 2.3-2 3.2-4.2" /><path d="M13 4c.3-1 1-1.6 2-1.7-.1 1-.8 1.9-1.6 2.4" />',
  laptop: '<rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
  browser: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5M3 16l9 5 9-5"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" transform="scale(0.9) translate(1.3 1.3)"/>',
  news: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 8h6M7 12h10M7 16h10"/>',
  rocket: '<path d="M13 4c3 1 5 3 6 6-3 1-5 3-6 6-3-1-5-3-6-6 1-3 3-5 6-6Z"/><circle cx="13" cy="10" r="1.4"/><path d="M8 15l-3 5 5-3M13 16v3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.3 10.7 15.7 6.3M8.3 13.3l7.4 4.4"/>',
  bookmark: '<path d="M7 3h10a1 1 0 0 1 1 1v17l-6-4-6 4V4a1 1 0 0 1 1-1Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="M8 5v14l11-7-11-7Z"/>',
  home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-4-2 2-6 4 2Z"/>',
  tag: '<path d="M3 12V5a1 1 0 0 1 1-1h7l10 10-8 8L3 12Z"/><circle cx="8" cy="8" r="1.4"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  facebook: '<path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z"/>',
  whatsapp: '<path d="M6 18l1-3.5A7 7 0 1 1 10 18l-4 1Z"/><path d="M9 10c0 2.5 2.5 5 5 5"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  link: '<path d="M9 15 15 9"/><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1M13 18l-1 1a4 4 0 0 1-6-6l1-1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 7 8-7"/>',
  checkcircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
};

function icon(name, cls = "icon") {
  const p = ICON_PATHS[name] || ICON_PATHS.spark;
  return `<svg class="${cls}" viewBox="0 0 24 24">${p}</svg>`;
}
