import mongoose from "mongoose";
import { getModel } from "../lib/mongo";

const ChuchuSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: "Chuchu", // nombre exacto de la colección en Atlas
  },
);

// Ligado a la conexión MONGODB_CHUCHU (antes usaba la conexión global y podía
// acabar leyendo de la base del blog).
export const getChuchu = () => getModel("Chuchu", ChuchuSchema, "MONGODB_CHUCHU");
