import { describe, expect, test } from "bun:test";
import { calculateStreak } from "../streak/calculator";
import type { CommitDay } from "../streak/types";

describe("calculateStreak", () => {
  test("should return zero streak for empty data", () => {
    const result = calculateStreak([], 0, "2023-01-01");

    expect(result.current).toBe(0);
    expect(result.longest).toBe(0);
    expect(result.total).toBe(0);
    expect(result.streakStatus).toBe("broken");
    expect(result.lastContribution).toBe(null);
    expect(result.graph).toEqual([]);
  });

  test("should calculate current streak correctly - active today", () => {
    const today = new Date().toISOString().split("T")[0] ?? "";
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0] ?? "";
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0] ?? "";

    const days: CommitDay[] = [
      { date: twoDaysAgo, count: 5 },
      { date: yesterday, count: 3 },
      { date: today, count: 2 },
    ];

    const result = calculateStreak(days, 10, "2023-01-01");

    expect(result.current).toBe(3);
    expect(result.streakStatus).toBe("active");
    expect(result.lastContribution).toBe(today);
  });

  test("should calculate current streak correctly - grace day", () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0] ?? "";
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0] ?? "";
    const threeDaysAgo = new Date(Date.now() - 259200000).toISOString().split("T")[0] ?? "";

    const days: CommitDay[] = [
      { date: threeDaysAgo, count: 5 },
      { date: twoDaysAgo, count: 3 },
      { date: yesterday, count: 2 },
    ];

    const result = calculateStreak(days, 10, "2023-01-01");

    expect(result.current).toBe(3);
    expect(result.streakStatus).toBe("grace-day");
    expect(result.lastContribution).toBe(yesterday);
  });

  test("should calculate current streak correctly - broken", () => {
    const threeDaysAgo = new Date(Date.now() - 259200000).toISOString().split("T")[0] ?? "";
    const fourDaysAgo = new Date(Date.now() - 345600000).toISOString().split("T")[0] ?? "";

    const days: CommitDay[] = [
      { date: fourDaysAgo, count: 5 },
      { date: threeDaysAgo, count: 3 },
    ];

    const result = calculateStreak(days, 10, "2023-01-01");

    expect(result.current).toBe(0);
    expect(result.streakStatus).toBe("broken");
    expect(result.lastContribution).toBe(threeDaysAgo);
  });

  test("should calculate longest streak correctly", () => {
    const days: CommitDay[] = [
      { date: "2023-01-01", count: 1 },
      { date: "2023-01-02", count: 2 },
      { date: "2023-01-03", count: 1 },
      { date: "2023-01-05", count: 3 }, // gap
      { date: "2023-01-06", count: 2 },
      { date: "2023-01-07", count: 1 },
    ];

    const result = calculateStreak(days, 10, "2023-01-01");

    expect(result.longest).toBe(3); // 1-2-3 is longest
    expect(result.total).toBe(10);
  });

  test("should generate 30-day graph with sliding window", () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 29 * 86400000);

    const todayStr = today.toISOString().split("T")[0] ?? "";
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0] ?? "";

    const days: CommitDay[] = [
      { date: todayStr, count: 5 },
      { date: thirtyDaysAgoStr, count: 2 },
    ];

    const result = calculateStreak(days, 10, "2023-01-01");

    expect(result.graph).toHaveLength(30);
    expect(result.graph[0]).toBe(2); // first day
    expect(result.graph[29]).toBe(5); // last day (today)
    expect(result.graph.filter((g) => g > 0)).toHaveLength(2); // only 2 days with contributions
  });
});
