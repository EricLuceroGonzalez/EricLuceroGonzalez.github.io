// import Link from "next/link";
import Image from "next/image";
import { NotFoundTitle, NotFoundText, Main } from "./ui/ComponentsStyled";
import { useTranslations } from "next-intl";
// import { Layout, MainBg } from "./ui/lugs"; // Tus componentes de estilo
import { Link } from "@/i18n/navigation";

// Nota: Este archivo hereda automáticamente el layout de [locale],
// así que ya tendrá Navbar y Footer.
export default function NotFound() {
  const t = useTranslations("NotFound");

  //   return (
  //     <Layout>
  //       <MainBg>
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             minHeight: "60vh",
  //             textAlign: "center",
  //             gap: "20px",
  //           }}
  //         >
  //           <h1
  //             style={{
  //               fontSize: "4rem",
  //               fontWeight: "bold",
  //               color: "var(--accent)",
  //             }}
  //           >
  //             404
  //           </h1>
  //           <h2 style={{ fontSize: "2rem" }}>{t("title")}</h2>
  //           <p>{t("description")}</p>

  //           <Link
  //             href="/"
  //             style={{
  //               padding: "10px 20px",
  //               backgroundColor: "var(--primary-btn-bg)",
  //               color: "white",
  //               borderRadius: "5px",
  //               textDecoration: "none",
  //               marginTop: "20px",
  //             }}
  //           >
  //             {t("backHome")}
  //           </Link>
  //         </div>
  //       </MainBg>
  //     </Layout>
  //   );
  // }

  return (
    <Main
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#6C63FF",
          margin: "20px auto",
          alignItems: "center",
          fontFamily: "monospace",
        }}
      >
        <NotFoundTitle>Error 404:</NotFoundTitle>
        <h2>Dirección no encontrada.</h2>

        <div style={{ maxWidth: "70%" }}>
          <Image
            src={
              "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1739964161/elCronopio/404_bw_cli0yg.png"
            } // Ruta de la imagen del autor
            alt={"Un ovni llevándose a los usuarios de la pagina no encontrada"} // Texto alternativo
            width={180} // Ancho de la imagen
            height={180} // Alto de la imagen
            // priority
            // placeholder="blur"
            // Make the image display full width
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <NotFoundText>
          La dirección que has colocado no ha sido creada todavía. Verifica que
          la hayas escrito bien, o vuelve a la página principal.
        </NotFoundText>
        <Link href="/">Regresar</Link>
        {/* https://res.cloudinary.com/dcvnw6hvt/image/upload/v1739809759/elCronopio/xle8npibijpsgk9qkfnd.png */}
      </div>
    </Main>
  );
}
