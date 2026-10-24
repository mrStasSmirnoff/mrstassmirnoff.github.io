import Link from "next/link";
import { siteConfig } from "@/content/site";
import { publicPath } from "@/lib/urls";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          {/* A PDF is a file, so it must bypass Next.js route prefetching. */}
          <a href={publicPath(siteConfig.resumePath)}>Resume</a>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
