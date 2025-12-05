import { FaClock, FaPencilAlt } from "react-icons/fa";
import { getAllPosts, getPostBySlug, getPostsByType } from "@/app/lib/api";
// MDX
import fs from "fs";
import path from "path";
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
  CoverImageContainer,
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
import rehypeMathjax from "rehype-mathjax";
import supersub from "remark-supersub";
import rehypeHighlight from "rehype-highlight";
import { getTranslations, setRequestLocale } from "next-intl/server";

const BlogPost = async ({ params }) => {
  const { locale, slug } = await params;
  // Importamos los idiomas:
  setRequestLocale(locale);
  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getPostBySlug(slug, [], locale);
  // const blogPosts = getBlogPosts(post.order);
  const blogPosts = getPostsByType(["blog"], post.order);

  // const latexPosts = getPostsByType(["blog"]);
  const nextPost = blogPosts.nextPost;
  const prevPost = blogPosts.previousPost;

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
        <Article>
          <ShowPath title={post.title} />
          <MdHead>{post.title}</MdHead>
          {/* No Thumbnail for now...too much */}
          {/* {post.imageThumbnail && (
            <CoverImageContainer
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
              }}
            >
              <img
                src={post.imageThumbnail}
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
              {/* El enlace usa el primer elemento del array */}
              <Link href={`/${post.doctype[0]}`}>
                {/* Renderiza todos los elementos del array como categorías */}
                {post.doctype.map((type, index) => (
                  <SectionType key={index} tag={type}>
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
                remarkPlugins: [remarkGfm, remarkMath, supersub],
                rehypePlugins: [rehypeMathjax, rehypeHighlight],
              },
            }}
          />
          {/* TODO: Hero Image */}
          {!nextPost ||
            (!prevPost && (
              <div
                style={{
                  marginTop: "10rem",
                }}
              >
                <h1>Otros posts:</h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {prevPost === 0 ? (
                    ""
                  ) : (
                    <PostNavigationCard type={"prev"} post={prevPost} />
                  )}
                  {nextPost === 0 ? (
                    ""
                  ) : (
                    <PostNavigationCard type={"next"} post={nextPost} />
                  )}
                </div>
              </div>
            ))}
        </Article>
      </MainBg>
    </Layout>
  );
};
export default BlogPost;

export async function generateStaticParams({ params }) {
  const { locale } = await params;
  const postsDirectory = path.join(process.cwd(), "/app/_posts/");
  const filenames = fs.readdirSync(postsDirectory);

  // const allSlugs = filenames.map((filename) => {
  //   const slug = filename.replace(/\.mdx$/, "");
  //   console.log("Generated slug:", slug);
  //   return { slug };
  // });

  // const blogSlugs = allSlugs
  //   .map((slug) => getPostBySlug(slug.slug))
  //   .filter((post) => post.doctype.includes("blog"))
  //   .map((post) => post.slug)
  //   .map((slug) => ({ slug }));
  // return blogSlugs;
  // En Next.js, params aquí ya contiene el { locale: 'es' } o { locale: 'en' }
  // que generó el layout padre.

  // 1. Pedimos SOLO los posts de este idioma específico
  const posts = getAllPosts(["slug", "doctype"], locale);

  // 2. Filtramos y mapeamos
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
  const post = getPostBySlug(slug, [], locale);
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
    openGraph: {
      title: `${post.title} | Blog`,
      description: post.excerpt,
      url: `https://elcronopio.com/blog/${post.slug}`,
      images: [
        {
          url: post.imageThumbnail,
          width: 1200,
          height: 630,
          alt: "Vista previa del sitio web de Eric",
        },
      ],
    },
  };
}
