// Resumen de visitas para ti. Protegido con STATS_TOKEN:
//   curl -H "Authorization: Bearer $STATS_TOKEN" "https://ericlucero.dev/api/stats?days=30"
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { PageStat, PostMetrics } from "@/app/models";

function authorized(request) {
  const token = process.env.STATS_TOKEN;
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token || !given || given.length !== token.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(token));
}

export async function GET(request) {
  if (!authorized(request)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));
  const since = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);

  const [Stats, Metrics] = await Promise.all([PageStat(), PostMetrics()]);
  const match = { $match: { day: { $gte: since } } };

  const [perDay, topPages, totals, referrers, posts] = await Promise.all([
    Stats.aggregate([match, { $group: { _id: "$day", views: { $sum: "$views" }, visitors: { $sum: "$visitors" } } }, { $sort: { _id: 1 } }]),
    Stats.aggregate([
      match,
      { $group: { _id: { path: "$path", locale: "$locale" }, views: { $sum: "$views" }, visitors: { $sum: "$visitors" } } },
      { $sort: { views: -1 } },
      { $limit: 20 },
    ]),
    Stats.aggregate([match, { $group: { _id: null, views: { $sum: "$views" }, visitors: { $sum: "$visitors" }, mobile: { $sum: "$mobile" }, desktop: { $sum: "$desktop" } } }]),
    Stats.aggregate([
      match,
      { $project: { r: { $objectToArray: "$referrers" } } },
      { $unwind: "$r" },
      { $group: { _id: "$r.k", visits: { $sum: "$r.v" } } },
      { $sort: { visits: -1 } },
      { $limit: 15 },
    ]),
    Metrics.find({}, { _id: 0, slug: 1, likes: 1, views: 1 }).sort({ views: -1 }).lean(),
  ]);

  return NextResponse.json(
    {
      since,
      days,
      totals: totals[0] ? { ...totals[0], _id: undefined } : { views: 0, visitors: 0 },
      perDay: perDay.map((d) => ({ day: d._id, views: d.views, visitors: d.visitors })),
      topPages: topPages.map((p) => ({ ...p._id, views: p.views, visitors: p.visitors })),
      referrers: referrers.map((r) => ({ site: r._id.replaceAll("_", "."), visits: r.visits })),
      posts,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
