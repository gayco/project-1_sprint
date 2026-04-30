"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPortrait({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[31vw] max-w-[436px] overflow-hidden shrink-0"
      style={{ aspectRatio: "436/614" }}
    >
      <img
        src={src}
        alt="Harvey Specter"
        className="absolute max-w-none object-cover"
        style={{ width: "101.42%", height: "101.39%", top: "-0.69%", left: "-0.71%" }}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{ transformOrigin: "right center" }}
      />
    </div>
  );
}
