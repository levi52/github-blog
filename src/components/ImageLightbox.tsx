"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <div
        className={`relative cursor-pointer group ${className || ""}`}
        onClick={() => setIsOpen(true)}
      >
        {isLoaded ? (
          <Image
            src={imgSrc}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto rounded-xl border border-border transition-all duration-300 group-hover:shadow-[var(--shadow-hover)] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-48 bg-bg-secondary rounded-xl animate-pulse" />
        )}
        <div className="absolute inset-0 bg-text/0 group-hover:bg-text/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
          <svg
            className="w-8 h-8 text-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-text/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface/10 text-surface hover:bg-surface/20 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
