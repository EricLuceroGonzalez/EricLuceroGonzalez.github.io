// app/api/likes/[slug]/route.js
import PostMetrics from "../../../models/PostMetrics.js";
import dbConnect from "../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;
  const resolvedParams = await params;

  try {
    const metrics = await PostMetrics.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { returnDocument: "after", upsert: true },
    );
    return NextResponse.json({ likes: metrics ? metrics.likes : 0 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener likes" },
      { status: 500 },
    );
  }
}

export async function POST(request, { params }) {
  await dbConnect();
  const { slug } = await params;
  const { action } = await request.json();

  try {
    const incrementValue = action === "increment" ? 1 : -1;
    const updatedMetrics = await PostMetrics.findOneAndUpdate(
      { slug },
      { $inc: { likes: incrementValue } },
      { returnDocument: "after", upsert: true },
    );
    return NextResponse.json({ likes: updatedMetrics.likes });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar likes" },
      { status: 500 },
    );
  }
}
