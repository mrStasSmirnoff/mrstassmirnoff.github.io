import Link from "next/link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="footer-links">
          <a href={siteConfig.github}>GitHub</a>
          <a href={siteConfig.linkedIn}>LinkedIn</a>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
