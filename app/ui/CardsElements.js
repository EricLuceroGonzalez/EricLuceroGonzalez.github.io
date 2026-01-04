import styled from "styled-components";
import { motion } from "framer-motion";

// CardsElements.js;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 660px) {
    flex-direction: column;
  }
  /* border: 2px solid var(--primary); */
`;

export const ImageContainer = styled.div`
  padding: 0px 3px;
  /* flex-grow: 1; */
  width: 30%;
`;

export const GridHeroImage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.3rem auto;
  width: 95%;
  height: auto;
  position: relative;
  @media (max-width: 660px) {
    display: none;
  }
  @media (min-width: 1280px) {
    width: 95%;
  }
  /* border: 2px solid var(--accent); */
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  width: 70%;

  @media (max-width: 1280px) {
    width: 99%;
  }
  @media (1280 < width < 14400px) {
    width: 80%;
  }
  /* flex-grow: 1; */

  /* border: 2px solid var(--accent); */
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
  margin: 0.33rem auto;
  background-color: var(--bg);
  padding: 1px 4px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--gray-light);
  width: 100%;
  z-index: 10;
  @media (min-width: 660px) {
    width: 100%;
  }
  &:hover {
    border: 2px solid var(--box-border-hover);
    transition: border 0.5s;
  }
  /* border: 4px solid var(--accent); */
`;

export const ExcerptContainer = styled.p`
  font-weight: 100;
  margin: 0.5rem 0 0.5rem 0;
  color: var(--fg);
  font-size: medium;
  @media (min-width: 660px) {
    font-size: medium;
    /* color: red; */
  }
`;

export const CardTitle = styled.h1`
  line-height: 0.95;
  font-size: large;
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
