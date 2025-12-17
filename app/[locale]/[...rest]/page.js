import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // "renderiza el not-found más cercano"
  notFound();
}
