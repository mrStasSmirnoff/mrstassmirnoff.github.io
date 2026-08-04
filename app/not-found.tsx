import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found container narrow">
      <p className="eyebrow">404</p>
      <h1>That page isn&apos;t here.</h1>
      <p>The link may be old, or the post may have moved.</p>
      <Link className="button button-primary" href="/">Back home</Link>
    </main>
  );
}
