import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet — Unifesto",
  description: "Manage your Uni Coins, view transaction history, and redeem rewards on Unifesto.",
  keywords: ["uni coins", "wallet", "rewards", "campus currency", "transaction history", "redeem coins"],
  openGraph: {
    title: "Wallet — Unifesto",
    description: "Manage your Uni Coins and redeem rewards on Unifesto.",
    type: "website",
    url: "https://www.unifesto.app/wallet",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary",
    title: "Wallet — Unifesto",
    description: "Manage your Uni Coins and redeem rewards on Unifesto.",
    site: "@unifestoapp",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
