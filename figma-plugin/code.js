/* global figma */

/* ============================================================
   My App — Figma design generator
   Run in a blank Figma file:
   Plugins → Development → Import plugin from manifest…
   ============================================================ */

const USERS = [
  { name: "Leanne Graham", email: "Sincere@april.biz", phone: "1-770-736-8031 x56442" },
  { name: "Ervin Howell", email: "Shanna@melissa.tv", phone: "010-692-6593 x09125" },
  { name: "Clementine Bauch", email: "Nathan@yesenia.net", phone: "1-463-123-4447" },
  { name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", phone: "493-170-9623 x156" },
  { name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca", phone: "(254)954-1289" },
  { name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info", phone: "1-477-935-8478 x6430" },
];

/* ---------- color helpers ---------- */

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function oklchToRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const enc = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  return { r: clamp01(enc(r)), g: clamp01(enc(g)), b: clamp01(enc(bb)) };
}

function OK(l, c, h) {
  return oklchToRgb(l / 100, c, h);
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255,
  };
}

function rgbToHex(rgb) {
  const to = (n) => Math.round(clamp01(n) * 255).toString(16).padStart(2, "0");
  return "#" + to(rgb.r) + to(rgb.g) + to(rgb.b);
}

function solid(rgb, opacity) {
  return {
    type: "SOLID",
    color: { r: rgb.r, g: rgb.g, b: rgb.b },
    opacity: opacity == null ? 1 : opacity,
  };
}

/* ---------- daisyUI tokens (same values as daisyui/theme/*.css) ---------- */

const LIGHT = {
  theme: "light",
  screenBg: hexToRgb("#ffffff"),
  base100: OK(100, 0, 0),
  base200: OK(98, 0, 0),
  base300: OK(95, 0, 0),
  baseContent: OK(21, 0.006, 285.885),
  primary: OK(45, 0.24, 277.023),
  primaryContent: OK(93, 0.034, 272.788),
  secondary: OK(65, 0.241, 354.308),
  secondaryContent: OK(94, 0.028, 342.258),
  accent: OK(77, 0.152, 181.912),
  accentContent: OK(38, 0.063, 188.416),
  neutral: OK(14, 0.005, 285.823),
  neutralContent: OK(92, 0.004, 286.32),
  info: OK(74, 0.16, 232.661),
  infoContent: OK(29, 0.066, 243.157),
  success: OK(76, 0.177, 163.223),
  successContent: OK(37, 0.077, 168.94),
  warning: OK(82, 0.189, 84.429),
  warningContent: OK(41, 0.112, 45.904),
  error: OK(71, 0.194, 13.428),
  errorContent: OK(27, 0.105, 12.094),
};

const DARK = {
  theme: "dark",
  screenBg: hexToRgb("#0a0a0a"),
  base100: OK(25.33, 0.016, 252.42),
  base200: OK(23.26, 0.014, 253.1),
  base300: OK(21.15, 0.012, 254.09),
  baseContent: OK(97.807, 0.029, 256.847),
  primary: OK(58, 0.233, 277.117),
  primaryContent: OK(96, 0.018, 272.314),
  secondary: OK(65, 0.241, 354.308),
  secondaryContent: OK(94, 0.028, 342.258),
  accent: OK(77, 0.152, 181.912),
  accentContent: OK(38, 0.063, 188.416),
  neutral: OK(14, 0.005, 285.823),
  neutralContent: OK(92, 0.004, 286.32),
  info: OK(74, 0.16, 232.661),
  infoContent: OK(29, 0.066, 243.157),
  success: OK(76, 0.177, 163.223),
  successContent: OK(37, 0.077, 168.94),
  warning: OK(82, 0.189, 84.429),
  warningContent: OK(41, 0.112, 45.904),
  error: OK(71, 0.194, 13.428),
  errorContent: OK(27, 0.105, 12.094),
};

const TOKENS = { light: LIGHT, dark: DARK };

const TYPE = {
  display: { size: 40, lh: 48 },
  h1: { size: 32, lh: 40 },
  h2: { size: 24, lh: 32 },
  h3: { size: 20, lh: 28 },
  body: { size: 16, lh: 24 },
  small: { size: 14, lh: 20 },
  tiny: { size: 12, lh: 16 },
};

const RADIUS = { field: 4, box: 8, selector: 8, pill: 999 };

const ICON_HAMBURGER = '<path d="M4 6h16M4 12h8m-8 6h16"/>';
const ICON_HOME =
  '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>';
const ICON_SETTINGS =
  '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>';
const ICON_TOGGLE =
  '<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/><path d="M9 4v16"/><path d="M14 10l2 2l-2 2"/>';

let FONTS = null;

/* ---------- node primitives ---------- */

function configureAutoLayout(node, dir, opts) {
  opts = opts || {};
  const fixedW = opts.w != null;
  const fixedH = opts.h != null;
  node.layoutMode = dir;
  node.primaryAxisSizingMode = (dir === "VERTICAL" ? fixedH : fixedW) ? "FIXED" : "AUTO";
  node.counterAxisSizingMode = (dir === "VERTICAL" ? fixedW : fixedH) ? "FIXED" : "AUTO";
  node.primaryAxisAlignItems = opts.justify || "MIN";
  node.counterAxisAlignItems = opts.align || "MIN";
  node.paddingTop = opts.pt != null ? opts.pt : opts.p != null ? opts.p : 0;
  node.paddingRight = opts.pr != null ? opts.pr : opts.p != null ? opts.p : 0;
  node.paddingBottom = opts.pb != null ? opts.pb : opts.p != null ? opts.p : 0;
  node.paddingLeft = opts.pl != null ? opts.pl : opts.p != null ? opts.p : 0;
  node.itemSpacing = opts.gap != null ? opts.gap : 0;
  if (opts.wrap) {
    node.layoutWrap = "WRAP";
    node.counterAxisSpacing = opts.rowGap != null ? opts.rowGap : opts.gap != null ? opts.gap : 0;
    node.counterAxisAlignContent = "AUTO";
  }
  if (fixedW || fixedH) {
    node.resize(opts.w != null ? opts.w : node.width, opts.h != null ? opts.h : node.height);
  }
}

function baseNode(node, name, opts) {
  opts = opts || {};
  node.name = name;
  node.fills = opts.fill ? [solid(opts.fill, opts.fillOpacity)] : [];
  if (opts.stroke) {
    node.strokes = [solid(opts.stroke)];
    node.strokeWeight = opts.strokeWeight != null ? opts.strokeWeight : 1;
    node.strokeAlign = "INSIDE";
  }
  if (opts.radius != null) node.cornerRadius = opts.radius;
  if (opts.shadow) node.effects = [opts.shadow];
  node.clipsContent = opts.clip != null ? opts.clip : false;
  if (opts.dir) configureAutoLayout(node, opts.dir, opts);
  else if (opts.w != null || opts.h != null) {
    node.resize(opts.w != null ? opts.w : node.width, opts.h != null ? opts.h : node.height);
  }
  return node;
}

function autoFrame(name, opts) {
  return baseNode(figma.createFrame(), name, opts);
}

function autoComponent(name, opts) {
  return baseNode(figma.createComponent(), name, opts);
}

function addText(parent, name, chars, font, size, color, opts) {
  opts = opts || {};
  const t = figma.createText();
  t.name = name;
  t.fontName = font;
  t.characters = chars;
  t.fontSize = size;
  t.lineHeight = { unit: "PIXELS", value: opts.lh != null ? opts.lh : Math.round(size * 1.4) };
  t.fills = [solid(color, opts.opacity)];
  if (opts.tracking != null) t.letterSpacing = { unit: "PERCENT", value: opts.tracking };
  if (opts.align) t.textAlignHorizontal = opts.align;
  t.textAutoResize = opts.fill ? "HEIGHT" : "WIDTH_AND_HEIGHT";
  parent.appendChild(t);
  if (opts.fill) t.layoutSizingHorizontal = "FILL";
  return t;
}

function spacer(parent, h) {
  const s = figma.createFrame();
  s.name = "Spacer";
  s.fills = [];
  s.resize(1, h);
  parent.appendChild(s);
  s.layoutSizingHorizontal = "FILL";
  return s;
}

function svgIcon(paths, colorHex, size) {
  const s = size || 16;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    s +
    '" height="' +
    s +
    '" viewBox="0 0 24 24" fill="none" stroke="' +
    colorHex +
    '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    paths +
    "</svg>";
  const node = figma.createNodeFromSvg(svg);
  node.name = "Icon";
  return node;
}

function shadowStyle() {
  return {
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    offset: { x: 0, y: 1 },
    radius: 2,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
  };
}

/* ---------- shared builders ---------- */

function buttonInto(node, label, variant, t) {
  const bg = variant === "primary" ? t.primary : variant === "ghost" ? null : t.base200;
  const fg = variant === "primary" ? t.primaryContent : t.baseContent;
  node.name = "Button/" + variant;
  node.fills = bg ? [solid(bg)] : [];
  if (variant === "default") {
    node.strokes = [solid(t.base300)];
    node.strokeWeight = 1;
    node.strokeAlign = "INSIDE";
  }
  node.cornerRadius = RADIUS.field;
  node.layoutMode = "HORIZONTAL";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "FIXED";
  node.primaryAxisAlignItems = "CENTER";
  node.counterAxisAlignItems = "CENTER";
  node.paddingLeft = 16;
  node.paddingRight = 16;
  node.itemSpacing = 0;
  node.resize(node.width, 48);
  addText(node, "Label", label, FONTS.semibold, TYPE.small.size, fg, { lh: TYPE.small.lh });
  return node;
}

function buttonNode(label, variant, t) {
  return buttonInto(figma.createFrame(), label, variant, t);
}

function navbarInto(node, t, platform) {
  const w = platform === "desktop" ? 1440 : 390;
  node.name = "Navbar/" + platform + "/" + t.theme;
  node.fills = [solid(t.base100)];
  node.effects = [shadowStyle()];
  node.clipsContent = false;
  node.layoutMode = "HORIZONTAL";
  node.primaryAxisSizingMode = "FIXED";
  node.counterAxisSizingMode = "FIXED";
  node.primaryAxisAlignItems = "MIN";
  node.counterAxisAlignItems = "CENTER";
  node.paddingLeft = 16;
  node.paddingRight = 16;
  node.paddingTop = 8;
  node.paddingBottom = 8;
  node.itemSpacing = 8;
  node.resize(w, 64);

  const left = autoFrame("Navbar Start", { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  node.appendChild(left);
  left.layoutGrow = 1;
  if (platform === "mobile") {
    left.appendChild(svgIcon(ICON_HAMBURGER, rgbToHex(t.baseContent), 20));
  }
  addText(left, "Brand", "daisyUI", FONTS.semibold, TYPE.h3.size, t.baseContent, { lh: TYPE.h3.lh });

  if (platform === "desktop") {
    const center = autoFrame("Navbar Center", { dir: "HORIZONTAL", gap: 4, align: "CENTER", justify: "CENTER" });
    node.appendChild(center);
    center.layoutGrow = 1;
    addText(center, "Link Dashboard", "Dashboard", FONTS.medium, TYPE.small.size, t.baseContent, {
      lh: TYPE.small.lh,
      opacity: 0.8,
    });
    addText(center, "Link Home", "Home", FONTS.medium, TYPE.small.size, t.baseContent, {
      lh: TYPE.small.lh,
      opacity: 0.8,
    });
  }

  const right = autoFrame("Navbar End", { dir: "HORIZONTAL", align: "CENTER", justify: "MAX" });
  node.appendChild(right);
  right.layoutGrow = 1;
  right.appendChild(buttonNode("Button", "default", t));

  return node;
}

function sidebarInto(node, t, height) {
  node.name = "Sidebar/" + t.theme;
  node.fills = [solid(t.base200)];
  node.layoutMode = "VERTICAL";
  node.primaryAxisSizingMode = "FIXED";
  node.counterAxisSizingMode = "FIXED";
  node.paddingTop = 8;
  node.paddingBottom = 8;
  node.paddingLeft = 8;
  node.paddingRight = 8;
  node.itemSpacing = 4;
  node.resize(256, height);

  const items = [
    { label: "Homepage", icon: ICON_HOME, active: true },
    { label: "Settings", icon: ICON_SETTINGS, active: false },
  ];
  for (const it of items) {
    const row = autoFrame("Menu/" + it.label, {
      dir: "HORIZONTAL",
      w: 240,
      h: 44,
      radius: RADIUS.field,
      gap: 12,
      pl: 12,
      pr: 12,
      align: "CENTER",
      fill: it.active ? t.base300 : null,
    });
    node.appendChild(row);
    row.appendChild(svgIcon(it.icon, rgbToHex(t.baseContent), 16));
    addText(row, "Label", it.label, it.active ? FONTS.semibold : FONTS.medium, TYPE.small.size, t.baseContent, {
      lh: TYPE.small.lh,
    });
  }
  return node;
}

function buildSidebar(t, height) {
  return sidebarInto(figma.createFrame(), t, height);
}

function userCardInto(node, user, t, width) {
  node.name = "UserCard/" + user.name;
  node.fills = [solid(t.base100)];
  node.strokes = [solid(t.base300)];
  node.strokeWeight = 1;
  node.strokeAlign = "INSIDE";
  node.cornerRadius = RADIUS.box;
  node.layoutMode = "VERTICAL";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "FIXED";
  node.primaryAxisAlignItems = "MIN";
  node.counterAxisAlignItems = "MIN";
  node.paddingTop = 16;
  node.paddingBottom = 16;
  node.paddingLeft = 16;
  node.paddingRight = 16;
  node.itemSpacing = 8;
  node.resize(width, node.height);

  addText(node, "Name", user.name, FONTS.semibold, TYPE.h3.size, t.baseContent, { lh: TYPE.h3.lh });
  addText(node, "Email", user.email, FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.65,
  });
  addText(node, "Phone", user.phone, FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.65,
  });
  node.appendChild(buttonNode("View Details", "primary", t));
  return node;
}

function buildUserCard(user, t, width) {
  return userCardInto(figma.createFrame(), user, t, width);
}

/* ---------- small helpers ---------- */

function rect(w, h, rgb, radius) {
  const r = figma.createRectangle();
  r.name = "Rectangle";
  r.resize(w, h);
  r.fills = rgb ? [solid(rgb)] : [];
  if (radius != null) r.cornerRadius = radius;
  return r;
}

function pageRoot(page, name, fill) {
  const root = autoFrame(name + " Page", {
    dir: "VERTICAL",
    p: 64,
    gap: 32,
    w: 1800,
    fill: fill,
  });
  page.appendChild(root);
  root.x = 0;
  root.y = 0;
  return root;
}

function section(parent, title) {
  const s = autoFrame("Section/" + title, { dir: "VERTICAL", gap: 16 });
  parent.appendChild(s);
  s.layoutSizingHorizontal = "FILL";
  addText(s, "Section Title", title, FONTS.semibold, TYPE.h3.size, LIGHT.baseContent, { lh: TYPE.h3.lh });
  return s;
}

function labeledItem(label, node) {
  const wrap = autoFrame("Item/" + label, { dir: "VERTICAL", gap: 8 });
  addText(wrap, "Item Label", label, FONTS.medium, TYPE.tiny.size, hexToRgb("#666666"), { lh: TYPE.tiny.lh });
  wrap.appendChild(node);
  return wrap;
}

function swatch(rgb, name) {
  const item = autoFrame("Swatch/" + name, { dir: "VERTICAL", gap: 6, w: 150 });
  const chip = autoFrame("Chip", { w: 150, h: 72, radius: RADIUS.box, fill: rgb });
  chip.strokes = [solid(hexToRgb("#e5e5e5"))];
  chip.strokeWeight = 1;
  chip.strokeAlign = "INSIDE";
  item.appendChild(chip);
  addText(item, "Name", name, FONTS.medium, TYPE.tiny.size, hexToRgb("#333333"), { lh: TYPE.tiny.lh });
  addText(item, "Hex", rgbToHex(rgb), FONTS.regular, 11, hexToRgb("#888888"), { lh: 14 });
  return item;
}

/* ---------- empty state ---------- */

function emptyStateInto(node, t, title, subtitle, action) {
  node.name = "EmptyState/" + t.theme;
  node.fills = [solid(t.base100)];
  node.strokes = [solid(t.base300)];
  node.strokeWeight = 1;
  node.strokeAlign = "INSIDE";
  node.cornerRadius = RADIUS.box;
  node.layoutMode = "VERTICAL";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "FIXED";
  node.primaryAxisAlignItems = "CENTER";
  node.counterAxisAlignItems = "CENTER";
  node.paddingTop = 32;
  node.paddingBottom = 32;
  node.paddingLeft = 32;
  node.paddingRight = 32;
  node.itemSpacing = 12;
  node.resize(360, node.height);

  const circle = autoFrame("Icon Circle", {
    dir: "HORIZONTAL",
    w: 56,
    h: 56,
    radius: 28,
    fill: t.base200,
    justify: "CENTER",
    align: "CENTER",
  });
  node.appendChild(circle);
  addText(circle, "Icon", "?", FONTS.semibold, TYPE.h2.size, t.baseContent, { lh: TYPE.h2.lh });

  addText(node, "Title", title, FONTS.semibold, TYPE.h3.size, t.baseContent, { lh: TYPE.h3.lh });
  addText(node, "Subtitle", subtitle, FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.6,
    align: "CENTER",
    fill: true,
  });
  node.appendChild(buttonNode(action, "primary", t));
  return node;
}

