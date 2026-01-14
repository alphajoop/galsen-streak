import { differenceInDays, startOfDay } from "date-fns";
import type { CommitDay, StreakResult } from "./types";

export function calculateStreak(
  days: CommitDay[],
  totalLifetime: number,
  accountCreatedAt: string,
): StreakResult {
  if (days.length === 0) {
    return {
      current: 0,
      longest: 0,
      total: 0,
      totalLifetime,
      accountCreatedAt,
      lastContribution: null,
      graph: [],
      streakStatus: "broken",
    };
  }

  const sortedDays = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Total contributions (current year)
  const total = sortedDays.reduce((sum, day) => sum + day.count, 0);

  // Last contribution
  const lastContribution = [...sortedDays].reverse().find((day) => day.count > 0)?.date || null;

  // Current streak (robuste, GitHub-like)
  let current = 0;
  let streakStatus: "active" | "grace-day" | "broken" = "broken";

  const activeDays = sortedDays.filter((d) => d.count > 0);
  if (activeDays.length === 0) {
    current = 0;
    streakStatus = "broken";
  } else {
    const lastActiveDay = activeDays[activeDays.length - 1];
    if (!lastActiveDay) {
      current = 0;
      streakStatus = "broken";
    } else {
      let lastDate = startOfDay(new Date(lastActiveDay.date));
      const today = startOfDay(new Date(new Date().toISOString()));

      const diffFromToday = differenceInDays(today, lastDate);

      // Si la dernière contribution est trop vieille → streak = 0
      if (diffFromToday > 1) {
        current = 0;
        streakStatus = "broken";
      } else {
        current = 1;
        streakStatus = diffFromToday === 0 ? "active" : "grace-day";

        for (let i = activeDays.length - 2; i >= 0; i--) {
          const currentDay = activeDays[i];
          if (!currentDay) break;

          const curr = startOfDay(new Date(currentDay.date));
          const diff = differenceInDays(lastDate, curr);

          if (diff === 1) {
            current++;
            lastDate = curr;
          } else {
            break;
          }
        }
      }
    }
  }

  // Longest streak calculation
  let longest = 0;
  let temp = 0;
  let prevDate: Date | null = null;

  for (const day of sortedDays) {
    if (day.count > 0) {
      const currDate = startOfDay(new Date(day.date));

      if (prevDate && differenceInDays(currDate, prevDate) === 1) {
        temp++;
      } else {
        temp = 1;
      }

      longest = Math.max(longest, temp);
      prevDate = currDate;
    }
  }

  // Graph of the last 30 days
  const graph = sortedDays.slice(-30).map((day) => day.count);

  return {
    current,
    longest,
    total,
    totalLifetime,
    accountCreatedAt,
    lastContribution,
    graph,
    streakStatus,
  };
}
