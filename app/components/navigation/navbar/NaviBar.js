"use client";
import React, { useEffect } from "react";
import { Bar, MainNav, MainNavLogo, NavLogo } from "./navCompos";
import ThemeSwitcher from "../../../themes/ThemeSwitcher.js";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import StyledLink from "./StyledLink";

const NaviBar = () => {
  const path = usePathname();
  const primaryPath = "/" + path.split("/")[1];
  const t = useTranslations("Navigation");

  return (
    <Bar>
      <MainNavLogo>
        <StyledLink actualPath={primaryPath} pathName={"/"} href={"/"}>
          Eric Lucero
        </StyledLink>
      </MainNavLogo>
      <MainNav display={"flex"}>
        <StyledLink actualPath={primaryPath} pathName={"/blog"} href={"/blog"}>
          Blog
        </StyledLink>
        <StyledLink
          actualPath={primaryPath}
          pathName={"/latex"}
          href={"/latex"}
        >
          LaTeX
        </StyledLink>
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
