// "use client";
import React, { useEffect, useRef } from "react";
import p5 from "p5";

const P5jsContainer = ({ sketch }) => {
  console.log(sketch);

  const parentRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      p5Instance.current = new p5(
        (p) => sketch(p, parentRef.current),
        parentRef.current
      );
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [sketch]);

  return <div ref={parentRef}></div>;
};

export default P5jsContainer;
