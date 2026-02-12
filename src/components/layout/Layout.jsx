import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./layout.scss";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      <header className="app-header">
        <h2 className="app-title">Quiz App</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
