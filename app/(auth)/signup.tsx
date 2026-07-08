import { Link } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { TextField } from "../../components/ui/TextField";
import { theme } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";

export default function SignupScreen() {
  const { authMessage, isConfigured, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    setLocalMessage(null);
    const result = await signUp(name.trim(), email.trim(), password);
    if (result.error) {
      setLocalMessage(result.error);
    } else if (result.message) {
      setLocalMessage(result.message);
    }
    setIsLoading(false);
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
        back
        eyebrow="Cadastro"
        title="Criar conta"
        subtitle="Crie um usuario real no Supabase Auth. O trigger ja cria profile, metas e habitos padrao."
      />

      <View style={styles.form}>
        <TextField label="Nome" onChangeText={setName} placeholder="Seu nome" value={name} />
        <TextField label="E-mail" onChangeText={setEmail} placeholder="voce@email.com" value={email} />
        <TextField label="Senha" onChangeText={setPassword} placeholder="********" secureTextEntry value={password} />
        {!isConfigured ? <Text style={styles.warning}>Configure o Supabase antes de testar o cadastro real.</Text> : null}
        {authMessage || localMessage ? <Text style={styles.message}>{localMessage || authMessage}</Text> : null}
        <PrimaryButton disabled={isLoading} onPress={handleSignup}>
          {isLoading ? "Criando conta..." : "Criar conta"}
        </PrimaryButton>
      </View>

      {isLoading ? <ActivityIndicator color={theme.colors.brandDark} style={styles.spinner} /> : null}

      <Text style={styles.footerText}>
        Ja tem conta? <Link href="/(auth)/login" style={styles.footerLink}>Entrar</Link>
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
  footerText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: "auto",
    paddingTop: theme.spacing.xxl,
    textAlign: "center",
  },
  footerLink: {
    color: theme.colors.brandDark,
    fontWeight: "700",
  },
});
