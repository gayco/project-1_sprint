"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = { logo: string; quote: string; author: string };

const CARDS: {
  rotation: number;
  left: string;
  top: string;
  fromY: number;
  toY: number;
}[] = [
  { rotation: -6.85, left: "3%",    top: "59px",  fromY:  60, toY: -60 },
  { rotation:  2.9,  left: "46.9%", top: "186px", fromY: -50, toY:  70 },
  { rotation:  2.23, left: "21.2%", top: "553px", fromY:  40, toY: -70 },
  { rotation: -4.15, left: "71%",   top: "546px", fromY: -70, toY:  50 },
];

export default function TestimonialsDesktop({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        const { fromY, toY } = CARDS[i];
        gsap.fromTo(
          card,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="hidden md:flex items-center justify-center min-h-[860px] relative overflow-hidden"
    >
      <p className="font-sans font-medium text-black capitalize text-[13.75vw] 2xl:text-[198px] leading-[1.1] tracking-[-0.07em] text-center select-none">
        Testimonials
      </p>

      {testimonials.map((t, i) => {
        const { rotation, left, top } = CARDS[i];
        return (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className="absolute w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
            style={{ left, top, transform: `rotate(${rotation}deg)` }}
          >
            <img src={t.logo} alt="" className="max-h-[40px] w-auto max-w-[150px] object-contain object-left" />
            <p className="font-sans text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">{t.quote}</p>
            <p className="font-sans font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{t.author}</p>
          </div>
        );
      })}
    </div>
  );
}
