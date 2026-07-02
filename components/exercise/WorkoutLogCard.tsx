import { StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";
import type { WorkoutLog } from "../../types/health";

export function WorkoutLogCard({ workout }: { workout: WorkoutLog }) {
  return (
    <Card>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Text style={styles.title}>{workout.title}</Text>
          <Text style={styles.note}>{workout.note}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{workout.intensity}</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <Metric label="Duracao" value={`${workout.durationMin} min`} />
        <Metric label="Gasto" value={`${workout.caloriesBurned} kcal`} />
      </View>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: theme.spacing.md,
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  note: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: theme.colors.brandDark,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  metrics: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  metric: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    flex: 1,
    padding: theme.spacing.md,
  },
  metricLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
});
