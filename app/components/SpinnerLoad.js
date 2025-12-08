"use client";
import React from "react";
import styled from "styled-components";

const SpinnerLoad = () => (
  <StyledSpinner viewBox="0 0 100 100">
    <circle
      className="path"
      cx="50"
      cy="50"
      r="30"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  z-index: 1000;
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 150px;
  height: 150px;

  & .path {
    stroke: var(--accent);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default SpinnerLoad;
