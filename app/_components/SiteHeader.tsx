import Link from "next/link";
import { siteConfig } from "@/content/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name}, home`}>
          <span>{siteConfig.initials}</span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
