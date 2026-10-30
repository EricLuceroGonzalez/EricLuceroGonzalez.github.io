// /feed.xml: se mantiene (en español) para quien ya se haya suscrito a esta URL.
import { feedResponse } from "@/app/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return feedResponse("es");
}
