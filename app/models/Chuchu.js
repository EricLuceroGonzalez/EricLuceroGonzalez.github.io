// models/Tuit.js
import mongoose from "mongoose";

// strict: false permite que lea cualquier campo que el bot de Python haya guardado
const ChuchuSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: "Chuchu", // Pon aquí el nombre exacto de tu colección en Atlas
  },
);

// Evitamos que Mongoose compile el modelo múltiples veces en desarrollo
export default mongoose.models.Chuchu || mongoose.model("Chuchu", ChuchuSchema);
