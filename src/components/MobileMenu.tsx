"use client";

import { useState } from "react";

export default function MobileMenu({ navLinks }: { navLinks: readonly string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="block w-[18px] h-[1.5px] bg-black rounded-full" />
        <span className="block w-[18px] h-[1.5px] bg-black rounded-full" />
        <span className="block w-[18px] h-[1.5px] bg-black rounded-full" />
      </button>

      {/* Desktop CTA */}
      <button className="hidden md:block bg-black text-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer">
        Let&apos;s talk
      </button>

      {/* Full-screen mobile overlay */}
      {open && (
        <div className="md:hidden absolute inset-0 z-20 bg-black flex flex-col px-4 py-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base tracking-[-0.04em] text-white capitalize">
              H.Studio
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-semibold text-[40px] tracking-[-0.04em] text-white capitalize leading-none hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(false)}
            className="self-start bg-white text-black px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em]"
          >
            Let&apos;s talk
          </button>
        </div>
      )}
    </>
  );
}