/* ---------- masters ---------- */

function navbarMaster(t, platform) {
  const c = autoComponent("Navbar/" + platform + "/" + t.theme);
  navbarInto(c, t, platform);
  return c;
}

function sidebarMaster(t) {
  const c = autoComponent("Sidebar/" + t.theme);
  sidebarInto(c, t, 360);
  return c;
}

function userCardMaster(t) {
  const c = autoComponent("UserCard/" + t.theme);
  userCardInto(c, USERS[0], t, 453);
  return c;
}

function buttonMaster(variant, t) {
  const c = autoComponent("Button/" + variant + "/" + t.theme);
  buttonInto(c, variant === "primary" ? "View Details" : "Button", variant, t);
  return c;
}

function emptyStateMaster(t) {
  const c = autoComponent("EmptyState/" + t.theme);
  emptyStateInto(c, t, "No users found", "Try refreshing the list.", "Refresh");
  return c;
}

function buildMasters() {
  return {
    navbarDesktop: { light: navbarMaster(LIGHT, "desktop"), dark: navbarMaster(DARK, "desktop") },
    navbarMobile: { light: navbarMaster(LIGHT, "mobile"), dark: navbarMaster(DARK, "mobile") },
    sidebar: { light: sidebarMaster(LIGHT), dark: sidebarMaster(DARK) },
    userCard: { light: userCardMaster(LIGHT), dark: userCardMaster(DARK) },
    emptyState: { light: emptyStateMaster(LIGHT), dark: emptyStateMaster(DARK) },
    buttons: {
      light: {
        primary: buttonMaster("primary", LIGHT),
        default: buttonMaster("default", LIGHT),
        ghost: buttonMaster("ghost", LIGHT),
      },
      dark: {
        primary: buttonMaster("primary", DARK),
        default: buttonMaster("default", DARK),
        ghost: buttonMaster("ghost", DARK),
      },
    },
  };
}

