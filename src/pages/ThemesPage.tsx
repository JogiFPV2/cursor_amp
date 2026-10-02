import { PageHeader, PaletteSwatches } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

export function ThemesPage() {
  const { theme, themes, setThemeId } = useTheme();

  return (
    <>
      <PageHeader
        title="Motywy"
        hint={`${themes.length} palet z Color Hunt · aktywny: ${theme.name}`}
      />
      <div className="card-grid">
        {themes.map((item) => {
          const selected = item.id === theme.id;
          return (
            <article key={item.id} className={selected ? "theme-card selected" : "theme-card"}>
              <button
                type="button"
                className="theme-apply"
                aria-pressed={selected}
                onClick={() => setThemeId(item.id)}
              >
                <span className="theme-name">{item.name}</span>
                <PaletteSwatches colors={item.colors} size={22} />
                <span className="theme-copy">{item.description}</span>
              </button>
              <div className="divider" />
              <div className="theme-meta">
                <span>{item.mode === "dark" ? "Ciemny" : "Jasny"}</span>
                <span>{selected ? "Aktywny" : "Do włączenia"}</span>
                <a href={item.source} target="_blank" rel="noreferrer">
                  Color Hunt
                </a>
              </div>
              <ul className="hex-list">
                {item.colors.map((color) => (
                  <li key={color}>
                    <span className="swatch" style={{ backgroundColor: color }} />
                    <code>{color}</code>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
