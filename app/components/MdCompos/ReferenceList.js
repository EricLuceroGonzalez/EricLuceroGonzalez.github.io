"use client";
import { MdSubHeadA } from "@/app/ui/MarkDownComponents";
import { IoReturnDownBack } from "react-icons/io5";
import styled from "styled-components";

const RefNumbers = styled.ol`
  /* li::marker {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--link-fg);
    content: "[" counter(list-item) "] ";
  } */

  list-style: none;
  counter-reset: ref-counter;
  padding-left: 0;
  margin-left: 1.5em; /* Ajusta según necesites */
  text-indent: -1.5em; /* Compensa el margen para alinear el texto */

  li {
    counter-increment: ref-counter;
    margin-bottom: 0.8rem;
    position: relative;

    &::before {
      content: "[" counter(ref-counter) "]";
      display: inline-block;
      width: 1.5em;
      margin-right: 0.5em;
      color: var(--link-fg); /* Color azul para los números */
      font-weight: bold;
      text-align: right;
    }
  }
`;
const RefNum = styled.li`
  color: var(--fg);
  font-size: 1.2em;
  list-style-position: inside;

  counter-increment: reference-counter;
  margin-bottom: 0.5rem;

  &::before {
    content: "[" counter(reference-counter) "]";
    margin-right: 0.5rem;
    color: var(--link-fg);
    font-weight: bold;
  }
`;

const RefTex = styled.a`
  :hover {
    color: var(--fg);
  }

  svg {
    color: var(--link-fg);
    font-size: 1.5em;
    font-weight: bold;
  }
`;

export const ReferenceList = ({ references }) => {
  if (!references || references.length === 0) return null;
  return (
    <div>
      <MdSubHeadA>Referencias</MdSubHeadA>
      <RefNumbers>
        {references.map(({ id, text }) => (
          <li key={id} id={`ref-${id}`}>
            {text}{" "}
            <RefTex href={`#cite-${id}`}>
              <IoReturnDownBack />
            </RefTex>
          </li>
        ))}
      </RefNumbers>
    </div>
  );
};