/* ---------- styles ---------- */

function clearOldStyles() {
  for (const s of figma.getLocalPaintStyles()) {
    if (s.name.indexOf("App/") === 0) s.remove();
  }
  for (const s of figma.getLocalTextStyles()) {
    if (s.name.indexOf("App/") === 0) s.remove();
  }
  for (const s of figma.getLocalEffectStyles()) {
    if (s.name.indexOf("App/") === 0) s.remove();
  }
}

function createStyles() {
  clearOldStyles();

  const paint = (name, rgb) => {
    const s = figma.createPaintStyle();
    s.name = "App/" + name;
    s.paints = [solid(rgb)];
    return s;
  };
  const text = (name, font, size, lh, tracking) => {
    const s = figma.createTextStyle();
    s.name = "App/" + name;
    s.fontName = font;
    s.fontSize = size;
    s.lineHeight = { unit: "PIXELS", value: lh };
    if (tracking != null) s.letterSpacing = { unit: "PERCENT", value: tracking };
    return s;
  };
  const effect = (name, sh) => {
    const s = figma.createEffectStyle();
    s.name = "App/" + name;
    s.effects = [sh];
    return s;
  };

  for (const theme of ["light", "dark"]) {
    const t = TOKENS[theme];
    const keys = [
      "base100", "base200", "base300", "baseContent", "primary", "primaryContent",
      "secondary", "secondaryContent", "accent", "accentContent", "neutral",
      "neutralContent", "info", "infoContent", "success", "successContent",
      "warning", "warningContent", "error", "errorContent",
    ];
    for (const k of keys) paint("Color/" + theme + "/" + k, t[k]);
  }

  text("Type/Display", FONTS.bold, TYPE.display.size, TYPE.display.lh);
  text("Type/H1", FONTS.bold, TYPE.h1.size, TYPE.h1.lh);
  text("Type/H2", FONTS.semibold, TYPE.h2.size, TYPE.h2.lh);
  text("Type/H3", FONTS.semibold, TYPE.h3.size, TYPE.h3.lh);
  text("Type/Body", FONTS.regular, TYPE.body.size, TYPE.body.lh);
  text("Type/Small", FONTS.regular, TYPE.small.size, TYPE.small.lh);
  text("Type/Tiny", FONTS.regular, TYPE.tiny.size, TYPE.tiny.lh);
  text("Type/Button", FONTS.semibold, TYPE.small.size, TYPE.small.lh);
  text("Type/Brand", FONTS.semibold, TYPE.h3.size, TYPE.h3.lh);

  effect("Shadow/SM", shadowStyle());
}

