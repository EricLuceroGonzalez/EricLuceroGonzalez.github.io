"use client";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

// Sidebar estilo fijo al costado
const Sidebar = styled.aside`
  min-width: 130px;
  max-width: 150px;
  background-color: var(--fg);
  color: var(--bg);
  padding: 1rem;
  border-right: 1px solid var(--primary-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-decoration: none;
  font-size: smaller;
  z-index: 190;
  border-radius: 12px 10px 0 0;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: ${(props) =>
      props.open ? "0" : "-100%"}; /* Desliza dentro y fuera */
    width: 50%; /* Ajusta el ancho del sidebar en móviles */
    height: 100vh;
    transition: left 0.4s ease;
  }
`;
const SideBarTextInstruction = styled.div`
  color: var(--quote-bg);
  font-size: x-small;
`;
// Fondo oscuro para detectar clics fuera del Sidebar
const Backdrop = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
`;
// Botón de menú hamburguesa
const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 2rem;
  cursor: pointer;
  /* border: 1px solid green; */

  @media (max-width: 768px) {
    display: block; /* Visible solo en pantallas pequeñas */
    position: absolute;
    top: 0.1rem;
    left: 1rem;
  }
`;

// Botón de cerrar dentro del Sidebar
const CloseButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent);
  cursor: pointer;
  margin-bottom: 1rem;
  text-align: end;
  @media (min-width: 768px) {
    display: none;
  }
`;
// Contenedor principal del contenido
const Content = styled.main`
  flex: 1;
  padding: 1rem;
  background: var(--bg);

  @media (max-width: 768px) {
    margin-top: 3rem; /* Espacio para el botón hamburguesa */
  }
`;
const ContentTitle = styled.div`
  text-decoration: none;
  color: var(--bg);
  padding: 3px 0;
  &:hover {
    background-color: rgba(155, 155, 155, 0.4);
    font-weight: bold;
  }
`;
export default function ResponsiveSidebar({ sidebarItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false); // Función para cerrar el Sidebar
  // console.log(sidebarItems);

  return (
    <>
      <Backdrop open={sidebarOpen} onClick={closeSidebar} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </HamburgerButton>
      <Sidebar open={sidebarOpen}>
        <CloseButton onClick={closeSidebar}>×</CloseButton>
        <h1>Contenido</h1>
        {sidebarItems.map(({ order, slug, shortTitle }) => (
          <Link key={slug} href={slug}>
            <ContentTitle>{shortTitle}</ContentTitle>
          </Link>
        ))}
      </Sidebar>
    </>
  );
}
