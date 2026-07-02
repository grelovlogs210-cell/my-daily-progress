import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MacroCard } from "../../components/dashboard/MacroCard";
import { MealPreviewCard } from "../../components/dashboard/MealPreviewCard";
import { StatCard } from "../../components/dashboard/StatCard";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Screen } from "../../components/ui/Screen";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { theme } from "../../constants/theme";

export default function DashboardScreen() {
  const router = useRouter();
  const { dailyGoals, dashboardStats, meals, profile, todayTotals, workoutLogs } = useDashboardData();
  const remaining = dailyGoals.kcal - todayTotals.kcal;
  const progress = todayTotals.kcal / dailyGoals.kcal;
  const latestWorkout = workoutLogs[0];

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Bom dia, Lucas</Text>
          <Text style={styles.title}>Hoje</Text>
        </View>
        <Pressable onPress={() => router.push("/(tabs)/profile")} style={styles.avatar}>
          <Text style={styles.avatarText}>LM</Text>
        </Pressable>
      </View>

      <LinearGradient colors={[theme.colors.brand, "#90F2AE"]} style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroEyebrow}>Calorias restantes</Text>
            <Text style={styles.heroValue}>{remaining} kcal</Text>
          </View>
          <Text style={styles.heroGoal}>Meta {dailyGoals.kcal}</Text>
        </View>
        <ProgressBar color={theme.colors.brandDark} progress={progress} />
        <View style={styles.heroMetricRow}>
          <View>
            <Text style={styles.heroMetricLabel}>Fibra</Text>
            <Text style={styles.heroMetricValue}>{todayTotals.fiber}g</Text>
          </View>
          <View>
            <Text style={styles.heroMetricLabel}>Agua</Text>
            <Text style={styles.heroMetricValue}>2.8L</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Macros do dia</Text>
        <Pressable onPress={() => router.push("/(tabs)/profile")}>
          <Text style={styles.sectionLink}>Ver metas</Text>
        </Pressable>
      </View>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <MacroCard goal={dailyGoals.protein} label="Proteina" value={todayTotals.protein} />
        </View>
        <View style={styles.gridItem}>
          <MacroCard accentColor={theme.colors.accent} goal={dailyGoals.carbs} label="Carboidratos" value={todayTotals.carbs} />
        </View>
        <View style={styles.gridItem}>
          <MacroCard accentColor={theme.colors.fat} goal={dailyGoals.fat} label="Gorduras" value={todayTotals.fat} />
        </View>
        <View style={styles.gridItem}>
          <MacroCard accentColor={theme.colors.water} goal={dailyGoals.fiber} label="Fibra" value={todayTotals.fiber} />
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Panorama rapido</Text>
      </View>
      <View style={styles.grid}>
        {dashboardStats.map((stat) => (
          <View key={stat.id} style={styles.gridItem}>
            <StatCard helper={stat.helper} label={stat.label} tone={stat.tone} value={stat.value} />
          </View>
        ))}
      </View>

      <View style={styles.summaryStrip}>
        <View>
          <Text style={styles.summaryLabel}>Peso atual</Text>
          <Text style={styles.summaryValue}>{profile.currentWeightKg}kg</Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Habitos</Text>
          <Text style={styles.summaryValue}>4/6</Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Ultimo treino</Text>
          <Text style={styles.summaryValueSmall}>{latestWorkout.title}</Text>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Refeicoes de hoje</Text>
      </View>
      {meals.filter((meal) => meal.loggedAt.startsWith("2026-07-01")).map((meal) => (
        <MealPreviewCard key={meal.id} meal={meal} />
      ))}

      <View style={styles.quickActions}>
        <PrimaryButton onPress={() => router.push("/food/capture")}>Registrar comida por foto</PrimaryButton>
        <PrimaryButton onPress={() => router.push("/food/text-entry")} variant="secondary">
          Registrar comida por texto
        </PrimaryButton>
      </View>

      <Pressable onPress={() => router.push("/exercises")} style={styles.exerciseLink}>
        <View style={styles.exerciseIcon}>
          <Ionicons color={theme.colors.brandDark} name="barbell-outline" size={18} />
        </View>
        <View style={styles.exerciseText}>
          <Text style={styles.exerciseTitle}>Treinos do dia</Text>
          <Text style={styles.exerciseSubtitle}>Treino A, Treino B, Cardio e Kitesurf</Text>
        </View>
        <Ionicons color={theme.colors.textMuted} name="chevron-forward" size={18} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.9,
    marginTop: 2,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: theme.colors.brandSoft,
    borderRadius: 999,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  avatarText: {
    color: theme.colors.brandDark,
    fontSize: 14,
    fontWeight: "800",
  },
  hero: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
  },
  heroTop: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroEyebrow: {
    color: theme.colors.brandDark,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroValue: {
    color: theme.colors.brandDark,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,
    marginTop: 6,
  },
  heroGoal: {
    color: theme.colors.brandDark,
    fontSize: 12,
    fontWeight: "700",
  },
  heroMetricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroMetricLabel: {
    color: theme.colors.brandDark,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroMetricValue: {
    color: theme.colors.brandDark,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  sectionHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  sectionLink: {
    color: theme.colors.brandDark,
    fontSize: 12,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  gridItem: {
    width: "47.5%",
  },
  summaryStrip: {
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: theme.radius.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.lg,
  },
  summaryLabel: {
    color: "rgba(246,250,247,0.72)",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  summaryValue: {
    color: theme.colors.textOnDark,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
  summaryValueSmall: {
    color: theme.colors.textOnDark,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
  },
  quickActions: {
    gap: theme.spacing.md,
  },
  exerciseLink: {
    alignItems: "center",
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.xl,
    flexDirection: "row",
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  exerciseIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  exerciseText: {
    flex: 1,
    gap: 2,
  },
  exerciseTitle: {
    color: theme.colors.brandDark,
    fontSize: 15,
    fontWeight: "800",
  },
  exerciseSubtitle: {
    color: theme.colors.brandDark,
    fontSize: 12,
    opacity: 0.74,
  },
});
