import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { headers } from "next/headers";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { SiteHeader } from "@/app/_components/SiteHeader";
import { siteConfig } from "@/content/site";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const lora = Lora({ variable: "--font-serif", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
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
}

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
