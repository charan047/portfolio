import React, { useMemo, useEffect, useState } from "react";
import { useTheme } from "../../../App";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const { theme, toggleTheme } = useTheme();

  const sections = useMemo(
    () => ["home", "skills", "experience", "projects", "education", "contact"],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 24);

      // Scroll progress
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0;
      setScrollProgress(progress);

      // Active section
      const headerEl = document.querySelector(".navbar");
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const checkpoint = headerHeight + 140; // where we "consider" a section active

      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= checkpoint) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerEl = document.querySelector(".navbar");
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="scroll-progress" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="navbar-container">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label="Go to top"
        >
          <span className="logo-text">Charan Kumar Edukulla</span>
        </a>

        <div className="navbar-actions">
          <div
            className="theme-toggle"
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            aria-label="Toggle theme"
            onKeyDown={(e) => (e.key === "Enter" ? toggleTheme() : null)}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className="fa-icon"
            />
          </div>

          <div className="menu-icon" onClick={toggleMenu} role="button">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {sections
            .filter((s) => s !== "home")
            .map((id) => (
              <li className="nav-item" key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
