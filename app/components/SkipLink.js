"use client";
import styled from "styled-components";

const Link = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    background: var(--bg);
    color: var(--accent);
    font-weight: 700;
    z-index: 9999;
    border: 2px solid var(--accent);
    border-radius: 4px;
    overflow: visible;
    outline: none;
  }
`;

export default function SkipLink() {
  return <Link href="#main-content">Skip to content</Link>;
}
