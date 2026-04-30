"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function StaticPortrait({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      className="relative w-full md:w-[31vw] md:max-w-[436px] overflow-hidden shrink-0"
      style={{ aspectRatio: "436/614" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Harvey Specter"
        className="absolute max-w-none object-cover"
        style={{ width: "101.42%", height: "101.39%", top: "-0.69%", left: "-0.71%", opacity: 0 }}
      />
    </div>
  );
}