/* ---------- cover ---------- */

function buildCover(page) {
  const root = autoFrame("Cover", {
    dir: "VERTICAL",
    w: 1200,
    h: 800,
    p: 80,
    gap: 20,
    fill: LIGHT.base100,
  });
  page.appendChild(root);
  root.x = 0;
  root.y = 0;

  addText(root, "Kicker", "DESIGN SYSTEM", FONTS.semibold, TYPE.small.size, LIGHT.primary, {
    lh: TYPE.small.lh,
    tracking: 12,
  });
  addText(root, "Title", "My App", FONTS.bold, 72, LIGHT.baseContent, { lh: 80 });
  addText(root, "Subtitle", "Design system, components & screens", FONTS.regular, TYPE.h2.size, LIGHT.baseContent, {
    lh: TYPE.h2.lh,
    opacity: 0.7,
  });
  addText(
    root,
    "Meta",
    "Generated from the current app · Next.js 16 · Tailwind CSS v4 · daisyUI v5",
    FONTS.regular,
    TYPE.small.size,
    LIGHT.baseContent,
    { lh: TYPE.small.lh, opacity: 0.55 }
  );

  spacer(root, 24);

  const chips = autoFrame("Color Chips", { dir: "HORIZONTAL", gap: 12 });
  root.appendChild(chips);
  const chipDefs = [
    ["Primary", LIGHT.primary],
    ["Secondary", LIGHT.secondary],
    ["Accent", LIGHT.accent],
    ["Base 300", LIGHT.base300],
  ];
  for (const def of chipDefs) {
    const item = autoFrame("Chip/" + def[0], { dir: "VERTICAL", gap: 8 });
    chips.appendChild(item);
    item.appendChild(rect(140, 80, def[1], 12));
    addText(item, "Label", def[0], FONTS.medium, TYPE.tiny.size, LIGHT.baseContent, {
      lh: TYPE.tiny.lh,
      opacity: 0.7,
    });
  }

  spacer(root, 24);

  const bottom = autoFrame("Cover Footer", { dir: "HORIZONTAL", gap: 48 });
  root.appendChild(bottom);
  addText(bottom, "Light", "Light + Dark", FONTS.medium, TYPE.small.size, LIGHT.baseContent, { lh: TYPE.small.lh });
  addText(bottom, "Screens", "6 screens · Desktop + Mobile", FONTS.medium, TYPE.small.size, LIGHT.baseContent, {
    lh: TYPE.small.lh,
  });
  addText(bottom, "Pages", "7 pages", FONTS.medium, TYPE.small.size, LIGHT.baseContent, { lh: TYPE.small.lh });

  return root;
}

/* ---------- foundations ---------- */

