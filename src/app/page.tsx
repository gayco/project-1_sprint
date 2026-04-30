import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import LetsTalkButton from "@/components/LetsTalkButton";
import HeroParallax from "@/components/HeroParallax";
import Navbar from "@/components/Navbar";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NewsSlider from "@/components/NewsSlider";
import AboutText from "@/components/AboutText";
import AboutPortrait from "@/components/AboutPortrait";
import AboutTextBlock from "@/components/AboutTextBlock";
import FullBleedPhoto from "@/components/FullBleedPhoto";
import ServiceItem from "@/components/ServiceItem";
import ProjectCard from "@/components/ProjectCard";
import TestimonialsDesktop from "@/components/TestimonialsDesktop";
import NewsCard from "@/components/NewsCard";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 60;

const HERO_IMAGE = "/hero.png";

const ABOUT_PHOTO =
  "https://www.figma.com/api/mcp/asset/367f0f3e-444e-4b81-a876-a85843441c5b";

const CAMERA_PHOTO =
  "https://www.figma.com/api/mcp/asset/3a79c1e9-e11f-4426-8479-e41d7101a493";

const ABOUT_TEXT =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

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

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const FALLBACK_PROJECTS: { name: string; tags: string[]; img: string }[] = [
  {
    name: "Surfers paradise",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/946e5717-55b5-4939-97f2-fc962f7a0373",
  },
  {
    name: "Cyberpunk caffe",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/4eb398ae-9097-4870-8a8d-8b0b1c8115ee",
  },
  {
    name: "Agency 976",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/5b492cac-da2e-485a-b546-c5d7d87e466c",
  },
  {
    name: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/71ed518b-855c-4310-8242-9e6872316497",
  },
];

const NEWS_IMG_1 =
  "https://www.figma.com/api/mcp/asset/d4d5a742-8c8d-4f7d-9093-da65698b8639";
const NEWS_IMG_2 =
  "https://www.figma.com/api/mcp/asset/b248d27e-14c8-46ff-baab-37eee371b033";
const NEWS_IMG_3 =
  "https://www.figma.com/api/mcp/asset/388e2e59-7461-4a73-987d-71f1f308e1bf";
const NEWS_BLURB =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const TESTIMONIALS: { logo: string; quote: string; author: string }[] = [
  {
    logo: "https://www.figma.com/api/mcp/asset/65281315-81b2-4509-9f56-e1238cfd2ab9",
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/d1910b1f-d1e6-4d8f-b3b7-86b05f9df1e2",
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/b27e458f-2f8a-488a-a669-8e63ff0899f9",
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/0e4820b0-25ca-4bc6-819a-10f9f68628b7",
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
  },
];

type SanityPortfolioItem = {
  _id: string;
  title: string;
  tags: string[] | null;
  coverImage: { asset: { _ref: string } } | null;
  order: number;
};

type SanityNewsPost = {
  _id: string;
  blurb: string | null;
  image: { asset: { _ref: string } } | null;
};

type SanityTestimonial = {
  _id: string;
  author: string;
  company: string | null;
  quote: string;
  logo: { asset: { _ref: string } } | null;
};

// L-shaped corner bracket, 16×16px. One shape, four orientations.
function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const d = {
    tl: "M8 0.5 L0.5 0.5 L0.5 8",
    tr: "M8 0.5 L15.5 0.5 L15.5 8",
    bl: "M0.5 8 L0.5 15.5 L8 15.5",
    br: "M8 15.5 L15.5 15.5 L15.5 8",
  }[corner];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}





function ProjectCta() {
  return (
    <div className="flex gap-3 items-center w-full md:w-[465px]">
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
        <CornerBracket corner="tl" />
        <CornerBracket corner="bl" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px] items-start justify-center py-3">
        <p className="font-sans italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <LetsTalkButton />
      </div>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0 items-end">
        <CornerBracket corner="tr" />
        <CornerBracket corner="br" />
      </div>
    </div>
  );
}

