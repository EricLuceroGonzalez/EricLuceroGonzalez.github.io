"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Cuenta una visita cada vez que cambia la ruta (también en la navegación
// interna, que no recarga la página). Sin cookies ni identificadores.
export default function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef(null);

  useEffect(() => {
    if (!pathname || pathname === last.current) return;
    last.current = pathname;

    // Navegadores automatizados (Lighthouse, Playwright…) y "no rastrear".
    if (navigator.webdriver || navigator.doNotTrack === "1") return;
    if (process.env.NODE_ENV !== "production") return;

    const body = JSON.stringify({ path: pathname, referrer: document.referrer });
    // sendBeacon no bloquea la página y se envía aunque el usuario se vaya.
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
