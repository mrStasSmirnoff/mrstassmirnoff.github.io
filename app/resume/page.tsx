import type { Metadata } from "next";
import { resume } from "@/content/resume";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `${siteConfig.name}, ${resume.role}: authorization, routing, retries, network tokenization, and fraud detection.`,
};

export default function ResumePage() {
  const requestCV = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Detailed CV request")}`;

  return (
    <main className="page-main resume-page">
      <div className="container resume-content">
        <header className="resume-intro">
          <p className="eyebrow">Resume</p>
          <h1>{siteConfig.name}</h1>
          <p className="resume-location">{siteConfig.location}</p>
        </header>

        <section className="resume-about" aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          {resume.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="button-row resume-actions">
            <a className="button button-primary" href={requestCV}>Request the detailed CV</a>
            <a className="text-link" href={siteConfig.linkedIn}>Connect on LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
          <p className="resume-availability">The detailed CV is available upon request.</p>
        </section>

        <section className="resume-section" aria-labelledby="work-heading">
          <h2 id="work-heading">Recent work at Cleverbridge</h2>
          <div className="resume-work-list">
            {resume.recentWork.map((item) => (
              <article className="resume-work-item" key={item.area}>
                <h3>{item.area}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="resume-collaboration">{resume.collaboration}</p>
        </section>

        <section className="resume-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <p className="resume-background">{resume.background}</p>
          <ol className="resume-career-list">
            {resume.experience.map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <div>
                  <h3>{job.title}</h3>
                  <p className="resume-company">{job.company}</p>
                </div>
                <p className="resume-period">{job.period}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="resume-section resume-qualifications">
          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading">Skills</h2>
            <dl className="resume-skills">
              {resume.skills.map((skill) => (
                <div key={skill.area}>
                  <dt>{skill.area}</dt>
                  <dd>{skill.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
          <div className="resume-education">
            <section aria-labelledby="education-heading">
              <h2 id="education-heading">Education</h2>
              <h3>{resume.education.institution}</h3>
              <p>{resume.education.degree}</p>
              <p className="resume-period">{resume.education.period}</p>
            </section>
            <section aria-labelledby="languages-heading">
              <h2 id="languages-heading">Languages</h2>
              <p>{resume.languages}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
