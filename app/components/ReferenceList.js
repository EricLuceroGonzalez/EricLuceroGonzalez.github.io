"use client";
import { IoReturnDownBack } from "react-icons/io5";
import styled from "styled-components";
import { MdSubHeadA } from "../ui/MarkDownComponents";

const RefNum = styled.li`
  color: var(--fg);
  list-style-position: inside;
`;

const RefTex = styled.a`
  :hover {
    color: var(--fg);
  }

  svg {
    color: var(--accent);
  }
`;

export const ReferenceList = ({ references }) => {
  if (!references || references.length === 0) return null;
  return (
    <div>
      <MdSubHeadA>Referencias</MdSubHeadA>
      <ol style={{ padding: "1px 8px" }}>
        {references.map(({ id, text }) => (
          <RefNum key={id} id={`ref-${id}`}>
            {text}{" "}
            <RefTex href={`#cite-${id}`}>
              <IoReturnDownBack />
            </RefTex>
          </RefNum>
        ))}
      </ol>
    </div>
  );
};
