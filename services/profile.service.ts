import type { Session } from "@supabase/supabase-js";
import { profile as mockProfile } from "../lib/mock-data";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Profile } from "../types/health";

type ProfileRow = {
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  goal_type: string | null;
  current_weight_kg: number | null;
  target_weight_kg: number | null;
  height_cm: number | null;
};

function mapProfile(row: ProfileRow, email: string): Profile {
  const heightValue = row.height_cm ? `${(row.height_cm / 100).toFixed(2).replace(".", ",")} m` : mockProfile.heightLabel;
  const goalLabelMap: Record<string, string> = {
    weight_loss: "Perder peso",
    maintenance: "Manter peso",
    muscle_gain: "Ganhar massa",
  };

  return {
    name: row.name || mockProfile.name,
    email,
    targetWeightKg: row.target_weight_kg ?? mockProfile.targetWeightKg,
    currentWeightKg: row.current_weight_kg ?? mockProfile.currentWeightKg,
    goalLabel: goalLabelMap[row.goal_type ?? ""] || mockProfile.goalLabel,
    heightLabel: heightValue,
  };
}

export const profileService = {
  async getProfile(session: Session | null): Promise<Profile> {
    if (!isSupabaseConfigured || !supabase || !session?.user) {
      return mockProfile;
    }

    const userId = session.user.id;
    const userEmail = session.user.email ?? mockProfile.email;

    const { data, error } = await supabase
      .from("profiles")
      .select("name,email,avatar_url,goal_type,current_weight_kg,target_weight_kg,height_cm")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) {
      return { ...mockProfile, email: userEmail };
    }

    return mapProfile(data, userEmail);
  },
};
