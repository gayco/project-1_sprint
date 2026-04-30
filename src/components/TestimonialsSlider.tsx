"use client";

import { useRef, useState, useEffect } from "react";

type Testimonial = { logo: string; quote: string; author: string };

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Track each card's intersection ratio; the most-visible card is active
    const ratios = new Array(testimonials.length).fill(0) as number[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          ratios[idx] = entry.intersectionRatio;
        });
        const max = Math.max(...ratios);
        if (max > 0) setActiveIndex(ratios.indexOf(max));
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [testimonials.length]);

  const scrollTo = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div className="flex flex-col">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pl-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", scrollPaddingLeft: "16px" }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.author}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-index={i}
            className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-5 w-[calc(100vw-32px)] shrink-0 flex flex-col gap-4 snap-start my-4"
            style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
          >
            <img src={t.logo} alt="" className="max-h-[36px] w-auto max-w-[130px] object-contain object-left" />
            <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{t.quote}</p>
            <p className="font-sans font-black text-black text-[13px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{t.author}</p>
          </div>
        ))}
        {/* trailing spacer so the last card can reach its snap point */}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>

      <div className="flex justify-center items-center gap-2 pb-8 pt-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-black" : "w-[6px] bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
