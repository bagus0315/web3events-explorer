import "./globals.css";
import { Inter } from "next/font/google";
import Localfont from "next/font/local";
import type { Metadata } from "next";

import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers'


const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const calSans = Localfont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
})

export const metadata: Metadata = {
  title: "CommuneAI web3event Map",
  description: "you can find web3 event here in map",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en"
      className={[inter.variable, calSans.variable].join(" ")}
    >
      <body className="bg-black w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
