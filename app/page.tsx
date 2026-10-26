import Image from "next/image";
import Link from "next/link";
import { TestimonialCarousel } from "@/app/_components/TestimonialCarousel";
import { faqs } from "@/content/faqs";
import { expertise, siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { formatDate, getPosts } from "@/lib/posts";
import { publicPath } from "@/lib/urls";

export default function Home() {
  const recentPosts = getPosts().slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-name">{siteConfig.name}</h1>
            <p className="hero-role">{siteConfig.role}, {siteConfig.location}</p>
            <p className="hero-intro">{siteConfig.intro}</p>
            <div className="button-row">
              <Link className="button button-secondary" href="/blog">Read the blog</Link>
              <Link className="button button-secondary" href="/resume">About me</Link>
              <Link className="button button-primary" href="/contact">Let&apos;s talk</Link>
            </div>
          </div>
          <div className="portrait-wrap" aria-label={`Portrait of ${siteConfig.name}`}>
            <Image
              className="portrait"
              src={publicPath(siteConfig.profileImage)}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 88vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="expertise-section" aria-labelledby="expertise-heading">
        <div className="container">
          <div className="expertise-heading">
            <p className="eyebrow">The work</p>
            <h2 id="expertise-heading">What I work on</h2>
          </div>
          <ul className="expertise-list">
            {expertise.map((item) => (
              <li key={item.title}>
                <span className="expertise-mark" aria-hidden="true">{item.shortName}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Recommendations</p>
            <h2>What colleagues say</h2>
          </div>
          <TestimonialCarousel>
            {testimonials.map((testimonial, index) => (
              <figure className="testimonial-card" key={testimonial.name} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}: ${testimonial.name}`}>
                {/* Native details keeps expansion keyboard-accessible, even without JavaScript. */}
                <details className="testimonial-quote">
                  <summary>
                    <span className="testimonial-excerpt">{testimonial.quote.split("\n\n")[0]}</span>
                    <span className="testimonial-toggle">
                      <span className="testimonial-more">Read more</span>
                      <span className="testimonial-less">Read less</span>
                      <span className="sr-only"> from {testimonial.name}</span>
                    </span>
                  </summary>
                  <blockquote>
                    {testimonial.quote.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </blockquote>
                </details>
                <figcaption>
                  {testimonial.image ? (
                    <Image src={publicPath(testimonial.image)} alt="" width={52} height={52} />
                  ) : (
                    <span className="avatar" aria-hidden="true">{testimonial.initials}</span>
                  )}
                  <span><strong>{testimonial.name}</strong><small>{testimonial.title}</small></span>
                </figcaption>
              </figure>
            ))}
          </TestimonialCarousel>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Stuff that interests me</p>
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
            <p className="eyebrow">Questions</p>
            <h2>Frequently asked questions</h2>
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
            <p className="eyebrow">Get in touch</p>
            <h2>Tell me what you&apos;re working on.</h2>
          </div>
          <Link className="button button-light" href="/contact">Contact me</Link>
        </div>
      </section>
    </main>
  );
}
