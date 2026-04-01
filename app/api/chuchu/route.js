import { NextResponse } from "next/server";
// Asegúrate de tener tu función de conexión a Mongo adaptada para Next.js
// import { getMongoCollection } from "@/lib/mongodb";
import dbChuchu from "../../lib/dbChuchu";

export async function GET(request) {
  try {
    console.log("fechaDesde aca");
    // 1. Capturamos la fecha desde la URL (ej: /api/chuchu?fecha_desde=2024-01-01)
    const { searchParams } = new URL(request.url);
    const fechaDesde = searchParams.get("fecha_desde");
    console.log("fechaDesde");
    console.log(fechaDesde);

    // Si no mandan fecha, devolvemos un error
    if (!fechaDesde) {
      return NextResponse.json(
        {
          error:
            "Debes proporcionar una fecha (ej: ?fecha_desde=2024-01-01 00:00:00)",
        },
        { status: 400 },
      );
    }

    // 2. Nos conectamos a la base de datos
    const collection = await dbChuchu();

    // 3. ARMAMOS LA MAGIA DE LA CONSULTA
    // Dependiendo de cómo guardaste la fecha, el query cambia un poquito:

    /* -- SI USASTE STRING (Opción 2: "2024-03-15 14:30:00") -- */
    const query = {
      fecha_ultimo_post: { $gte: fechaDesde }, // $gte significa "Greater Than or Equal" (Mayor o igual que)
    };

    /* -- SI USASTE $currentDate (Opción 1: Objeto Date nativo) -- */
    // const query = {
    //   fecha_ultimo_post: { $gte: new Date(fechaDesde) }
    // };

    // 4. Buscamos los tuits, los ordenamos del más nuevo al más viejo, y los convertimos en un array
    const tuits = await collection
      .find(query)
      .sort({ fecha_ultimo_post: -1 }) // -1 ordena descendente
      .toArray();

    // 5. Devolvemos los datos a tu frontend
    return NextResponse.json(
      { total: tuits.length, data: tuits },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en la API /chuchu:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
