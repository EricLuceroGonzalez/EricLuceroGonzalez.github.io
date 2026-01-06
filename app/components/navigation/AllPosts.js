"use client";
import styled from "styled-components";
import { Link } from "../../../i18n/navigation";
import Image from "next/image";
import { Date, MetaInfo, SideInfo, SectionType } from "../../ui/lugs.js";
import {
  CardContainer,
  GridContainer,
  GridHeroImage,
  ImageContainer,
  TextContainer,
  ExcerptContainer,
  CardTitle,
} from "@/app/ui/CardsElements.js";
import DateDisplay from "../DateDisplay.js";

const Section = styled.section`
  /* No hay estilos en esta sección en tu código original */
`;

// JSX Component
const AllPosts = ({
  title,
  slug,
  date,
  excerpt,
  doctype,
  coverImage,
  coverImageAlt,
  locale,
}) => {
  return (
    <GridContainer
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.3, bounce: 0.25 },
      }}
    >
      <Link href={`/${doctype[0]}/${slug}`}>
        <CardContainer>
          <ImageContainer>
            <GridHeroImage>
              {coverImage && (
                <Image
                  src={coverImage}
                  // width={0}
                  // height={0}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  alt={
                    coverImageAlt
                      ? coverImageAlt
                      : "Cover images with a illustration of the title"
                  }
                  priority={false} // Opcional: true si es la imagen principal del LCP
                />
              )}
            </GridHeroImage>
          </ImageContainer>
          <TextContainer>
            <CardTitle>{title}</CardTitle>
            <MetaInfo>
              <SideInfo>
                <Date>
                  <DateDisplay
                    isoDate={date.iso}
                    defaultFormatted={date.formatted}
                    locale={locale}
                  />
                </Date>
                {doctype.map((type, index) => (
                  <SectionType key={index} $tag={type}>
                    {type}
                    {/* Agrega una coma si no es el último elemento */}
                    {index < doctype.length - 1}
                  </SectionType>
                ))}
              </SideInfo>
            </MetaInfo>
            <ExcerptContainer>
              {
                // excerpt.substring(0, 250)
                excerpt.length > 250
                  ? excerpt.substring(0, excerpt.lastIndexOf(" ", 200)) + "..."
                  : excerpt
              }
            </ExcerptContainer>
          </TextContainer>
        </CardContainer>
      </Link>
    </GridContainer>
  );
};

export default AllPosts;
// ex-LatexPost;
