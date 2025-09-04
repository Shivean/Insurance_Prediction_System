import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <BsFillSunFill  className="size-6 cursor-pointer hover:text-yellow-400"/> : <BsFillMoonStarsFill className="size-6 hover:text-gray-400 cursor-pointer"/>}
      <span className="hidden sm:block text-sm"></span>
      {/* <span className="hidden sm:block text-sm">{isDark ? "Light" : "Dark"}</span> */}
    </button>
  );
};

export default ThemeToggle;
