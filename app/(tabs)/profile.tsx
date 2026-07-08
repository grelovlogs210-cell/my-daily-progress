import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { dailyGoals as mockGoals, profile as mockProfile } from "../../lib/mock-data";
import { theme } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import { goalsService } from "../../services/goals.service";
import { profileService } from "../../services/profile.service";
import type { DailyGoals, Profile } from "../../types/health";

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [goals, setGoals] = useState<DailyGoals>(mockGoals);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([profileService.getProfile(session), goalsService.getGoals(session)])
      .then(([profileData, goalsData]) => {
        if (!mounted) return;
        setProfile(profileData);
        setGoals(goalsData);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [session]);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Conta"
        title="Perfil e metas"
        subtitle="Profile e metas ja tentam ler do Supabase. Se ainda nao existir dado real, o app usa fallback mockado."
      />

      <Card>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>
      </Card>

      {isLoading ? <ActivityIndicator color={theme.colors.brandDark} /> : null}

      <Card>
        <InfoRow label="Objetivo" value={profile.goalLabel} />
        <InfoRow label="Calorias" value={`${goals.kcal} kcal`} />
        <InfoRow label="Proteina" value={`${goals.protein} g`} />
        <InfoRow label="Gordura" value={`${goals.fat} g`} />
        <InfoRow label="Fibra" value={`${goals.fiber} g`} />
        <InfoRow label="Agua" value={`${goals.waterMl / 1000} L`} />
        <InfoRow label="Peso alvo" value={`${profile.targetWeightKg} kg`} />
        <InfoRow label="Altura" value={profile.heightLabel} />
      </Card>

      <Pressable style={styles.linkCard}>
        <Text style={styles.linkTitle}>Sessao atual</Text>
        <Text style={styles.linkSubtitle}>{session?.user.email ?? "Sem usuario autenticado"}</Text>
      </Pressable>

      <PrimaryButton onPress={signOut} variant="secondary">Sair</PrimaryButton>
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
