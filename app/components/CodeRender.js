"use client";
import ReactMarkdown from "react-markdown";
import { MathJaxContext, MathJax } from "better-react-mathjax";

import {
  MdParagraph,
  MdListItem,
  MdBlockQuote,
  MdSubHeadA,
  MdSubHeadB,
  MdSubHeadC,
  MdEmph,
  MdLink,
  MdStrong,
  MdHead,
  MdUnorderedList,
  MdImage,
  MdImageCaption,
  MdOrderedList,
  MdCite,
} from "../ui/MarkDownComponents";

import CodeBlock from "./CodeWrapper";
import Image from "next/image";
import H2Header from "./MdCompos/H2Header";

const RenderCodeBlock = ({ props }) => {
  const P = ({ children }) => <MdParagraph>{children}</MdParagraph>;
  const Li = ({ children }) => <MdListItem>{children}</MdListItem>;
  const Bq = ({ children }) => <MdBlockQuote>{children}</MdBlockQuote>;
  const Head = ({ children }) => <MdHead>{children}</MdHead>;
  const HeadTwo = ({ children }) => <MdSubHeadA>{children}</MdSubHeadA>;
  const HeadThree = ({ children }) => <MdSubHeadB>{children}</MdSubHeadB>;
  const HeadFour = ({ children }) => <MdSubHeadC>{children}</MdSubHeadC>;
  // const TheCode = ({ children }) => <MdCode>{children}</MdCode>;
  const Strong = ({ children }) => <MdStrong>{children}</MdStrong>;
  const Empha = ({ children }) => <MdEmph>{children}</MdEmph>;
  const UList = ({ children }) => <MdUnorderedList>{children}</MdUnorderedList>;
  const OList = ({ children }) => <MdOrderedList>{children}</MdOrderedList>;
  const MdSuper = ({ children }) => <MdCite>{children}</MdCite>;
  return (
    <MathJaxContext>
      <MathJax dynamic hideUntilTypeset="every">
        <ReactMarkdown
          components={{
            // p: P,
            p: (paragraph) => {
              const { node } = paragraph;
              if (node.children[0].tagName === "img") {
                const image = node.children[0];
                const metastring = image.properties.alt || "";
                const alt = metastring.replace(/ *\{[^)]*\} */g, "");
                const match = metastring.match(/{(\d+)x(\d+)}/);
                const width = parseInt(match[1], 10);
                const height = parseInt(match[2], 10);
                const isPriority = metastring.toLowerCase().match("{priority}");
                const hasCaption = metastring
                  .toLowerCase()
                  .includes("{caption:");
                const caption = metastring.match(/{caption: (.*?)}/)?.pop();

                return (
                  <MdImage>
                    <Image
                      src={image.properties.src}
                      // width={width}
                      // height={height}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }} // optional
                      alt={alt}
                    />
                    {hasCaption ? (
                      <MdImageCaption>{caption}</MdImageCaption>
                    ) : null}
                  </MdImage>
                );
              }
              return <MdParagraph>{paragraph.children}</MdParagraph>;
            },
            li: Li,
            ul: UList,
            ol: OList,
            blockquote: Bq,
            h1: Head,
            h2: H2Header,
            // h2: HeadTwo,
            h3: HeadThree,
            h4: HeadFour,
            strong: Strong,
            em: Empha,
            super: MdSuper,
            a: (props) => {
              return (
                <MdLink target="_blank" href={props.href}>
                  {props.children}{" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="0.6em"
                    width="0.6em"
                    {...props}
                  >
                    <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
                    <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
                  </svg>
                </MdLink> // All other links
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                />
              ) : (
                <code className={className} {...props}>
                  {String(children).trim()}
                </code>
              );
            },
            table: (props) => (
              <table
                {...props}
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "20px 0",
                }}
              />
            ),
            th: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              />
            ),
            td: (props) => (
              <td
                {...props}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              />
            ),
          }}
        >
          {props}
        </ReactMarkdown>
      </MathJax>
    </MathJaxContext>
  );
};

export default RenderCodeBlock;
