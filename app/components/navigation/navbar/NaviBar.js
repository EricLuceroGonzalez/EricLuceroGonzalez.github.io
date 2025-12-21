"use client";
import React, { useEffect } from "react";
import { Bar, DivLogo, MainNav, MainNavLogo, NavLogo } from "./navCompos";
import ThemeSwitcher from "../../../themes/ThemeSwitcher.js";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import StyledLink from "./StyledLink";
import Image from "next/image";
import { hover } from "motion";

const NaviBar = () => {
  const path = usePathname();
  const primaryPath = "/" + path.split("/")[1];
  const t = useTranslations("Navigation");

  return (
    <Bar>
      <MainNavLogo>
        <StyledLink actualPath={primaryPath} pathName={"/"} href={"/"}>
          <Image
            src={
              "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1765839287/elCronopio/Thumbnails/logo-ball_isbsul.png"
            }
            alt={"A ball with a color gradient, with the colors of this web"} // Texto alternativo
            width={25} // Ancho de la imagen
            height={25} // Alto de la imagen
            priority
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1000,
            }}
          />{" "}
          <DivLogo>/home</DivLogo>
        </StyledLink>
      </MainNavLogo>
      <MainNav display={"flex"}>
        <StyledLink actualPath={primaryPath} pathName={"/blog"} href={"/blog"}>
          Blog
        </StyledLink>
        {/* <StyledLink
          actualPath={primaryPath}
          pathName={"/latex"}
          href={"/latex"}
        >
          LaTeX
        </StyledLink> */}
        <StyledLink
          actualPath={primaryPath}
          pathName={"/about"}
          href={"/about"}
        >
          {t("about")}
        </StyledLink>
      </MainNav>
      {/* Contenedor para los switchers */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </Bar>
  );
};

export default NaviBar;
