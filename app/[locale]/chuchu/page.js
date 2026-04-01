import React from "react";
import dbChuchu from "../../lib/dbChuchu.js";
import Chuchu from "../../models/Chuchu.js";
import mongoose from "mongoose";
import { MainBg } from "../../ui/ComponentsStyled";
import {
  AboutMePanel,
  AboutMeParaph,
  AboutWrapper,
  BioTextContainer,
  IconLink,
  Layout,
  LinkList,
  PhotoAvatar,
} from "../../ui/lugs";
import Image from "next/image";
import ShowPath from "../../components/showPath";
import TextCard from "../../components/TextCards";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ChuchuVersos({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "Chuchu" });

  // Conectamos a la BD
  await dbChuchu();
  const fechaDesde = new Date("2024-03-01T00:00:00Z");
  const rawTweets = await Chuchu.find({
    fecha_ultimo_post: { $gte: fechaDesde },
  })
    .lean() // .lean() convierte los documentos de Mongoose en objetos JS puros (necesario en Next.js)
    .sort({ fecha_ultimo_post: -1 }); // Orden descendente (más recientes primero)
  const tuitsListos = rawTweets.map((tuit) => ({
    ...tuit,
    // Convertimos el ObjectId a texto plano
    _id: tuit._id.toString(),
    // Convertimos la fecha nativa a texto ISO (si existe)
    fecha_ultimo_post: tuit.fecha_ultimo_post
      ? tuit.fecha_ultimo_post.toISOString()
      : null,
  }));
  return (
    <Layout>
      <MainBg>
        <ShowPath title={""} />
        <AboutMePanel>
          <PhotoAvatar
            initial={{ opacity: 0, scale: 0, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", visualDuration: 0.3, bounce: 0.35 },
            }}
          >
            <Image
              src={
                //   "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732922346/elCronopio/Web-communication/owsftbzp6mn5iuvkogrl.jpg"
                "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1765839287/elCronopio/Thumbnails/logo-ball_isbsul.png"
              }
              alt={"A portrait photos of Eric Lucero"} // Texto alternativo
              width={280} // Ancho de la imagen
              height={280} // Alto de la imagen
              priority
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 100,
              }}
            />
          </PhotoAvatar>
          <BioTextContainer>
            <AboutMeParaph
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
              }}
            >
              {t("paragraph1")}
            </AboutMeParaph>

            <AboutMeParaph
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
              }}
            >
              {t("paragraph2")}
            </AboutMeParaph>
          </BioTextContainer>
        </AboutMePanel>
        {tuitsListos.map((tuit) => (
          // Usamos _id.toString() como key porque Mongoose devuelve ObjectId
          //   <TextCard key={tuit.id.toString()} tuit={tuit} />
          <TextCard key={tuit._id} tuit={tuit} />
        ))}
      </MainBg>
    </Layout>
  );
}
