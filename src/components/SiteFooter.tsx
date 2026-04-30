"use client";

import LetsTalkButton from "@/components/LetsTalkButton";

export default function SiteFooter() {
  return (
    <footer id="contact" className="sticky bottom-0 z-0 bg-black pt-[48px] px-4 md:px-8 flex flex-col gap-[48px] md:gap-[120px]" data-navbar-dark>

      {/* Top block: CTA + social links + divider */}
      <div className="flex flex-col gap-6 md:gap-[48px]">

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* Left — CTA */}
          <div className="flex flex-col gap-3">
            <p className="font-sans font-light italic text-white text-[24px] uppercase tracking-[-0.04em] leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <LetsTalkButton baseBg="transparent" baseColor="#fff" hoverBg="#fff" hoverColor="#000" className="border border-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] w-fit cursor-pointer" />
          </div>

          {/* Center — Facebook + Instagram */}
          <div className="flex flex-col gap-1 md:gap-0 md:text-center">
            <a href="#" className="font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">Facebook</a>
            <a href="#" className="font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">Instagram</a>
            <a href="#" className="md:hidden font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">X.com</a>
            <a href="#" className="md:hidden font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">Linkedin</a>
          </div>

          {/* Right — X.com + Linkedin (desktop only) */}
          <div className="hidden md:flex flex-col text-right">
            <a href="#" className="font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">X.com</a>
            <a href="#" className="font-sans text-white text-[18px] uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity">Linkedin</a>
          </div>
        </div>

        <div className="w-full h-px bg-white/20" />
      </div>

      {/* Desktop bottom: giant H.Studio wordmark + legal links */}
      <div className="hidden md:flex items-end justify-between">
        <div className="relative h-[219px] overflow-hidden flex-1">
          <div className="absolute left-0 inset-y-0 w-4 flex items-center justify-center">
            <span className="-rotate-90 font-mono text-white text-[14px] uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </span>
          </div>
          <p className="absolute bottom-[-13px] left-8 font-sans font-semibold text-white capitalize text-[20.2vw] 2xl:text-[290px] leading-[0.8] tracking-[-0.06em] whitespace-nowrap">
            H.Studio
          </p>
        </div>
        <div className="flex gap-[34px] pb-8 shrink-0">
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Licences</a>
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Privacy policy</a>
        </div>
      </div>

      {/* Mobile bottom */}
      <div className="md:hidden h-[150px] overflow-hidden flex flex-col gap-3">
        <div className="flex gap-[34px] justify-center">
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Licences</a>
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Privacy policy</a>
        </div>
        <span className="font-mono text-white text-[10px] uppercase leading-[1.1]">[ Coded By Claude ]</span>
        <p className="font-sans font-semibold text-white capitalize text-[91px] leading-[0.8] tracking-[-0.06em] whitespace-nowrap">
          H.Studio
        </p>
      </div>

    </footer>
  );
}
