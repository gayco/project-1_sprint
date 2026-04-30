"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FullBleedPhoto({ src }: { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { filter: "blur(20px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden h-[550px] md:h-[560px]"
      data-navbar-dark
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[40%_center] md:object-center pointer-events-none select-none"
        style={{ filter: "blur(20px)" }}
      />
    </section>
  );
}
