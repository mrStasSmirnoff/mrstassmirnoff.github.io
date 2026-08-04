import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="container contact-grid">
        <section className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h1>Good work starts with a clear conversation.</h1>
          <p>
            If you have a data product, decision, or team challenge that could use a fresh perspective,
            send a short note. Context beats a polished brief.
          </p>
          <a className="button button-primary" href={`mailto:${siteConfig.email}`}>Email {siteConfig.name.split(" ")[0]}</a>
        </section>
        <aside className="contact-card">
          <p className="contact-label">Email</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p className="contact-label">Based in</p>
          <p>{siteConfig.location}</p>
          <p className="contact-label">Elsewhere</p>
          <div className="contact-links">
            <a href={siteConfig.linkedIn}>LinkedIn <span>↗</span></a>
            <a href={siteConfig.github}>GitHub <span>↗</span></a>
          </div>
          <p className="contact-note">I usually reply within a few working days.</p>
        </aside>
      </div>
    </main>
  );
}
