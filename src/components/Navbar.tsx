"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const NAVBAR_H = 80;

export default function Navbar({ navLinks }: { navLinks: readonly string[] }) {
  const [isDark, setIsDark] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const check = () => {
      const els = document.querySelectorAll<HTMLElement>("[data-navbar-dark]");
      let anyDark = false;
      els.forEach(el => {
        const { top, bottom } = el.getBoundingClientRect();
        if (top < NAVBAR_H && bottom > 0) anyDark = true;
      });
      setIsDark(anyDark);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    gsap.to(logoRef.current, { color: isDark ? "#fff" : "#000", duration: 0.3, ease: "power1.out" });
  }, [isDark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-6 px-4 md:px-8">
      <Link
        ref={logoRef}
        href="/"
        className="font-semibold text-base tracking-[-0.04em] capitalize"
        style={{ color: "#000" }}
      >
        H.Studio
      </Link>
      <div className="hidden md:flex items-center gap-14">
        <NavLinks links={navLinks} isDark={isDark} />
      </div>
      <MobileMenu navLinks={navLinks} isDark={isDark} />
    </nav>
  );
}
