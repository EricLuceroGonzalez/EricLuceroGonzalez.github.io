// dbChuchu.js;
import mongoose from "mongoose";

const MONGODB_CHUCHU = process.env.MONGODB_CHUCHU;

// Validamos de inmediato que la variable exista para que no falle silenciosamente
if (!MONGODB_CHUCHU) {
  throw new Error(
    "Por favor define la variable de entorno MONGODB_CHUCHU dentro de .env.local",
  );
}

// Objeto global de Node.js para mantener en caché la conexión
// Next.js no abra múltiples conexiones durante el Hot Reloading en desarrollo
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbChuchu() {
  // Si la conexión ya está establecida, la devolvemos inmediatamente
  if (cached.conn) {
    return cached.conn;
  }

  // Si no hay una conexión en curso, la iniciamos
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Desactiva el buffering de Mongoose para que falle rápido si no hay conexión
    };

    cached.promise = mongoose.connect(MONGODB_CHUCHU, opts).then((mongoose) => {
      console.log("✅ Conectado exitosamente a MongoDB");
      return mongoose;
    });
  }

  // Esperamos a que la promesa se resuelva y guardamos la conexión
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbChuchu;
