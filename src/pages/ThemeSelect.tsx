import { PaletteSwatches } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

export function ThemeSelect() {
  const { theme, themes, setThemeId } = useTheme();

  return (
    <label className="theme-select">
      <PaletteSwatches colors={theme.colors} size={12} />
      <span>Motyw</span>
      <select
        aria-label="Motyw"
        value={theme.id}
        onChange={(event) => setThemeId(event.target.value)}
      >
        {themes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}
