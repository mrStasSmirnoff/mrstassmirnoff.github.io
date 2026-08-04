import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `${siteConfig.name}'s resume.`,
};

export default function ResumePage() {
  return (
    <main className="page-main resume-page">
      <section className="container page-hero resume-heading">
        <div>
          <p className="eyebrow">Experience</p>
          <h1>Resume</h1>
          <p>A concise view of the work, responsibilities, and outcomes behind the title.</p>
        </div>
        {siteConfig.resumeAvailable && (
          <a className="button button-primary" href={siteConfig.resumePath} download>Download PDF</a>
        )}
      </section>

      <section className="container resume-shell">
        {siteConfig.resumeAvailable ? (
          <object data={siteConfig.resumePath} type="application/pdf" aria-label={`${siteConfig.name}'s resume`}>
            <p>Your browser cannot preview this PDF. <a href={siteConfig.resumePath}>Download it instead.</a></p>
          </object>
        ) : (
          <div className="asset-placeholder">
            <span className="asset-icon">PDF</span>
            <h2>Your CV is ready to plug in.</h2>
            <p>Add <code>resume.pdf</code> to the <code>public</code> folder, then set <code>resumeAvailable</code> to <code>true</code> in <code>content/site.ts</code>.</p>
          </div>
        )}
      </section>
    </main>
  );
}
