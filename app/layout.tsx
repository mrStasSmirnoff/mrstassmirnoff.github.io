import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { SiteHeader } from "@/app/_components/SiteHeader";
import { siteConfig } from "@/content/site";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const lora = Lora({ variable: "--font-serif", subsets: ["latin"] });

// Static hosting has no incoming request: share links use the public site URL.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} · ${siteConfig.role}`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.intro,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.intro,
    images: [{ url: "/og.png", width: 1732, height: 909, alt: `${siteConfig.name}, ${siteConfig.role}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${lora.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
