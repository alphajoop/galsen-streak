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
    };
  }

  const sortedDays = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Total contributions (current year)
  const total = sortedDays.reduce((sum, day) => sum + day.count, 0);

  // Last contribution
  const lastContribution = [...sortedDays].reverse().find((day) => day.count > 0)?.date || null;

  // Current streak calculation (from the end)
  let current = 0;
  const today = startOfDay(new Date());

  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const day = sortedDays[i];
    if (!day) break;

    const dayDate = startOfDay(new Date(day.date));

    const diffDays = differenceInDays(today, dayDate);

    if (diffDays <= 1 && day.count > 0) {
      current++;
    } else if (day.count > 0) {
      const prevDay = sortedDays[i + 1];
      if (prevDay) {
        const prevDate = startOfDay(new Date(prevDay.date));
        const diff = differenceInDays(dayDate, prevDate);
        if (diff === 1) {
          current++;
        } else {
          break;
        }
      }
    } else if (diffDays > 1) {
      break;
    }
  }

  // Longest streak calculation
  let longest = 0;
  let tempStreak = 0;

  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i];
    if (!day) break;

    if (day.count > 0) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else {
      if (i > 0) {
        const prevDay = sortedDays[i - 1];
        if (!prevDay) break;

        const currDate = new Date(day.date);
        const prevDate = new Date(prevDay.date);
        const diff = differenceInDays(currDate, prevDate);
        if (diff === 1) {
          tempStreak = 0;
        }
      }
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
  };
}
