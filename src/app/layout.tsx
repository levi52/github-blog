import type { Metadata } from "next";
import { Archivo_Black, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

// Only used by the N (Neo-brutalist) skin, which swaps the serif display face
// for a heavy grotesque.
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "Levi5's Blog",
  description: "Levi5's personal blog and tech tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                var isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) document.documentElement.classList.add('dark');
                
                var accentColor = localStorage.getItem('accent-color');
                if (accentColor && accentColor !== 'default') {
                  document.documentElement.setAttribute('data-accent', accentColor);
                }

                // Apply the visual skin before first paint to avoid a flash of
                // the default parchment style. 'default' carries no attribute.
                var style = localStorage.getItem('style');
                if (style === 'neobrutal') {
                  document.documentElement.setAttribute('data-style', style);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <filter id="paper-grain" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
        <ReadingProgress />
        <Header />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
