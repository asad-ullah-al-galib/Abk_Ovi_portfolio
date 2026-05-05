import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import Cursor from "@/components/ui/cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABK OVI | HR Professional",
  description: "Portfolio of ABK OVI, Assistant Manager - HR at Standard MH Group, with experience in HR operations, compensation and benefits, and team leadership."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Fraunces:ital,opsz,wght,WONK@0,9..144,100..900,1;1,9..144,100..900,1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="min-h-screen bg-neutral-950 text-white font-sans antialiased relative"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Cursor />
          <main>{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
