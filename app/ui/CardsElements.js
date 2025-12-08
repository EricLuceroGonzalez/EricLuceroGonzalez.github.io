import styled from "styled-components";
import { motion } from "framer-motion";

// CardsElements.js;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 660px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  padding: 0px 3px;
  flex-grow: 1;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  min-width: 60%;
  flex-grow: 2;
`;

export const GridHeroImage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.3rem auto;
  max-width: 90%;
  height: auto;
  position: relative;
  @media (max-width: 660px) {
    width: 40%;
    display: none;
  }
  @media (min-width: 1280px) {
    width: 90%;
  }
`;

// export const AnimatedDiv = styled(motion.div)`
//   background-color: rebeccapurple;
//   width: 200px;
//   height: 200px;
// `;

//         <motion.div
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//                 duration: 0.4,
//                 scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
//             }}
//             style={ball}
//         />
//     )
// }

export const GridContainer = styled(motion.div)`
  margin: 0.55rem auto;
  background-color: var(--bg);
  padding: 2px 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--gray-light);
  width: 100%;
  z-index: 1;
  @media (min-width: 660px) {
    width: 100%;
  }
  &:hover {
    border: 2px solid var(--box-border-hover);
    transition: border 0.5s;
  }
  /* border: 1px solid var(--accent); */
`;

export const ExcerptContainer = styled.p`
  font-family: monospace;
  margin-bottom: 0.5rem;
  color: var(--fg);
  font-size: medium;
  /* color: blue; */
  @media (min-width: 660px) {
    font-size: medium;
    /* color: red; */
  }
`;

export const CardTitle = styled.h1`
  line-height: 0.9;
  font-size: x-large;
  margin: 0.33rem 0;
  @media (min-width: 660px) {
    font-size: x-large;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  color: var(--accent);
  text-align: left;
  padding: 12px 0;
  /* border: 1px solid wheat; */
`;
