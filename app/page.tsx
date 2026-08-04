import Image from "next/image";
import Link from "next/link";
import { faqs } from "@/content/faqs";
import { expertise, siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { formatDate, getPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getPosts().slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteConfig.role} · {siteConfig.location}</p>
            <h1>{siteConfig.headline}</h1>
            <p className="hero-intro">{siteConfig.intro}</p>
            <div className="button-row">
              <Link className="button button-primary" href="/contact">Let&apos;s talk</Link>
              <Link className="button button-secondary" href="/blog">Read the blog</Link>
            </div>
          </div>
          <div className="portrait-wrap" aria-label={`Portrait of ${siteConfig.name}`}>
            {siteConfig.profileImage ? (
              <Image
                className="portrait"
                src={siteConfig.profileImage}
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority
                sizes="(max-width: 760px) 88vw, 40vw"
              />
            ) : (
              <div className="portrait-placeholder">
                <span>{siteConfig.initials}</span>
                <small>Add public/profile.jpeg</small>
              </div>
            )}
            <div className="portrait-note">
              <strong>Data, decisions, delivery.</strong>
              <span>From first question to measurable outcome.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-strip" aria-label="Areas of expertise">
        <div className="container expertise-list">
          {expertise.map((item, index) => (
            <span key={item}><b>0{index + 1}</b>{item}</span>
          ))}
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Trusted perspective</p>
            <h2>What colleagues say</h2>
            <p>Short, specific recommendations carry more weight than a long list of claims.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure className="testimonial-card" key={testimonial.name}>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption>
                  {testimonial.image ? (
                    <Image src={testimonial.image} alt="" width={52} height={52} />
                  ) : (
                    <span className="avatar" aria-hidden="true">{testimonial.initials}</span>
                  )}
                  <span><strong>{testimonial.name}</strong><small>{testimonial.title}</small></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Notes from the work</p>
              <h2>From the blog</h2>
            </div>
            <Link className="text-link" href="/blog">View all posts <span>→</span></Link>
          </div>
          <div className="post-grid">
            {recentPosts.map((post) => (
              <article className="post-card" key={post.slug}>
                <p className="post-meta">{formatDate(post.date)} · {post.tags[0]}</p>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.description}</p>
                <Link className="card-link" href={`/blog/${post.slug}`}>Read article <span>→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div className="section-heading">
            <p className="eyebrow">A little more context</p>
            <h2>Frequently asked questions</h2>
            <p>Useful answers before we start a conversation.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="container contact-band-grid">
          <div>
            <p className="eyebrow">Have a thoughtful problem?</p>
            <h2>Let&apos;s make the next decision clearer.</h2>
          </div>
          <Link className="button button-light" href="/contact">Start a conversation</Link>
        </div>
      </section>
    </main>
  );
}
