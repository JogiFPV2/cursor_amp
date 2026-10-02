import { ensureContrast, ensureContrastOn, mix, readableFill } from "./color";

export type ThemeMode = "light" | "dark";

export type Palette = readonly [string, string, string, string];

export type ChipTokens = {
  bg: string;
  ink: string;
};

export type ThemeTokens = {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentContrast: string;
  accentSoft: string;
  accentInk: string;
  highlight: string;
  progress: ChipTokens;
  ready: ChipTokens;
  late: ChipTokens;
  quote: ChipTokens;
  shadow: string;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  mode: ThemeMode;
  source: string;
  colors: Palette;
  tokens: ThemeTokens;
};

type ThemeSpec = {
  id: string;
  name: string;
  description: string;
  mode: ThemeMode;
  source: string;
  colors: Palette;
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  accent: string;
  highlight: string;
  progress: string;
  ready: string;
  late: string;
  quote: string;
};

const COLOR_HUNT = "https://colorhunt.co/palette";

function chip(color: string, surface: string, mode: ThemeMode): ChipTokens {
  const bg = mix(color, surface, mode === "dark" ? 0.7 : 0.82);
  return { bg, ink: ensureContrast(color, bg, 4.5) };
}

function buildTheme(spec: ThemeSpec): Theme {
  const text = ensureContrastOn(spec.text, [spec.bg, spec.surface], 4.5);
  const textMuted = ensureContrastOn(mix(text, spec.surface, 0.38), [spec.bg, spec.surface], 4.5);
  const border = mix(text, spec.surface, spec.mode === "dark" ? 0.72 : 0.8);
  const accentPair = readableFill(spec.accent, spec.bg, text);
  const accentSoft = mix(accentPair.fill, spec.surface, spec.mode === "dark" ? 0.74 : 0.84);
  const accentInk = ensureContrast(accentPair.fill, accentSoft, 4.5);
  const latePair = readableFill(spec.late, spec.bg, text);
  const readyInk = ensureContrast(spec.ready, spec.surface, 4.5);

  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    mode: spec.mode,
    source: spec.source,
    colors: spec.colors,
    tokens: {
      bg: spec.bg.toUpperCase(),
      surface: spec.surface.toUpperCase(),
      surface2: spec.surface2.toUpperCase(),
      text,
      textMuted,
      border,
      accent: accentPair.fill,
      accentContrast: accentPair.ink,
      accentSoft,
      accentInk,
      highlight: spec.highlight.toUpperCase(),
      progress: chip(spec.progress, spec.surface, spec.mode),
      ready: { bg: "transparent", ink: readyInk },
      late: { bg: latePair.fill, ink: latePair.ink },
      quote: chip(spec.quote, spec.surface, spec.mode),
      shadow:
        spec.mode === "dark"
          ? "0 10px 28px rgb(0 0 0 / 0.32)"
          : "0 10px 24px rgb(28 24 18 / 0.06)",
    },
  };
}

function palette(sourceSlug: string, colors: Palette): { source: string; colors: Palette } {
  return { source: `${COLOR_HUNT}/${sourceSlug}`, colors };
}

