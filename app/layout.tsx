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

// @ts-nocheck
// app/layout.tsx
export const metadata = {
  title: "Gym Fit My Space | Home Gym Configurator",
  description: "Engineer your perfect home gym with Gym Fit My Space.",
  verification: {
    other: {
      'impact-site-verification': '26432e1a-7330-45e4-8ef6-2d0551970e98',
    },
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
