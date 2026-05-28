"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

// ── Styled components ──────────────────────────────────────────────────────────

const CardWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  border: 1px solid var(--gray-light);
  border-radius: 12px;
  padding: 1.1rem 1rem;
  gap: 0.5rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

  &:hover {
    border-color: var(--box-border-hover);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 20px;
  background-color: var(--latex-green, #2b7a2f);
  color: #fff;
  width: fit-content;
`;

const ResourceTitle = styled.h3`
  font-size: var(--text-base);
  color: var(--accent);
  margin: 0;
  line-height: 1.3;
`;

const ResourceDescription = styled.p`
  font-size: var(--text-small);
  color: var(--fg);
  opacity: 0.85;
  margin: 0;
  flex: 1;
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const BaseButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.45rem 0.9rem;
  border-radius: 7px;
  font-size: var(--text-small);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
`;

const DownloadButton = styled(BaseButton)`
  background-color: var(--secondary-btn-bg);
  color: var(--secondary-btn-fg);
  border: none;

  &:hover {
    background-color: var(--accent);
    color: var(--bg);
  }
`;

const PreviewButton = styled(BaseButton)`
  background-color: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);

  &:hover {
    background-color: var(--accent);
    color: var(--bg);
  }
`;

const ComingSoonBadge = styled.span`
  font-size: 0.7rem;
  font-style: italic;
  color: var(--fg);
  opacity: 0.55;
  align-self: center;
`;

// ── Component ─────────────────────────────────────────────────────────────────

const ResourceCard = ({
  title,
  description,
  tag = "LaTeX",
  downloadUrl,
  previewUrl,
  comingSoon = false,
}) => {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tag>{tag}</Tag>
      <ResourceTitle>{title}</ResourceTitle>
      <ResourceDescription>{description}</ResourceDescription>
      <ActionRow>
        {comingSoon ? (
          <ComingSoonBadge>Coming soon…</ComingSoonBadge>
        ) : (
          <>
            {downloadUrl && (
              <DownloadButton
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↓ Download PDF
              </DownloadButton>
            )}
            {previewUrl && (
              <PreviewButton
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ Open in Overleaf
              </PreviewButton>
            )}
          </>
        )}
      </ActionRow>
    </CardWrapper>
  );
};

export default ResourceCard;