const specs: readonly ThemeSpec[] = [
  {
    id: "port",
    name: "Port",
    description: "Nocne molo, grafit i turkus.",
    mode: "dark",
    ...palette("222831393e4600adb5eeeeee", ["#222831", "#393E46", "#00ADB5", "#EEEEEE"]),
    bg: "#222831",
    surface: "#393E46",
    surface2: "#2C333A",
    text: "#EEEEEE",
    accent: "#00ADB5",
    highlight: "#EEEEEE",
    progress: "#00ADB5",
    ready: "#EEEEEE",
    late: "#00ADB5",
    quote: "#EEEEEE",
  },
  {
    id: "szkarlat",
    name: "Szkarłat",
    description: "Granat nocy i jeden ostry akcent.",
    mode: "dark",
    ...palette("1a1a2e16213e0f3460e94560", ["#1A1A2E", "#16213E", "#0F3460", "#E94560"]),
    bg: "#1A1A2E",
    surface: "#16213E",
    surface2: "#0F3460",
    text: "#F4F6FB",
    accent: "#E94560",
    highlight: "#0F3460",
    progress: "#E94560",
    ready: "#0F3460",
    late: "#E94560",
    quote: "#16213E",
  },
  {
    id: "wegiel",
    name: "Węgiel",
    description: "Węgiel drzewny, miedź i piaskowy tekst.",
    mode: "dark",
    ...palette("2c36393f4e4fa27b5cdcd7c9", ["#2C3639", "#3F4E4F", "#A27B5C", "#DCD7C9"]),
    bg: "#2C3639",
    surface: "#3F4E4F",
    surface2: "#314042",
    text: "#DCD7C9",
    accent: "#A27B5C",
    highlight: "#DCD7C9",
    progress: "#A27B5C",
    ready: "#DCD7C9",
    late: "#A27B5C",
    quote: "#DCD7C9",
  },
  {
    id: "atrament",
    name: "Atrament",
    description: "Papier, chłodny błękit i granatowy tekst.",
    mode: "light",
    ...palette("f9f7f7dbe2ef3f72af112d4e", ["#F9F7F7", "#DBE2EF", "#3F72AF", "#112D4E"]),
    bg: mix("#F9F7F7", "#112D4E", 0.045),
    surface: "#F9F7F7",
    surface2: "#DBE2EF",
    text: "#112D4E",
    accent: "#3F72AF",
    highlight: "#112D4E",
    progress: "#3F72AF",
    ready: "#112D4E",
    late: "#112D4E",
    quote: "#3F72AF",
  },
  {
    id: "lawenda",
    name: "Lawenda",
    description: "Jasny fiołek i atramentowa lawenda.",
    mode: "light",
    ...palette("f4eeffdcd6f7a6b1e1424874", ["#F4EEFF", "#DCD6F7", "#A6B1E1", "#424874"]),
    bg: mix("#F4EEFF", "#424874", 0.05),
    surface: "#F4EEFF",
    surface2: "#DCD6F7",
    text: "#424874",
    accent: "#424874",
    highlight: "#A6B1E1",
    progress: "#424874",
    ready: "#A6B1E1",
    late: "#424874",
    quote: "#A6B1E1",
  },
  {
    id: "oliwka",
    name: "Oliwka",
    description: "Krem, szałwia i ciemna oliwka.",
    mode: "light",
    ...palette("41431baeb784e3dbbbf8f3e1", ["#41431B", "#AEB784", "#E3DBBB", "#F8F3E1"]),
    bg: mix("#F8F3E1", "#41431B", 0.05),
    surface: "#F8F3E1",
    surface2: "#E3DBBB",
    text: "#41431B",
    accent: "#41431B",
    highlight: "#AEB784",
    progress: "#41431B",
    ready: "#AEB784",
    late: "#41431B",
    quote: "#AEB784",
  },
  {
    id: "fiolet",
    name: "Fiolet",
    description: "Neonowy fiolet na liliowym papierze.",
    mode: "light",
    ...palette("6528f7a076f9d7bbf5ede4ff", ["#6528F7", "#A076F9", "#D7BBF5", "#EDE4FF"]),
    bg: mix("#EDE4FF", "#6528F7", 0.06),
    surface: "#EDE4FF",
    surface2: "#D7BBF5",
    text: "#6528F7",
    accent: "#6528F7",
    highlight: "#A076F9",
    progress: "#6528F7",
    ready: "#A076F9",
    late: "#6528F7",
    quote: "#A076F9",
  },
  {
    id: "sliwka",
    name: "Śliwka",
    description: "Złoty papier, róż i śliwkowy tekst.",
    mode: "light",
    ...palette("624e888967b3cb80abe6d9a2", ["#624E88", "#8967B3", "#CB80AB", "#E6D9A2"]),
    bg: mix("#E6D9A2", "#624E88", 0.08),
    surface: "#E6D9A2",
    surface2: mix("#E6D9A2", "#CB80AB", 0.28),
    text: "#624E88",
    accent: "#8967B3",
    highlight: "#CB80AB",
    progress: "#8967B3",
    ready: "#CB80AB",
    late: "#624E88",
    quote: "#CB80AB",
  },
  {
    id: "laguna",
    name: "Laguna",
    description: "Ciepły piasek, laguna i róż.",
    mode: "light",
    ...palette("24a19cfaeee7325288d96098", ["#24A19C", "#FAEEE7", "#325288", "#D96098"]),
    bg: mix("#FAEEE7", "#325288", 0.05),
    surface: "#FAEEE7",
    surface2: mix("#FAEEE7", "#24A19C", 0.16),
    text: "#325288",
    accent: "#24A19C",
    highlight: "#D96098",
    progress: "#24A19C",
    ready: "#325288",
    late: "#D96098",
    quote: "#325288",
  },
  {
    id: "ogrod",
    name: "Ogród",
    description: "Szałwia, glina i ciemne drewno.",
    mode: "light",
    ...palette("e9eed9cbd2a49a7e6f54473f", ["#E9EED9", "#CBD2A4", "#9A7E6F", "#54473F"]),
    bg: mix("#E9EED9", "#54473F", 0.055),
    surface: "#E9EED9",
    surface2: "#CBD2A4",
    text: "#54473F",
    accent: "#54473F",
    highlight: "#9A7E6F",
    progress: "#54473F",
    ready: "#9A7E6F",
    late: "#54473F",
    quote: "#9A7E6F",
  },
  {
    id: "bursztyn",
    name: "Bursztyn",
    description: "Len, bursztyn i granatowy tekst.",
    mode: "light",
    ...palette("e8e2dbfab95bf168211a3263", ["#E8E2DB", "#FAB95B", "#F16821", "#1A3263"]),
    bg: mix("#E8E2DB", "#1A3263", 0.05),
    surface: "#E8E2DB",
    surface2: mix("#E8E2DB", "#FAB95B", 0.35),
    text: "#1A3263",
    accent: "#F16821",
    highlight: "#FAB95B",
    progress: "#F16821",
    ready: "#1A3263",
    late: "#F16821",
    quote: "#FAB95B",
  },
  {
    id: "bryza",
    name: "Bryza",
    description: "Lodowy cyjan i elektryczny fiolet.",
    mode: "light",
    ...palette("c5fff896efff5fbdff7b66ff", ["#C5FFF8", "#96EFFF", "#5FBDFF", "#7B66FF"]),
    bg: mix("#C5FFF8", "#7B66FF", 0.07),
    surface: "#C5FFF8",
    surface2: "#96EFFF",
    text: "#7B66FF",
    accent: "#7B66FF",
    highlight: "#5FBDFF",
    progress: "#7B66FF",
    ready: "#5FBDFF",
    late: "#7B66FF",
    quote: "#5FBDFF",
  },
];

