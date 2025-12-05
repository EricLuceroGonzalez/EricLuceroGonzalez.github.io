"use client";
import { useState } from "react";

function CodeCopyBtn({ children }) {
  const [copyOk, setCopyOk] = useState(false);

  // const iconColor = copyOk ? '#0af20a' : '#ddd';
  // const icon = copyOk ? 'fa-check-square' : 'fa-copy';

  const handleClick = (e) => {
    navigator.clipboard.writeText(children[0].props.children[0]);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    // className="code-copy-btn"
    <div>
      <i
        // className={`fas ${icon}`}
        onClick={handleClick}
        // style={{color: iconColor}}
      />
    </div>
  );
}
export default CodeCopyBtn;
