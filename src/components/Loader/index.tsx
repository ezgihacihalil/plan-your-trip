import React from "react";
import css from "./style.module.css";

interface LoaderProps {
  color?: string;
  duration?: number;
  size?: number;
  text?: string;
}

function Loader({
  color = "#636363",
  duration = 1,
  size = 16,
  text,
}: LoaderProps) {
  const lines = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div
      className={css.container}
      data-testid="loader"
      style={
        {
          "--size": `${size}px`,
          "--color": color,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div className={css.innerContainer} role="status" aria-label="loading">
        {lines.map((line) => (
          <div
            key={line}
            className={css.line}
            style={{
              animationDelay: `-${line * (duration / 8)}s`,
              transform: `rotate(-${line * 45}deg)`,
            }}
          />
        ))}
      </div>
      {text && <span className={css.text}>{text}</span>}
    </div>
  );
}

export default Loader;
