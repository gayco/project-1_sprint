"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MUTED = "#c0c0c0";

export default function AboutText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRefs   = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRefs.current, { color: MUTED });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      lineRefs.current.forEach((line, i) => {
        tl.to(line, { color: "#000", ease: "none", duration: 1 }, i * 0.6);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const lineClass =
    "font-sans font-light uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84]";

  return (
    <div ref={wrapperRef} className="flex flex-col gap-2">

      {/* 001 — mobile only */}
      <p className="md:hidden text-center font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
        001
      </p>

      {/* Line 1: A creative director / */}
      <div className="flex items-start gap-3 justify-center md:justify-start">
        <p
          ref={el => { lineRefs.current[0] = el; }}
          className={`${lineClass} whitespace-pre`}
        >
          {`A creative director   /`}
        </p>
        <span className="hidden md:inline-block font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-2 shrink-0">
          001
        </span>
      </div>

      {/* Line 2: Photographer */}
      <div className="w-full flex justify-center md:justify-start md:pl-[15.5%]">
        <p
          ref={el => { lineRefs.current[1] = el; }}
          className={`${lineClass} whitespace-nowrap`}
        >
          Photographer
        </p>
      </div>

      {/* Line 3: Born & raised */}
      <div className="w-full flex justify-center md:justify-start md:pl-[44.3%]">
        <p
          ref={el => { lineRefs.current[2] = el; }}
          className={`${lineClass} whitespace-nowrap`}
        >
          {"Born "}
          <em
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 12, 'wdth' 100",
              fontWeight: 400,
            }}
          >
            {"&"}
          </em>
          {" raised"}
        </p>
      </div>

      {/* Line 4: On the south side */}
      <div className="w-full flex justify-center md:justify-start">
        <p
          ref={el => { lineRefs.current[3] = el; }}
          className={`${lineClass} whitespace-nowrap`}
        >
          On the south side
        </p>
      </div>

      {/* Line 5: Of chicago. + label */}
      <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-[44%] md:gap-4">
        <p
          ref={el => { lineRefs.current[4] = el; }}
          className={`${lineClass} whitespace-nowrap`}
        >
          Of chicago.
        </p>
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap mt-3 md:mt-0">
          [ creative freelancer ]
        </span>
      </div>

    </div>
  );
}
