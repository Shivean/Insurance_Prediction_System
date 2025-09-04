import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const getPreferred = () => {
    const saved = localStorage.getItem("ips_theme");
    if (saved === "light" || saved === "dark") return saved;
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getPreferred);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("ips_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Keep theme in sync with system setting if user hasn't chosen explicitly
    const media = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (!media?.addEventListener) return;
    const handler = (e) => {
      const saved = localStorage.getItem("ips_theme");
      if (!saved) setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
