import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on applied data science, experimentation, and technical leadership.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="page-main">
      <section className="page-hero container narrow">
        <p className="eyebrow">Writing</p>
        <h1>Ideas worth making inspectable.</h1>
        <p>Notes on data products, experiments, technical leadership, and the decisions behind the work.</p>
      </section>
      <section className="container narrow post-list" aria-label="Blog posts">
        {posts.map((post) => (
          <article key={post.slug}>
            <div className="post-date">{formatDate(post.date)}</div>
            <div>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.description}</p>
              <div className="tag-list">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
