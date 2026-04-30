"use client";

import { useContactModal } from "@/context/ContactModalContext";
import MagneticButton from "./MagneticButton";

type Props = {
  baseBg?: string;
  baseColor?: string;
  hoverBg?: string;
  hoverColor?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function LetsTalkButton({
  baseBg = "#000",
  baseColor = "#fff",
  hoverBg = "#fff",
  hoverColor = "#000",
  className = "border border-black px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer",
  children = "Let’s talk",
}: Props) {
  const { openModal } = useContactModal();
  return (
    <MagneticButton
      baseBg={baseBg}
      baseColor={baseColor}
      hoverBg={hoverBg}
      hoverColor={hoverColor}
      className={className}
      onClick={openModal}
    >
      {children}
    </MagneticButton>
  );
}
