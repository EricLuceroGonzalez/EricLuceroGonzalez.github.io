// "use client";
// components/MDXContent.js

import { MDXRemote } from "next-mdx-remote/rsc";
import MdxComponents from "./MDXComponents";
import { dynamicMdxComponents } from "./MdCompos/dynamicMdxComponents";
import { serialize } from "next-mdx-remote/serialize";
// Latex
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export async function MDXContent({ posts }) {
  const compos = {
    ...MdxComponents,
    ...dynamicMdxComponents,
  };
  const mdxSource = await serialize(
    // Raw MDX contents as a string
    "# Hello",
    // Optional parameters
    {
      // made available to the arguments of any custom MDX component
      scope: {},
      // MDX's available options, see the MDX docs for more info.
      // https://mdxjs.com/packages/mdx/#compilefile-options
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        format: "mdx",
      },
      // Indicates whether or not to parse the frontmatter from the MDX source
      parseFrontmatter: false,
    }
  );

  return (
    // <MDXRemote {...mdxSource} components={compos} />
    <MDXRemote source={mdxSource.compiledSource} components={compos} />
    // <MDXRemote source={posts} components={compos} />
  );
}
