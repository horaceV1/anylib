import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-cabinet",
});

export const metadata: Metadata = {
  title: "anylib — Your Universal Media Library",
  description:
    "Track shows, movies, games, books, albums, and more. Your personal media library, beautifully organized.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-surface-950 text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
