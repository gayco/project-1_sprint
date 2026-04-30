"use client";

import { useRef } from "react";
import gsap from "gsap";

function ReadMoreArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 14L14 4M14 4H8M14 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewsCard({
  img,
  blurb,
  title,
  date,
  category,
  className = "",
}: {
  img: string;
  blurb: string;
  title?: string;
  date?: string;
  category?: string;
  className?: string;
}) {
  const imgRef   = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current,   { scale: 1.06, duration: 0.55, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 5, y: -5, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current,   { scale: 1,    duration: 0.55, ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0, y: 0,  duration: 0.35, ease: "power2.inOut" });
  };

  return (
    <div
      className={`flex flex-col gap-4 cursor-pointer ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="h-[469px] overflow-hidden">
        <img
          ref={imgRef}
          src={img}
          alt={title ?? ""}
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Meta row — only shown when title/date/category are provided */}
      {(category || date) && (
        <div className="flex items-center justify-between">
          {category && (
            <span className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em]">
              [ {category} ]
            </span>
          )}
          {date && (
            <span className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em] ml-auto">
              {date}
            </span>
          )}
        </div>
      )}

      {title && (
        <p className="font-sans font-medium text-black text-[20px] leading-[1.1] tracking-[-0.04em]">
          {title}
        </p>
      )}

      <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{blurb}</p>
      <div className="flex items-center gap-[10px] border-b border-black pb-1 w-fit overflow-hidden">
        <span className="font-sans font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
        <div ref={arrowRef}>
          <ReadMoreArrow />
        </div>
      </div>
    </div>
  );
}
