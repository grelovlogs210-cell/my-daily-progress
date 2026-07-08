import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

function getMissingClientError() {
  return { error: { message: "Supabase nao configurado." } };
}

export const authService = {
  async getSession() {
    if (!supabase) {
      return { data: { session: null }, error: null };
    }
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!supabase) {
      return {
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
      };
    }
    return supabase.auth.onAuthStateChange(callback);
  },

  async signIn(email: string, password: string) {
    if (!supabase) {
      return getMissingClientError();
    }
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp(name: string, email: string, password: string) {
    if (!supabase) {
      return { data: { session: null, user: null }, error: { message: "Supabase nao configurado." } };
    }
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
  },

  async signOut() {
    if (!supabase) {
      return { error: null };
    }
    return supabase.auth.signOut();
  },
};
