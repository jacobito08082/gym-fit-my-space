// @ts-nocheck
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

export const metadata = {
  title: "Gym Fit My Space | Home Gym Configurator",
  description: "Engineer your perfect home gym with Gym Fit My Space. Built for lifters, by lifters.",
  // Impact.com Verification
  verification: {
    other: {
      'impact-site-verification': '26432e1a-7330-45e4-8ef6-2d0551970e98',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Secondary manual verification for Impact.com */}
        <meta name="impact-site-verification" value="26432e1a-7330-45e4-8ef6-2d0551970e98" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* FOOTER: Professional touches for Impact.com approval */}
        <footer className="mt-20 py-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm text-center">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-sm font-bold text-gray-900 mb-2">© 2026 Gym Fit My Space</p>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Gym Fit My Space is a participant in affiliate programs and may earn a commission 
              on purchases made through our links at no extra cost to you.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}