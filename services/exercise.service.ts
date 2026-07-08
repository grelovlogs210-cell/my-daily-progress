import type { Session } from "@supabase/supabase-js";
import { workoutLogs } from "../lib/mock-data";
import type { WorkoutLog } from "../types/health";
import { shouldUseFallback } from "./service-utils";

export const exerciseService = {
  async listWorkoutLogs(_session: Session | null): Promise<WorkoutLog[]> {
    if (shouldUseFallback(_session)) {
      return workoutLogs;
    }
    return workoutLogs;
  },
};
