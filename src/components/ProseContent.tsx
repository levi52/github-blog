"use client";

import { useEffect, useRef } from "react";
import ImageLightbox from "./ImageLightbox";

interface ProseContentProps {
  html: string;
}

export default function ProseContent({ html }: ProseContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const images = contentRef.current.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";

      const wrapper = document.createElement("div");
      wrapper.className = "my-6";

      const root = document.createElement("div");
      wrapper.appendChild(root);

      img.parentNode?.insertBefore(wrapper, img);
      img.remove();

      const { createRoot } = require("react-dom/client");
      const reactRoot = createRoot(root);
      reactRoot.render(<ImageLightbox src={src} alt={alt} />);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none
        prose-headings:tracking-tight prose-headings:font-semibold
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-text-secondary prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text
        prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']
        prose-pre:bg-bg prose-pre:border prose-pre:border-border prose-pre:rounded-xl
        prose-li:text-text-secondary
        prose-blockquote:border-accent/30 prose-blockquote:text-text-muted"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
