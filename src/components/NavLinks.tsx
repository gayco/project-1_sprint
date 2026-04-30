"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const HREF: Record<string, string> = {
  about:    "/about",
  services: "/services",
  projects: "/projects",
  news:     "/news",
  contact:  "/contact",
};

export default function NavLinks({ links, isDark = false }: { links: readonly string[]; isDark?: boolean }) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Transition link colours when dark/light flips
  useEffect(() => {
    const color = isDark ? "#fff" : "#000";
    linkRefs.current.forEach(link => {
      if (link) gsap.to(link, { color, duration: 0.3, ease: "power1.out" });
    });
  }, [isDark]);

  // Underline hover
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    linkRefs.current.forEach(link => {
      if (!link) return;
      const underline = link.querySelector<HTMLSpanElement>(".nav-ul");
      if (!underline) return;
      gsap.set(underline, { scaleX: 0 });
      const onEnter = () => gsap.to(underline, { scaleX: 1, duration: 0.25, ease: "power2.out" });
      const onLeave = () => gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in" });
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      {links.map((link, i) => (
        <Link
          key={link}
          ref={el => { linkRefs.current[i] = el; }}
          href={HREF[link.toLowerCase()] ?? `/${link.toLowerCase()}`}
          className="relative font-semibold text-base tracking-[-0.04em] capitalize pb-px"
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          {link}
          <span
            className="nav-ul absolute bottom-0 left-0 w-full h-px bg-current"
            style={{ transformOrigin: "left" }}
          />
        </Link>
      ))}
    </>
  );
}
