import mongoose from "mongoose";
import { getModel } from "../lib/mongo";

const { Schema } = mongoose;

// ── Métricas por post (lo que se muestra en la cabecera) ──────────────────────
// `likes` se mantiene con los votos de LikeVote; `views` es el total histórico
// de visitas al post (suma de todos los idiomas), lo incrementa /api/track.
const postMetricsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    likes: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

// ── Un voto por visitante y post ──────────────────────────────────────────────
// `voter` es un identificador aleatorio que el navegador guarda en
// localStorage: no identifica a la persona ni usa su IP.
const likeVoteSchema = new Schema(
  {
    slug: { type: String, required: true },
    voter: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
likeVoteSchema.index({ slug: 1, voter: 1 }, { unique: true });

// ── Visitas por página y día ──────────────────────────────────────────────────
// Un documento por (día, ruta, idioma): crece con las páginas, no con las
// visitas. 365 días × ~30 páginas × 2 idiomas ≈ 22.000 docs/año.
const pageStatSchema = new Schema(
  {
    day: { type: String, required: true }, // "YYYY-MM-DD" en UTC
    path: { type: String, required: true }, // sin idioma: "/blog/sorteo-mundial"
    locale: { type: String, required: true },
    views: { type: Number, default: 0 },
    visitors: { type: Number, default: 0 }, // únicos del día (si hay VISITOR_SALT)
    mobile: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
    referrers: { type: Schema.Types.Mixed, default: {} }, // { "google_com": 12 }
  },
  { versionKey: false, minimize: false },
);
pageStatSchema.index({ day: 1, path: 1, locale: 1 }, { unique: true });
pageStatSchema.index({ path: 1, day: -1 });

// ── Visitantes únicos del día (se borran solos a las 48 h) ────────────────────
// Solo guarda un hash de (sal diaria + IP + navegador + ruta): no se puede
// revertir a la IP y desaparece con el índice TTL.
const dailyVisitorSchema = new Schema(
  {
    _id: { type: String }, // el hash
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 48 },
  },
  { versionKey: false },
);

export const PostMetrics = () => getModel("PostMetrics", postMetricsSchema);
export const LikeVote = () => getModel("LikeVote", likeVoteSchema);
export const PageStat = () => getModel("PageStat", pageStatSchema);
export const DailyVisitor = () => getModel("DailyVisitor", dailyVisitorSchema);
