"use client";

import Image from "next/image";
import { FC, useState } from "react";
import logo from "../assets/img/tyc.svg";
// import { Button } from "@/components/Button";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT US", href: "#about" },
    // { name: "PORTFOLIO", href: "#portfolio" },
    { name: "MENU", href: "#menu" },
    // { name: "SIGNATURE SERVICES", href: "#service" },
    { name: "CONTACT", href: "#contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <Image src={logo} alt="TYC" height={38} priority />

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {navItems.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <a key={item.name} href={item.href} onClick={closeMenu}>
            {item.name}
          </a>
        ))}
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu} />}

      {/* <Button label="Book a Call" /> */}
    </header>
  );
};
