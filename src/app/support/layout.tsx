import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Center — Unifesto",
  description: "Get help with Unifesto. Browse FAQs, create support tickets, or chat with our team. Available 24/7 for all your campus event needs.",
  keywords: ["unifesto support", "help center", "customer support", "live chat", "event support", "campus events help"],
  openGraph: {
    title: "Support Center — Unifesto",
    description: "Get help with Unifesto. Browse FAQs, create support tickets, or chat with our team.",
    type: "website",
    url: "https://www.unifesto.app/support",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Center — Unifesto",
    description: "Get help with Unifesto. Browse FAQs, create support tickets, or chat with our team.",
    site: "@unifestoapp",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
