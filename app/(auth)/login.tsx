import { Link } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { TextField } from "../../components/ui/TextField";
import { theme } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const { authMessage, isConfigured, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setLocalMessage("Preencha e-mail e senha para entrar.");
      return;
    }

    setIsSubmitting(true);
    setLocalMessage(null);

    const result = await signIn(email.trim(), password);

    if (result.error) {
      setLocalMessage(result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <Screen>
      <View style={styles.brandRow}>
        <LinearGradient colors={[theme.colors.brand, "#8EF4B0"]} style={styles.logo}>
          <Text style={styles.logoText}>L</Text>
        </LinearGradient>
        <Text style={styles.brandName}>Lumen</Text>
      </View>

      <ScreenHeader
        eyebrow="Nutricao inteligente"
        title="Fotografe. Acompanhe. Evolua."
        subtitle="Agora com autenticacao real por e-mail e senha via Supabase, mantendo o resto do app em modo hibrido."
      />

      <View style={styles.form}>
        <TextField label="E-mail" onChangeText={setEmail} placeholder="voce@email.com" value={email} />
        <TextField label="Senha" onChangeText={setPassword} placeholder="********" secureTextEntry value={password} />

        {!isConfigured ? (
          <Text style={styles.warning}>Configure EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY.</Text>
        ) : null}
        {authMessage || localMessage ? <Text style={styles.message}>{localMessage || authMessage}</Text> : null}

        <PrimaryButton onPress={handleLogin} disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </PrimaryButton>

        <Link href="/(auth)/signup" asChild>
          <Pressable style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Criar conta com e-mail</Text>
          </Pressable>
        </Link>
      </View>

      {isSubmitting ? <ActivityIndicator color={theme.colors.brandDark} style={styles.spinner} /> : null}

      <Text style={styles.footerText}>
        Use e-mail e senha do Supabase Auth. Se a confirmacao por e-mail estiver ativa, confirme antes do primeiro
        login.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  logo: {
    alignItems: "center",
    borderRadius: 18,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  logoText: {
    color: theme.colors.brandDark,
    fontSize: 22,
    fontWeight: "800",
  },
  brandName: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  form: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  warning: {
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: "700",
  },
  message: {
    color: theme.colors.brandDark,
    fontSize: 12,
    lineHeight: 18,
  },
  spinner: {
    marginTop: theme.spacing.md,
  },
  linkButton: {
    alignItems: "center",
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  linkButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: "auto",
    paddingTop: theme.spacing.xxl,
    textAlign: "center",
  },
});
