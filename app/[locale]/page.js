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
import { setRequestLocale } from "next-intl/server";
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
            <TitlePage>Hola! 👋🏼</TitlePage>
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

export const metadata = {
  title: "Inicio | Eric Lucero González",
  description:
    "Explora el espacio personal de Eric, donde combina su experiencia en Inteligencia Artificial, LaTeX y programación. Descubre su trayectoria, tutoriales y blog.",
  openGraph: {
    title: "Bienvenido a mi página personal",
    description:
      "Una mezcla de blog, tutoriales y un vistazo a mi trayectoria en Inteligencia Artificial, LaTeX y programación. Construyendo y compartiendo conocimientos.",
    images: [
      {
        url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png", // Ruta de la imagen para el home
        width: 1200,
        height: 630,
        alt: "Vista previa del sitio web de Eric",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bienvenido a mi página personal",
    description:
      "Una mezcla de blog, tutoriales y un vistazo a mi trayectoria en Inteligencia Artificial, LaTeX y programación.",
    image:
      "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
  },
};
