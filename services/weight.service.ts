import type { Session } from "@supabase/supabase-js";
import { weightHistory, weightLogs } from "../lib/mock-data";
import type { WeightLog, WeightPoint } from "../types/health";
import { shouldUseFallback } from "./service-utils";

export const weightService = {
  async listWeightHistory(_session: Session | null): Promise<WeightPoint[]> {
    return weightHistory;
  },
  async listWeightLogs(_session: Session | null): Promise<WeightLog[]> {
    if (shouldUseFallback(_session)) {
      return weightLogs;
    }
    return weightLogs;
  },
};
