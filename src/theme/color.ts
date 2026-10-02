export function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Nieprawidłowy kolor: ${hex}`);
  }
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const channel = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

function srgbChannel(value: number): number {
  const channel = value / 255;
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

export function contrast(a: string, b: string): number {
  const lighter = Math.max(luminance(a), luminance(b));
  const darker = Math.min(luminance(a), luminance(b));
  return (lighter + 0.05) / (darker + 0.05);
}

export function mix(a: string, b: string, amount: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const blend = (from: number, to: number) => from + (to - from) * amount;
  return rgbToHex(blend(ar, br), blend(ag, bg), blend(ab, bb));
}

function walkContrast(
  foreground: string,
  background: string,
  toward: string,
  minimum: number,
): string | null {
  for (let step = 1; step <= 24; step += 1) {
    const next = mix(foreground, toward, step / 24);
    if (contrast(next, background) >= minimum) return next;
  }
  return null;
}

export function ensureContrast(foreground: string, background: string, minimum = 4.5): string {
  if (contrast(foreground, background) >= minimum) return foreground.toUpperCase();
  const primary = luminance(foreground) <= luminance(background) ? "#000000" : "#FFFFFF";
  const secondary = primary === "#000000" ? "#FFFFFF" : "#000000";
  return (
    walkContrast(foreground, background, primary, minimum) ??
    walkContrast(foreground, background, secondary, minimum) ??
    primary
  );
}

export function ensureContrastOn(
  foreground: string,
  backgrounds: readonly string[],
  minimum = 4.5,
): string {
  let current = foreground;
  for (let pass = 0; pass < 4; pass += 1) {
    for (const background of backgrounds) {
      current = ensureContrast(current, background, minimum);
    }
  }
  return current;
}

export function onFill(fill: string, dark: string, light: string): string {
  const darkContrast = contrast(dark, fill);
  const lightContrast = contrast(light, fill);
  const preferred = darkContrast >= lightContrast ? dark : light;
  return ensureContrast(preferred, fill, 4.5);
}

export function readableFill(
  fill: string,
  dark: string,
  light: string,
): { fill: string; ink: string } {
  const tryInk = (background: string) => {
    const preferred = contrast(dark, background) >= contrast(light, background) ? dark : light;
    const ink = ensureContrast(preferred, background, 4.5);
    return contrast(ink, background) >= 4.5 ? ink : null;
  };

  const direct = tryInk(fill);
  if (direct) return { fill: fill.toUpperCase(), ink: direct };

  let best: { fill: string; ink: string; shift: number } | null = null;
  for (const toward of ["#000000", "#FFFFFF"]) {
    for (let step = 1; step <= 20; step += 1) {
      const next = mix(fill, toward, step / 20);
      const ink = tryInk(next);
      if (ink) {
        if (!best || step < best.shift) best = { fill: next, ink, shift: step };
        break;
      }
    }
  }

  return best ?? { fill: fill.toUpperCase(), ink: onFill(fill, dark, light) };
}
