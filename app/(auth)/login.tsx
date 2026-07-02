import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { TextField } from "../../components/ui/TextField";
import { theme } from "../../constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        subtitle="Base mobile-first inspirada no Lovable, pronta para depois receber autenticacao, banco e IA."
      />

      <View style={styles.form}>
        <TextField label="E-mail" onChangeText={setEmail} placeholder="voce@email.com" value={email} />
        <TextField label="Senha" onChangeText={setPassword} placeholder="••••••••" secureTextEntry value={password} />
        <PrimaryButton onPress={() => router.replace("/(tabs)")}>Entrar</PrimaryButton>
      </View>

      <Text style={styles.footerText}>Fluxo mockado por enquanto. O onboarding entra depois com Supabase Auth.</Text>
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
  footerText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: "auto",
    paddingTop: theme.spacing.xxl,
    textAlign: "center",
  },
});
