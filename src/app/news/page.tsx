import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import NewsPageIntro from "@/components/NewsPageIntro";
import SiteFooter from "@/components/SiteFooter";

export const revalidate = 3600;

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"] as const;

const FALLBACK_NEWS = [
  {
    img: "https://www.figma.com/api/mcp/asset/d4d5a742-8c8d-4f7d-9093-da65698b8639",
    title: "The anatomy of a great brand identity",
    blurb: "What separates a logo from a brand system? We break down the building blocks that make visual identity truly cohesive — and lasting.",
    category: "Brand",
    date: "Apr 2026",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/b248d27e-14c8-46ff-baab-37eee371b033",
    title: "Shooting commercial work on film in 2026",
    blurb: "More clients are asking for analog textures in a digital-first world. Here's why we've started incorporating film into select commercial shoots.",
    category: "Photography",
    date: "Mar 2026",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/388e2e59-7461-4a73-987d-71f1f308e1bf",
    title: "Why most agency websites fail their clients",
    blurb: "A portfolio site is often the first handshake. We looked at 40 agency sites and found the same five mistakes showing up again and again.",
    category: "Web Design",
    date: "Feb 2026",
  },
];

type SanityNewsPost = {
  _id: string;
  title: string;
  blurb: string | null;
  category: string | null;
  image: { asset: { _ref: string } } | null;
  publishedAt: string | null;
  slug: { current: string };
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default async function NewsPage() {
  const sanityPosts: SanityNewsPost[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client
        .fetch<SanityNewsPost[]>(
          `*[_type == "newsPost"] | order(publishedAt desc) {
            _id, title, blurb, category, image, publishedAt, slug
          }`
        )
        .catch((): SanityNewsPost[] => [])
    : [];

  const posts =
    sanityPosts.length > 0
      ? sanityPosts.map((p, i) => ({
          img: p.image
            ? urlFor(p.image).width(800).url()
            : (FALLBACK_NEWS[i % FALLBACK_NEWS.length]?.img ?? ""),
          title: p.title,
          blurb: p.blurb ?? "",
          category: p.category ?? undefined,
          date: formatDate(p.publishedAt),
        }))
      : FALLBACK_NEWS;

  // Split into 3 columns for desktop
  const col1 = posts.filter((_, i) => i % 3 === 0);
  const col2 = posts.filter((_, i) => i % 3 === 1);
  const col3 = posts.filter((_, i) => i % 3 === 2);

  return (
    <>
    <div className="relative z-[1]">
      <Navbar navLinks={NAV_LINKS} />

      {/* ---- Section 001 — Intro ---- */}
      <section className="bg-[#f3f3f3] px-4 md:px-8 py-12 md:py-[120px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 items-end">
            <span className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
              [ {posts.length} {posts.length === 1 ? "post" : "posts"} ]
            </span>
            <div className="w-full h-px bg-[#1f1f1f]" />
          </div>
          <NewsPageIntro />
        </div>
      </section>

      {/* ---- Section 002 — Posts grid ---- */}
      <section className="bg-[#f3f3f3] px-4 md:px-8 pb-16 md:pb-[120px]">

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-14">
          {posts.map((p, i) => (
            <div key={i}>
              {i > 0 && <div className="w-full h-px bg-black/15 mb-14" />}
              <NewsCard
                img={p.img}
                blurb={p.blurb}
                title={p.title}
                date={p.date}
                category={p.category}
              />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid, col 2 offset 160px, col 3 offset 80px */}
        <div className="hidden md:flex gap-[31px] items-start">
          <div className="flex-1 flex flex-col gap-[80px] min-w-0">
            {col1.map((p, i) => (
              <div key={i}>
                {i > 0 && <div className="w-full h-px bg-black/15 mb-[80px]" />}
                <NewsCard img={p.img} blurb={p.blurb} title={p.title} date={p.date} category={p.category} />
              </div>
            ))}
          </div>
          <div className="w-px self-stretch bg-black/15 shrink-0" />
          <div className="flex-1 flex flex-col gap-[80px] pt-[160px] min-w-0">
            {col2.map((p, i) => (
              <div key={i}>
                {i > 0 && <div className="w-full h-px bg-black/15 mb-[80px]" />}
                <NewsCard img={p.img} blurb={p.blurb} title={p.title} date={p.date} category={p.category} />
              </div>
            ))}
          </div>
          <div className="w-px self-stretch bg-black/15 shrink-0" />
          <div className="flex-1 flex flex-col gap-[80px] pt-[80px] min-w-0">
            {col3.map((p, i) => (
              <div key={i}>
                {i > 0 && <div className="w-full h-px bg-black/15 mb-[80px]" />}
                <NewsCard img={p.img} blurb={p.blurb} title={p.title} date={p.date} category={p.category} />
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>

    <SiteFooter />
    </>
  );
}
