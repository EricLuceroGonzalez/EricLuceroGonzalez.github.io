"use client";
import { RiAlarmWarningFill } from "react-icons/ri";
import styled from "styled-components";

const DisclaimerTitle = styled.h2`
  display: flex;
  flex-direction: row;
  color: var(--accent);
`;
const DisclaimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;
  margin: 1rem auto;
  border: 2px solid var(--accent);
  background-color: var(--accent-transparent);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  @media (max-width: 660px) {
    padding: 1rem 0.25rem;
    font-size: var(--text-very-small);
  }
`;
const DisclaimerIcon = styled.div`
  svg {
    color: var(--warning);
    font-size: 2rem;
  }
`;

const DisclaimerBody = styled.div`
  padding: 0.15rem 0;
  strong {
    color: var(--accent);
  }
`;
const DisclaimerText = styled.div`
  padding: 5px 0;
  font-size: var(--text-small);
  color: var(--accent);
`;
const BulletList = styled.ol`
  margin-top: 0.75rem;
  margin-bottom: 0;
  padding-left: 1.5rem;
  color: var(--accent);
`;

const ListItem = styled.li`
  font-size: var(--text-small);
  line-height: 1.5;
  margin-bottom: 0.4rem;

  /* Quita el margen inferior del último elemento para que quede prolijo */
  &:last-child {
    margin-bottom: 0;
  }
`;
const StyledContent = styled.div`
  /* Apuntamos a la lista desordenada que genera MDX */
  ul {
    list-style-type: none; /* Quitamos los puntos negros aburridos por defecto */
    padding-left: 0;
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: var(--text-small);
  }

  /* Apuntamos a cada elemento de la lista */
  li {
    position: relative;
    padding-left: 1.8rem;
    margin-bottom: 0.8rem;
    color: var(--fg);
    line-height: 1.5;
    color: var(--accent);

    font-size: var(--text-small);
  }

  /* Le ponemos un icono personalizado (puedes cambiar el emoji por lo que quieras) */
  li::before {
    content: "👉"; /* También puede ser un "👉", un "check", o un punto de color */
    position: absolute;
    left: 0;
    top: 2px;
  }
`;
const Disclaimer = ({ body, children }) => {
  return (
    <DisclaimerContainer>
      <DisclaimerBody>
        <DisclaimerTitle>
          <DisclaimerIcon>
            <RiAlarmWarningFill />
          </DisclaimerIcon>
          Disclaimer:
        </DisclaimerTitle>
        <DisclaimerText>{body && <p>{body}</p>}</DisclaimerText>
        <StyledContent>{children}</StyledContent>
      </DisclaimerBody>
    </DisclaimerContainer>
  );
};

export default Disclaimer;
