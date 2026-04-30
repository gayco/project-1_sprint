"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MUTED = "#c0c0c0";

export default function NewsPageIntro() {
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

      <p className="md:hidden text-center font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
        001
      </p>

      {/* Line 1 */}
      <div className="flex items-start gap-3 justify-center md:justify-start">
        <p ref={el => { lineRefs.current[0] = el; }} className={`${lineClass} whitespace-nowrap`}>
          Stories,
        </p>
        <span className="hidden md:inline-block font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-2 shrink-0">001</span>
      </div>

      {/* Line 2 */}
      <div className="w-full flex justify-center md:justify-start md:pl-[12%]">
        <p ref={el => { lineRefs.current[1] = el; }} className={`${lineClass} whitespace-nowrap`}>
          insights &amp;
        </p>
      </div>

      {/* Line 3 */}
      <div className="w-full flex justify-center md:justify-start md:pl-[28%]">
        <p ref={el => { lineRefs.current[2] = el; }} className={`${lineClass} whitespace-nowrap`}>
          updates.
        </p>
      </div>

    </div>
  );
}
