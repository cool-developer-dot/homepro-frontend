import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import BackendHealthBanner from "@/components/BackendHealthBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomePro — On‑Demand Home Services",
  description: "Book trusted professionals for any job, anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        <AuthProvider>
          <BackendHealthBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
