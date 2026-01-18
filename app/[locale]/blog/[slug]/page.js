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
import {
  Article,
  Date,
  MetaInfo,
  SideInfo,
  SectionType,
  Layout,
} from "@/app/ui/lugs.js";
import { MainBg } from "@/app/ui/ComponentsStyled.js";
import Link from "next/link.js";
import { MdHead } from "@/app/ui/MarkDownComponents.js";
import PostNavigationCard from "@/app/components/PostNavigation.js";
import ShowPath from "@/app/components/showPath.js";
import ScrollDiv from "@/app/components/navigation/ScrollDiv.js";
import DateDisplay from "@/app/components/DateDisplay.js";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
// import rehypeMathjax from "rehype-mathjax";
import rehypeKatex from "rehype-katex";
import supersub from "remark-supersub";
import rehypeHighlight from "rehype-highlight";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ViewportSize from "@/app/components/viewPortViewer";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

const BlogPost = async ({ params }) => {
  const { locale, slug } = await params;
  // Importamos los idiomas:
  setRequestLocale(locale);
  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(slug, [], locale);
  // const blogPosts = getBlogPosts(post.order);
  const blogPosts = getPostsByType(["blog"], post.order);
  const { previous, next } = getSurroundingPosts("blog", post.order, locale);
  if (!post) {
    return notFound();
  }

  const readingTime = (post) => {
    const WORDS_PER_MINUTE = 200;
    let result = {};
    //Matches words
    //See
    //https://regex101.com/r/q2Kqjg/6
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
        <ShowPath title={post.slug} />
        {/* <ViewportSize /> */}
        <Article
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.33,
            delay: 0.1,
            ease: [0, 0.25, 0.75, 1.01],
          }}
        >
          <MdHead>{post.title}</MdHead>
          {/* No Thumbnail for now...too much */}
          {/* {post.socialThumbnail && (
            <CoverImageContainer
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
              }}
            >
              <img
                src={post.socialThumbnail}
                alt={post.coverImageAlt || `Cover image for ${post.title}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </CoverImageContainer>
          )} */}
          <MetaInfo>
            <Date>
              <FaPencilAlt style={{ marginRight: "5px" }} />
              <DateDisplay
                isoDate={post.date.iso}
                defaultFormatted={post.date.formatted}
                locale={locale}
              />
            </Date>
            <Date style={{ marginLeft: "10px" }}>
              <FaClock style={{ marginRight: "5px" }} />
              {readT.readingTime < 2
                ? `${readT.readingTime} ${t("minute")}`
                : `${readT.readingTime} ${t("minutes")}`}{" "}
            </Date>
            <SideInfo>
              {/* TODO: Renderizar post del mismo tag al hacer click */}
              <Link href={`/${locale}/${post.doctype[0]}`}>
                {/* Renderiza todos los elementos del array como categorías */}
                {post.doctype.map((type, index) => (
                  <SectionType key={index} $tag={type}>
                    {type}
                    {/* Agrega una coma si no es el último elemento */}
                    {index < post.doctype.length - 1}
                  </SectionType>
                ))}
              </Link>
            </SideInfo>
          </MetaInfo>
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
          {(next !== null || previous !== null) && (
            <div
              style={{
                marginTop: "10rem",
              }}
            >
              <h1>{t("other_posts")}:</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
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
            </div>
          )}
        </Article>
      </MainBg>
    </Layout>
  );
};
export default BlogPost;

export async function generateStaticParams({ params }) {
  const { locale } = await params;
  // Pedimos SOLO los posts de este idioma específico
  const posts = getAllPosts(["slug", "doctype"], locale);

  // Filtramos y mapeamos - devolvemos el slug.
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
    title: `${post.title} | Blog`,
    description: post.excerpt,
    slug: post.slug,
    shortTitle: post.shortTitle,
    robots: {
      index: true,
      follow: true,
    },
    // Importante que el post.slug coincida con el nombre del archivo MDX
    openGraph: {
      title: `${post.title} | Blog`,
      description: post.excerpt,
      url: `https://ericlucero.dev/blog/${locale}/${post.slug}`,
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
