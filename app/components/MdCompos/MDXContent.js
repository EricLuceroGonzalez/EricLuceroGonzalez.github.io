// "use client";

// components/MDXContent.js
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxComponents from "./MDXComponents";
import { dynamicMdxComponents } from "./MdCompos/dynamicMdxComponents";

// Plugins
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

export async function MDXContent({ posts }) {
  const compos = {
    ...MdxComponents,
    ...dynamicMdxComponents,
  };
  return (
    <MDXRemote
      // 1. Pasamos el string crudo del MDX directamente (sin serializar)
      source={posts}
      components={compos}
      // 2. Pasamos las opciones de compilación aquí mismo
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkMath,
            [
              remarkToc,
              {
                heading:
                  "Índice|Contenido|Tabla de contenidos|Table of Contents",
                tight: true,
                maxDepth: 3,
              },
            ],
          ],
          rehypePlugins: [rehypeKatex, rehypeSlug],
          format: "mdx",
        },
        parseFrontmatter: true,
        // 👇 3. La Llave Maestra: Desactivamos el bloqueo estricto de JS en las props
        blockJS: false,
      }}
    />
  );
}
