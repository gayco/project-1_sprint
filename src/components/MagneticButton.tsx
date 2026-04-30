"use client";

import { useRef } from "react";
import gsap from "gsap";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hoverBg?: string;
  hoverColor?: string;
  baseBg?: string;
  baseColor?: string;
};

export default function MagneticButton({
  hoverBg,
  hoverColor,
  baseBg,
  baseColor,
  children,
  style,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseEnter = () => {
    if (!hoverBg && !hoverColor) return;
    gsap.to(ref.current, {
      backgroundColor: hoverBg,
      color: hoverColor,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width  / 2)) * 0.4;
    const y = (e.clientY - (rect.top  + rect.height / 2)) * 0.4;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  };

  const onMouseLeave = () => {
    const btn = ref.current;
    if (hoverBg || hoverColor) {
      gsap.to(btn, {
        backgroundColor: baseBg,
        color: baseColor,
        duration: 0.2,
        ease: "power1.out",
      });
    }
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
  };

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ backgroundColor: baseBg, color: baseColor, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
