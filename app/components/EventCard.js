"use client";

import React from "react";
import styled from "styled-components";
import { useLocale } from "next-intl";
import { missionEvents } from "./MdCompos/ArtemisEvents";

const Container = styled.div`
  margin: 20px auto;
  background: var(--fg);
  border: 1px solid #1e293b;
  border-radius: 12px;
  height: 390px;
  overflow-y: auto;
  padding: 8px;

  /* Scrollbar estilo NASA */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 10px;
  }
`;

const EventItem = styled.div`
  margin: 8px;
  padding: 14px;
  background: var(--bg);
  border-left: 4px solid
    ${(props) => (props.$isRoutine ? "#475569" : "#38bdf8")};
  border-radius: 4px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  color: red;
`;

const METBadge = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: var(--text-small);
  color: var(--fg);
  /* background: var(--fg); */
  padding: 2px 6px;
`;

const LocalTimeText = styled.span`
  font-size: var(--text-small);
  color: var(--green-go);
  font-weight: 600;
`;

const EventTitle = styled.h4`
  margin: 0 0 6px 0;
  color: var(--accent);
  font-size: var(--text-base);
`;

const EventDesc = styled.p`
  font-size: var(--text-base);
  color: var(--fg);
  line-height: 1.5;
  margin: 0 0 10px 0;
`;

const Badge = styled.span`
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 6px;
  background: rgba(56, 189, 248, 0.1);
  color: var(--warning);
  border: 1px solid rgba(56, 189, 248, 0.2);
`;

// Recibimos launchTime como prop para poder calcular las fechas
export default function EventCard({ launchTime }) {
  const locale = useLocale();
  const launchDate = new Date("2026-04-01T22:35:12Z");
  //   const launchDate = new Date(launchTime);

  const eventsWithMs = missionEvents
    .map((ev) => ({
      ...ev,
      metMs:
        ev.days * 24 * 60 * 60 * 1000 +
        ev.hours * 60 * 60 * 1000 +
        ev.minutes * 60 * 1000,
    }))
    .sort((a, b) => a.metMs - b.metMs);

  const formatMET = (item) => {
    return `MET ${item.days}d ${String(item.hours).padStart(2, "0")}:${String(item.minutes).padStart(2, "0")}`;
  };

  const formatLocal = (ms) => {
    // Sumamos el tiempo transcurrido a la hora de lanzamiento
    const absoluteDate = new Date(launchDate.getTime() + ms);
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(absoluteDate);
  };

  return (
    <Container>
      {eventsWithMs.map((item) => {
        const title = locale === "en" ? item.titleEn || item.title : item.title;
        const desc = locale === "en" ? item.descEn || item.desc : item.desc;

        return (
          <EventItem
            key={`${item.metMs}-${item.title}`}
            $isRoutine={item.isRoutine}
          >
            <CardHeader>
              <METBadge>{formatMET(item)}</METBadge>
              <LocalTimeText>{formatLocal(item.metMs)}</LocalTimeText>
            </CardHeader>
            <EventTitle>{title}</EventTitle>
            <EventDesc>{desc}</EventDesc>
            <div>
              <Badge>{item.phase}</Badge>
              <Badge>{item.attitude}</Badge>
            </div>
          </EventItem>
        );
      })}
    </Container>
  );
}
