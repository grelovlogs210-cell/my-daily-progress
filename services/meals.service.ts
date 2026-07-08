import type { Session } from "@supabase/supabase-js";
import { meals } from "../lib/mock-data";
import type { Meal } from "../types/health";
import { shouldUseFallback } from "./service-utils";

export const mealsService = {
  async listMeals(_session: Session | null): Promise<Meal[]> {
    return meals;
  },
  async listTodayMeals(_session: Session | null): Promise<Meal[]> {
    if (shouldUseFallback(_session)) {
      return meals.filter((meal) => meal.loggedAt.startsWith("2026-07-01"));
    }
    return meals.filter((meal) => meal.loggedAt.startsWith("2026-07-01"));
  },
};
