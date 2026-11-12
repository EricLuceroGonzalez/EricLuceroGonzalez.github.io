import { NextResponse } from "next/server";
import { PostMetrics, LikeVote } from "@/app/models";
import { isPostSlug } from "@/app/lib/sitePaths";

const VOTER = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const noStore = { headers: { "Cache-Control": "no-store" } };

async function counts(slug) {
  const Metrics = await PostMetrics();
  const doc = await Metrics.findOne({ slug }, { likes: 1, views: 1 }).lean();
  return { likes: Math.max(0, doc?.likes ?? 0), views: doc?.views ?? 0 };
}

// Solo lee. Antes este GET sumaba una visita: cada carga del botón (y cada
// recarga o bot) contaba como visita. Ahora las visitas las cuenta /api/track.
export async function GET(_request, { params }) {
  const { slug } = await params;
  if (!isPostSlug(slug)) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  try {
    const voter = new URL(_request.url).searchParams.get("voter");
    const result = await counts(slug);
    if (voter && VOTER.test(voter)) {
      const Votes = await LikeVote();
      result.liked = Boolean(await Votes.exists({ slug, voter }));
    }
    return NextResponse.json(result, noStore);
  } catch (error) {
    console.error("[likes GET]", error.message);
    return NextResponse.json({ error: "Error al obtener likes" }, { status: 500 });
  }
}

// Body: { liked: true|false, voter: "<uuid>" }. Es idempotente: enviar dos
// veces `liked: true` cuenta un solo like, y quitar un like que no existe no
// resta nada. El índice único (slug, voter) lo garantiza también con
// peticiones simultáneas.
export async function POST(request, { params }) {
  const { slug } = await params;
  if (!isPostSlug(slug)) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { liked, voter } = body ?? {};
  if (typeof liked !== "boolean" || typeof voter !== "string" || !VOTER.test(voter)) {
    return NextResponse.json({ error: "Se espera { liked: boolean, voter: uuid }" }, { status: 400 });
  }

  try {
    const [Votes, Metrics] = await Promise.all([LikeVote(), PostMetrics()]);
    if (liked) {
      try {
        await Votes.create({ slug, voter });
        await Metrics.updateOne({ slug }, { $inc: { likes: 1 } }, { upsert: true });
      } catch (error) {
        if (error?.code !== 11000) throw error; // ya había votado: no suma
      }
    } else {
      const { deletedCount } = await Votes.deleteOne({ slug, voter });
      if (deletedCount) {
        await Metrics.updateOne({ slug, likes: { $gt: 0 } }, { $inc: { likes: -1 } });
      }
    }
    return NextResponse.json({ ...(await counts(slug)), liked }, noStore);
  } catch (error) {
    console.error("[likes POST]", error.message);
    return NextResponse.json({ error: "Error al actualizar likes" }, { status: 500 });
  }
}