function buildFoundations(page) {
  const root = pageRoot(page, "Foundations", LIGHT.base100);
  addText(root, "Page Title", "Foundations", FONTS.bold, TYPE.display.size, LIGHT.baseContent, {
    lh: TYPE.display.lh,
  });
  addText(
    root,
    "Page Subtitle",
    "Color, type, spacing, radius and elevation pulled from the app's daisyUI theme.",
    FONTS.regular,
    TYPE.body.size,
    LIGHT.baseContent,
    { lh: TYPE.body.lh, opacity: 0.65 }
  );

  const colorKeys = [
    "base100", "base200", "base300", "baseContent", "primary", "primaryContent",
    "secondary", "accent", "neutral", "info", "success", "warning", "error",
  ];

  const lightColors = section(root, "Color — Light");
  const lightRow = autoFrame("Light Swatches", { dir: "HORIZONTAL", wrap: true, gap: 16, rowGap: 16 });
  lightColors.appendChild(lightRow);
  lightRow.layoutSizingHorizontal = "FILL";
  for (const k of colorKeys) lightRow.appendChild(swatch(LIGHT[k], k));

  const darkColors = section(root, "Color — Dark");
  const darkRow = autoFrame("Dark Swatches", { dir: "HORIZONTAL", wrap: true, gap: 16, rowGap: 16 });
  darkColors.appendChild(darkRow);
  darkRow.layoutSizingHorizontal = "FILL";
  for (const k of colorKeys) darkRow.appendChild(swatch(DARK[k], k));

  const typo = section(root, "Typography");
  const typeDefs = [
    ["Display / 40", FONTS.bold, TYPE.display],
    ["H1 / 32", FONTS.bold, TYPE.h1],
    ["H2 / 24", FONTS.semibold, TYPE.h2],
    ["H3 / 20", FONTS.semibold, TYPE.h3],
    ["Body / 16", FONTS.regular, TYPE.body],
    ["Small / 14", FONTS.regular, TYPE.small],
    ["Tiny / 12", FONTS.regular, TYPE.tiny],
  ];
  for (const def of typeDefs) {
    const row = autoFrame("Type Row", { dir: "HORIZONTAL", gap: 24, align: "CENTER" });
    typo.appendChild(row);
    row.layoutSizingHorizontal = "FILL";
    const labelWrap = autoFrame("Label Wrap", { dir: "HORIZONTAL", w: 180, align: "CENTER" });
    row.appendChild(labelWrap);
    addText(labelWrap, "Label", def[0], FONTS.medium, TYPE.tiny.size, LIGHT.baseContent, {
      lh: TYPE.tiny.lh,
      opacity: 0.5,
    });
    addText(row, "Sample", "The quick brown fox", def[1], def[2].size, LIGHT.baseContent, { lh: def[2].lh });
  }

  const spacing = section(root, "Spacing");
  const spaceRow = autoFrame("Spacing Row", { dir: "HORIZONTAL", gap: 24, align: "CENTER" });
  spacing.appendChild(spaceRow);
  for (const n of [4, 8, 12, 16, 24, 32, 48, 64]) {
    const item = autoFrame("Space/" + n, { dir: "VERTICAL", gap: 8, align: "CENTER" });
    spaceRow.appendChild(item);
    item.appendChild(rect(n, 24, LIGHT.primary, 4));
    addText(item, "Label", String(n), FONTS.regular, 11, LIGHT.baseContent, { lh: 14, opacity: 0.6 });
  }

  const radius = section(root, "Radius");
  const radiusRow = autoFrame("Radius Row", { dir: "HORIZONTAL", gap: 24, align: "CENTER" });
  radius.appendChild(radiusRow);
  const radiusDefs = [
    ["Field / 4", 4],
    ["Box / 8", 8],
    ["Pill / 999", 999],
  ];
  for (const def of radiusDefs) {
    const item = autoFrame("Radius/" + def[0], { dir: "VERTICAL", gap: 8, align: "CENTER" });
    radiusRow.appendChild(item);
    const sq = rect(96, 96, LIGHT.base200, def[1]);
    sq.strokes = [solid(LIGHT.base300)];
    sq.strokeWeight = 1;
    item.appendChild(sq);
    addText(item, "Label", def[0], FONTS.regular, 11, LIGHT.baseContent, { lh: 14, opacity: 0.6 });
  }

  const elevation = section(root, "Elevation");
  const elevRow = autoFrame("Elevation Row", { dir: "HORIZONTAL", gap: 24 });
  elevation.appendChild(elevRow);
  const shadowCard = autoFrame("Shadow SM", {
    dir: "VERTICAL",
    w: 240,
    h: 120,
    p: 16,
    gap: 8,
    fill: LIGHT.base100,
    radius: RADIUS.box,
    shadow: shadowStyle(),
  });
  elevRow.appendChild(shadowCard);
  addText(shadowCard, "Label", "shadow-sm", FONTS.medium, TYPE.tiny.size, LIGHT.baseContent, { lh: TYPE.tiny.lh });
  addText(shadowCard, "Desc", "Navbar, dropdown", FONTS.regular, 11, LIGHT.baseContent, { lh: 14, opacity: 0.6 });

  return root;
}

/* ---------- components gallery ---------- */

function row(parent, gap) {
  const r = autoFrame("Row", { dir: "HORIZONTAL", wrap: true, gap: gap || 24, rowGap: 32, align: "MIN" });
  parent.appendChild(r);
  r.layoutSizingHorizontal = "FILL";
  return r;
}

function buildComponentsPage(page, masters) {
  const root = pageRoot(page, "Components", hexToRgb("#f4f4f5"));
  addText(root, "Page Title", "Components", FONTS.bold, TYPE.display.size, LIGHT.baseContent, {
    lh: TYPE.display.lh,
  });
  addText(
    root,
    "Page Subtitle",
    "Master components used across the screens, with light and dark variants.",
    FONTS.regular,
    TYPE.body.size,
    LIGHT.baseContent,
    { lh: TYPE.body.lh, opacity: 0.65 }
  );

  const nav = section(root, "Navigation");
  const desktopNav = autoFrame("Desktop Navbars", { dir: "VERTICAL", gap: 24 });
  nav.appendChild(desktopNav);
  desktopNav.layoutSizingHorizontal = "FILL";
  desktopNav.appendChild(labeledItem("Navbar / Desktop / Light", masters.navbarDesktop.light));
  desktopNav.appendChild(labeledItem("Navbar / Desktop / Dark", masters.navbarDesktop.dark));

  const mobileNav = row(nav);
  mobileNav.appendChild(labeledItem("Navbar / Mobile / Light", masters.navbarMobile.light));
  mobileNav.appendChild(labeledItem("Navbar / Mobile / Dark", masters.navbarMobile.dark));

  const dash = section(root, "Dashboard");
  const dashRow = row(dash);
  dashRow.appendChild(labeledItem("Sidebar / Light", masters.sidebar.light));
  dashRow.appendChild(labeledItem("Sidebar / Dark", masters.sidebar.dark));

  const cards = section(root, "Cards");
  const cardRow = row(cards);
  cardRow.appendChild(labeledItem("User Card / Light", masters.userCard.light));
  cardRow.appendChild(labeledItem("User Card / Dark", masters.userCard.dark));

  const actions = section(root, "Actions");
  const lightBtns = row(actions);
  lightBtns.appendChild(labeledItem("Primary / Light", masters.buttons.light.primary));
  lightBtns.appendChild(labeledItem("Default / Light", masters.buttons.light.default));
  lightBtns.appendChild(labeledItem("Ghost / Light", masters.buttons.light.ghost));
  const darkBtns = row(actions);
  darkBtns.appendChild(labeledItem("Primary / Dark", masters.buttons.dark.primary));
  darkBtns.appendChild(labeledItem("Default / Dark", masters.buttons.dark.default));
  darkBtns.appendChild(labeledItem("Ghost / Dark", masters.buttons.dark.ghost));

  const feedback = section(root, "Feedback");
  const fbRow = row(feedback);
  fbRow.appendChild(labeledItem("Empty State / Light", masters.emptyState.light));
  fbRow.appendChild(labeledItem("Empty State / Dark", masters.emptyState.dark));

  return root;
}

/* ---------- screen content ---------- */

