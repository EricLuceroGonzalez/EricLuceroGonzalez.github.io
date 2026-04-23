import React from "react";
import dbChuchu from "../../lib/dbChuchu.js";
import Chuchu from "../../models/Chuchu.js";
import mongoose from "mongoose";
import { MainBg } from "../../ui/ComponentsStyled";
import { TitlePage, SubSubTitle } from "../../ui/TitlesComponents";
import {
  AboutMePanel,
  AboutMeParaph,
  AboutWrapper,
  BioTextContainer,
  IconLink,
  Layout,
  LinkList,
  PhotoAvatar,
} from "../../ui/BasicDivs";
import Image from "next/image";
import ShowPath from "../../components/showPath";
import TextCard from "../../ui/TextCards";
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
  const test = [
    {
      id: 1,
      _id: 1,
      texto:
        "Podría sentirse rey de espacios infinitos, encerrado en la cáscara de una nuez.",
      libro: "libro 1",
      autor: " Chuchú Martínez",
      año: 1965,
      fecha_ultimo_post: "2026-04-12",
    },
    {
      id: 2,
      _id: 2,
      texto:
        "Podría sentirse rey de espacios infinitos, encerrado en la cáscara de una nuez.",
      libro: "libro 1",
      autor: " Chuchú Martínez",
      año: 1965,
      fecha_ultimo_post: "2026-04-12",
    },
  ];
  return (
    <Layout>
      <MainBg>
        <ShowPath title={""} />
        <TitlePage>Chuchú Martínez</TitlePage>
        <SubSubTitle>
          Bot del poeta Chuchú Martínez en{" "}
          <a href="https://x.com/Bot_Chuchu">@Bot_Chuchu</a>
        </SubSubTitle>
        {/* {tuitsListos.map((tuit) => (
          // Usamos _id.toString() como key porque Mongoose devuelve ObjectId
          //   <TextCard key={tuit.id.toString()} tuit={tuit} />
          <TextCard key={tuit._id} tuit={tuit} />
        ))} */}
        {test.map((tuit) => (
          // Usamos _id.toString() como key porque Mongoose devuelve ObjectId
          //   <TextCard key={tuit.id.toString()} tuit={tuit} />
          <TextCard key={tuit._id} tuit={tuit} />
        ))}
      </MainBg>
    </Layout>
  );
}
