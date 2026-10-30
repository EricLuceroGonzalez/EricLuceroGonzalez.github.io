"use client";
import styled from "styled-components";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Box = styled.section`
  margin-bottom: 2.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.75rem;
  border: 1px solid var(--primary-border);
  border-radius: 18px;
  background: var(--card-bg);
`;

const Btn = styled(Link)`
  padding: 0.7rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--fg);
  color: var(--fg);
  font-weight: 700;
  font-size: var(--text-small);
  &:hover { background: var(--fg); color: var(--bg); }
`;

export default function AboutStrip({ labels, photo }) {
  return (
    <Box aria-labelledby="about-title">
      <Image src={photo} alt="" width={88} height={88} style={{ borderRadius: "50%", objectFit: "cover" }} />
      <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 id="about-title" style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800 }}>{labels.title}</h2>
        <p style={{ margin: 0, lineHeight: 1.6, color: "var(--subheading)" }}>{labels.text}</p>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Btn href="/about">{labels.about}</Btn>
        {/* <Btn href="/about#research">{labels.research}</Btn> */}
      </div>
    </Box>
  );
}