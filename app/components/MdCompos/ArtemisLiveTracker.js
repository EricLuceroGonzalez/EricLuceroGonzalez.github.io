"use client";

import React, { useState, useEffect, useRef } from "react";
import { MainBg } from "../../ui/ComponentsStyled";
import { Layout } from "../../ui/BasicDivs";
import ShowPath from "../../components/showPath";
import LikeButton from "../../components/Likes";

import styled, { keyframes } from "styled-components";
import { useTranslations, useLocale } from "next-intl";
import { missionEvents } from "../../components/MdCompos/ArtemisEvents";
import NasaLiveUpdate from "../../components/MdCompos/NasaLiveUpdate";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  padding: 24px;
  border: 1px solid #2a2a35;
  border-radius: 12px;
  max-width: 600px;
  margin: 32px auto;
  font-family: "Inter", system-ui, sans-serif;
  background-color: #13131a;
  color: #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  overflow-y: auto; /* Útil si la pantalla completa es muy pequeña */

  /* Estilos específicos cuando el componente está en pantalla completa */
  &:fullscreen {
    max-width: 100vw;
    height: 100vh;
    margin: 0;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ControlsContainer = styled.div`
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2d3748;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h3`
  margin: 0;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TopTools = styled.div`
  display: flex;
  gap: 8px;
`;

const ToolButton = styled.button`
  background-color: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: var(--text-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #1e293b;
    color: #f8fafc;
  }
`;

const InputGroup = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-size: var(--text-h3);
  display: block;
  /* margin-bottom: 6px; */
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  width: 100%;
  background-color: #1e293b;
  color: #f8fafc;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  color-scheme: dark;
`;

const Display = styled.div`
  text-align: center;
  padding: 24px 20px;
  background: linear-gradient(145deg, #0f172a, #1e293b);
  /* border-radius: 10px; */
  border: 1px solid #334155;
  position: relative;
  overflow: hidden;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #1e293b;
  position: absolute;
  top: 0;
  left: 0;
  /* border: 2px solid red; */
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #38bdf8;
  width: ${(props) => props.$progress}%;
  transition: width 1s linear;
  box-shadow: 0 0 10px #38bdf8;
`;

const TimeHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

const LiveDot = styled.span`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.$isPre ? "#f59e0b" : "#ef4444")};
  border-radius: 50%;
  display: inline-block;
  animation: ${blink} 1.5s infinite ease-in-out;
`;

const Clock = styled.h2`
  margin: 0;
  font-family: "JetBrains Mono", monospace;
  color: ${(props) => (props.$isPre ? "#fcd34d" : "#38bdf8")};
`;

const EventCard = styled.div`
  background-color: #0f172a;
  padding: 18px;
  border-radius: 8px;
  text-align: left;
  border-left: 4px solid
    ${(props) => (props.$isRoutine ? "#64748b" : "#3b82f6")};
  margin-top: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CardBadge = styled.span`
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
`;

const EventTitle = styled.h3`
  margin: 0 0 8px 0;
  color: ${(props) => (props.$isRoutine ? "#cbd5e1" : "#f1f5f9")};
`;

const EventDesc = styled.p`
  margin: 0;
  font-size: var(--text-base);
  color: #94a3b8;
  line-height: 1.6;
`;

const TelemetryBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #1e293b;
`;

const TechBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: var(--text-base);
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: ${(props) =>
    props.$type === "phase"
      ? "rgba(59, 130, 246, 0.15)"
      : "rgba(16, 185, 129, 0.15)"};
  color: ${(props) => (props.$type === "phase" ? "#60a5fa" : "#34d399")};
  border: 1px solid
    ${(props) =>
      props.$type === "phase"
        ? "rgba(59, 130, 246, 0.3)"
        : "rgba(16, 185, 129, 0.3)"};
`;

const NextEvent = styled.div`
  margin-top: 20px;
  font-size: var(--text-base);
  color: #94a3b8;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 6px;
  border: 1px dashed #334155;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.$primary ? "#2563eb" : "#334155")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: var(--text-base);
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => (props.$primary ? "#1d4ed8" : "#475569")};
  }
`;

const FooterSection = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #1e293b;
  text-align: left;
