"use client";

import { useRef, useState, useEffect } from "react";

type NewsItem = { img: string; blurb: string };

export default function NewsSlider({ items }: { items: NewsItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const ratios = new Array(items.length).fill(0) as number[];

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
  }, [items.length]);

  const scrollTo = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div className="flex flex-col -mx-4">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pl-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", scrollPaddingLeft: "16px" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-index={i}
            className="w-[calc(100vw-32px)] shrink-0 flex flex-col gap-4 snap-start"
          >
            <div className="h-[398px] overflow-hidden">
              <img src={item.img} alt="" className="w-full h-full object-cover pointer-events-none select-none" />
            </div>
            <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{item.blurb}</p>
            <div className="flex items-center gap-[10px] border-b border-black pb-1 w-fit overflow-hidden cursor-pointer">
              <span className="font-sans font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 14L14 4M14 4H8M14 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>

      <div className="flex justify-center items-center gap-2 pt-6 pb-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to news ${i + 1}`}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-black" : "w-[6px] bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
