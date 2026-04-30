"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetsTalkButton from "./LetsTalkButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax({ heroImage }: { heroImage: string }) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLImageElement>(null);
  const harveyRef   = useRef<HTMLSpanElement>(null);
  const specterRef  = useRef<HTMLSpanElement>(null);
  const helloRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bgRef.current,      { scale: 1.18, ease: "none" }, 0)
        .to(harveyRef.current,  { x: "-28vw",  ease: "none" }, 0)
        .to(helloRef.current,   { x: "-28vw",  ease: "none" }, 0)
        .to(specterRef.current, { x: "28vw",   ease: "none" }, 0);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <section
        className="sticky top-0 h-screen relative"
        style={{ overflow: "clip" }}
      >
        {/* Background image */}
        <img
          ref={bgRef}
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full object-cover object-top pointer-events-none select-none"
          style={{ height: "100%", transformOrigin: "center center" }}
        />

        {/* Gradient blur */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[480px] pointer-events-none"
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          }}
        />

        {/* Layout */}
        <div className="relative h-full flex flex-col px-4 md:px-8">

          {/* Spacer matching fixed navbar height */}
          <div className="h-[76px] shrink-0" />

          {/* Hero body */}
          <div className="flex-1 flex flex-col pb-6 md:pb-8 md:justify-start md:pt-[240px]">

            {/* Heading */}
            <div className="mt-[30vh] md:mt-0 flex flex-col pb-[15px]">

              <div className="flex justify-center md:justify-start px-[18px] mb-[-15px]">
                <span
                  ref={helloRef}
                  className="inline-block font-mono font-normal text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay whitespace-nowrap"
                >
                  [ Hello i&apos;m ]
                </span>
              </div>

              <h1
                className="font-medium capitalize text-white text-center mix-blend-overlay leading-[0.8] md:leading-[1.1] w-full text-[96px] md:text-[clamp(80px,13.75vw,198px)]"
                style={{ letterSpacing: "-0.07em", wordSpacing: "0.15em" }}
              >
                <span ref={harveyRef}  className="inline-block">Harvey</span>
                {" "}
                <span ref={specterRef} className="inline-block">Specter</span>
              </h1>
            </div>

            {/* Description + CTA */}
            <div className="flex justify-center md:justify-end">
              <div className="flex flex-col items-center md:items-start gap-[17px] w-[293px] md:w-[294px]">
                <p className="font-bold italic text-[#1f1f1f] text-[14px] uppercase tracking-[-0.04em] leading-[1.1] text-center md:text-left">
                  H.Studio is a{" "}
                  <span className="font-normal">full-service</span>{" "}
                  creative studio creating beautiful digital experiences and
                  products. We are an{" "}
                  <span className="font-normal">award winning</span>{" "}
                  desing and art group specializing in branding, web design and
                  engineering.
                </p>
                <LetsTalkButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
