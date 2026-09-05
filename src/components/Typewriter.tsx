"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, speed = 100, delay = 0, className }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      let i = 0;
      timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block w-[3px] h-[1em] bg-accent ml-0.5 align-middle ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "opacity 0.1s" }}
      />
    </span>
  );
}
