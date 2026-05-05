import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { getSortedPostsData } from "@/lib/blog";

export const dynamic = "force-static";

export default async function HomePage() {
  const blogPosts = await getSortedPostsData();

  return (
    <PortfolioPage
      weeks={[]}
      total={0}
      repos={[]}
      blogPosts={blogPosts}
    />
  );
}
