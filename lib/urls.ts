// GitHub supplies owner/repository in CI. This fallback matches the local remote.
const [owner, repository] = (process.env.GITHUB_REPOSITORY || "mrStasSmirnoff/stanislavsmirnov.github.io").split("/");
const host = `${owner.toLowerCase()}.github.io`;
const repositoryPath = repository.toLowerCase() === host ? "" : `/${repository}`;

// configure-pages supplies SITE_URL for publication, including custom domains.
export const siteUrl = (process.env.SITE_URL || `https://${host}${repositoryPath}`).replace(/\/$/, "");

// Next.js prefixes page links automatically; public files and Markdown need this.
export function publicPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
