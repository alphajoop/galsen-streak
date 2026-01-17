export type CommitDay = {
  date: string;
  count: number;
};

export type StreakResult = {
  current: number;
  longest: number;
  total: number;
  totalLifetime: number;
  accountCreatedAt: string;
  lastContribution: string | null;
  graph: number[];
  streakStatus: "active" | "grace-day" | "broken";
};

export type UserInfo = {
  createdAt: string;
  contributionYears: number[];
};

export type GitHubGraphQLResponse = {
  data?: {
    user?: {
      createdAt?: string;
      contributionsCollection: {
        contributionYears?: number[];
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: {
    message: string;
  }[];
};
