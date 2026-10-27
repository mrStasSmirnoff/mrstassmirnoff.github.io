import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
