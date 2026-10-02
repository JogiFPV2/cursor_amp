import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TeamPage } from "./pages/TeamPage";
import { ThemesPage } from "./pages/ThemesPage";
import { ThemeProvider } from "./theme/ThemeProvider";

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<DashboardPage />} />
            <Route path="projekty" element={<ProjectsPage />} />
            <Route path="zespol" element={<TeamPage />} />
            <Route path="motywy" element={<ThemesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