function contentHome(content, t, platform) {
  const pad = platform === "desktop" ? 24 : 16;
  const inner = autoFrame("Home Page", { dir: "VERTICAL", p: pad, gap: 12 });
  content.appendChild(inner);
  inner.layoutSizingHorizontal = "FILL";
  addText(inner, "H1", "hello next js", FONTS.bold, platform === "desktop" ? TYPE.h1.size : 28, t.baseContent, {
    lh: platform === "desktop" ? TYPE.h1.lh : 36,
  });
}

function contentAbout(content, t, platform) {
  const pad = platform === "desktop" ? 24 : 16;
  const inner = autoFrame("About Page", { dir: "VERTICAL", p: pad, gap: 12 });
  content.appendChild(inner);
  inner.layoutSizingHorizontal = "FILL";
  addText(inner, "H1", "hiuedhied", FONTS.bold, platform === "desktop" ? TYPE.h1.size : 28, t.baseContent, {
    lh: platform === "desktop" ? TYPE.h1.lh : 36,
  });
}

function contentUsers(content, t, platform) {
  const pad = platform === "desktop" ? 24 : 16;
  const inner = autoFrame("Users Page", { dir: "VERTICAL", p: pad, gap: 16 });
  content.appendChild(inner);
  inner.layoutSizingHorizontal = "FILL";

  addText(
    inner,
    "Heading",
    "user are coming",
    FONTS.semibold,
    platform === "desktop" ? TYPE.h2.size : TYPE.h3.size,
    t.baseContent,
    { lh: platform === "desktop" ? TYPE.h2.lh : TYPE.h3.lh }
  );

  const grid = autoFrame("User Grid", { dir: "HORIZONTAL", wrap: true, gap: 16, rowGap: 16 });
  inner.appendChild(grid);
  grid.layoutSizingHorizontal = "FILL";

  const width = platform === "desktop" ? 453 : 358;
  const count = platform === "desktop" ? 6 : 3;
  const buttons = [];
  for (let i = 0; i < count; i++) {
    const card = buildUserCard(USERS[i], t, width);
    grid.appendChild(card);
    const btn = card.findOne((n) => n.type === "FRAME" && n.name === "Button/primary");
    if (btn) buttons.push(btn);
  }
  return buttons;
}

function contentUserDetail(content, t, platform) {
  const pad = platform === "desktop" ? 24 : 16;
  const inner = autoFrame("User Detail Page", { dir: "VERTICAL", p: pad, gap: 8 });
  content.appendChild(inner);
  inner.layoutSizingHorizontal = "FILL";

  addText(
    inner,
    "H2",
    "user details are coming",
    FONTS.semibold,
    platform === "desktop" ? TYPE.h2.size : TYPE.h3.size,
    t.baseContent,
    { lh: platform === "desktop" ? TYPE.h2.lh : TYPE.h3.lh }
  );
  addText(inner, "Name", USERS[0].name, FONTS.semibold, TYPE.h3.size, t.baseContent, { lh: TYPE.h3.lh });
  addText(inner, "Email", USERS[0].email, FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.65,
  });
  addText(inner, "Phone", USERS[0].phone, FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.65,
  });
}

function contentDashboard(content, t, platform, profile) {
  const shell = autoFrame("Dashboard Shell", { dir: "HORIZONTAL" });
  content.appendChild(shell);
  shell.layoutSizingHorizontal = "FILL";
  shell.layoutGrow = 1;

  if (platform === "desktop") {
    shell.appendChild(buildSidebar(t, 836));
  }

  const main = autoFrame("Dashboard Main", { dir: "VERTICAL" });
  shell.appendChild(main);
  main.layoutSizingHorizontal = "FILL";
  main.layoutGrow = 1;

  const dnav = autoFrame("Dashboard Navbar", {
    dir: "HORIZONTAL",
    h: 64,
    fill: t.base300,
    gap: 8,
    pl: 16,
    pr: 16,
    align: "CENTER",
  });
  main.appendChild(dnav);
  dnav.layoutSizingHorizontal = "FILL";
  dnav.appendChild(svgIcon(ICON_TOGGLE, rgbToHex(t.baseContent), 16));
  addText(dnav, "Title", "Navbar Title", FONTS.regular, TYPE.body.size, t.baseContent, { lh: TYPE.body.lh });

  const body = autoFrame("Dashboard Content", { dir: "VERTICAL", p: 16, gap: 8 });
  main.appendChild(body);
  body.layoutSizingHorizontal = "FILL";
  body.layoutGrow = 1;
  addText(body, "Label", "Page Content", FONTS.regular, TYPE.small.size, t.baseContent, {
    lh: TYPE.small.lh,
    opacity: 0.65,
  });
  addText(
    body,
    "Heading",
    profile ? "MY name is Tahajib Munna" : "this is dashboard",
    FONTS.semibold,
    profile ? TYPE.body.size : TYPE.h2.size,
    t.baseContent,
    { lh: profile ? TYPE.body.lh : TYPE.h2.lh }
  );

  const rows = { homepage: null, settings: null };
  if (platform === "desktop") {
    const side = shell.children[0];
    rows.homepage = side.findOne((n) => n.name === "Menu/Homepage");
    rows.settings = side.findOne((n) => n.name === "Menu/Settings");
  }
  return rows;
}

/* ---------- screen assembly ---------- */

function screenFrame(name, theme, platform, masters) {
  const t = TOKENS[theme];
  const w = platform === "desktop" ? 1440 : 390;
  const h = platform === "desktop" ? 900 : 844;
  const root = autoFrame(
    (theme === "light" ? "Light" : "Dark") +
      " / " +
      (platform === "desktop" ? "Desktop" : "Mobile") +
      " / " +
      name,
    { dir: "VERTICAL", w: w, h: h, fill: t.screenBg, clip: true }
  );
  const navMaster = platform === "desktop" ? masters.navbarDesktop[theme] : masters.navbarMobile[theme];
  root.appendChild(navMaster.createInstance());
  const content = autoFrame("Content", { dir: "VERTICAL" });
  root.appendChild(content);
  content.layoutSizingHorizontal = "FILL";
  content.layoutGrow = 1;
  return { root: root, content: content };
}

function pageLabel(page, text, x, y) {
  const t = figma.createText();
  t.fontName = FONTS.bold;
  t.characters = text;
  t.fontSize = 32;
  t.fills = [solid(hexToRgb("#333333"))];
  t.textAutoResize = "WIDTH_AND_HEIGHT";
  page.appendChild(t);
  t.x = x;
  t.y = y;
  return t;
}

