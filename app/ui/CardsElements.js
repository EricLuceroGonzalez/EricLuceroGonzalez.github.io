import styled from "styled-components";
import { motion } from "framer-motion";

// CardsElements.js;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.45rem 0.75rem;
  @media (max-width: 660px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  padding: 0px 3px;
  /* flex-grow: 1; */
  width: 30%;
  /* border: 2px solid red; */
`;

export const GridHeroImage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  /* height: 125px; */
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 660px) {
    display: none;
  }
  @media (min-width: 1280px) {
    width: 100%;
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
  margin: 0.5rem auto;
  background-color: var(--bg);
  padding: 2px 6px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--gray-light);
  width: 100%;
  z-index: 10;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;

  @media (min-width: 660px) {
    width: 100%;
  }
  &:hover {
    border-color: var(--box-border-hover);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px);
  }
`;

export const ExcerptContainer = styled.p`
  font-weight: 100;
  margin: 0.5rem 0 0.5rem 0;
  color: var(--fg);
  font-size: var(--text-small);
  @media (min-width: 660px) {
    /* color: red; */
  }
`;

export const CardTitle = styled.h3`
  line-height: 0.95;

  a {
    text-decoration: none;
  }
  color: var(--accent);
  text-align: left;
  padding: 12px 0;
  /* border: 2px solid red; */
`;
