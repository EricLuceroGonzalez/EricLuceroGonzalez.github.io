"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const VideoContainer = styled.figure`
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledVideo = styled.video`
  width: 100%;
  border-radius: 12px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid ${(props) => props.theme.borderColor || "#e2e8f0"};
  background-color: #000; /* Evita parpadeo blanco antes de cargar */
`;

const Caption = styled.figcaption`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
  text-align: center;
`;

const LazyManim = ({ publicId, caption }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target); // Dejar de observar una vez cargado
        }
      },
      { rootMargin: "200px" }, // Empieza a cargar 200px antes de llegar a él
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const cleanPublicId = publicId.replace(/\.(mp4|mov|avi|webm)$/i, "");

  //   const videoUrl = `https://res.cloudinary.com/dcvnw6hvt/video/upload/f_auto,q_auto/${cleanPublicId}.mp4`;
  //   const posterUrl = `https://res.cloudinary.com/dcvnw6hvt/video/upload/f_auto,q_auto/${cleanPublicId}.jpg`;
  const videoUrl = `https://res.cloudinary.com/dcvnw6hvt/video/upload/f_auto,q_auto,w_800,vc_auto/${cleanPublicId}.mp4`;
  const posterUrl = `https://res.cloudinary.com/dcvnw6hvt/video/upload/w_800,f_auto,q_auto,fl_lossy/${cleanPublicId}.jpg`;

  //   console.log("Clean Public ID:", cleanPublicId);
  // console.log("Video URL:", videoUrl);
  //   console.log("Poster URL:", posterUrl);

  return (
    <VideoContainer ref={videoRef}>
      {isIntersecting ? (
        <StyledVideo
          // controls
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterUrl}
          key={posterUrl}
          aria-label={caption || "Video animation"}
          // onLoadedData={() => console.log("Video loaded successfully")}
          // onCanPlay={() => console.log("Video can play")}
          //   onError={(e) => console.error("Video error:", e)}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta video.
        </StyledVideo>
      ) : (
        /* Placeholder con la misma relación de aspecto para evitar Layout Shift */
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "#f1f5f9",
            borderRadius: "12px",
          }}
        />
      )}
      {caption && <Caption>{caption}</Caption>}
    </VideoContainer>
  );
};

export default LazyManim;
