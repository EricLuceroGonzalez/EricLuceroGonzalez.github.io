import {
  MainPageBg,
  PageContainer,
  TitlePage,
} from "../../ui/ComponentsStyled";
import { getPostsByType } from "../../lib/api";
import { ButtonContainer, CopyButton, Layout } from "../../ui/lugs";
import HomeBoxes from "../../components/HomeBoxes";
import ResponsiveSidebar from "../../components/SideBar";
import {
  MdHead,
  MdListItem,
  MdParagraph,
  MdSubHeadC,
  MdUnorderedList,
} from "../../ui/MarkDownComponents";
import Link from "next/link";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "@/app/components/BgMovingDots";

const Latex = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const trans = await getTranslations({ locale, namespace: "LatexPage" });
  // const AllLatexPosts = getLatexPosts();
  const AllLatexPosts = getPostsByType(["latex", "LaTeX"], 0, locale);

  // Filtra solo los posts que tienen "curso"
  const latexBlogPost = AllLatexPosts.posts.filter(
    (post) => post.doctype.includes("latex") || post.doctype.includes("LaTeX"),
  );
  console.log(latexBlogPost);
  // Filtra solo los posts que tienen "curso"
  const latexCoursePost = AllLatexPosts.posts.filter(
    (post) => post.doctype.includes("latex") && post.doctype.includes("curso"),
  );
  if (!latexBlogPost && !latexCoursePost) {
    return notFound();
  }
  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <BackgroundDots numDots={95} />
        <ShowPath title={latexBlogPost.title} />
        <MainPageBg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TitlePage>{trans("title")}</TitlePage>
          <MdSubHeadC>{trans("subtitle")}</MdSubHeadC>
          {/* TODO: Create the feeling here...(and in suscribe, but later) */}
          {/* <MdParagraph>{trans("intro_text")}</MdParagraph>

          <MdParagraph>{trans("advanced_text")}</MdParagraph>
          <MdParagraph>
            {trans("cta_beginner")}
            {trans("cta_advanced")}
          </MdParagraph> */}

          <MdParagraph>{trans("copy_text.p1")}</MdParagraph>
          <MdUnorderedList>
            <MdListItem>{trans("copy_text.item1")}</MdListItem>
            <MdListItem>{trans("copy_text.item2")}</MdListItem>
            <MdListItem>{trans("copy_text.item3")}</MdListItem>
          </MdUnorderedList>
          <MdParagraph>{trans("copy_text.p2")}</MdParagraph>

          <MdParagraph>{trans("donald_text")}</MdParagraph>
          <MdParagraph>{trans("advanced_text")}</MdParagraph>
          {/* <ButtonContainer>
            <Link href={"/latex/curso"}>
              <CopyButton
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
              >
                Ir al curso
              </CopyButton>
            </Link>
          </ButtonContainer> */}
          {/* 
          <MdHead>Aprende LaTeX</MdHead>
          */}
          <HomeBoxes props={latexBlogPost} />
          {/* <HomeBoxes props={latexCoursePost} /> */}
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default Latex;

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const metadata = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";
}
// export const metadata = {
//   title: "Tutoriales LaTeX | Eric Lucero González",
//   description:
//     "Descubre guías y tutoriales detallados sobre LaTeX, desde lo básico hasta técnicas avanzadas para crear documentos impecables.",
//   openGraph: {
//     title: "Tutoriales de LaTeX",
//     description:
//       "Guías prácticas para dominar LaTeX, incluyendo tips avanzados y ejemplos paso a paso para documentos académicos y más.",
//     images: [
//       {
//         url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png", // Imagen temática de LaTeX
//         width: 1200,
//         height: 630,
//         alt: "Tutoriales y tips de LaTeX",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Tutoriales de LaTeX",
//     description:
//       "Aprende LaTeX desde lo básico hasta lo avanzado con tutoriales claros y ejemplos prácticos.",
//     image:
//       "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
//   },
// };
