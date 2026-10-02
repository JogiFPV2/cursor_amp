import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { applyTheme, DEFAULT_THEME_ID, THEME_STORAGE_KEY, themeById, themes, type Theme } from "./themes";

type ThemeContextValue = {
  theme: Theme;
  themes: readonly Theme[];
  setThemeId: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredThemeId(): string {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && themes.some((theme) => theme.id === saved)) return saved;
  } catch {
    return DEFAULT_THEME_ID;
  }
  return DEFAULT_THEME_ID;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(readStoredThemeId);
  const theme = useMemo(() => themeById(themeId), [themeId]);

  useLayoutEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    } catch {
      // Motyw zostaje na czas sesji, gdy pamięć przeglądarki jest zablokowana.
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      themes,
      setThemeId,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme wymaga ThemeProvider.");
  }
  return value;
}
