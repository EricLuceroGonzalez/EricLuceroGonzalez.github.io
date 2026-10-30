// /es/feed.xml y /en/feed.xml
import { feedResponse } from "@/app/lib/feed";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function GET(_request, { params }) {
  const { locale } = await params;
  return feedResponse(locale);
}
