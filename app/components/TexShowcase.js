"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styled from "styled-components";
import { LuCopy, LuCopyCheck, LuFileText, LuFileOutput } from "react-icons/lu";

const PDFViewer = lazy(() => import("./PDFViewer"));

/* ── Layout ──────────────────────────────────────────────── */

const Wrapper = styled.div`
  margin: 2rem 0;
  border: 1px solid var(--border, rgba(128, 128, 128, 0.25));
  border-radius: 10px;
  overflow: hidden;
`;

const ShowcaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background: var(--code-box-bg, #1a1a2e);
  border-bottom: 1px solid var(--border, rgba(128, 128, 128, 0.25));
  gap: 1rem;
  flex-wrap: wrap;
`;

const ShowcaseTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  font-family: monospace;
`;

/* Mobile tab bar */
const TabBar = styled.div`
  display: flex;
  gap: 0.4rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--accent)" : "rgba(128,128,128,0.3)"};
  background: ${({ $active }) =>
    $active ? "rgba(var(--accent-rgb,100,200,200),0.15)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--accent)" : "var(--fg)")};
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s ease;
`;

/* Split grid */
const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 420px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Panel = styled.div`
  position: relative;
  overflow: auto;
  max-height: 600px;
  border-right: 1px solid var(--border, rgba(128, 128, 128, 0.2));

  &:last-child {
    border-right: none;
  }

  /* mobile: hide inactive panel */
  @media (max-width: 767px) {
    display: ${({ $hidden }) => ($hidden ? "none" : "block")};
  }
`;

const PanelLabel = styled.div`
  position: sticky;
  top: 0;
  padding: 0.3rem 0.8rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--code-box-bg, #1a1a2e);
  color: var(--fg-muted, #888);
  border-bottom: 1px solid var(--border, rgba(128, 128, 128, 0.2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

/* Copy button */
const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $copied }) =>
    $copied ? "rgba(46,204,113,0.2)" : "rgba(255,255,255,0.1)"};
  color: ${({ $copied }) => ($copied ? "#2ecc71" : "var(--accent)")};
  border: 1px solid
    ${({ $copied }) => ($copied ? "#2ecc71" : "transparent")};
  border-radius: 4px;
  padding: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 28px;
  min-height: 28px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PDFWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  background: var(--bg-alt, #f5f5f5);
  min-height: 400px;
`;

const LoadingMsg = styled.p`
  padding: 2rem;
  color: var(--fg-muted, #888);
  font-size: 0.9rem;
`;

/* ── Component ───────────────────────────────────────────── */

export default function TexShowcase({ texSource, compiledPdf, title }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(Boolean(texSource));
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("source");

  useEffect(() => {
    if (!texSource) return;
    fetch(texSource)
      .then((r) => r.text())
      .then((text) => {
        setCode(text);
        setLoading(false);
      })
      .catch(() => {
        setCode("% Error loading .tex source");
        setLoading(false);
      });
  }, [texSource]);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <Wrapper>
      <ShowcaseHeader>
        <ShowcaseTitle>{title || (texSource ? texSource.split("/").pop() : "LaTeX Showcase")}</ShowcaseTitle>
        <TabBar>
          <Tab $active={activeTab === "source"} onClick={() => setActiveTab("source")}>
            <LuFileText /> .tex
          </Tab>
          <Tab $active={activeTab === "pdf"} onClick={() => setActiveTab("pdf")}>
            <LuFileOutput /> .pdf
          </Tab>
        </TabBar>
      </ShowcaseHeader>

      <PanelGrid>
        {/* ── Left: .tex source ── */}
        <Panel $hidden={activeTab !== "source"}>
          <PanelLabel>
            <span>Documento .tex</span>
            <CopyBtn
              onClick={handleCopy}
              $copied={copied}
              aria-label={copied ? "Copied" : "Copy source"}
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? <LuCopyCheck /> : <LuCopy />}
            </CopyBtn>
          </PanelLabel>
          {loading ? (
            <LoadingMsg>Loading source…</LoadingMsg>
          ) : (
            <SyntaxHighlighter
              language="latex"
              style={tomorrowNightBright}
              wrapLines
              showLineNumbers
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.82rem",
                lineHeight: "1.55",
                backgroundColor: "transparent",
                minHeight: "360px",
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}
        </Panel>

        {/* ── Right: compiled PDF ── */}
        <Panel $hidden={activeTab !== "pdf"}>
          <PanelLabel>PDF compilado</PanelLabel>
          <PDFWrapper>
            {compiledPdf ? (
              <Suspense fallback={<LoadingMsg>Cargando PDF viewer…</LoadingMsg>}>
                <PDFViewer url={compiledPdf} />
              </Suspense>
            ) : (
              <LoadingMsg>No PDF provided.</LoadingMsg>
            )}
          </PDFWrapper>
        </Panel>
      </PanelGrid>
    </Wrapper>
  );
}
