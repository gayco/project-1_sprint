import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "@/components/Navbar";
import LetsTalkButton from "@/components/LetsTalkButton";
import FullBleedPhoto from "@/components/FullBleedPhoto";
import ServiceItem from "@/components/ServiceItem";
import ServicesPageIntro from "@/components/ServicesPageIntro";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 3600;

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const CAMERA_PHOTO =
  "https://www.figma.com/api/mcp/asset/3a79c1e9-e11f-4426-8479-e41d7101a493";

const FALLBACK_SERVICES = [
  {
    num: "[ 1 ]",
    name: "Brand Discovery",
    img: "https://www.figma.com/api/mcp/asset/7d4fa34a-f6b7-4eae-b2df-ef58a02c8b4d",
    desc: "We dig into your positioning, voice, and visual identity to build a brand system that's distinctly yours. Logo, typography, colour, and guidelines — everything you need to show up consistently across every touchpoint.",
  },
  {
    num: "[ 2 ]",
    name: "Web design & Dev",
    img: "https://www.figma.com/api/mcp/asset/47d7eabf-2127-43c3-a3d8-c51a5131bef3",
    desc: "From concept to live site, we design and build performant, responsive websites that look as good as they work. Clean code, modern frameworks, and an experience your users will actually remember.",
  },
  {
    num: "[ 3 ]",
    name: "Marketing",
    img: "https://www.figma.com/api/mcp/asset/226a13a6-0a3e-49f3-97ff-accc213eeaeb",
    desc: "Content strategy, social campaigns, and visual assets built to connect with the right audience. We combine sharp creative direction with performance thinking so your marketing moves the needle — not just the metrics.",
  },
  {
    num: "[ 4 ]",
    name: "Photography",
    img: "https://www.figma.com/api/mcp/asset/97413dbf-0fd6-4e3e-ae5f-9c3d9d2c7afd",
    desc: "Editorial, commercial, and product photography shot with intention. Every frame is composed to carry the full weight of your brand — technically precise, visually compelling, and built to last beyond the trend cycle.",
  },
];

type SanityService = {
  _id: string;
  name: string;
  description: string;
  image: { asset: { _ref: string } } | null;
  order: number;
};

export default async function ServicesPage() {
  const sanityServices: SanityService[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client
        .fetch<SanityService[]>(
          `*[_type == "service"] | order(order asc) { _id, name, description, image, order }`
        )
        .catch((): SanityService[] => [])
    : [];

  const services =
    sanityServices.length > 0
      ? sanityServices.map((s, i) => ({
          num: `[ ${i + 1} ]`,
          name: s.name,
          desc: s.description,
          img: s.image
            ? urlFor(s.image).width(800).url()
            : (FALLBACK_SERVICES[i]?.img ?? ""),
        }))
      : FALLBACK_SERVICES;

  return (
    <>
    <div className="relative z-[1]">
      <Navbar navLinks={NAV_LINKS} />

      {/* ---- Section 001 — Intro staggered text ---- */}
      <section className="bg-white px-4 md:px-8 py-12 md:py-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 items-end">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
              [ {services.length} disciplines ]
            </span>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>
          <ServicesPageIntro />
        </div>
      </section>

      {/* ---- Section 002 — Services list ---- */}
      <section className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12" data-navbar-dark>

        <div className="flex items-end justify-between">
          <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">[ services ]</span>
          <div className="font-sans font-light text-white uppercase tracking-[-0.08em] whitespace-nowrap text-[32px] md:text-[6.67vw] 2xl:text-[96px] flex items-center gap-6">
            <span>[{services.length}]</span>
            <span>Deliverables</span>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {services.map((s) => (
            <ServiceItem
              key={s.num}
              num={s.num}
              name={s.name}
              desc={s.desc}
              img={s.img}
            />
          ))}
        </div>
      </section>

      {/* ---- Full-bleed photo ---- */}
      <FullBleedPhoto src={CAMERA_PHOTO} />

      {/* ---- Section 004 — CTA ---- */}
      <section
        className="bg-black px-4 md:px-8 py-[100px] md:py-[140px] flex flex-col items-center gap-8"
        data-navbar-dark
      >
        <span className="font-mono text-[14px] text-white/60 uppercase leading-[1.1] tracking-[-0.04em]">
          [ Ready to start? ]
        </span>
        <h2
          className="font-medium text-white capitalize leading-[0.85] tracking-[-0.07em] text-center text-[48px] md:text-[clamp(48px,8vw,120px)]"
        >
          Let&apos;s build<br />something great
        </h2>
        <p className="font-sans font-light italic text-white/70 text-[16px] md:text-[18px] text-center leading-[1.3] tracking-[-0.04em] max-w-[480px]">
          Whether you have a brief or just an idea — we&apos;d love to hear about it.
        </p>
        <LetsTalkButton baseBg="#fff" baseColor="#000" hoverBg="#000" hoverColor="#fff" className="border border-white px-6 py-4 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer mt-2">
          Get in touch
        </LetsTalkButton>
      </section>

    </div>

    <SiteFooter />
    </>
  );
}
