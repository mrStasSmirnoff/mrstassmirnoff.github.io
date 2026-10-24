import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { SiteHeader } from "@/app/_components/SiteHeader";
import { siteConfig } from "@/content/site";
import "./globals.css";

const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin", "cyrillic"] });
const lora = Lora({ variable: "--font-serif", subsets: ["latin"] });
const socialImage = `${siteConfig.url}/og.png`;

// Static hosting has no incoming request: share links use the public site URL.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} · ${siteConfig.role}`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.intro,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.intro,
    images: [{ url: socialImage, width: 1732, height: 909, alt: `${siteConfig.name}, ${siteConfig.role}` }],
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${lora.variable}`}
        // Avenir is previewed from the Mac, never bundled or enabled in a release.
        data-font-preview={process.env.NODE_ENV === "development" && process.env.FONT_PREVIEW === "avenir" ? "avenir" : undefined}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