export const themes: readonly Theme[] = specs.map(buildTheme);

export const DEFAULT_THEME_ID = "atrament";

export const THEME_STORAGE_KEY = "amp-theme";

export function themeById(id: string): Theme {
  const theme = themes.find((item) => item.id === id);
  return theme ?? themes.find((item) => item.id === DEFAULT_THEME_ID) ?? themes[0];
}

const tokenNames = {
  bg: "--bg",
  surface: "--surface",
  surface2: "--surface-2",
  text: "--text",
  textMuted: "--text-muted",
  border: "--border",
  accent: "--accent",
  accentContrast: "--accent-contrast",
  accentSoft: "--accent-soft",
  accentInk: "--accent-ink",
  highlight: "--highlight",
  shadow: "--shadow",
} as const;

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  root.dataset.theme = theme.id;
  root.dataset.mode = theme.mode;
  root.style.colorScheme = theme.mode;
  for (const [key, cssName] of Object.entries(tokenNames)) {
    const value = theme.tokens[key as keyof typeof tokenNames];
    root.style.setProperty(cssName, value);
  }
  root.style.setProperty("--progress-bg", theme.tokens.progress.bg);
  root.style.setProperty("--progress-ink", theme.tokens.progress.ink);
  root.style.setProperty("--ready-bg", theme.tokens.ready.bg);
  root.style.setProperty("--ready-ink", theme.tokens.ready.ink);
  root.style.setProperty("--late-bg", theme.tokens.late.bg);
  root.style.setProperty("--late-ink", theme.tokens.late.ink);
  root.style.setProperty("--quote-bg", theme.tokens.quote.bg);
  root.style.setProperty("--quote-ink", theme.tokens.quote.ink);
}
