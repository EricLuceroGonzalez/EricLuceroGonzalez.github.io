import React from "react";

import {
  MdBlockQuote,
  MdCite,
  MdCode,
  MdEmph,
  MdHead,
  MdImage,
  MdImageCaption,
  MdLink,
  MdListItem,
  MdOrderedList,
  MdParagraph,
  MdStrong,
  MdSubHeadC,
  MdTable,
  MdTableD,
  MdTableHead,
  MdUnorderedList,
} from "@/app/ui/MarkDownComponents";
import CodeBlock from "@/app/components/CodeWrapper";
import Image from "next/image";
import H2Header from "./H2Header";
import H3Header from "./H3Header";
const MdxComponents = {
  h1: (props) => <MdHead {...props}>{props.children}</MdHead>,
  h2: (props) => <H2Header {...props} />,
  h3: (props) => <H3Header {...props} />,
  h4: (props) => <MdSubHeadC {...props}>{props.children}</MdSubHeadC>,
  ul: (props) => <MdUnorderedList {...props}>{props.children}</MdUnorderedList>,
  ol: (props) => <MdOrderedList {...props}>{props.children}</MdOrderedList>,
  li: (props) => <MdListItem {...props}>{props.children}</MdListItem>,
  strong: (props) => <MdStrong {...props}>{props.children}</MdStrong>,
  em: (props) => <MdEmph {...props}>{props.children}</MdEmph>,
  sup: (props) => <MdCite {...props}>{props.children}</MdCite>,
  blockquote: (props) => (
    <MdBlockQuote {...props}>{props.children}</MdBlockQuote>
  ),
  p: (props) => <MdParagraph {...props}>{props.children}</MdParagraph>,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    // Extraer el contenido del código correctamente
    const getText = (child) => {
      if (React.isValidElement(child)) {
        // Si es un elemento transicional, extraer su contenido
        return typeof child.props.children === "string"
          ? child.props.children
          : "";
      }
      return typeof child === "string" ? child : "";
    };

    // Si children es un array, lo mapeamos correctamente
    const codeText = Array.isArray(children)
      ? children.map(getText).join("").trim()
      : getText(children).trim();

    return !inline && match ? (
      <CodeBlock language={match[1]} value={codeText} />
    ) : (
      <MdCode className={className} {...props}>
        {codeText}
      </MdCode>
    );
  },
  a: (props) => {
    // 1. Detectamos si es un ancla (índice) o enlace interno
    const isAnchor = props.href && props.href.startsWith("#");
    const isInternal = props.href && props.href.startsWith("/");

    // props.children
    // .normalize("NFD")
    // .replace(/[\u0300-\u036f]/g, "")
    // .toLowerCase()
    // .replace(/[^a-z0-9]/g, "-") // Recomiendo usar guiones en lugar de nada para separar palabras
    // .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio o final
    if (isAnchor || isInternal) {
      // Retornamos un link limpio para que el scroll funcione
      return (
        <a {...props} style={{ textDecoration: "none", color: "inherit" }}>
          {props.children}
        </a>
      );
    }
    return (
      <MdLink target="_blank" href={props.href}>
        {props.children}{" "}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="0.8em"
          width="0.8em"
          {...props}
        >
          <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
          <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
        </svg>
      </MdLink> // All other links
    );
  },
  img: ({ src, alt }) => {
    const metastring = alt || "";
    const captionSeparation = metastring.match(/caption=(.*)/);
    const caption = captionSeparation ? captionSeparation[1].trim() : null;
    const hasCaption = metastring.toLowerCase().includes("caption=");
    return (
      <MdImage>
        <Image
          src={src}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={caption}
          // objectFit="cover"
        />
        {hasCaption && <MdImageCaption>{caption}</MdImageCaption>}
      </MdImage>
    );
  },
  table: (props) => <MdTable {...props} />,
  th: (props) => <MdTableHead {...props} />,
  td: (props) => <MdTableD {...props} />,
};
export default MdxComponents;
