import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@h.studio", href: "mailto:hello@h.studio" },
  { label: "Phone", value: "+1 (312) 000-0000", href: "tel:+13120000000" },
  { label: "Based in", value: "Chicago, IL", href: null },
];

const SOCIALS = [
  { name: "Instagram", href: "#" },
  { name: "Facebook",  href: "#" },
  { name: "X.com",     href: "#" },
  { name: "LinkedIn",  href: "#" },
];

export default function ContactPage() {
  return (
    <>
    <div className="relative z-[1]">
      <Navbar navLinks={NAV_LINKS} />

      {/* ---- Hero ---- */}
      <section
        className="bg-black px-4 md:px-8 pt-[140px] md:pt-[180px] pb-16 md:pb-[100px] flex flex-col gap-12 md:gap-16"
        data-navbar-dark
      >
        {/* Label + rule */}
        <div className="flex flex-col gap-3 items-end">
          <span className="font-mono text-[14px] text-white/50 uppercase leading-[1.1] text-right">
            [ Let&apos;s talk ]
          </span>
          <div className="w-full h-px bg-white/20" />
        </div>

        {/* Heading + meta row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <h1
            className="font-medium text-white capitalize leading-[0.85] tracking-[-0.07em] text-[64px] md:text-[clamp(64px,10vw,148px)]"
          >
            Get in<br />touch.
          </h1>

          {/* Contact details */}
          <div className="flex flex-col gap-4 md:pb-3 md:items-end">
            {CONTACT_DETAILS.map((d) => (
              <div key={d.label} className="flex flex-col gap-[2px] md:items-end">
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-[-0.03em]">{d.label}</span>
                {d.href ? (
                  <a
                    href={d.href}
                    className="font-sans text-white text-[18px] tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity"
                  >
                    {d.value}
                  </a>
                ) : (
                  <span className="font-sans text-white text-[18px] tracking-[-0.04em] leading-[1.1]">
                    {d.value}
                  </span>
                )}
              </div>
            ))}

            <div className="flex gap-4 mt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="font-mono text-[11px] text-white/40 uppercase tracking-[-0.03em] hover:text-white transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Form ---- */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-[100px]">
        <div className="max-w-[860px]">

          <div className="flex flex-col gap-3 mb-12">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ Send a message ]
            </span>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ---- Map / Location strip ---- */}
      <section className="bg-[#f3f3f3] px-4 md:px-8 py-12 md:py-[80px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em]">[ Studio location ]</span>
            <p className="font-sans font-light text-black text-[32px] md:text-[48px] tracking-[-0.06em] leading-[1]">
              Chicago, IL<br />United States
            </p>
          </div>
          <p className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em] md:pb-2">
            Available for remote &amp; on-site projects worldwide
          </p>
        </div>
      </section>

    </div>

    <SiteFooter />
    </>
  );
}
