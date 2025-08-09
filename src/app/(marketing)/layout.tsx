import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "../globals.css";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
