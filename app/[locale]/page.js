import {
  CoverTitle,
  HomePageCover,
  HomePageCoverImage,
  HomePageCoverText,
  MainPageBg,
  PageContainer,
  TitlePage,
} from "../ui/ComponentsStyled";
import HomeBoxes from "../components/HomeBoxes";
import {
  MdListItem,
  MdParagraph,
  MdUnorderedList,
} from "../ui/MarkDownComponents";
import ScrollDiv from "../components/navigation/ScrollDiv";
import { getAllPosts } from "../lib/api";
import MovingDots from "../components/Canvas/MovingDots";
import { getTranslations, setRequestLocale } from "next-intl/server";
export default async function Home({ params }) {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const allPostsData = getAllPosts([], locale);
  return (
    <PageContainer>
      <ScrollDiv />
      <MainPageBg>
        <HomePageCover>
          <HomePageCoverText>
            {/* <TitlePage>Hola! 👋🏼</TitlePage> */}
            {/* <CoverTitle>Eric Lucero González </CoverTitle> */}
          </HomePageCoverText>
          {/* <TitlePage>Soy</TitlePage> */}
          {/* TODO: Check p5 Compo */}
          {/* <P5Sketch width={600} height={600} /> */}
          {/* <RandomPointCloud /> */}
          {/* <RandomDots numDots={200} width={800} height={400} /> */}
          <HomePageCoverImage>
            {/* <MovingDots numDots={100} width={100} height={150} speed={2} /> */}
            <MovingDots numDots={100} speed={2} />
            {/* <CircleBounce /> */}
          </HomePageCoverImage>
        </HomePageCover>
        <MdParagraph>
          Este sitio web está en construcción, pero pronto será un lugar donde
          compartiré mi trabajo y aprendizaje en áreas como inteligencia
          artificial, LaTeX, y algoritmos de optimización. Aquí encontrarás:
        </MdParagraph>
        <MdUnorderedList>
          {/* TODO: Nuevo endpoint /licencias, sin ruta fija o desde footer */}
          <MdListItem>
            Un blog con reflexiones, tutoriales, y temas técnicos relacionados
            con la IA.
          </MdListItem>
          <MdListItem>
            Recursos sobre LaTeX para quienes deseen perfeccionar sus
            habilidades en la escritura científica.
          </MdListItem>
          <MdListItem>
            Un portafolio donde documentaré proyectos e ideas relacionadas con
            programación y matemáticas aplicadas.
          </MdListItem>
        </MdUnorderedList>
        <MdParagraph>
          Gracias por visitar. Te invito a explorar las secciones disponibles y
          volver pronto para más contenido. ¡Esto es solo el comienzo!
        </MdParagraph>
        <HomeBoxes props={allPostsData} />
      </MainPageBg>
    </PageContainer>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucerogonzalez.github.io";

  return {
    title: t("defaultTitle"),
    description: t("description"),
    keywords: t("keywords"),
    // Configuración vital para SEO Multilingüe
    alternates: {
      canonical: `${URLbase}/${locale}`,
      languages: {
        es: `${URLbase}/es`,
        en: `${URLbase}/en`,
      },
    },
    openGraph: {
      title: t("templateTitle"),
      description: t("description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
          width: 1200,
          height: 630,
          alt: t("templateTitle"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("templateTitle"),
      description: t("description"),
      image:
        "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
    },
  };
}
