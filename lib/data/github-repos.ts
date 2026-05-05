type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
};

async function githubFetchREST(path: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json, application/vnd.github.mercy-preview+json",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  const looksLikeToken = typeof token === "string" && /^(ghp_|github_pat_)/.test(token);
  if (looksLikeToken) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 1800, tags: ["github-repos"] },
  });

  if (!res.ok) {
    // Retry without auth if token is invalid
    if (res.status === 401) {
      console.warn("Invalid GitHub token, retrying without authentication...");

      const retry = await fetch(`https://api.github.com${path}`, {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 1800, tags: ["github-repos-retry"] },
      });

      if (retry.ok) {
        return retry.json();
      }

      const retryText = await retry.text();
      console.error("GitHub REST retry failed:", retry.status, retryText);
      return [];
    }

    const text = await res.text();
    console.error("GitHub REST API Error:", res.status, text);
    throw new Error("GitHub REST request failed");
  }

  return res.json();
}

export async function getGithubRepos(username: string = "shuvoislamkhan") {
  let data: Repo[] = [];
  try {
    data = await githubFetchREST(`/users/${username}/repos`);
  } catch {
    return [];
  }

  return data
    .filter((repo) => !repo.fork) // remove forks
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // sort by stars
    .slice(0, 6) // limit to top 6
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      tech: repo.topics?.length
        ? repo.topics
        : repo.language
        ? [repo.language]
        : [],
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
    }));
}