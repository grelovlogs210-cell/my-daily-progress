import type { Session } from "@supabase/supabase-js";
import { dailyGoals as mockGoals } from "../lib/mock-data";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { DailyGoals } from "../types/health";

export const goalsService = {
  async getGoals(session: Session | null): Promise<DailyGoals> {
    if (!isSupabaseConfigured || !supabase || !session?.user) {
      return mockGoals;
    }

    const userId = session.user.id;

    const { data, error } = await supabase
      .from("daily_goals")
      .select("kcal_target,protein_g_target,carbs_g_target,fat_g_target,fiber_g_target,water_ml_target,date")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return mockGoals;
    }

    return {
      kcal: data.kcal_target,
      protein: data.protein_g_target,
      carbs: data.carbs_g_target,
      fat: data.fat_g_target,
      fiber: data.fiber_g_target,
      waterMl: data.water_ml_target,
    };
  },
};
