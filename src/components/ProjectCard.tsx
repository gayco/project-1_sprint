"use client";

import { useRef } from "react";
import gsap from "gsap";

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15.25" stroke="#1f1f1f" strokeWidth="1.5" />
      <path d="M11 21L21 11M21 11H14M21 11V18" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectCard({
  name,
  tags,
  img,
  imgClassName,
}: {
  name: string;
  tags: string[];
  img: string;
  imgClassName: string;
}) {
  const imgRef   = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current,   { scale: 1.06, duration: 0.55, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 5, y: -5, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(imgRef.current,   { scale: 1,  duration: 0.55, ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.35, ease: "power2.inOut" });
  };

  return (
    <div
      className="flex flex-col gap-[10px] cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`relative overflow-hidden w-full ${imgClassName}`}>
        <img
          ref={imgRef}
          src={img}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-sans font-black text-[24px] md:text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
          {name}
        </p>
        <span ref={arrowRef} className="shrink-0">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
}
