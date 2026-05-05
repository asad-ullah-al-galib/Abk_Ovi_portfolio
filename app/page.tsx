import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { getGithubContributions } from "@/lib/data/github";
import { getGithubRepos } from "@/lib/data/github-repos";
import { getSortedPostsData } from "@/lib/blog";


export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function HomePage() {
  const data = await getGithubContributions("shuvoislamkhan");
  const weeks = data?.weeks || [];
  const total = data?.totalContributions || 0;

  const rawRepos = await getGithubRepos("shuvoislamkhan");

  const repos = rawRepos.map((repo) => ({
    ...repo,
    html_url: repo.url,
  }));

  const blogPosts = await getSortedPostsData();

  return (
    <PortfolioPage
      weeks={weeks}
      total={total}
      repos={repos}
      blogPosts={blogPosts}
    />
  );
}
