"use client";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import styled from "styled-components";

const QuoteBack = styled.div`
  background-color: var(--quote-bg);
  color: var(--quote-fg);
  padding: 1.5rem 2rem;
  margin: 1rem auto;
  border-left: 5px solid var(--accent);
  border-radius: 8px;
  font-style: italic;
  display: flex;
  flex-direction: column;
  @media (max-width: 660px) {
    font-size: 0.8em;
    padding: 0.5rem 1rem;
  }
`;

const QuoteText = styled.div`
  font-size: 1.3em;
  line-height: 1.5;
  @media (max-width: 660px) {
    font-size: 0.8em;
    margin: 5px auto;
  }
`;

const QuoteLeftIcon = styled.div`
  font-size: 2.5em;
  color: var(--accent);
  text-align: left;
  margin-bottom: -1rem;
`;

const QuoteRightIcon = styled.div`
  font-size: 2.5em;
  color: var(--accent);
  text-align: right;
  margin-top: -1rem;
`;

const AuthorContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
  font-weight: bold;
  font-size: 1em;
`;

const SourceContainer = styled.div`
  text-align: right;
  font-size: 1em;
`;

export const QuotationAndAuthor = ({ quotation }) => {
  return (
    <QuoteBack>
      <QuoteLeftIcon>
        <BiSolidQuoteLeft />
      </QuoteLeftIcon>
      <QuoteText>{quotation.quote}</QuoteText>
      <QuoteRightIcon>
        <BiSolidQuoteRight />
      </QuoteRightIcon>
      {quotation.author && (
        <AuthorContainer>— {quotation.author}</AuthorContainer>
      )}
      {quotation.source && (
        <SourceContainer> {quotation.source}</SourceContainer>
      )}
    </QuoteBack>
  );
};
