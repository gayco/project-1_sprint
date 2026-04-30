"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import LetsTalkButton from "@/components/LetsTalkButton";

const HREF: Record<string, string> = {
  about:    "/about",
  services: "/services",
  projects: "/projects",
  news:     "/news",
  contact:  "/contact",
};

export default function MobileMenu({
  navLinks,
  isDark = false,
}: {
  navLinks: readonly string[];
  isDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);

  // Transition hamburger line colour with the navbar theme
  useEffect(() => {
    const color = isDark ? "#fff" : "#000";
    [line1, line2, line3].forEach(r => {
      if (r.current) gsap.to(r.current, { backgroundColor: color, duration: 0.3, ease: "power1.out" });
    });
  }, [isDark]);

  // Animate overlay in on open
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const links = linkRefs.current.filter(Boolean);
    gsap.from(overlay, { opacity: 0, y: -12, duration: 0.3, ease: "power2.out" });
    gsap.from(links, { y: 16, opacity: 0, duration: 0.35, stagger: 0.06, ease: "power2.out", delay: 0.1 });
  }, [open]);

  const closeMenu = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: -8,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span ref={line1} className="block w-[18px] h-[1.5px] rounded-full" style={{ backgroundColor: isDark ? "#fff" : "#000" }} />
        <span ref={line2} className="block w-[18px] h-[1.5px] rounded-full" style={{ backgroundColor: isDark ? "#fff" : "#000" }} />
        <span ref={line3} className="block w-[18px] h-[1.5px] rounded-full" style={{ backgroundColor: isDark ? "#fff" : "#000" }} />
      </button>

      {/* Desktop CTA */}
      <LetsTalkButton
        baseBg={isDark ? "#fff" : "#000"}
        baseColor={isDark ? "#000" : "#fff"}
        hoverBg={isDark ? "#000" : "#fff"}
        hoverColor={isDark ? "#fff" : "#000"}
        className={`hidden md:block border px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer ${isDark ? "border-white" : "border-black"}`}
      />

      {/* Full-screen overlay */}
      {open && (
        <div ref={overlayRef} className="fixed inset-0 z-50 bg-black flex flex-col px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base tracking-[-0.04em] text-white capitalize">H.Studio</span>
            <button onClick={closeMenu} aria-label="Close menu" className="p-1 text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link}
                ref={el => { linkRefs.current[i] = el; }}
                href={HREF[link.toLowerCase()] ?? `/${link.toLowerCase()}`}
                onClick={closeMenu}
                className="font-semibold text-[40px] tracking-[-0.04em] text-white capitalize leading-none"
              >
                {link}
              </Link>
            ))}
          </nav>
          <LetsTalkButton baseBg="#fff" baseColor="#000" hoverBg="#000" hoverColor="#fff" className="self-center border border-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer" />
        </div>
      )}
    </>
  );
}
