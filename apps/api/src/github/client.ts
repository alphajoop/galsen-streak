import type { CommitDay, GitHubGraphQLResponse } from "../streak/types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export type UserProfile = {
  createdAt: string;
  days: CommitDay[];
};

function getToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not defined");
  return token;
}

async function githubGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json() as Promise<T>;
}

export async function getUserProfile(username: string): Promise<UserProfile> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        createdAt
        contributionsCollection {
          contributionCalendar {
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

  const data = await githubGraphql<GitHubGraphQLResponse>(query, { login: username });

  if (!data.data?.user?.createdAt) {
    throw new Error("User not found");
  }

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

  return {
    createdAt: data.data.user.createdAt,
    days,
  };
}

export async function getLifetimeContributions(
  username: string,
  createdAt: string,
): Promise<number> {
  const query = `
    query($login: String!, $from: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const data = await githubGraphql<GitHubGraphQLResponse>(query, {
    login: username,
    from: createdAt,
  });

  return data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
}
