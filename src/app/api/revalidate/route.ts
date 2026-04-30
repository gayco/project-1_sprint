import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Pages that use Sanity data — revalidate all of them on any CMS change
const PATHS = ["/", "/about", "/services", "/projects", "/news", "/contact"];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  PATHS.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths: PATHS });
}
