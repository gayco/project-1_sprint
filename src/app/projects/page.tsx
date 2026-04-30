import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import ProjectsPageIntro from "@/components/ProjectsPageIntro";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 3600;

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const FALLBACK_PROJECTS = [
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

type SanityPortfolioItem = {
  _id: string;
  title: string;
  tags: string[] | null;
  coverImage: { asset: { _ref: string } } | null;
  order: number;
};

export default async function ProjectsPage() {
  const sanityItems: SanityPortfolioItem[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client
        .fetch<SanityPortfolioItem[]>(
          `*[_type == "portfolio"] | order(order asc) { _id, title, tags, coverImage, order }`
        )
        .catch((): SanityPortfolioItem[] => [])
    : [];

  const projects =
    sanityItems.length > 0
      ? sanityItems.map((item, i) => ({
          name: item.title,
          tags: item.tags ?? [],
          img: item.coverImage
            ? urlFor(item.coverImage).width(900).url()
            : (FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length]?.img ?? ""),
        }))
      : FALLBACK_PROJECTS;

  // Split into left (even indices) and right (odd indices) for the staggered desktop grid
  const leftCol  = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 !== 0);

  return (
    <>
    <div className="relative z-[1]">
      <Navbar navLinks={NAV_LINKS} />

      {/* ---- Section 001 — Intro ---- */}
      <section className="bg-white px-4 md:px-8 py-12 md:py-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 items-end">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
              [ {projects.length} projects ]
            </span>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>
          <ProjectsPageIntro />
        </div>
      </section>

      {/* ---- Section 002 — Projects grid ---- */}
      <section className="bg-white px-4 md:px-8 pb-12 md:pb-[120px]">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 md:mb-[61px]">
          <div className="flex gap-[10px] items-start">
            <div className="font-sans font-light text-black text-[32px] md:text-[6.67vw] 2xl:text-[96px] leading-[0.86] tracking-[-0.08em] uppercase">
              <p>Selected</p>
              <p>Work</p>
            </div>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0 pt-1">002</span>
          </div>
          <div className="hidden md:flex h-[110px] items-center justify-center w-4 shrink-0">
            <span className="-rotate-90 block font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
              [ portfolio ]
            </span>
          </div>
          <span className="md:hidden font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>

        {/* Mobile: single stacked column */}
        <div className="md:hidden flex flex-col gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.name} name={p.name} tags={p.tags} img={p.img} imgClassName="h-[390px]" />
          ))}
        </div>

        {/* Desktop: two-column staggered grid */}
        <div className="hidden md:flex gap-6 items-start">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-[80px] min-w-0">
            {leftCol.map((p) => (
              <ProjectCard key={p.name} name={p.name} tags={p.tags} img={p.img} imgClassName="h-[600px]" />
            ))}
          </div>
          {/* Right column — offset 240px down */}
          <div className="flex-1 flex flex-col gap-[80px] pt-[240px] min-w-0">
            {rightCol.map((p) => (
              <ProjectCard key={p.name} name={p.name} tags={p.tags} img={p.img} imgClassName="h-[600px]" />
            ))}
          </div>
        </div>

      </section>
    </div>

    <SiteFooter />
    </>
  );
}
