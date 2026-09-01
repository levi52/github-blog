"use client";

import { useEffect, useRef } from "react";
import ImageLightbox from "./ImageLightbox";

interface ProseContentProps {
  html: string;
}

const copyIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
const checkIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

export default function ProseContent({ html }: ProseContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const images = contentRef.current.querySelectorAll("img:not(.processed)");
    images.forEach((img) => {
      img.classList.add("processed");
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";

      const wrapper = document.createElement("div");
      wrapper.className = "my-6";

      const root = document.createElement("div");
      wrapper.appendChild(root);

      img.parentNode?.insertBefore(wrapper, img);
      img.remove();

      import("react-dom/client").then(({ createRoot }) => {
        const reactRoot = createRoot(root);
        reactRoot.render(<ImageLightbox src={src} alt={alt} />);
      });
    });

    const preBlocks = contentRef.current.querySelectorAll("pre:not(.processed)");
    preBlocks.forEach((preEl) => {
      const pre = preEl as HTMLElement;
      pre.classList.add("processed");
      const code = pre.querySelector("code");
      if (!code) return;

      const langClass = Array.from(code.classList).find((c) => c.startsWith("language-"));
      const lang = langClass ? langClass.replace("language-", "") : "";

      const wrapper = document.createElement("div");
      wrapper.style.cssText = "position:relative;border-radius:0.75rem;overflow:hidden;background:var(--bg-secondary);border:1px solid var(--border);margin:1.5rem 0;";

      if (lang) {
        const langLabel = document.createElement("div");
        langLabel.style.cssText = "position:absolute;top:0;left:0;padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);background:var(--border);border-radius:0 0 0.5rem 0;line-height:1.2;z-index:1;";
        langLabel.textContent = lang;
        wrapper.appendChild(langLabel);
      }

      const copyBtn = document.createElement("button");
      copyBtn.style.cssText = "position:absolute;top:0.5rem;right:0.5rem;padding:0.375rem;color:var(--text-muted);background:var(--surface);border:1px solid var(--border);border-radius:0.375rem;opacity:0;transition:all 0.2s ease;cursor:pointer;z-index:1;";
      copyBtn.innerHTML = copyIcon;
      copyBtn.onmouseenter = () => { copyBtn.style.opacity = "1"; };
      copyBtn.onclick = async () => {
        const text = code.textContent || "";
        const success = await copyToClipboard(text);
        if (success) {
          copyBtn.innerHTML = checkIcon;
          copyBtn.style.color = "var(--accent)";
          setTimeout(() => {
            copyBtn.innerHTML = copyIcon;
            copyBtn.style.color = "var(--text-muted)";
          }, 2000);
        }
      };
      wrapper.appendChild(copyBtn);

      pre.style.cssText = "margin:0;padding:2.75rem 1.25rem 1rem;overflow-x:auto;font-size:0.875rem;line-height:1.7;background:transparent;border:0;";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
    });

    const wrapperMouseHandler = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const btn = target.querySelector("button") as HTMLElement | null;
      if (btn) btn.style.opacity = "1";
    };
    const wrapperMouseLeaveHandler = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const btn = target.querySelector("button") as HTMLElement | null;
      if (btn) btn.style.opacity = "0";
    };

    contentRef.current.querySelectorAll("[style*='border-radius:0.75rem']").forEach((wrapper) => {
      (wrapper as HTMLElement).addEventListener("mouseenter", wrapperMouseHandler);
      (wrapper as HTMLElement).addEventListener("mouseleave", wrapperMouseLeaveHandler);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none
        prose-headings:text-text prose-headings:tracking-tight prose-headings:font-semibold
        prose-h1:text-2xl prose-h1:mt-12 prose-h1:mb-5
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
        prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2
        prose-p:text-text-secondary prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text
        prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']
        prose-li:text-text-secondary
        prose-blockquote:border-accent/30 prose-blockquote:text-text-muted"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
