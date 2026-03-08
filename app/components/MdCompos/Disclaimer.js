"use client";
import { RiAlarmWarningFill } from "react-icons/ri";
import styled from "styled-components";

const DisclaimerTitle = styled.h2`
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
    font-size: x-small;
  }
`;
const DisclaimerIcon = styled.div`
  svg {
    color: var(--warning);
    font-size: 2em;
  }
`;

const DisclaimerBody = styled.div`
  padding: 5px 5px;
  strong {
    color: var(--accent);
  }
`;
const DisclaimerText = styled.div`
  padding: 5px 0;
  font-size: 0.9rem;
  color: var(--accent);
`;
const BulletList = styled.ol`
  margin-top: 0.75rem;
  margin-bottom: 0;
  padding-left: 1.5rem;
  color: var(--accent); /* Gris un poco más suave para la lista */
`;

const ListItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.4rem;

  /* Quita el margen inferior del último elemento para que quede prolijo */
  &:last-child {
    margin-bottom: 0;
  }
`;
const Disclaimer = ({ body, list }) => {
  return (
    <DisclaimerContainer>
      <DisclaimerIcon>
        <RiAlarmWarningFill />
      </DisclaimerIcon>
      <DisclaimerBody>
        <DisclaimerTitle>Disclaimer:</DisclaimerTitle>
        <DisclaimerText>{body && <p>{body}</p>}</DisclaimerText>
        {list && list.length > 0 && (
          <BulletList>
            {list.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </BulletList>
        )}
      </DisclaimerBody>
    </DisclaimerContainer>
  );
};

export default Disclaimer;
