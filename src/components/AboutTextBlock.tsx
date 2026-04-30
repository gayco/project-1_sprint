"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const d = {
    tl: "M8 0.5 L0.5 0.5 L0.5 8",
    tr: "M8 0.5 L15.5 0.5 L15.5 8",
    bl: "M0.5 8 L0.5 15.5 L8 15.5",
    br: "M8 15.5 L15.5 15.5 L15.5 8",
  }[corner];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export default function AboutTextBlock({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: 0 },
        {
          x: -80,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="flex-1 flex items-center gap-3 min-w-0">
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket corner="tl" />
        <CornerBracket corner="bl" />
      </div>
      <p className="flex-1 font-sans text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3 min-w-0">
        {text}
      </p>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket corner="tr" />
        <CornerBracket corner="br" />
      </div>
    </div>
  );
}
