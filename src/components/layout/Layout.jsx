import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <header
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Quiz App</h2>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
