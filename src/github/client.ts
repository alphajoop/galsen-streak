import type { CommitDay, GitHubGraphQLResponse, UserInfo } from "../streak/types";

export async function getStreakData(username: string): Promise<CommitDay[]> {
  const TOKEN = process.env.GITHUB_TOKEN;

  if (!TOKEN) throw new Error("⚠️ GITHUB_TOKEN not defined in .env");

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

export async function getUserInfo(username: string): Promise<UserInfo> {
  const TOKEN = process.env.GITHUB_TOKEN;

  if (!TOKEN) throw new Error("⚠️ GITHUB_TOKEN not defined in .env");

  // GraphQL query for user info
  const query = `
    query($login: String!) {
      user(login: $login) {
        createdAt
        contributionsCollection {
          contributionYears
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

  if (!data.data?.user) {
    throw new Error("User not found");
  }

  const createdAt = data.data.user.createdAt;
  const years = data.data.user.contributionsCollection.contributionYears || [];

  if (!createdAt) {
    throw new Error("User creation date not found");
  }

  return {
    createdAt,
    contributionYears: years,
  };
}

export async function getTotalContributions(username: string): Promise<number> {
  const TOKEN = process.env.GITHUB_TOKEN;

  if (!TOKEN) throw new Error("⚠️ GITHUB_TOKEN not defined in .env");

  const userInfo = await getUserInfo(username);
  const years = userInfo.contributionYears;

  if (years.length === 0) return 0;

  // Get contributions for each year
  let totalContributions = 0;

  for (const year of years) {
    const fromDate = `${year}-01-01T00:00:00Z`;
    const toDate = `${year}-12-31T23:59:59Z`;

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
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
      body: JSON.stringify({
        query,
        variables: {
          login: username,
          from: fromDate,
          to: toDate,
        },
      }),
    });

    const data = (await res.json()) as GitHubGraphQLResponse;
    const yearContributions =
      data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

    totalContributions += yearContributions;
  }

  return totalContributions;
}
