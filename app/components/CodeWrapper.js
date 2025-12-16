"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import styled from "styled-components";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Toolbar = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  z-index: 1;
`;

const LanguageBadge = styled.span`
  background: var(--primary-btn-bg);
  color: var(--primary-btn-fg);
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: smaller;
  font-weight: bold;
  text-transform: uppercase;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${($props) =>
    $props.$isCopy ? "rgba(46, 204, 113, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  color: ${($props) => ($props.$isCopy ? "#2ecc71" : "var(--accent)")};
  border: 1px solid ${($props) => ($props.$isCopy ? "#2ecc71" : "transparent")};
  border-radius: 4px;
  padding: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 28px;
  min-height: 28px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 seconds
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <CodeBlockWrapper>
      <Toolbar>
        {language && <LanguageBadge>{language}</LanguageBadge>}
        <CopyButton
          onClick={handleCopy}
          $isCopy={copied}
          aria-label={copied ? "Copiado" : "Copiar código"}
          title={copied ? "Copiado!" : "Copiar"}
        >
          {copied ? <LuCopyCheck /> : <LuCopy />}
        </CopyButton>
      </Toolbar>
      <SyntaxHighlighter
        language={language}
        style={tomorrowNightBright}
        wrapLines={true}
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          padding: "2.5rem 1rem 1rem 1rem", // Padding top extra para la toolbar
          fontSize: "0.9rem",
          lineHeight: "1.5",
          backgroundColor: "transparent", // Usamos el background del wrapper
        }}
      >
        {value}
      </SyntaxHighlighter>
    </CodeBlockWrapper>
  );
};

export default CodeBlock;
