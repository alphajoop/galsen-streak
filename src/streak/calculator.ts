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

  // Total contributions (année actuelle)
  const total = sortedDays.reduce((sum, day) => sum + day.count, 0);

  // Dernière contribution
  const lastContribution = [...sortedDays].reverse().find((day) => day.count > 0)?.date || null;

  // Calcul du streak actuel (depuis la fin)
  let current = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const day = sortedDays[i];
    if (!day) break;

    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1 && day.count > 0) {
      current++;
    } else if (day.count > 0) {
      const prevDay = sortedDays[i + 1];
      if (prevDay) {
        const prevDate = new Date(prevDay.date);
        prevDate.setHours(0, 0, 0, 0);
        const diff = Math.floor((dayDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
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

  // Calcul du plus long streak
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
        const diff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
          tempStreak = 0;
        }
      }
    }
  }

  // Graphique des 30 derniers jours
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
