export type CommitDay = {
  date: string;
  count: number;
};

export type StreakResult = {
  current: number;
  longest: number;
  total: number;
  lastContribution: string | null;
  graph: number[];
};

export type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
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
