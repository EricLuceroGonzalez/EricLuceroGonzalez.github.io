import mongoose from "mongoose";

// Una conexión por base de datos, cacheada por nombre de variable de entorno.
// Antes dbConnect y dbChuchu compartían `global.mongoose`: la segunda en
// llamarse recibía la conexión de la primera (y leía de la base equivocada).
const cache = (globalThis.__mongoConnections ??= {});

export async function getConnection(envVar = "MONGODB_URI") {
  const uri = process.env[envVar];
  // Se comprueba al usarla, no al importar: así un build sin la variable
  // no falla por una página que ni siquiera necesita la base de datos.
  if (!uri) throw new Error(`Falta la variable de entorno ${envVar}`);

  const entry = (cache[envVar] ??= { conn: null, promise: null });
  if (entry.conn) return entry.conn;

  entry.promise ??= mongoose
    .createConnection(uri, {
      bufferCommands: false,
      maxPoolSize: 5, // funciones serverless: pocas conexiones por instancia
      serverSelectionTimeoutMS: 5000,
    })
    .asPromise();

  try {
    entry.conn = await entry.promise;
  } catch (error) {
    entry.promise = null; // permite reintentar en la siguiente petición
    throw error;
  }
  return entry.conn;
}

// Registra un modelo en una conexión concreta (no en la global de mongoose).
export async function getModel(name, schema, envVar = "MONGODB_URI") {
  const conn = await getConnection(envVar);
  return conn.models[name] ?? conn.model(name, schema);
}
