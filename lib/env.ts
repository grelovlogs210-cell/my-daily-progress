const runtimeEnv = typeof process !== "undefined" ? process.env : undefined;

function sanitizeEnvValue(value?: string) {
  if (!value) return "";

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function isValidHttpUrl(value: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const supabaseUrl = sanitizeEnvValue(runtimeEnv?.EXPO_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = sanitizeEnvValue(runtimeEnv?.EXPO_PUBLIC_SUPABASE_ANON_KEY);

function isConfiguredValue(value: string) {
  return value.length > 0;
}

const isSupabaseUrlConfigured = isConfiguredValue(supabaseUrl) && isValidHttpUrl(supabaseUrl);
const isSupabaseAnonKeyConfigured = isConfiguredValue(supabaseAnonKey);

export const envStatus = {
  isSupabaseUrlConfigured,
  isSupabaseAnonKeyConfigured,
  missingVariables: [
    !isSupabaseUrlConfigured ? "EXPO_PUBLIC_SUPABASE_URL" : null,
    !isSupabaseAnonKeyConfigured ? "EXPO_PUBLIC_SUPABASE_ANON_KEY" : null,
  ].filter(Boolean) as string[],
};

export const env = {
  supabaseUrl,
  supabaseAnonKey,
};

export const envMessages = {
  missingVariables:
    envStatus.missingVariables.length > 0
      ? `Variaveis ausentes ou invalidas: ${envStatus.missingVariables.join(", ")}`
      : null,
  invalidSupabaseUrl:
    isConfiguredValue(supabaseUrl) && !isValidHttpUrl(supabaseUrl)
      ? "EXPO_PUBLIC_SUPABASE_URL deve ser uma URL HTTP ou HTTPS valida."
      : null,
};

export const isSupabaseConfigured = envStatus.isSupabaseUrlConfigured && envStatus.isSupabaseAnonKeyConfigured;

if (__DEV__) {
  console.info(`Supabase URL configurada: ${isSupabaseUrlConfigured ? "sim" : "nao"}`);
  console.info(`Supabase anon key configurada: ${isSupabaseAnonKeyConfigured ? "sim" : "nao"}`);
}
