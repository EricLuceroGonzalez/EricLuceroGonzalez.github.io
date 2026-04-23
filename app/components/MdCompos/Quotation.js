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
    font-size: var(--text-small);
    padding: 0.5rem 1rem;
  }
`;

const QuoteText = styled.div`
  line-height: 1.5;
  font-size: var(--text-base);
  @media (max-width: 660px) {
    font-size: var(--text-small);
    margin: 5px auto;
  }
  /* border: 2px solid red; */
`;

export const QuoteLeftIcon = styled.div`
  font-size: var(--text-base);
  color: var(--accent);
  text-align: left;
  margin-bottom: -0.7rem;
`;

export const QuoteRightIcon = styled.div`
  font-size: var(--text-base);
  color: var(--accent);
  text-align: right;
  margin-top: -1.25rem;
`;

const AuthorContainer = styled.div`
  margin-top: -0.5rem;
  text-align: right;
  font-weight: bold;
  font-size: var(--text-base);
`;

const SourceContainer = styled.div`
  text-align: right;
  font-size: var(--text-small);
`;

export const QuotationAndAuthor = ({ quote, author, source }) => {
  return (
    <QuoteBack>
      <QuoteLeftIcon>
        <BiSolidQuoteLeft />
      </QuoteLeftIcon>
      <QuoteText>{quote}</QuoteText>
      <QuoteRightIcon>
        <BiSolidQuoteRight />
      </QuoteRightIcon>
      {author && <AuthorContainer>— {author}</AuthorContainer>}
      {source && <SourceContainer> {source}</SourceContainer>}
    </QuoteBack>
  );
};
