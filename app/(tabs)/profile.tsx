import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { dailyGoals, profile } from "../../lib/mock-data";
import { theme } from "../../constants/theme";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Conta"
        title="Perfil e metas"
        subtitle="Visao mockada das metas nutricionais e fisicas que vao para o banco na proxima fase."
      />

      <Card>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LM</Text>
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <InfoRow label="Objetivo" value={profile.goalLabel} />
        <InfoRow label="Calorias" value={`${dailyGoals.kcal} kcal`} />
        <InfoRow label="Proteina" value={`${dailyGoals.protein} g`} />
        <InfoRow label="Gordura" value={`${dailyGoals.fat} g`} />
        <InfoRow label="Fibra" value={`${dailyGoals.fiber} g`} />
        <InfoRow label="Agua" value={`${dailyGoals.waterMl / 1000} L`} />
        <InfoRow label="Peso alvo" value={`${profile.targetWeightKg} kg`} />
        <InfoRow label="Altura" value={profile.heightLabel} />
      </Card>

      <Pressable onPress={() => router.push("/exercises")} style={styles.linkCard}>
        <Text style={styles.linkTitle}>Ver mock de exercicios</Text>
        <Text style={styles.linkSubtitle}>A navegacao de stack continua pronta para essa area.</Text>
      </Pressable>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.lg,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: theme.colors.brand,
    borderRadius: 999,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  avatarText: {
    color: theme.colors.brandDark,
    fontSize: 18,
    fontWeight: "800",
  },
  profileMeta: {
    gap: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  email: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  infoValue: {
    color: theme.colors.brandDark,
    fontSize: 14,
    fontWeight: "700",
  },
  linkCard: {
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.xl,
    gap: 6,
    padding: theme.spacing.xl,
  },
  linkTitle: {
    color: theme.colors.brandDark,
    fontSize: 16,
    fontWeight: "800",
  },
  linkSubtitle: {
    color: theme.colors.brandDark,
    fontSize: 12,
    opacity: 0.72,
  },
});
