import { FaClock, FaPencilAlt } from "react-icons/fa";
import "katex/dist/katex.min.css";
import {
  getAllPosts,
  getPostBySlug,
  getSurroundingPosts,
} from "@/app/lib/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import MdxComponents from "@/app/components/MdCompos/MDXComponents";
import { dynamicMdxComponents } from "@/app/components/MdCompos/dynamicMdxComponents";
import { Article, Layout } from "@/app/ui/BasicDivs.js";
import {
  Date,
  MetaInfo,
  SideInfo,
  SectionType,
} from "@/app/ui/BlogHeaderInfo.js";
import { MainBg } from "@/app/ui/ComponentsStyled.js";
import Link from "next/link.js";
import { MdHead } from "@/app/ui/MarkDownComponents.js";
import PostNavigationCard from "@/app/components/PostNavigation.js";
import ShowPath from "@/app/components/showPath.js";
import LikesButton from "@/app/components/Likes.js";
import ScrollDiv from "@/app/components/navigation/ScrollDiv.js";
import DateDisplay from "@/app/components/DateDisplay.js";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import supersub from "remark-supersub";
import rehypeHighlight from "rehype-highlight";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
// import ViewportSize from "@/app/components/viewPortViewer";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import ConditionalKaTeXLoader from "@/app/components/MdCompos/ConditionalKaTeXLoader";
import { BlogPostingJsonLd } from "@/app/components/JsonLd";
import { alternatesFor, pageUrl, LOCALES, SITE_NAME } from "@/app/lib/seo";
const BlogPost = async ({ params }) => {
  const { locale, slug } = await params;
  // Importamos los idiomas:

  setRequestLocale(locale);
  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(slug, [], locale);
  // 404 si no existe, si es privado o si es un post de otra sección (/latex)
  if (!post || post.isPublic !== true || post.doctype?.[0] !== "blog") {
    notFound();
  }

  const { previous, next } = getSurroundingPosts("blog", post.order, locale);

  const readT = post.readingTime;
  console.log(`readT = ${readT}`)
  const needsKaTeX = post.keywords?.some((cat) =>
    ["math", "latex", "mathematics", "algorithm"].includes(cat.toLowerCase()),
  );

  return (
    <Layout>
      <MainBg>
        <BlogPostingJsonLd post={post} locale={locale} />
        <ConditionalKaTeXLoader needsKaTeX={needsKaTeX} />

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
                ? `${readT} ${t("minute")}`
                : `${readT} ${t("minutes")}`}{" "}
            </Date>
            <SideInfo>
              {/* TODO: Renderizar post del mismo tag al hacer click */}
              {post.categories.map((type) => (
                <SectionType key={type} $tag={type}>
                  {type}
                </SectionType>
              ))}
            </SideInfo>
            <LikesButton slug={post.slug} />
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
              <h2>{t("other_posts")}</h2>
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

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, [], locale);
  if (!post) return { title: "Post not found", robots: { index: false } };

  const path = `/blog/${slug}`;
  // hreflang solo hacia los idiomas en los que el post existe y es público
  const available = LOCALES.filter(
    (l) => l === locale || getPostBySlug(slug, [], l)?.isPublic === true,
  );
  const title = `${post.title} | Blog`;
  const image = post.socialThumbnail || post.coverImage;
  const meta = await getTranslations({ locale, namespace: "Metadata" });
  const ogImage = image || meta("thumbnailImage");

  return {
    title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: alternatesFor(locale, path, available),
    openGraph: {
      title,
      description: post.excerpt,
      url: pageUrl(locale, path),
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date?.iso,
      authors: [pageUrl(locale, "/about")],
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.coverImageAlt || post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}
