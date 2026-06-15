"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#problemy", label: "Problemy" },
  { href: "#rozwiazanie", label: "Rozwiązanie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#zaufanie", label: "Zaufanie" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${
        isOpen ? " is-open" : ""
      }`}
    >
      <a
        className="brand"
        href="#top"
        aria-label="Krzysztof Węgrzyn - strona główna"
      >
        <span className="brand-mark" aria-hidden="true">
          KW
        </span>
        <span>
          <strong>Krzysztof Węgrzyn</strong>
          <small>Excel | Power Query | Power BI</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onClick={() => setIsOpen((current) => !current)}
      >
        Menu
      </button>
      <nav
        className={`site-nav${isOpen ? " is-visible" : ""}`}
        id="site-nav"
        aria-label="Główna nawigacja"
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#kontakt" onClick={closeMenu}>
          Kontakt
        </a>
      </nav>
    </header>
  );
}
