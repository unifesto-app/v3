import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizations — Unifesto",
  description: "Explore universities, clubs, and communities on Unifesto. Discover events from your favorite campus organizations.",
  keywords: ["campus organizations", "student clubs", "university clubs", "campus communities", "student organizations"],
  openGraph: {
    title: "Organizations — Unifesto",
    description: "Explore universities, clubs, and communities on Unifesto.",
    type: "website",
    url: "https://www.unifesto.app/orgs",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organizations — Unifesto",
    description: "Explore universities, clubs, and communities on Unifesto.",
    site: "@unifestoapp",
  },
};

export default function OrgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
