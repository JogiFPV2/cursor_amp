import { NavLink, Outlet } from "react-router-dom";
import { PaletteSwatches } from "./ui";
import { useTheme } from "../theme/ThemeProvider";

const links = [
  { to: "/", label: "Pulpit", end: true },
  { to: "/projekty", label: "Projekty", end: false },
  { to: "/zespol", label: "Zespół", end: false },
  { to: "/motywy", label: "Motywy", end: false },
] as const;

export function Shell() {
  const { theme } = useTheme();

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <strong>Amp</strong>
          <span>Studio</span>
        </div>
        <nav aria-label="Główne">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="metric-label">Motyw</span>
          <strong>{theme.name}</strong>
          <PaletteSwatches colors={theme.colors} />
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
