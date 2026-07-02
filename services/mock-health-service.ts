import {
  dailyGoals,
  dashboardStats,
  detectedMeal,
  habitChecklist,
  habits,
  meals,
  profile,
  todayTotals,
  weightLogs,
  weightHistory,
  weeklyHistory,
  workoutLogs,
} from "../lib/mock-data";

export const mockHealthService = {
  getDashboardSnapshot() {
    return {
      dailyGoals,
      dashboardStats,
      habitChecklist,
      todayTotals,
      meals,
      profile,
      workoutLogs,
    };
  },
  getDetectedMeal() {
    return detectedMeal;
  },
  getHistory() {
    return meals;
  },
  getHabits() {
    return { habits, habitChecklist };
  },
  getWeightHistory() {
    return { weightHistory, weightLogs };
  },
  getProfile() {
    return { profile, dailyGoals };
  },
  getWorkoutLogs() {
    return workoutLogs;
  },
  getWeeklyHistory() {
    return weeklyHistory;
  },
};
