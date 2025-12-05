import {
  MainPageBg,
  PageContainer,
  TitlePage,
} from "../../ui/ComponentsStyled";
import { getLatexPosts, getPostsByType } from "../../lib/api";
import { ButtonContainer, CopyButton, Layout } from "../../ui/lugs";
import HomeBoxes from "../../components/HomeBoxes";
import ResponsiveSidebar from "../../components/SideBar";
import {
  MdHead,
  MdListItem,
  MdParagraph,
  MdSubHeadA,
  MdUnorderedList,
} from "../../ui/MarkDownComponents";
import Link from "next/link";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { setRequestLocale } from "next-intl/server";

const Latex = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // const AllLatexPosts = getLatexPosts();
  const AllLatexPosts = getPostsByType(["latex"], 0, locale);
  // Filtra solo los posts que tienen "curso"
  const latexBlogPost = AllLatexPosts.posts.filter(
    (post) => post.doctype.includes("latex") && !post.doctype.includes("curso")
  );
  // Filtra solo los posts que tienen "curso"
  const latexCoursePost = AllLatexPosts.posts.filter(
    (post) => post.doctype.includes("latex") && post.doctype.includes("curso")
  );

  // Mapear los posts para devolver solo los datos necesarios
  // const sidebarItems = latexPosts
  //   .map((post) => ({
  //     slug: `/${post.doctype}/${post.slug}`, // Generar la ruta con el doctype
  //     shortTitle: post.shortTitle, // Título del post
  //     order: post.order,
  //   }))
  //   .sort((post1, post2) => (post1.order > post2.order ? 1 : -1));

  if (!latexBlogPost && !latexCoursePost) {
    return notFound();
  }
  return (
    <Layout>
      <MainPageBg>
        <ScrollDiv />
        <ShowPath title={latexBlogPost.title} />
        <TitlePage>Todo sobre LaTeX</TitlePage>
        {/* TODO: Create the feeling here...(and in suscribe, but later) */}

        <MdParagraph>
          Aquí comparto tutoriales, ejemplos y consejos para trabajar con LaTeX,
          la herramienta indispensable para crear documentos científicos y
          técnicos de alta calidad. Algunos temas que encontrarás:
        </MdParagraph>

        <MdUnorderedList>
          <MdListItem>Instalación y configuración de LaTeX.</MdListItem>
          <MdListItem>
            Ejemplos prácticos para iniciarte en este mundo.
          </MdListItem>
          <MdListItem>
            Recursos para personalizar y optimizar tus documentos.
          </MdListItem>
        </MdUnorderedList>
        <MdParagraph>
          Si eres principiante o buscas mejorar tus habilidades, esta sección es
          para ti. ¡Vamos construyéndola juntos!
        </MdParagraph>
        <ButtonContainer>
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
        </ButtonContainer>
        <HomeBoxes props={latexBlogPost} />
        <MdHead>Aprende LaTeX</MdHead>
        <HomeBoxes props={latexCoursePost} />
      </MainPageBg>
    </Layout>
  );
};

export default Latex;

export const metadata = {
  title: "Tutoriales LaTeX | Eric Lucero González",
  description:
    "Descubre guías y tutoriales detallados sobre LaTeX, desde lo básico hasta técnicas avanzadas para crear documentos impecables.",
  openGraph: {
    title: "Tutoriales de LaTeX",
    description:
      "Guías prácticas para dominar LaTeX, incluyendo tips avanzados y ejemplos paso a paso para documentos académicos y más.",
    images: [
      {
        url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png", // Imagen temática de LaTeX
        width: 1200,
        height: 630,
        alt: "Tutoriales y tips de LaTeX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutoriales de LaTeX",
    description:
      "Aprende LaTeX desde lo básico hasta lo avanzado con tutoriales claros y ejemplos prácticos.",
    image:
      "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
  },
};