export default async function Home() {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const [sanityItems, sanityNews, sanityTestimonials] = hasSanity
    ? await Promise.all([
        client
          .fetch<SanityPortfolioItem[]>(
            `*[_type == "portfolio"] | order(order asc) { _id, title, tags, coverImage, order }`
          )
          .catch((): SanityPortfolioItem[] => []),
        client
          .fetch<SanityNewsPost[]>(
            `*[_type == "newsPost"] | order(publishedAt desc)[0...3] { _id, blurb, image }`
          )
          .catch((): SanityNewsPost[] => []),
        client
          .fetch<SanityTestimonial[]>(
            `*[_type == "testimonial"] | order(order asc) { _id, author, company, quote, logo }`
          )
          .catch((): SanityTestimonial[] => []),
      ])
    : [[], [], []];

  const projects =
    sanityItems.length > 0
      ? sanityItems.slice(0, 4).map((item, i) => ({
          name: item.title,
          tags: item.tags ?? [],
          img: item.coverImage
            ? urlFor(item.coverImage).width(900).url()
            : (FALLBACK_PROJECTS[i]?.img ?? ""),
        }))
      : FALLBACK_PROJECTS;

  const FALLBACK_NEWS = [
    { img: NEWS_IMG_1, blurb: NEWS_BLURB },
    { img: NEWS_IMG_2, blurb: NEWS_BLURB },
    { img: NEWS_IMG_3, blurb: NEWS_BLURB },
  ];

  const newsItems =
    sanityNews.length > 0
      ? sanityNews.map((n, i) => ({
          img: n.image ? urlFor(n.image).width(600).url() : (FALLBACK_NEWS[i]?.img ?? ""),
          blurb: n.blurb ?? NEWS_BLURB,
        }))
      : FALLBACK_NEWS;

  const testimonials =
    sanityTestimonials.length > 0
      ? sanityTestimonials.map((t) => ({
          logo: t.logo ? urlFor(t.logo).width(160).url() : "",
          quote: t.quote,
          author: t.author,
        }))
      : (TESTIMONIALS as { logo: string; quote: string; author: string }[]);

  return (
    <>
    <div className="relative z-[1]">
    <Navbar navLinks={NAV_LINKS} />
    <HeroParallax heroImage={HERO_IMAGE} />

    {/* ---- About / Intro Section ---- */}
    <section id="about" className="bg-white px-4 md:px-8 py-12 md:py-[120px]">
      <div className="flex flex-col gap-6">

        {/* Label + rule */}
        <div className="flex flex-col gap-3 items-end">
          <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </span>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* Text block */}
        <AboutText />
      </div>
    </section>

    {/* ---- Section 002 — About / Portrait ---- */}
    <section className="bg-white px-4 md:px-8 py-12 md:py-[80px]">

      {/* Mobile layout: stacked */}
      <div className="md:hidden flex flex-col gap-5">
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</span>

        {/* Text block with corner brackets */}
        <div className="flex items-center justify-between">
          <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
            <CornerBracket corner="tl" />
            <CornerBracket corner="bl" />
          </div>
          <p className="flex-1 font-sans text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3 px-0">
            {ABOUT_TEXT}
          </p>
          <div className="self-stretch flex flex-col justify-between w-6 shrink-0 items-end">
            <CornerBracket corner="tr" />
            <CornerBracket corner="br" />
          </div>
        </div>

        {/* Portrait — full width, 422:594 aspect */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "422/594" }}>
          <img
            src={ABOUT_PHOTO}
            alt="Harvey Specter"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Desktop layout: [ About ] far-left, text+brackets+photo on the right */}
      <div className="hidden md:flex items-start">
        <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ About ]
        </span>

        {/* Right group: pushed to the right, ~72% of content width (≈983px at 1440px) */}
        <div className="ml-auto w-[72%] flex gap-8 items-end">

          {/* Text block with corner brackets — fills remaining space */}
          <AboutTextBlock text={ABOUT_TEXT} />

          {/* 002 label + portrait photo */}
          <div className="flex gap-6 items-start shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <AboutPortrait src={ABOUT_PHOTO} />
          </div>
        </div>
      </div>
    </section>

    {/* ---- Full-bleed photo section ---- */}
    <FullBleedPhoto src={CAMERA_PHOTO} />

    {/* ---- Section 003 — Services ---- */}
    <section id="services" className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12" data-navbar-dark>

      <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">[ services ]</span>

      {/* [4] DELIVERABLES */}
      <div className="flex items-center justify-between font-sans font-light text-white uppercase tracking-[-0.08em] whitespace-nowrap text-[32px] md:text-[6.67vw] 2xl:text-[96px]">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
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

    {/* ---- Section 004 — Projects ---- */}
    <section id="projects" className="bg-white px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-[61px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-[10px] items-start">
          <div className="font-sans font-light text-black text-[32px] md:text-[6.67vw] 2xl:text-[96px] leading-[0.86] tracking-[-0.08em] uppercase">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0 pt-1">004</span>
        </div>
        {/* [ portfolio ] — rotated vertically on desktop */}
        <div className="hidden md:flex h-[110px] items-center justify-center w-4 shrink-0">
          <span className="-rotate-90 block font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>
        {/* [ portfolio ] — horizontal on mobile */}
        <span className="md:hidden font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
          [ portfolio ]
        </span>
      </div>

      {/* Mobile: single stacked column */}
      <div className="md:hidden flex flex-col gap-10">
        {projects.map((p) => (
          <ProjectCard key={p.name} name={p.name} tags={p.tags} img={p.img} imgClassName="h-[390px]" />
        ))}
        <ProjectCta />
      </div>

      {/* Desktop: two-column staggered grid */}
      <div className="hidden md:flex gap-6 items-end">
        {/* Left column — stretches to match right column height, items spread vertically */}
        <div className="flex-1 self-stretch flex flex-col justify-between min-w-0">
          {projects[0] && <ProjectCard name={projects[0].name} tags={projects[0].tags} img={projects[0].img} imgClassName="h-[744px]" />}
          {projects[1] && <ProjectCard name={projects[1].name} tags={projects[1].tags} img={projects[1].img} imgClassName="h-[699px]" />}
          <ProjectCta />
        </div>
        {/* Right column — offset 240px down, 117px gap between cards */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">
          {projects[2] && <ProjectCard name={projects[2].name} tags={projects[2].tags} img={projects[2].img} imgClassName="h-[699px]" />}
          {projects[3] && <ProjectCard name={projects[3].name} tags={projects[3].tags} img={projects[3].img} imgClassName="h-[744px]" />}
        </div>
      </div>

    </section>

    {/* ---- Section 005 — Testimonials ---- */}
    <section className="bg-white overflow-hidden">

      {/* Desktop: scattered floating cards around large "Testimonials" text */}
      <TestimonialsDesktop testimonials={testimonials} />

      {/* Mobile: heading + slider */}
      <div className="md:hidden flex flex-col gap-8 pt-16">
        <p className="font-sans font-medium text-black capitalize text-[48px] leading-[0.85] tracking-[-0.07em] text-center px-4">
          Testimonials
        </p>
        <TestimonialsSlider testimonials={testimonials} />
      </div>

    </section>

    {/* ---- Section 006 — News ---- */}
    <section id="news" className="bg-[#f3f3f3]">

      {/* Desktop: rotated heading left + 3 staggered cards right */}
      <div className="hidden md:flex items-end gap-[246px] px-8 py-[120px]">

        {/* Rotated heading */}
        <div className="flex items-center justify-center w-[110px] h-[706px] shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-sans font-light text-black uppercase text-[64px] leading-[0.86] tracking-[-0.08em]">Keep up with my latest</p>
            <p className="font-sans font-light text-black uppercase text-[64px] leading-[0.86] tracking-[-0.08em]">news &amp; achievements</p>
          </div>
        </div>

        {/* Cards — items-start so dividers align with image tops; card 2 staggered down 120px */}
        <div className="flex flex-1 gap-[31px] items-start">
          <NewsCard img={newsItems[0]?.img ?? ""} blurb={newsItems[0]?.blurb ?? ""} className="flex-1 min-w-0" />
          <div className="w-px h-[469px] bg-black/20 shrink-0" />
          <NewsCard img={newsItems[1]?.img ?? ""} blurb={newsItems[1]?.blurb ?? ""} className="flex-1 min-w-0 pt-[120px]" />
          <div className="w-px h-[469px] bg-black/20 shrink-0" />
          <NewsCard img={newsItems[2]?.img ?? ""} blurb={newsItems[2]?.blurb ?? ""} className="flex-1 min-w-0" />
        </div>
      </div>

      {/* Mobile: heading + slider with dots */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p className="font-sans font-light text-black uppercase text-[32px] leading-[0.86] tracking-[-0.08em]">
          Keep up with my latest news &amp; achievements
        </p>
        <NewsSlider items={newsItems} />
      </div>

    </section>
    </div>

    {/* ---- Footer ---- */}
    <SiteFooter />
    </>
  );
}
