import mongoose from "mongoose";

const postMetricsSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    // Contador de likes
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Esto evita que Mongoose compile el modelo múltiples veces en desarrollo
export default mongoose.models.PostMetrics ||
  mongoose.model("PostMetrics", postMetricsSchema);
