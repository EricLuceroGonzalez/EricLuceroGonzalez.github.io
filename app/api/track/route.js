// Registra una visita. Lo llama <PageViewTracker /> con navigator.sendBeacon
// cada vez que cambia la ruta. No usa cookies ni guarda IPs.
import { createHash } from "node:crypto";
import { PageStat, PostMetrics, DailyVisitor } from "@/app/models";
import { parseSitePath } from "@/app/lib/sitePaths";

const BOT_UA = /bot|crawl|spider|slurp|preview|lighthouse|headless|pagespeed|curl|wget|python|httpclient|axios|node-fetch/i;
const SITE_HOST = "ericlucero.dev";

const today = () => new Date().toISOString().slice(0, 10);

// "https://www.google.com/search?q=…" → "google_com". En las claves de Mongo
// no puede haber puntos (los interpreta como rutas), por eso el "_".
function referrerKey(referrer) {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (!host || host === SITE_HOST || host === "localhost" || !/^[a-z0-9.-]{1,100}$/.test(host)) return null;
    return host.replaceAll(".", "_");
  } catch {
    return null;
  }
}

// Hash de visitante único por día y página. La sal cambia cada día (se deriva
// de VISITOR_SALT + fecha), así que el mismo visitante no se puede seguir de
// un día a otro, y el hash no permite recuperar la IP.
function visitorHash(request, day, key) {
  const salt = process.env.VISITOR_SALT;
  if (!salt) return null;
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const ua = request.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${salt}|${day}|${ip}|${ua}|${key}`).digest("base64url");
}

export async function POST(request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return new Response(null, { status: 204 });

  let body;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const page = parseSitePath(body?.path);
  if (!page) return new Response(null, { status: 204 }); // ruta desconocida: se ignora

  const day = today();
  const { locale, path } = page;
  const inc = { views: 1, [/Mobi|Android/i.test(ua) ? "mobile" : "desktop"]: 1 };
  const ref = referrerKey(body?.referrer);
  if (ref) inc[`referrers.${ref}`] = 1;

  try {
    const hash = visitorHash(request, day, `${locale}${path}`);
    if (hash) {
      const Visitors = await DailyVisitor();
      try {
        await Visitors.create({ _id: hash });
        inc.visitors = 1; // primera vez hoy para esta página
      } catch (error) {
        if (error?.code !== 11000) throw error; // 11000 = ya contado hoy
      }
    }

    const Stats = await PageStat();
    await Stats.updateOne({ day, path, locale }, { $inc: inc }, { upsert: true });

    const post = path.match(/^\/(?:blog|latex)\/([a-z0-9-]+)$/);
    if (post) {
      const Metrics = await PostMetrics();
      await Metrics.updateOne({ slug: post[1] }, { $inc: { views: 1 } }, { upsert: true });
    }
  } catch (error) {
    console.error("[track]", error.message);
    // La analítica nunca debe romper la navegación: se responde igual.
  }
  return new Response(null, { status: 204 });
}
