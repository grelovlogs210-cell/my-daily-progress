import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../lib/supabase";

export function shouldUseFallback(session: Session | null) {
  return !isSupabaseConfigured || !session?.user;
}
