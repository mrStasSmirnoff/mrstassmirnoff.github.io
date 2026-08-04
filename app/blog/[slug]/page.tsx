import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts, renderMarkdown } from "@/lib/posts";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="page-main">
      <article className="container article-shell">
        <Link className="back-link" href="/blog">← All posts</Link>
        <header>
          <p className="post-meta">{formatDate(post.date)} · {post.tags.join(" · ")}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </article>
    </main>
  );
}
