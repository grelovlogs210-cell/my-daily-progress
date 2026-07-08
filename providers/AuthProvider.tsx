import type { PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../lib/supabase";
import { authService } from "../services/auth.service";

type AuthContextValue = {
  isConfigured: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  authMessage: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null; message?: string }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setAuthMessage("Configure EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY para ativar o login real.");
      return;
    }

    authService
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          setAuthMessage(error.message);
        }
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      })
      .finally(() => setIsLoading(false));

    const { data: listener } = authService.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured: isSupabaseConfigured,
      isLoading,
      session,
      user,
      authMessage,
      async signIn(email, password) {
        if (!isSupabaseConfigured) {
          return { error: "Supabase nao configurado." };
        }

        const { error } = await authService.signIn(email, password);
        if (error) {
          setAuthMessage(error.message);
          return { error: error.message };
        }

        setAuthMessage(null);
        return { error: null };
      },
      async signUp(name, email, password) {
        if (!isSupabaseConfigured) {
          return { error: "Supabase nao configurado." };
        }

        const { data, error } = await authService.signUp(name, email, password);
        if (error) {
          setAuthMessage(error.message);
          return { error: error.message };
        }

        const message = data.session
          ? "Conta criada e sessao iniciada."
          : "Conta criada. Verifique o e-mail para confirmar o cadastro.";
        setAuthMessage(message);
        return { error: null, message };
      },
      async signOut() {
        if (!isSupabaseConfigured) {
          setSession(null);
          setUser(null);
          return;
        }
        await authService.signOut();
        setSession(null);
        setUser(null);
      },
    }),
    [authMessage, isLoading, session, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
