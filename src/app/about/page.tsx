import Navbar from "@/components/Navbar";
import LetsTalkButton from "@/components/LetsTalkButton";
import AboutTextBlock from "@/components/AboutTextBlock";
import StaticPortrait from "@/components/StaticPortrait";
import FullBleedPhoto from "@/components/FullBleedPhoto";
import ServiceItem from "@/components/ServiceItem";
import AboutPageIntro from "@/components/AboutPageIntro";
import SiteFooter from "@/components/SiteFooter";
import AboutHero from "@/components/AboutHero";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const ABOUT_PHOTO =
  "https://www.figma.com/api/mcp/asset/367f0f3e-444e-4b81-a876-a85843441c5b";

const CAMERA_PHOTO =
  "https://www.figma.com/api/mcp/asset/3a79c1e9-e11f-4426-8479-e41d7101a493";

const BIO_SHORT =
  "Born and raised on the south side of Chicago, I grew up surrounded by a city that never stopped moving. That energy shaped the way I see the world — and the way I work.";

const BIO_LONG =
  "Over 8 years I've partnered with brands, agencies, and founders to translate complex ideas into visual systems that people actually feel. My practice sits at the intersection of photography, brand strategy, and digital design — and I believe the best creative work happens when those disciplines stop pretending to be separate.";

const SERVICE_DESC =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES = [
  {
    num: "[ 1 ]",
    name: "Brand Discovery",
    img: "https://www.figma.com/api/mcp/asset/7d4fa34a-f6b7-4eae-b2df-ef58a02c8b4d",
  },
  {
    num: "[ 2 ]",
    name: "Web design & Dev",
    img: "https://www.figma.com/api/mcp/asset/47d7eabf-2127-43c3-a3d8-c51a5131bef3",
  },
  {
    num: "[ 3 ]",
    name: "Marketing",
    img: "https://www.figma.com/api/mcp/asset/226a13a6-0a3e-49f3-97ff-accc213eeaeb",
  },
  {
    num: "[ 4 ]",
    name: "Photography",
    img: "https://www.figma.com/api/mcp/asset/97413dbf-0fd6-4e3e-ae5f-9c3d9d2c7afd",
  },
] as const;

const STATS = [
  { num: "8+",  label: "Years in the industry" },
  { num: "50+", label: "Projects delivered"    },
  { num: "4",   label: "Core disciplines"      },
] as const;

export default function AboutPage() {
  return (
    <>
    <div className="relative z-[1]">
      <Navbar navLinks={NAV_LINKS} />

      {/* ---- Hero ---- */}
      <AboutHero src={ABOUT_PHOTO} />

      {/* ---- Section 001 — Intro staggered text ---- */}
      <section className="bg-white px-4 md:px-8 py-12 md:py-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 items-end">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
              [ 8+ years in industry ]
            </span>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>
          <AboutPageIntro />
        </div>
      </section>

      {/* ---- Section 002 — Bio + Portrait ---- */}
      <section className="bg-white px-4 md:px-8 py-12 md:py-[80px]">

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-6">
          <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ Background ]</span>
          <StaticPortrait src={ABOUT_PHOTO} />
          <p className="font-sans text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{BIO_SHORT}</p>
          <p className="font-sans text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{BIO_LONG}</p>
          <LetsTalkButton />
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex gap-8 items-start">

          {/* Left text block — floats left on scroll */}
          <AboutTextBlock text={`${BIO_SHORT} ${BIO_LONG}`} />

          {/* Right: label + portrait */}
          <div className="flex gap-6 items-start shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <StaticPortrait src={ABOUT_PHOTO} />
          </div>

        </div>
      </section>

      {/* ---- Section 003 — Stats ---- */}
      <section className="bg-white px-4 md:px-8 py-12 md:py-[80px] border-t border-[#e5e5e5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 ${i > 0 ? "md:border-l md:border-[#e5e5e5] md:pl-10" : ""}`}
            >
              <p className="font-sans font-light text-black uppercase text-[64px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84]">
                {s.num}
              </p>
              <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Section 004 — Philosophy / Quote ---- */}
      <section
        className="bg-black px-4 md:px-8 py-[100px] md:py-[160px] flex items-center justify-center"
        data-navbar-dark
      >
        <blockquote className="font-sans font-light italic text-white text-[28px] md:text-[clamp(28px,3.5vw,56px)] leading-[1.2] tracking-[-0.04em] text-center max-w-[860px]">
          &ldquo;Great design isn&apos;t just about aesthetics &mdash; it&apos;s about solving problems with clarity, intention,{" "}
          <em
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 12, 'wdth' 100",
              fontWeight: 400,
            }}
          >
            and craft.
          </em>
          &rdquo;
        </blockquote>
      </section>

      {/* ---- Full-bleed photo ---- */}
      <FullBleedPhoto src={CAMERA_PHOTO} />

      {/* ---- Section 005 — Services ---- */}
      <section className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12" data-navbar-dark>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">[ What I do ]</span>
          <div className="flex items-center justify-between font-sans font-light text-white uppercase tracking-[-0.08em] whitespace-nowrap text-[32px] md:text-[6.67vw] 2xl:text-[96px]">
            <span>[4]</span>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {SERVICES.map((s) => (
            <ServiceItem
              key={s.num}
              num={s.num}
              name={s.name}
              desc={SERVICE_DESC}
              img={s.img}
            />
          ))}
        </div>
      </section>

    </div>

    <SiteFooter />
    </>
  );
}
