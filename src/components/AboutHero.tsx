"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const META = [
  { label: "Role",     value: "Creative Director & Photographer" },
  { label: "Based",    value: "Chicago, IL" },
  { label: "Est.",     value: "2016" },
];

export default function AboutHero({ src }: { src: string }) {
  const harveyRef  = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Start states
      gsap.set([harveyRef.current, specterRef.current], { y: "110%", opacity: 0 });
      gsap.set(metaRef.current,  { y: 24, opacity: 0 });
      gsap.set(labelRef.current, { y: 12, opacity: 0 });
      gsap.set(imgRef.current,   { clipPath: "inset(0 0 100% 0)", opacity: 1 });
      gsap.set(lineRef.current,  { scaleY: 0, transformOrigin: "top center" });

      tl
        .to(labelRef.current,   { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(lineRef.current,    { scaleY: 1, duration: 0.9, ease: "power2.inOut" }, 0.1)
        .to(imgRef.current,     { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.inOut" }, 0.15)
        .to(harveyRef.current,  { y: "0%", opacity: 1, duration: 0.85 }, 0.3)
        .to(specterRef.current, { y: "0%", opacity: 1, duration: 0.85 }, 0.45)
        .to(metaRef.current,    { y: 0, opacity: 1, duration: 0.7 }, 0.65);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative h-screen flex bg-[#111] overflow-hidden"
      data-navbar-dark
    >
      {/* ---- Left panel ---- */}
      <div className="relative flex flex-col justify-between px-4 md:px-8 pt-[100px] pb-10 md:pb-12 w-full md:w-[58%] shrink-0 z-10">

        {/* Section label */}
        <span
          ref={labelRef}
          className="font-mono text-[13px] text-white/40 uppercase tracking-[-0.03em] leading-[1]"
        >
          [ About ]
        </span>

        {/* Title */}
        <div className="flex flex-col overflow-hidden -mb-2">
          <div className="overflow-hidden">
            <span
              ref={harveyRef}
              className="block font-medium text-white capitalize leading-[0.85] tracking-[-0.07em] text-[clamp(72px,12vw,172px)]"
            >
              Harvey
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={specterRef}
              className="block font-medium text-white capitalize leading-[0.85] tracking-[-0.07em] text-[clamp(72px,12vw,172px)]"
            >
              Specter
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div
          ref={metaRef}
          className="flex flex-wrap gap-x-8 gap-y-3"
        >
          {META.map((m) => (
            <div key={m.label} className="flex flex-col gap-[3px]">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-[-0.02em]">{m.label}</span>
              <span className="font-sans text-[13px] text-white/70 tracking-[-0.04em]">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Divider ---- */}
      <div
        ref={lineRef}
        className="hidden md:block w-px bg-white/10 shrink-0 self-stretch"
      />

      {/* ---- Right panel — portrait ---- */}
      <div
        ref={imgRef}
        className="hidden md:block flex-1 relative overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <img
          src={src}
          alt="Harvey Specter"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Subtle left-side vignette to blend with divider */}
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(17,17,17,0.35), transparent)" }}
        />
      </div>

      {/* ---- Mobile: full-bleed portrait as background ---- */}
      <div className="md:hidden absolute inset-0">
        <img
          src={src}
          alt="Harvey Specter"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.45) 50%, rgba(17,17,17,0.2) 100%)" }}
        />
      </div>
    </section>
  );
}
