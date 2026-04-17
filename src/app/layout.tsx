import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FloatingSupport from "@/components/FloatingSupport";

const agrandir = localFont({
  src: "./assets/fonts/Agrandir/Agrandir-Regular.otf",
  variable: "--font-agrandir",
  display: "swap",
});

const sweetApricot = localFont({
  src: "./assets/fonts/SweetApricot/SweetApricot.ttf",
  variable: "--font-sweet-apricot",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unifesto — Optimize. Organize. Elevate. Events.",
  description:
    "Unifesto is the premium campus event platform for discovering, hosting, and elevating college events at Malla Reddy University and beyond.",
  keywords: [
    "campus events",
    "college events",
    "Unifesto",
    "Malla Reddy University",
    "student events",
  ],
  openGraph: {
    title: "Unifesto — Elevate. Events.",
    description: "Discover and host premium campus events with Unifesto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${agrandir.variable} ${sweetApricot.variable} scroll-smooth`}>
      <body className="min-h-screen bg-black antialiased">
        {children}
        <FloatingSupport />
      </body>
    </html>
  );
}
