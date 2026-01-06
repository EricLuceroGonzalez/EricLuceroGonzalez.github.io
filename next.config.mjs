// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

// Inicializa el plugin de internacionalización
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activa la compresión Gzip/Brotli para los archivos generados
  compress: true,
  // output: "export", // No necesario al usar Vercel y no GithubPages
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote", "react-pdf"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    unoptimized: false,
  },
  // Configuración de Webpack para evitar errores de librerías de nodo
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  basePath: "",
  assetPrefix: "",
  trailingSlash: false,
  // Cabeceras de seguridad
  async headers() {
    return [
      {
        // Aplica estas reglas a TODAS las rutas del sitio
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // O 'DENY' si nunca se usará iframes
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            // OJO: Aquí permitimos Cloudinary explícitamente en img-src
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://res.cloudinary.com; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
  // Oculta uso de Next.js (seguridad por oscuridad básica)
  poweredByHeader: false,
};

// Envolvemos la configuración con el plugin de i18n
export default withNextIntl(nextConfig);
