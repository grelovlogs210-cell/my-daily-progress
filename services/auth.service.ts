import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const authService = {
  async getSession() {
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp(name: string, email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};
