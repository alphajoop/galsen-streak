import type { CommitDay, GitHubGraphQLResponse } from "../streak/types";

export async function getStreakData(username: string): Promise<CommitDay[]> {
  const TOKEN = process.env.GITHUB_TOKEN;

  if (!TOKEN) throw new Error("⚠️ GITHUB_TOKEN non défini dans .env");
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  const data = (await res.json()) as GitHubGraphQLResponse;

  if (!data.data?.user) return [];

  const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
  const days: CommitDay[] = [];

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
      });
    }
  }

  return days;
}
