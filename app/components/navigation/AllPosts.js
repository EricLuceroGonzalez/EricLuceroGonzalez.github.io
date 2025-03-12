"use client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {
  Date,
  MetaInfo,
  TitleContainer,
  AuthorInfo,
  AuthorName,
  SideInfo,
  SectionType,
  MdHead,
} from "../../ui/lugs.js";
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
}) => (
  // console.log(slug)
  <GridContainer>
    <Link href={`/${doctype[0]}/${slug}`}>
      <CardContainer>
        <ImageContainer>
          <GridHeroImage>
            {coverImage && coverImage != "" && (
              <Image
                src={coverImage}
                // width={width}
                // height={height}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
                alt={
                  coverImageAlt
                    ? coverImageAlt
                    : "Cover images with a illustration of the title"
                }
                objectFit="cover"
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
                />
              </Date>
              {doctype.map((type, index) => (
                <SectionType key={index} tag={type}>
                  {type}
                  {/* Agrega una coma si no es el último elemento */}
                  {index < doctype.length - 1}
                </SectionType>
              ))}
            </SideInfo>
          </MetaInfo>
          <ExcerptContainer>{excerpt.substring(0, 250)}...</ExcerptContainer>
        </TextContainer>
      </CardContainer>
    </Link>
  </GridContainer>
);

export default AllPosts;
// ex-LatexPost;
