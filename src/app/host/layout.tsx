import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host an Event — Unifesto",
  description: "Create and host your campus event on Unifesto. Reach thousands of students with our event management platform.",
  keywords: ["host event", "create event", "event hosting", "campus event management", "organize event", "event creation"],
  openGraph: {
    title: "Host an Event — Unifesto",
    description: "Create and host your campus event on Unifesto. Reach thousands of students.",
    type: "website",
    url: "https://www.unifesto.app/host",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Host an Event — Unifesto",
    description: "Create and host your campus event on Unifesto. Reach thousands of students.",
    site: "@unifestoapp",
  },
};

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
