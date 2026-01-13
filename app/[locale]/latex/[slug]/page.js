import { FaClock, FaPencilAlt } from "react-icons/fa";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByType,
  getSurroundingPosts,
} from "@/app/lib/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxComponents from "@/app/components/MdCompos/MDXComponents";
import { dynamicMdxComponents } from "@/app/components/MdCompos/dynamicMdxComponents";

import { HeroImage, MdHead } from "@/app/ui/MarkDownComponents";
import { MainBg } from "@/app/ui/ComponentsStyled";
import {
  Article,
  Date,
  Layout,
  MetaInfo,
  SectionType,
  SideInfo,
} from "@/app/ui/lugs";
import Image from "next/image";
import ScrollDiv from "@/app/components/navigation/ScrollDiv";
import ShowPath from "@/app/components/showPath";
import DateDisplay from "@/app/components/DateDisplay";
import Link from "next/link";
import PostNavigationCard from "@/app/components/PostNavigation";
import remarkMath from "remark-math";
// import rehypeMathjax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import supersub from "remark-supersub";
import remarkGfm from "remark-gfm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

// import ShowPath from "@/app/components/showPath";
const LatexPost = async ({ params }) => {
  const { locale, slug } = await params;
  // Importamos los idiomas:
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "LatexPage" });

  const post = getPostBySlug(slug, [], locale);
  if (!post) {
    return notFound();
  }
  // const coursePosts = getPostsByType(["latex"], post.order);
  // const coursePosts = getPostsByType(["latex"], 0, locale);

  const { previous, next } = getSurroundingPosts("latex", post.order, locale);
  // const previous = "null";
  // console.log(`previous: ${previous}`);
  // console.log(`next: ${next}`);

  // const next = coursePosts.next;
  // const previous = coursePosts.previousPost;
  const readingTime = (post) => {
    const WORDS_PER_MINUTE = 200;
    let result = {};
    const regex = /\w+/g;
    result.wordCount = (post || "").match(regex).length;

    result.readingTime = Math.ceil(result.wordCount / WORDS_PER_MINUTE);

    return result;
  };
  const readT = readingTime(post.content);

  return (
    <Layout>
      <MainBg>
        <ScrollDiv />
        <ShowPath title={post.title} />
        <Article
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.33,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <MdHead>{post.title}</MdHead>
          <MetaInfo>
            <Date>
              <FaPencilAlt style={{ marginRight: "5px" }} />
              <DateDisplay
                isoDate={post.date.iso}
                defaultFormatted={post.date.formatted}
              />
            </Date>
            <Date style={{ marginLeft: "10px" }}>
              <FaClock style={{ marginRight: "5px" }} />
              {readT.readingTime < 2
                ? `${readT.readingTime} minuto`
                : `${readT.readingTime} minutos`}{" "}
            </Date>
            <SideInfo>
              <Link href={`/${post.doctype[0]}`}>
                {post.doctype.map((type, index) => (
                  <SectionType key={index} $tag={type}>
                    {type}
                    {index < post.doctype.length - 1}
                  </SectionType>
                ))}
              </Link>
            </SideInfo>
          </MetaInfo>
          {post.coverImage && (
            <HeroImage>
              {" "}
              <Image
                src={post.coverImage}
                // width={width}
                // height={height}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", objectFit: "cover" }} // optional
                alt={
                  post.coverImageAlt
                    ? post.coverImageAlt
                    : "Cover images with a illustration of the title"
                }
              />
            </HeroImage>
          )}

          {/* <MDXContent posts={post.content} /> */}
          <MDXRemote
            source={post.content}
            components={{ ...MdxComponents, ...dynamicMdxComponents }}
            options={{
              mdxOptions: {
                remarkPlugins: [
                  remarkGfm,
                  remarkMath,
                  supersub,
                  [
                    remarkToc,
                    {
                      heading:
                        "Índice|Contenido|Tabla de contenidos|Table of Contents|Contents|Content",
                      tight: true,
                      maxDepth: 3,
                    },
                  ],
                ],
                rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeSlug],
              },
            }}
          />

          {(!next == "null" || !previous == "null") && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h1 style={{ marginTop: "6rem" }}>{t("other_posts")}:</h1>
              {previous === "null" ? (
                ""
              ) : (
                <PostNavigationCard type={"prev"} post={previous} />
              )}
              {next === "null" ? (
                ""
              ) : (
                <PostNavigationCard type={"next"} post={next} />
              )}
            </div>
          )}
        </Article>
      </MainBg>
    </Layout>
  );
};
export default LatexPost;
export async function generateStaticParams({ params }) {
  const { locale } = await params;
  // Pedimos SOLO los posts de este idioma específico
  const posts = getAllPosts(["slug", "doctype"], locale);

  // Filtramos y mapeamos
  // Ya no hace falta devolver "locale" en el objeto, porque Next.js ya sabe
  // que estamos dentro de ese locale. Solo devolvemos el slug.
  return posts
    .filter((post) => post.doctype && post.doctype.includes("blog"))
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params, searchParams }, parent) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, ["title", "excerpt", "coverImage"], locale);
  if (!post) {
    return {
      title: "Post not found",
    };
  }
  return {
    title: `${post.title} | LaTeX`,
    description: post.excerpt,
    slug: post.slug,
    shortTitle: post.shortTitle,
    robots: {
      index: true,
      follow: true,
    },
    // Importante que el post.slug coincida con el nombre del archivo MDX
    openGraph: {
      title: `${post.title} | LaTeX`,
      description: post.excerpt,
      url: `https://eric-lucero-gonzalez.vercel.app/latex/${locale}/${post.slug}`,
      images: [
        {
          url: post.socialThumbnail,
          width: 1200,
          height: 630,
          alt: "Vista previa del sitio web de Eric",
        },
      ],
    },
  };
}
