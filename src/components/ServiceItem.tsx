"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function ServiceItem({
  num,
  name,
  desc,
  img,
}: {
  num: string;
  name: string;
  desc: string;
  img: string;
}) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  const onEnter = () => {
    gsap.to(rowRef.current,  { backgroundColor: "rgba(255,255,255,0.05)", duration: 0.35, ease: "power2.out" });
    gsap.to(ruleRef.current, { backgroundColor: "rgba(255,255,255,0.75)", duration: 0.35, ease: "power2.out" });
    gsap.to(nameRef.current, { x: 10, duration: 0.4, ease: "power2.out" });
    gsap.to(imgRef.current,  { scale: 1.07, duration: 0.5, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(rowRef.current,  { backgroundColor: "rgba(255,255,255,0)", duration: 0.4, ease: "power2.inOut" });
    gsap.to(ruleRef.current, { backgroundColor: "rgba(255,255,255,0.3)", duration: 0.4, ease: "power2.inOut" });
    gsap.to(nameRef.current, { x: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(imgRef.current,  { scale: 1, duration: 0.5, ease: "power2.inOut" });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex flex-col gap-[9px] -mx-4 md:-mx-8 px-4 md:px-8 py-3 rounded-sm cursor-default"
    >
      <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">{num}</span>
      <div ref={ruleRef} className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between pt-[9px]">
        <p
          ref={nameRef}
          className="font-sans font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap"
        >
          {name}
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start">
          <p className="font-sans text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-full md:w-[393px]">
            {desc}
          </p>
          <div className="shrink-0 size-[151px] overflow-hidden">
            <img
              ref={imgRef}
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
