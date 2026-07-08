import type { Session } from "@supabase/supabase-js";
import { shouldUseFallback } from "./service-utils";

export const waterService = {
  async getTodayWaterTotal(_session: Session | null): Promise<number> {
    if (shouldUseFallback(_session)) {
      return 2800;
    }
    return 2800;
  },
};