function buildScreens(page, theme, masters) {
  const t = TOKENS[theme];
  const out = { screens: {}, buttons: [], dashboardRows: {} };
  const gapX = 80;
  const gapY = 160;

  pageLabel(page, (theme === "light" ? "Light" : "Dark") + " — Desktop (1440)", 80, 64);

  const desktopDefs = [
    ["Home", (c) => contentHome(c, t, "desktop")],
    ["About", (c) => contentAbout(c, t, "desktop")],
    ["Users", (c) => out.buttons.push.apply(out.buttons, contentUsers(c, t, "desktop"))],
    ["User Detail", (c) => contentUserDetail(c, t, "desktop")],
    ["Dashboard", (c) => { out.dashboardRows = contentDashboard(c, t, "desktop", false); }],
    ["Profile", (c) => contentDashboard(c, t, "desktop", true)],
  ];

  let x = 80;
  let y = 140;
  let col = 0;
  for (const def of desktopDefs) {
    const s = screenFrame(def[0], theme, "desktop", masters);
    def[1](s.content);
    s.root.x = x;
    s.root.y = y;
    out.screens[def[0]] = s.root;
    col++;
    if (col === 2) {
      col = 0;
      x = 80;
      y += 900 + gapY;
    } else {
      x += 1440 + gapX;
    }
  }

  const mobileY = y + 60;
  pageLabel(page, (theme === "light" ? "Light" : "Dark") + " — Mobile (390)", 80, mobileY - 56);

  const mobileDefs = [
    ["Home", (c) => contentHome(c, t, "mobile")],
    ["About", (c) => contentAbout(c, t, "mobile")],
    ["Users", (c) => contentUsers(c, t, "mobile")],
    ["User Detail", (c) => contentUserDetail(c, t, "mobile")],
    ["Dashboard", (c) => contentDashboard(c, t, "mobile", false)],
    ["Profile", (c) => contentDashboard(c, t, "mobile", true)],
  ];

  let mx = 80;
  for (const def of mobileDefs) {
    const s = screenFrame(def[0], theme, "mobile", masters);
    def[1](s.content);
    s.root.x = mx;
    s.root.y = mobileY;
    out.screens["Mobile " + def[0]] = s.root;
    mx += 390 + 60;
  }

  try {
    page.flowStartingPoints = [{ nodeId: out.screens["Home"].id, name: "Home" }];
  } catch (e) {
    /* optional */
  }

  const detail = out.screens["User Detail"];
  for (const b of out.buttons) {
    try {
      b.reactions = [
        {
          trigger: { type: "ON_CLICK" },
          action: {
            type: "NODE",
            destinationId: detail.id,
            navigation: "NAVIGATE",
            transition: null,
            preserveScrollPosition: false,
          },
        },
      ];
    } catch (e) {
      /* ignore */
    }
  }

  const home = out.screens["Home"];
  const dashboard = out.screens["Dashboard"];
  const profile = out.screens["Profile"];
  if (out.dashboardRows.homepage && home) {
    try {
      out.dashboardRows.homepage.reactions = [
        {
          trigger: { type: "ON_CLICK" },
          action: { type: "NODE", destinationId: home.id, navigation: "NAVIGATE", transition: null, preserveScrollPosition: false },
        },
      ];
    } catch (e) {}
  }
  if (out.dashboardRows.settings && profile) {
    try {
      out.dashboardRows.settings.reactions = [
        {
          trigger: { type: "ON_CLICK" },
          action: { type: "NODE", destinationId: profile.id, navigation: "NAVIGATE", transition: null, preserveScrollPosition: false },
        },
      ];
    } catch (e) {}
  }
  if (dashboard && profile) {
    /* no-op: dashboard frame exists, links above are enough */
  }

  return out;
}

/* ---------- flow ---------- */

function flowBox(label, t, primary) {
  const b = autoFrame("Flow/" + label, {
    dir: "HORIZONTAL",
    w: 220,
    h: 88,
    radius: RADIUS.box,
    justify: "CENTER",
    align: "CENTER",
    fill: primary ? t.primary : t.base100,
    stroke: primary ? null : t.base300,
  });
  addText(b, "Label", label, FONTS.semibold, TYPE.body.size, primary ? t.primaryContent : t.baseContent, {
    lh: TYPE.body.lh,
  });
  return b;
}

function arrowText() {
  const t = figma.createText();
  t.name = "Arrow";
  t.fontName = FONTS.regular;
  t.characters = "→";
  t.fontSize = 32;
  t.fills = [solid(hexToRgb("#888888"))];
  t.textAutoResize = "WIDTH_AND_HEIGHT";
  return t;
}

function buildFlow(page) {
  const root = pageRoot(page, "Flow", LIGHT.base100);
  addText(root, "Page Title", "User flows", FONTS.bold, TYPE.display.size, LIGHT.baseContent, {
    lh: TYPE.display.lh,
  });
  addText(root, "Page Subtitle", "Prototype connections generated for the main screens.", FONTS.regular, TYPE.body.size, LIGHT.baseContent, {
    lh: TYPE.body.lh,
    opacity: 0.65,
  });

  const primary = section(root, "Users flow");
  const row1 = autoFrame("Flow Row 1", { dir: "HORIZONTAL", gap: 16, align: "CENTER" });
  primary.appendChild(row1);
  row1.appendChild(flowBox("Home", LIGHT, true));
  row1.appendChild(arrowText());
  row1.appendChild(flowBox("Users", LIGHT, false));
  row1.appendChild(arrowText());
  row1.appendChild(flowBox("User Detail", LIGHT, false));

  const dash = section(root, "Dashboard flow");
  const row2 = autoFrame("Flow Row 2", { dir: "HORIZONTAL", gap: 16, align: "CENTER" });
  dash.appendChild(row2);
  row2.appendChild(flowBox("Home", LIGHT, true));
  row2.appendChild(arrowText());
  row2.appendChild(flowBox("Dashboard", LIGHT, false));
  row2.appendChild(arrowText());
  row2.appendChild(flowBox("Profile", LIGHT, false));

  const notes = section(root, "Notes");
  const lines = [
    "Every View Details button in the prototype navigates to the User Detail screen.",
    "Dashboard sidebar: Homepage → Home, Settings → Profile.",
    "Screens exist in both light and dark pages.",
  ];
  for (const line of lines) {
    addText(notes, "Note", "• " + line, FONTS.regular, TYPE.small.size, LIGHT.baseContent, {
      lh: TYPE.small.lh,
      opacity: 0.75,
    });
  }

  return root;
}

/* ---------- handoff ---------- */

function skeletonCard(t) {
  const card = autoFrame("Loading Skeleton", {
    dir: "VERTICAL",
    w: 360,
    p: 16,
    gap: 8,
    radius: RADIUS.box,
    fill: t.base100,
    stroke: t.base300,
  });
  const bar = (w, h, radius) => {
    const b = autoFrame("Bar", { w: w, h: h, radius: radius || 4, fill: t.base200 });
    card.appendChild(b);
  };
  bar(140, 20);
  bar(296, 14);
  bar(240, 14);
  bar(140, 48);
  return card;
}

