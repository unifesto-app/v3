import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — Unifesto",
  description: "Discover all campus events at Malla Reddy University and beyond. Browse hackathons, cultural fests, workshops, and more.",
  keywords: ["campus events", "college events", "student events", "hackathons", "cultural events", "workshops", "malla reddy events"],
  openGraph: {
    title: "Events — Unifesto",
    description: "Discover all campus events at Malla Reddy University and beyond.",
    type: "website",
    url: "https://www.unifesto.app/events",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events — Unifesto",
    description: "Discover all campus events at Malla Reddy University and beyond.",
    site: "@unifestoapp",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
