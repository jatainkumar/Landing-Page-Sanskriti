import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairSerif = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanskriti | A cultural home for global Indian families",
  description: "Sanskriti brings together devotional music, cultural storytelling, festivals, and family learning in one premium platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${playfairSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global Noise Texture */}
        <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04]">
          <svg className="absolute inset-0 h-full w-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