function notFoundCard(t) {
  const card = autoFrame("404 State", {
    dir: "VERTICAL",
    w: 360,
    p: 32,
    gap: 12,
    radius: RADIUS.box,
    fill: t.base100,
    stroke: t.base300,
    align: "CENTER",
    justify: "CENTER",
  });
  addText(card, "Code", "404", FONTS.bold, 48, t.baseContent, { lh: 56 });
  addText(card, "Title", "This page could not be found", FONTS.semibold, TYPE.h3.size, t.baseContent, {
    lh: TYPE.h3.lh,
    align: "CENTER",
    fill: true,
  });
  return card;
}

function buildHandoff(page, masters) {
  const root = pageRoot(page, "Handoff", LIGHT.base100);
  addText(root, "Page Title", "Handoff", FONTS.bold, TYPE.display.size, LIGHT.baseContent, {
    lh: TYPE.display.lh,
  });
  addText(
    root,
    "Page Subtitle",
    "States, tokens and implementation notes for the current app.",
    FONTS.regular,
    TYPE.body.size,
    LIGHT.baseContent,
    { lh: TYPE.body.lh, opacity: 0.65 }
  );

  const states = section(root, "States");
  const stateRow = row(states);
  stateRow.appendChild(labeledItem("Loading skeleton", skeletonCard(LIGHT)));
  stateRow.appendChild(labeledItem("Empty", masters.emptyState.light.createInstance()));
  stateRow.appendChild(labeledItem("404", notFoundCard(LIGHT)));

  const tokens = section(root, "Color tokens");
  const lightRow = autoFrame("Light Tokens", { dir: "HORIZONTAL", wrap: true, gap: 16, rowGap: 16 });
  tokens.appendChild(lightRow);
  lightRow.layoutSizingHorizontal = "FILL";
  const tokenKeys = ["base100", "base200", "base300", "baseContent", "primary", "secondary", "accent", "success", "warning", "error"];
  for (const k of tokenKeys) lightRow.appendChild(swatch(LIGHT[k], "light / " + k));

  const darkRow = autoFrame("Dark Tokens", { dir: "HORIZONTAL", wrap: true, gap: 16, rowGap: 16 });
  tokens.appendChild(darkRow);
  darkRow.layoutSizingHorizontal = "FILL";
  for (const k of tokenKeys) darkRow.appendChild(swatch(DARK[k], "dark / " + k));

  const notes = section(root, "Notes");
  const lines = [
    "Radii: field 4px, box 8px, pill 999px.",
    "Spacing follows Tailwind's 4px scale.",
    "Navbar height is 64px; sidebar width is 256px when open.",
    "Users grid: 3 columns on desktop, 1 column on mobile.",
  ];
  for (const line of lines) {
    addText(notes, "Note", "• " + line, FONTS.regular, TYPE.small.size, LIGHT.baseContent, {
      lh: TYPE.small.lh,
      opacity: 0.75,
    });
  }

  return root;
}

/* ---------- font resolution ---------- */

async function resolveFonts() {
  const list = await figma.listAvailableFontsAsync();
  const families = {};
  for (const f of list) families[f.fontName.family] = true;

  let family = null;
  const preferred = ["Geist", "Inter", "Roboto", "Arial"];
  for (const p of preferred) {
    if (families[p]) {
      family = p;
      break;
    }
  }
  if (!family) family = list[0].fontName.family;

  const styles = {};
  for (const f of list) if (f.fontName.family === family) styles[f.fontName.style] = true;
  const pick = (cands) => {
    for (const c of cands) if (styles[c]) return c;
    return Object.keys(styles)[0];
  };

  const regular = { family: family, style: pick(["Regular", "Normal", "Book"]) };
  const medium = { family: family, style: pick(["Medium", "SemiBold", "Regular"]) };
  const semibold = { family: family, style: pick(["SemiBold", "Semi Bold", "Bold", "Medium"]) };
  const bold = { family: family, style: pick(["Bold", "SemiBold", "Black"]) };

  const unique = {};
  for (const f of [regular, medium, semibold, bold]) unique[f.style] = f;
  await Promise.all(Object.keys(unique).map((k) => figma.loadFontAsync(unique[k])));

  return { family: family, regular: regular, medium: medium, semibold: semibold, bold: bold };
}

/* ---------- setup / reset ---------- */

const OUR_PAGES = [
  "00 Cover",
  "01 Foundations",
  "02 Components",
  "03 Screens — Light",
  "04 Screens — Dark",
  "05 Flow",
  "06 Handoff",
];

function reset() {
  const ours = [];
  for (const p of figma.root.children) {
    if (OUR_PAGES.indexOf(p.name) !== -1) ours.push(p);
  }
  if (!ours.length) return;

  let safe = null;
  for (const p of figma.root.children) {
    if (OUR_PAGES.indexOf(p.name) === -1) {
      safe = p;
      break;
    }
  }
  if (!safe) {
    safe = figma.createPage();
    safe.name = "Page 1";
  }
  figma.currentPage = safe;
  for (const p of ours) p.remove();
}

function makePage(name) {
  const p = figma.createPage();
  p.name = name;
  return p;
}

/* ---------- run ---------- */

(async () => {
  try {
    await figma.loadAllPagesAsync();
    FONTS = await resolveFonts();
    reset();
    createStyles();

    const pages = {
      cover: makePage("00 Cover"),
      foundations: makePage("01 Foundations"),
      components: makePage("02 Components"),
      light: makePage("03 Screens — Light"),
      dark: makePage("04 Screens — Dark"),
      flow: makePage("05 Flow"),
      handoff: makePage("06 Handoff"),
    };

    figma.currentPage = pages.cover;
    buildCover(pages.cover);

    figma.currentPage = pages.foundations;
    buildFoundations(pages.foundations);

    figma.currentPage = pages.components;
    const masters = buildMasters();
    buildComponentsPage(pages.components, masters);

    figma.currentPage = pages.light;
    buildScreens(pages.light, "light", masters);

    figma.currentPage = pages.dark;
    buildScreens(pages.dark, "dark", masters);

    figma.currentPage = pages.flow;
    buildFlow(pages.flow);

    figma.currentPage = pages.handoff;
    buildHandoff(pages.handoff, masters);

    figma.currentPage = pages.cover;
    if (pages.cover.children.length) {
      figma.viewport.scrollAndZoomIntoView([pages.cover.children[0]]);
    }
    figma.closePlugin("Design generated — 7 pages, light + dark.");
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    console.error(err);
    figma.closePlugin("Generator failed: " + msg);
  }
})();




