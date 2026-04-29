import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import MobileMenu from "@/components/MobileMenu";

export const revalidate = 3600;

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/b35befe5-53ed-4822-9710-9e6ff6636bfd";

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

function ReadMoreArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 14L14 4M14 4H8M14 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NewsCard({ img, blurb, className = "" }: { img: string; blurb: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="h-[469px] overflow-hidden">
        <img src={img} alt="" className="w-full h-full object-cover pointer-events-none select-none" />
      </div>
      <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{blurb}</p>
      <div className="flex items-center gap-[10px] border-b border-black pb-1 w-fit overflow-hidden cursor-pointer">
        <span className="font-sans font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
        <ReadMoreArrow />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15.25" stroke="#1f1f1f" strokeWidth="1.5" />
      <path d="M11 21L21 11M21 11H14M21 11V18" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ name, tags, img, imgClassName }: {
  name: string;
  tags: string[];
  img: string;
  imgClassName: string;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className={`relative overflow-hidden w-full ${imgClassName}`}>
        <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((tag) => (
            <span key={tag} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.04em] whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-sans font-black text-[24px] md:text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
          {name}
        </p>
        <span className="shrink-0"><ArrowIcon /></span>
      </div>
    </div>
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
        <button className="bg-black text-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer">
          Let&apos;s talk
        </button>
      </div>
      <div className="self-stretch flex flex-col justify-between w-6 shrink-0 items-end">
        <CornerBracket corner="tr" />
        <CornerBracket corner="br" />
      </div>
    </div>
  );
}

export default async function Home() {
  const sanityItems: SanityPortfolioItem[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client
        .fetch(
          `*[_type == "portfolio"] | order(order asc) {
            _id,
            title,
            tags,
            coverImage,
            order
          }`
        )
        .catch(() => [])
    : [];

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

  return (
    <>
    {/* overflow: clip instead of overflow: hidden — clip doesn't create a stacking context,
        which lets mix-blend-mode on child elements composite correctly with the bg image. */}
    <section className="relative h-screen" style={{ overflow: "clip" }}>

      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ objectPosition: "60% 10%" }}
      />

      {/* Gradient blur — fades from full blur at bottom to transparent upward */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[480px] pointer-events-none"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      />

      {/* Layout */}
      <div className="relative h-full flex flex-col px-4 md:px-8">

        {/* Nav */}
        <nav className="shrink-0 flex items-center justify-between py-6">
          <span className="font-semibold text-base tracking-[-0.04em] text-black capitalize">
            H.Studio
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-14">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-semibold text-base tracking-[-0.04em] text-black capitalize hover:opacity-60 transition-opacity duration-150"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile hamburger + desktop CTA (interactive — client component) */}
          <MobileMenu navLinks={NAV_LINKS} />
        </nav>

        {/* Hero body */}
        <div className="flex-1 flex flex-col pb-6 md:pb-8 justify-between md:justify-start md:pt-[240px]">

          {/* Heading */}
          <div className="flex flex-col pb-[15px]">
            {/* [ Hello i'm ] */}
            <div className="flex justify-center md:justify-start px-[18px] mb-[-15px]">
              <span className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay whitespace-nowrap">
                [ Hello i&apos;m ]
              </span>
            </div>

            {/* Harvey Specter — fluid vw units so it scales and wraps naturally */}
            <h1
              className="font-medium capitalize text-white text-center mix-blend-overlay leading-[1.1] w-full break-words text-[clamp(48px,25vw,96px)] md:text-[clamp(80px,13.75vw,198px)]"
              style={{ letterSpacing: "-0.07em", wordSpacing: "0.15em" }}
            >
              Harvey Specter
            </h1>
          </div>

          {/* Description + CTA */}
          <div className="md:flex md:justify-end">
            <div className="flex flex-col gap-[17px] w-[293px] md:w-[294px]">
              <p className="font-bold italic text-[#1f1f1f] text-[14px] uppercase tracking-[-0.04em] leading-[1.1]">
                H.Studio is a{" "}
                <span className="font-normal">full-service</span>{" "}
                creative studio creating beautiful digital experiences and
                products. We are an{" "}
                <span className="font-normal">award winning</span>{" "}
                desing and art group specializing in branding, web design and
                engineering.
              </p>
              <button className="self-start bg-black text-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer">
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---- About / Intro Section ---- */}
    <section id="about" className="px-4 md:px-8 py-12 md:py-[120px]">
      <div className="flex flex-col gap-6">

        {/* Label + rule */}
        <div className="flex flex-col gap-3 items-end">
          <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </span>
          <div className="w-full h-px bg-[#1f1f1f]" />
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-2">

          {/* 001 — mobile only (above all lines) */}
          <p className="md:hidden text-center font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            001
          </p>

          {/* Line 1: "A creative director /" — desktop: 001 label inline */}
          <div className="flex items-start gap-3 justify-center md:justify-start">
            <p className="font-sans font-light text-black uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84] whitespace-pre">
              {`A creative director   /`}
            </p>
            <span className="hidden md:inline-block font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-2 shrink-0">
              001
            </span>
          </div>

          {/* Line 2: Photographer */}
          <div className="w-full flex justify-center md:justify-start md:pl-[15.5%]">
            <p className="font-sans font-light text-black uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84] whitespace-nowrap">
              Photographer
            </p>
          </div>

          {/* Line 3: Born & raised — & in Playfair italic */}
          <div className="w-full flex justify-center md:justify-start md:pl-[44.3%]">
            <p className="font-sans font-light text-black uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84] whitespace-nowrap">
              {"Born "}
              <em
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontVariationSettings: "'opsz' 12, 'wdth' 100",
                  fontWeight: 400,
                }}
              >
                {"&"}
              </em>
              {" raised"}
            </p>
          </div>

          {/* Line 4: On the south side */}
          <div className="w-full flex justify-center md:justify-start">
            <p className="font-sans font-light text-black uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84] whitespace-nowrap">
              On the south side
            </p>
          </div>

          {/* Line 5: Of chicago. + [ creative freelancer ] */}
          <div className="w-full flex flex-col items-center md:flex-row md:items-center md:pl-[44%] md:gap-4">
            <p className="font-sans font-light text-black uppercase text-[32px] md:text-[6.67vw] 2xl:text-[96px] tracking-[-0.08em] leading-[0.84] whitespace-nowrap">
              Of chicago.
            </p>
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap mt-3 md:mt-0">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>

    {/* ---- Section 002 — About / Portrait ---- */}
    <section className="px-4 md:px-8 py-12 md:py-[80px]">

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
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
              <CornerBracket corner="tl" />
              <CornerBracket corner="bl" />
            </div>
            <p className="flex-1 font-sans text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em] py-3 min-w-0">
              {ABOUT_TEXT}
            </p>
            <div className="self-stretch flex flex-col justify-between w-6 shrink-0">
              <CornerBracket corner="tr" />
              <CornerBracket corner="br" />
            </div>
          </div>

          {/* 002 label + portrait photo */}
          <div className="flex gap-6 items-start shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <div className="relative w-[31vw] max-w-[436px] overflow-hidden shrink-0" style={{ aspectRatio: "436/614" }}>
              <img
                src={ABOUT_PHOTO}
                alt="Harvey Specter"
                className="absolute max-w-none object-cover"
                style={{ width: "101.42%", height: "101.39%", top: "-0.69%", left: "-0.71%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---- Full-bleed photo section ---- */}
    <section className="relative overflow-hidden h-[550px] md:h-[560px]">
      {/* object-position shifts left on mobile to frame the photographer's face;
          recenters on desktop where the container is wide enough to show the full scene */}
      <img
        src={CAMERA_PHOTO}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[40%_center] md:object-center pointer-events-none select-none"
      />
    </section>

    {/* ---- Section 003 — Services ---- */}
    <section id="services" className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12">

      <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">[ services ]</span>

      {/* [4] DELIVERABLES */}
      <div className="flex items-center justify-between font-sans font-light text-white uppercase tracking-[-0.08em] whitespace-nowrap text-[32px] md:text-[6.67vw] 2xl:text-[96px]">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-12">
        {SERVICES.map((s) => (
          <div key={s.num} className="flex flex-col gap-[9px]">

            {/* Number + rule */}
            <span className="font-mono text-[14px] text-white uppercase leading-[1.1]">{s.num}</span>
            <div className="w-full h-px bg-white/30" />

            {/* Content row: stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between pt-[9px]">
              <p className="font-sans font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">
                {s.name}
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start">
                <p className="font-sans text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-full md:w-[393px]">
                  {SERVICE_DESC}
                </p>
                <div className="shrink-0 size-[151px] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>

    {/* ---- Section 004 — Projects ---- */}
    <section id="projects" className="px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-[61px]">

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
      <div className="hidden md:flex items-center justify-center min-h-[860px] relative">
        <p className="font-sans font-medium text-black capitalize text-[13.75vw] 2xl:text-[198px] leading-[1.1] tracking-[-0.07em] text-center select-none">
          Testimonials
        </p>

        {/* Marko — top-left, -6.85° */}
        <div className="absolute left-[7.1%] top-[16px] w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4" style={{ transform: "rotate(-6.85deg)" }}>
          <img src={TESTIMONIALS[0].logo} alt="" className="max-h-[40px] w-auto max-w-[150px] object-contain object-left" />
          <p className="font-sans text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">{TESTIMONIALS[0].quote}</p>
          <p className="font-sans font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{TESTIMONIALS[0].author}</p>
        </div>

        {/* Lukas — top-right, 2.9° */}
        <div className="absolute left-[46.9%] top-[80px] w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4" style={{ transform: "rotate(2.9deg)" }}>
          <img src={TESTIMONIALS[1].logo} alt="" className="max-h-[40px] w-auto max-w-[150px] object-contain object-left" />
          <p className="font-sans text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">{TESTIMONIALS[1].quote}</p>
          <p className="font-sans font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{TESTIMONIALS[1].author}</p>
        </div>

        {/* Sarah — bottom-left, 2.23° */}
        <div className="absolute left-[21.2%] top-[553px] w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4" style={{ transform: "rotate(2.23deg)" }}>
          <img src={TESTIMONIALS[2].logo} alt="" className="max-h-[40px] w-auto max-w-[150px] object-contain object-left" />
          <p className="font-sans text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">{TESTIMONIALS[2].quote}</p>
          <p className="font-sans font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{TESTIMONIALS[2].author}</p>
        </div>

        {/* Sofia — bottom-right, -4.15° */}
        <div className="absolute left-[68.5%] top-[546px] w-[353px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4" style={{ transform: "rotate(-4.15deg)" }}>
          <img src={TESTIMONIALS[3].logo} alt="" className="max-h-[40px] w-auto max-w-[150px] object-contain object-left" />
          <p className="font-sans text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.04em]">{TESTIMONIALS[3].quote}</p>
          <p className="font-sans font-black text-black text-[16px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{TESTIMONIALS[3].author}</p>
        </div>
      </div>

      {/* Mobile: heading + horizontal card scroller */}
      <div className="md:hidden flex flex-col gap-8 py-16">
        <p className="font-sans font-medium text-black capitalize text-[48px] leading-[0.85] tracking-[-0.07em] text-center px-4">
          Testimonials
        </p>
        <div className="flex gap-4 overflow-x-auto px-4 pb-6 snap-x snap-mandatory">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.author}
              className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-5 w-[270px] shrink-0 flex flex-col gap-4 snap-start my-4"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
            >
              <img src={t.logo} alt="" className="max-h-[36px] w-auto max-w-[130px] object-contain object-left" />
              <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{t.quote}</p>
              <p className="font-sans font-black text-black text-[13px] uppercase leading-[1.1] tracking-[-0.04em] whitespace-nowrap">{t.author}</p>
            </div>
          ))}
        </div>
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
          <NewsCard img={NEWS_IMG_1} blurb={NEWS_BLURB} className="flex-1 min-w-0" />
          <div className="w-px h-[469px] bg-black/20 shrink-0" />
          <NewsCard img={NEWS_IMG_2} blurb={NEWS_BLURB} className="flex-1 min-w-0 pt-[120px]" />
          <div className="w-px h-[469px] bg-black/20 shrink-0" />
          <NewsCard img={NEWS_IMG_3} blurb={NEWS_BLURB} className="flex-1 min-w-0" />
        </div>
      </div>

      {/* Mobile: heading + horizontal card scroll */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p className="font-sans font-light text-black uppercase text-[32px] leading-[0.86] tracking-[-0.08em]">
          Keep up with my latest news &amp; achievements
        </p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
          {([NEWS_IMG_1, NEWS_IMG_2, NEWS_IMG_3] as string[]).map((img, i) => (
            <div key={i} className="flex flex-col gap-4 w-[300px] shrink-0 snap-start">
              <div className="h-[398px] overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover pointer-events-none select-none" />
              </div>
              <p className="font-sans text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.04em]">{NEWS_BLURB}</p>
              <div className="flex items-center gap-[10px] border-b border-black pb-1 w-fit overflow-hidden cursor-pointer">
                <span className="font-sans font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
                <ReadMoreArrow />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>

    {/* ---- Footer / Contact ---- */}
    <footer id="contact" className="bg-black pt-[48px] px-4 md:px-8 flex flex-col gap-[48px] md:gap-[120px]">

      {/* Top block: CTA + social links + divider */}
      <div className="flex flex-col gap-6 md:gap-[48px]">

        {/* Mobile: stacked column / Desktop: 3-column row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* Left — CTA */}
          <div className="flex flex-col gap-3">
            <p className="font-sans font-light italic text-white text-[24px] uppercase tracking-[-0.04em] leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <button className="border border-white text-white px-4 py-3 rounded-full text-[14px] font-medium tracking-[-0.04em] w-fit cursor-pointer hover:bg-white hover:text-black transition-colors">
              Let&apos;s talk
            </button>
          </div>

          {/* Center — Facebook + Instagram (+ X.com/Linkedin on mobile) */}
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

        {/* Divider */}
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* Desktop bottom: giant H.Studio wordmark + legal links */}
      <div className="hidden md:flex items-end justify-between">
        <div className="relative h-[219px] overflow-hidden flex-1">
          {/* [ Coded By Claude ] — rotated -90°, far left */}
          <div className="absolute left-0 inset-y-0 w-4 flex items-center justify-center">
            <span className="-rotate-90 font-mono text-white text-[14px] uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </span>
          </div>
          {/* H.Studio — bleeds 13px below container bottom */}
          <p className="absolute bottom-[-13px] left-8 font-sans font-semibold text-white capitalize text-[20.2vw] 2xl:text-[290px] leading-[0.8] tracking-[-0.06em] whitespace-nowrap">
            H.Studio
          </p>
        </div>
        <div className="flex gap-[34px] pb-8 shrink-0">
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Licences</a>
          <a href="#" className="font-sans text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline whitespace-nowrap">Privacy policy</a>
        </div>
      </div>

      {/* Mobile bottom: legal + label + H.Studio wordmark */}
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
    </>
  );
}
