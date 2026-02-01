"use client";
import { RiAlarmWarningFill } from "react-icons/ri";
import styled from "styled-components";

const DisclaimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 1rem auto;
  border: 2px solid var(--accent);
  background-color: var(--accent-transparent);
  padding: 1rem 1.5rem;
  border-radius: 8px;
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
const Disclaimer = ({ body }) => {
  return (
    <DisclaimerContainer>
      <DisclaimerIcon>
        <RiAlarmWarningFill />
      </DisclaimerIcon>
      <DisclaimerBody>
        <strong>Disclaimer:</strong>
        <DisclaimerText>{body && <p>{body}</p>}</DisclaimerText>
      </DisclaimerBody>
    </DisclaimerContainer>
  );
};

export default Disclaimer;