`;

const DefinitionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DefinitionItem = styled.div`
  background-color: rgba(15, 23, 42, 0.5);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #334155;

  strong {
    display: block;
    color: #f1f5f9;
    font-size: var(--text-base);
    margin-bottom: 4px;
  }
  span {
    color: #94a3b8;
    font-size: var(--text-base);
    line-height: 1.4;
    display: block;
  }
`;

const SourceLink = styled.a`
  display: block;
  font-size: var(--text-base);
  color: #64748b;
  text-decoration: none;
  text-align: center;
  transition: color 0.2s;
  &:hover {
    color: #38bdf8;
    text-decoration: underline;
  }
`;

const FeedbackSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px dashed #334155;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const FeedbackText = styled.p`
  font-size: var(--text-base);
  color: #94a3b8;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
`;
const TimeInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* gap: 12px; */
  /* margin-top: 2px; */
  padding: 10px;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
  border: 1px solid #334155;
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TimeLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

const LabelSmall = styled.span`
  font-size: var(--text-small);
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const DisplayValue = styled.span`
  font-size: var(--text-base);
  color: #f1f5f9;
  font-family: "JetBrains Mono", monospace;
`;
export default function ArtemisLiveTracker() {
  const t = useTranslations("ArtemisTracker");
  const locale = useLocale();
  const trackerRef = useRef(null); // Ref para la pantalla completa

  const [launchTime, setLaunchTime] = useState(() => {
    const officialLaunchUTC = new Date("2026-04-01T22:35:12Z");
    const tzOffset = officialLaunchUTC.getTimezoneOffset() * 60000;
    const localLaunchTime = new Date(officialLaunchUTC.getTime() - tzOffset);
    return localLaunchTime.toISOString().slice(0, 19);
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  const eventsWithMs = missionEvents
    .map((ev) => ({
      ...ev,
      metMs:
        ev.days * 24 * 60 * 60 * 1000 +
        ev.hours * 60 * 60 * 1000 +
        ev.minutes * 60 * 1000,
    }))
    .sort((a, b) => a.metMs - b.metMs);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const launchDate = new Date(launchTime);
  const elapsedMs = currentTime.getTime() - launchDate.getTime();

  const isBeforeFirstEvent = elapsedMs < eventsWithMs[0].metMs;
  // Duración total desde T-0 hasta el Amerizaje final
  const totalMissionMs = eventsWithMs[eventsWithMs.length - 1].metMs;
  const isEnded = elapsedMs >= totalMissionMs + 60 * 60 * 1000;

  // Calcular porcentaje de progreso (limitado entre 0 y 100)
  const progressPercentage = Math.max(
    0,
    Math.min(100, (elapsedMs / totalMissionMs) * 100),
  );

  let currentEvent = null;
  let nextEvent = null;

  if (!isBeforeFirstEvent && !isEnded) {
    const pastOrCurrentEvents = eventsWithMs.filter(
      (ev) => ev.metMs <= elapsedMs,
    );
    currentEvent =
      pastOrCurrentEvents[pastOrCurrentEvents.length - 1] || eventsWithMs[0];
    nextEvent = eventsWithMs.find((ev) => ev.metMs > elapsedMs);
  } else if (isBeforeFirstEvent) {
    nextEvent = eventsWithMs[0];
  }

  // Formato para Hora Local (detecta automáticamente el idioma del navegador)
  const localDisplay = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(launchDate);

  // Formato para Hora UTC (estilo militar/aeroespacial)
  const utcDisplay = launchDate
    .toISOString()
    .replace("T", " ")
    .replace(/\..+/, "");

  const formatMET = (ms) => {
    const isNeg = ms < 0;
    const absMs = Math.abs(ms);
    const d = Math.floor(absMs / (1000 * 60 * 60 * 24));
    const h = Math.floor((absMs / (1000 * 60 * 60)) % 24);
    const m = Math.floor((absMs / 1000 / 60) % 60);
    const s = Math.floor((absMs / 1000) % 60);
    const dayStr = isNeg && d === 0 ? "" : `${d}d `;
    return `${isNeg ? "T- " : "MET "}${dayStr}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Generador de enlace para Google Calendar
  const openGoogleCalendar = () => {
    if (!nextEvent) return;
    const startDate = new Date(launchDate.getTime() + nextEvent.metMs);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Duración estimada 1 hora
    const startStr = formatIcsDate(startDate);
    const endStr = formatIcsDate(endDate);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startStr}/${endStr}&text=${encodeURIComponent(nextEvent.title)}&details=${encodeURIComponent(nextEvent.desc)}`;
    window.open(googleCalUrl, "_blank");
  };

  const downloadNextEventIcs = () => {
    if (!nextEvent) return;
    const startDate = new Date(launchDate.getTime() + nextEvent.metMs);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Artemis Live Tracker//ES\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nBEGIN:VEVENT\r\nSUMMARY:${nextEvent.title}\r\nDTSTART:${formatIcsDate(startDate)}\r\nDTEND:${formatIcsDate(endDate)}\r\nDESCRIPTION:${nextEvent.desc} (${t("phase")}: ${nextEvent.phase}, ${t("attitude")}: ${nextEvent.attitude})\r\nEND:VEVENT\r\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Artemis_${nextEvent.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadAllEventsIcs = () => {
    // 1. Cabecera del archivo iCalendar
    const calendarHeader = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Artemis Live Tracker//Mission Timeline//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    // 2. Generar cada evento (VEVENT)
    const vevents = eventsWithMs.map((event) => {
      const startDate = new Date(launchDate.getTime() + event.metMs);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Duración estándar de 1 hora

      const title =
        locale === "en" && event.titleEn ? event.titleEn : event.title;
      // Limpiamos los saltos de línea para el formato .ics
      const desc = (
        locale === "en" && event.descEn ? event.descEn : event.desc
      ).replace(/\n/g, "\\n");

      return [
        "BEGIN:VEVENT",
        `SUMMARY:${title}`,
        `DTSTART:${formatIcsDate(startDate)}`,
        `DTEND:${formatIcsDate(endDate)}`,
        `DESCRIPTION:${desc} (Phase: ${event.phase}, Attitude: ${event.attitude})`,
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "END:VEVENT",
      ].join("\r\n");
    });

    // 3. Unir todo
    const icsContent = [...calendarHeader, ...vevents, "END:VCALENDAR"].join(
      "\r\n",
    );

    // 4. Disparar descarga
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Artemis_II_Full_Mission_Timeline.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Pantalla Completa
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      if (trackerRef.current?.requestFullscreen) {
        await trackerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  // Compartir (Web Share API)
  const handleShare = async () => {
    const shareData = {
      title: t("title"),
      text: t("shareText"),
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      // Fallback para escritorio sin soporte nativo
      navigator.clipboard.writeText(window.location.href);
      alert(t("copiedText"));
    }
  };

  const renderTitle = (event) =>
    locale === "en" && event.titleEn ? event.titleEn : event.title;
  const renderDesc = (event) =>
    locale === "en" && event.descEn ? event.descEn : event.desc;
  const getBadgeText = (isPre, isRoutine) => {
    if (isPre) return t("badgePrelaunch");
    return isRoutine ? t("badgeRoutine") : t("badgeFlight");
  };

  return (
    <Container ref={trackerRef}>
      <ControlsContainer>
        <HeaderTop>
          <Title>{t("title")}</Title>
          <TopTools>
            <ToolButton
              onClick={handleShare}
              aria-label={t("btnShare")}
              title={t("btnShare")}
            >
              📤
            </ToolButton>
            <ToolButton
              onClick={toggleFullScreen}
              aria-label={t("btnFullscreen")}
              title={t("btnFullscreen")}
            >
              ⛶
            </ToolButton>
          </TopTools>
        </HeaderTop>

        {/* <InputGroup>
          <Label>{t("launchTimeLabel")}</Label>
          <Input
            type="datetime-local"
            value={launchTime}
            onChange={(e) => setLaunchTime(e.target.value)}
            />
        </InputGroup> */}
        <Label>{t("launchTimeLabel")}</Label>
        <TimeInfoGrid>
          <TimeLabelGroup>
            <LabelSmall>Local Time</LabelSmall>
            <DisplayValue>{localDisplay}</DisplayValue>
          </TimeLabelGroup>

          <TimeLabelGroup>
            <LabelSmall>Universal Time (UTC)</LabelSmall>
            <DisplayValue>{utcDisplay}</DisplayValue>
          </TimeLabelGroup>
        </TimeInfoGrid>
      </ControlsContainer>

      <Display>
        {/* <ProgressBarContainer>
          <ProgressBarFill $progress={progressPercentage} />
        </ProgressBarContainer> */}

        <TimeHeader>
          {!isBeforeFirstEvent && !isEnded && (
            <LiveDot $isPre={elapsedMs < 0} title={t("missionActive")} />
          )}
          <Clock $isPre={elapsedMs < 0}>{formatMET(elapsedMs)}</Clock>
        </TimeHeader>

        {isBeforeFirstEvent && (
          <EventCard $isRoutine={false} style={{ borderLeftColor: "#f59e0b" }}>
            <EventTitle style={{ color: "#fcd34d" }}>
              {t("inactiveTitle")}
            </EventTitle>
            <EventDesc>{t("inactiveDesc")}</EventDesc>
          </EventCard>
        )}

        {isEnded && (
          <EventCard $isRoutine={false} style={{ borderLeftColor: "#10b981" }}>
            <EventTitle style={{ color: "#6ee7b7" }}>
              {t("endedTitle")}
            </EventTitle>
            <EventDesc>{t("endedDesc")}</EventDesc>
          </EventCard>
        )}

        {!isBeforeFirstEvent && !isEnded && currentEvent && (
          <EventCard
            $isRoutine={currentEvent.isRoutine}
            style={{ borderLeftColor: elapsedMs < 0 ? "#f59e0b" : "" }}
          >
            <CardHeader>
              <CardBadge>
                {getBadgeText(elapsedMs < 0, currentEvent.isRoutine)}
              </CardBadge>
            </CardHeader>
            <EventTitle
              $isRoutine={currentEvent.isRoutine}
              style={{ color: elapsedMs < 0 ? "#fcd34d" : "" }}
            >
              {renderTitle(currentEvent)}
            </EventTitle>
            <EventDesc>{renderDesc(currentEvent)}</EventDesc>

            <TelemetryBadges>
              <TechBadge $type="phase">
                {t("phase")}: {currentEvent.phase}
              </TechBadge>
              <TechBadge $type="attitude">
                {t("attitude")}: {currentEvent.attitude}
              </TechBadge>
            </TelemetryBadges>
          </EventCard>
        )}

        {!isEnded && nextEvent && (
          <NextEvent>
            <strong style={{ color: "#e2e8f0" }}>{t("nextEvent")}</strong>{" "}
            {renderTitle(nextEvent)} <br />({t("startsIn")}{" "}
            {formatMET(nextEvent.metMs - elapsedMs)
              .replace("MET ", "")
              .replace("T- ", "")}
            )
            <ButtonGroup>
              <ActionButton $primary onClick={openGoogleCalendar}>
                {t("btnGoogle")}
              </ActionButton>
              <ActionButton onClick={downloadNextEventIcs}>
                {t("btnDownload")}
              </ActionButton>
              <ActionButton
                onClick={downloadAllEventsIcs}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  backgroundColor: "#1e293b",
                  border: "1px solid #3b82f6",
                }}
              >
                {t("btnDownloadAll")}
              </ActionButton>
            </ButtonGroup>
          </NextEvent>
        )}

        <FooterSection>
          <DefinitionGrid>
            <DefinitionItem>
              <strong>{t("defPhaseTitle")}</strong>
              <span>{t("defPhaseText")}</span>
            </DefinitionItem>
            <DefinitionItem>
              <strong>{t("defAttitudeTitle")}</strong>
              <span>{t("defAttitudeText")}</span>
            </DefinitionItem>
          </DefinitionGrid>
          {/* <NasaLiveUpdate /> */}

          <SourceLink
            href="https://www.nasa.gov/wp-content/uploads/2026/03/artemis-ii-overview-timeline-april-1st.pdf?emrc=bf874af"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sourceText")} Artemis II Overview Timeline - FINAL (NASA)
          </SourceLink>
        </FooterSection>
        <FeedbackSection>
          <FeedbackText>{t("feedbackText")}</FeedbackText>
          <LikeButton slug="artemis-tracker-tool" />
        </FeedbackSection>
      </Display>
    </Container>
  );
}
