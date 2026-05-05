async function githubFetch(body: unknown) {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    console.warn("GITHUB_TOKEN is missing. GitHub API requests will fail.");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { revalidate: 1800, tags: ["github-contributions"] },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("GitHub API error:", res.status, text);
    throw new Error("GitHub API request failed");
  }

  return res.json();
}

export async function getGithubContributions(username: string) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  let json;
  try {
    json = await githubFetch({ query });
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return { weeks: [], totalContributions: 0 };
  }
  
  if (json.errors) {
    console.error("GitHub GraphQL errors:", JSON.stringify(json.errors, null, 2));
    return { weeks: [], totalContributions: 0 };
  }

  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  const weeks = calendar?.weeks || [];
  const total = calendar?.totalContributions || 0;

  console.log(`[getGithubContributions] Success: ${weeks.length} weeks, ${total} total`);

  return {
    weeks,
    totalContributions: total,
  };
}