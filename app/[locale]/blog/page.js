// import React from "react";
import {
  MainPageBg,
  PageContainer,
  TitlePage,
} from "../../ui/ComponentsStyled";
import { getPostsByType } from "../../lib/api";
import { notFound } from "next/navigation";
import HomeBoxes from "../../components/HomeBoxes";
import { Layout } from "../../ui/lugs";
import {
  MdParagraph,
  MdListItem,
  MdUnorderedList,
} from "../../ui/MarkDownComponents";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { setRequestLocale } from "next-intl/server";
import BackgroundDots from "@/app/components/BgMovingDots";

const BlogPage = async ({ params }) => {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  // const blogPosts = getBlogPosts();
  const blogPosts = getPostsByType(["blog"], 0, locale);
  if (!blogPosts.posts) {
    return notFound();
  }
  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <BackgroundDots numDots={90} />
        <MainPageBg>
          <ShowPath title={""} />
          <TitlePage>¡Bienvenido al Blog!</TitlePage>
          {/* TODO: Create the contact functionality (Mail, Form, database, chat gpt) */}
          <MdParagraph>
            En esta sección encontrarás artículos y reflexiones sobre temas que
            me apasionan:
          </MdParagraph>
          <MdUnorderedList>
            <MdListItem>
              Inteligencia Artificial: avances, algoritmos y mi experiencia en
              el doctorado.
            </MdListItem>
            <MdListItem>
              Matemáticas aplicadas: soluciones a problemas reales y enfoques
              innovadores.
            </MdListItem>
            <MdListItem>
              Programación: guías, proyectos y recursos para aprender y mejorar.
            </MdListItem>
          </MdUnorderedList>

          <MdParagraph>
            Estoy construyendo este blog poco a poco, así que vuelve pronto para
            explorar nuevas publicaciones.
          </MdParagraph>
          <MdParagraph>
            ¡Espero que encuentres algo útil e interesante aquí!
          </MdParagraph>
          <HomeBoxes props={blogPosts.posts} locale={locale} />
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default BlogPage;

export const metadata = {
  title: "Blog | Eric Lucero González",
  description:
    "Explora artículos sobre Inteligencia Artificial, programación, algoritmos metaheurísticos y más. Comparte mi viaje académico y profesional.",
  openGraph: {
    title: "Eric's Blog - Inteligencia Artificial y más",
    description:
      "Artículos y reflexiones sobre IA, optimización, programación y mi proceso de aprendizaje durante el doctorado.",
    images: [
      {
        url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png", // Imagen relacionada con el blog
        width: 1200,
        height: 630,
        alt: "Blog sobre Inteligencia Artificial y programación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric's Blog - Inteligencia Artificial y más",
    description:
      "Artículos y reflexiones sobre IA, optimización y programación.",
    image:
      "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
  },
};
