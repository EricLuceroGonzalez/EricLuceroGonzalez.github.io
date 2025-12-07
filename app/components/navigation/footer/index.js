"use client";

import { useTranslations } from "next-intl";
// import Link from "next/link";
import React from "react";
import { Link } from "@/i18n/navigation";
import { FaCreativeCommons, FaInfoCircle, FaReact } from "react-icons/fa";
import styled from "styled-components";
import { SiI18Next, SiNextdotjs } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const FooterContainer = styled.footer`
  /* width: 100%; */
  padding: 1rem;
  background-color: var(--fg);
  color: var(--bg);
  position: relative;
  bottom: 0;
  flex-shrink: 0;
  font-size: small;
`;
const FooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 660px) {
    flex-direction: column;
    margin-top: 2rem;
  }
`;

const FooterLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const FooterTextBox = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
`;
const FooterText = styled.p`
  font-size: smaller;
  /* border: 1px solid red; */
`;
const FoooterLink = styled.a`
  padding: 2px 5px;
  margin: 0 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.3s ease;
  color: var(--fg);

  svg {
    width: 18px;
    height: 18px;
    fill: var(--bg); // Color inicial del SVG
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: var(--primary-btn-bg); // Color del SVG al hacer hover
  }
`;

const FooterLink = styled(Link)`
  font-size: x-small;
  &:hover {
    color: var(--accent);
  }
`;
const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <FooterContainer>
      <FooterLinks>
        <FoooterLink
          href="https://github.com/EricLuceroGonzalez"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
          </svg>
        </FoooterLink>
        <FoooterLink href="https://www.linkedin.com/in/ericlucerog/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="18"
            height="18"
          >
            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
          </svg>
        </FoooterLink>
        <FoooterLink href="mailto:ericlucerogonzalez@gmail.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="18"
            height="18"
          >
            <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
          </svg>
        </FoooterLink>
        <FoooterLink href="https://www.instagram.com/ericlucerog/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="18"
            height="18"
          >
            <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
          </svg>
        </FoooterLink>
      </FooterLinks>
      <FooterIcons>
        <FooterTextBox>
          <FooterText>
            &copy; {new Date().getFullYear()} Eric Lucero González.
          </FooterText>
          {/* <FooterText>All Rights Reserved</FooterText> */}
          <FooterText style={{ marginTop: "1rem" }}>
            {t("made_with")}{" "}
          </FooterText>
          <FooterText style={{ fontSize: "large" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="16"
              height="16"
              fill="var(--accent)"
            >
              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
            </svg>{" "}
            <IoLogoJavascript /> <FaReact /> <SiNextdotjs /> <SiI18Next />
          </FooterText>
        </FooterTextBox>
        <FooterTextBox>
          <FooterLink href={`/about/this_page`}>
            <FaInfoCircle />
            {t("about_page")}
          </FooterLink>
          <FooterLink href={"/about/license"}>
            <FaCreativeCommons /> {t("licenses")}
          </FooterLink>
        </FooterTextBox>
      </FooterIcons>
    </FooterContainer>
  );
};

export default Footer;
