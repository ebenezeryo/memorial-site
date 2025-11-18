import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "In Loving Memory of Snr. Apostolic Mother Florence Modupe Akintunde",
  description: "Celebration of Life - Snr. Apostolic Mother Florence Modupe Akintunde (née Oyeleye). Join us as we honor her memory and celebrate 73 years of a life well spent. Obsequies: December 16-19, 2025.",
  keywords: ["Florence Akintunde", "Memorial Service", "Celebration of Life", "Obsequies", "AKINTUNDE Family"],
  openGraph: {
    title: "In Loving Memory of Snr. Apostolic Mother Florence Modupe Akintunde",
    description: "Celebration of Life - December 16-19, 2025",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
