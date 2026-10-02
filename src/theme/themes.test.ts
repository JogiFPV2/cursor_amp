import { contrast } from "./color";
import { themes } from "./themes";

const minimum = 4.5;

describe("motywy Color Hunt", () => {
  it("zawiera co najmniej 10 różnych motywów", () => {
    expect(themes.length).toBeGreaterThanOrEqual(10);
    expect(new Set(themes.map((theme) => theme.id)).size).toBe(themes.length);
  });

  it("każdy motyw wskazuje paletę na colorhunt.co", () => {
    for (const theme of themes) {
      expect(theme.colors).toHaveLength(4);
      expect(new Set(theme.colors.map((color) => color.toLowerCase())).size).toBe(4);
      const slug = theme.colors.map((color) => color.slice(1).toLowerCase()).join("");
      expect(theme.source).toBe(`https://colorhunt.co/palette/${slug}`);
    }
  });

  it("utrzymuje czytelny kontrast tekstu, przycisku i statusów", () => {
    for (const theme of themes) {
      const { tokens } = theme;
      expect(contrast(tokens.text, tokens.bg), `${theme.id} text/bg`).toBeGreaterThanOrEqual(minimum);
      expect(contrast(tokens.text, tokens.surface), `${theme.id} text/surface`).toBeGreaterThanOrEqual(
        minimum,
      );
      expect(contrast(tokens.textMuted, tokens.bg), `${theme.id} muted/bg`).toBeGreaterThanOrEqual(
        minimum,
      );
      expect(
        contrast(tokens.textMuted, tokens.surface),
        `${theme.id} muted/surface`,
      ).toBeGreaterThanOrEqual(minimum);
      expect(
        contrast(tokens.accentContrast, tokens.accent),
        `${theme.id} accent`,
      ).toBeGreaterThanOrEqual(minimum);
      expect(
        contrast(tokens.progress.ink, tokens.progress.bg),
        `${theme.id} progress`,
      ).toBeGreaterThanOrEqual(minimum);
      expect(contrast(tokens.ready.ink, tokens.surface), `${theme.id} ready`).toBeGreaterThanOrEqual(
        minimum,
      );
      expect(contrast(tokens.late.ink, tokens.late.bg), `${theme.id} late`).toBeGreaterThanOrEqual(
        minimum,
      );
      expect(contrast(tokens.quote.ink, tokens.quote.bg), `${theme.id} quote`).toBeGreaterThanOrEqual(
        minimum,
      );
    }
  });
});
