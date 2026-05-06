import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Unifesto",
  description: "Sign in to your Unifesto account to discover events, manage registrations, and connect with your campus community.",
  keywords: ["sign in", "login", "signup", "register", "unifesto account", "student login"],
  openGraph: {
    title: "Sign In — Unifesto",
    description: "Sign in to your Unifesto account to discover and manage campus events.",
    type: "website",
    url: "https://www.unifesto.app/auth",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary",
    title: "Sign In — Unifesto",
    description: "Sign in to your Unifesto account to discover and manage campus events.",
    site: "@unifestoapp",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
