"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useContactModal } from "@/context/ContactModalContext";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);

  // Animate in
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(panelRef.current,    { x: "100%" },  { x: "0%",  duration: 0.5,  ease: "power3.out" });
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(panelRef.current,    { x: "100%",  duration: 0.4,  ease: "power3.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.35, ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        closeModal();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full md:w-[580px] h-full bg-white flex flex-col overflow-y-auto"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 md:px-10 pt-8 pb-6 border-b border-[#e5e5e5] shrink-0">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em]">
              [ Get in touch ]
            </span>
            <h2 className="font-medium text-black text-[32px] leading-[0.9] tracking-[-0.06em]">
              Let&apos;s talk.
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 -mr-2 text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 md:px-10 py-8">
          <ContactForm onSuccess={handleClose} />
        </div>
      </div>
    </div>
  );
}
