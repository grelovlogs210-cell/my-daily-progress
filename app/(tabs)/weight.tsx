import { StyleSheet, Text, View } from "react-native";
import { WeightTrendCard } from "../../components/weight/WeightTrendCard";
import { Card } from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { profile, weightHistory, weightLogs } from "../../lib/mock-data";
import { theme } from "../../constants/theme";

export default function WeightScreen() {
  const progress = ((130 - profile.currentWeightKg) / (130 - profile.targetWeightKg)) * 100;

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Evolucao"
        title="Peso"
        subtitle="Peso atual 120kg, meta 100kg e uma lista mockada de registros para a futura timeline."
      />

      <WeightTrendCard data={weightHistory} />

      <Card>
        <Text style={styles.goalLabel}>Meta atual</Text>
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Chegar a {profile.targetWeightKg} kg</Text>
          <Text style={styles.goalPercent}>{progress.toFixed(0)}%</Text>
        </View>
        <View style={styles.goalTrack}>
          <View style={[styles.goalFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.rangeRow}>
          <Text style={styles.rangeText}>Inicio 130kg</Text>
          <Text style={styles.rangeText}>Atual 120kg</Text>
          <Text style={styles.rangeText}>Meta 100kg</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.logsTitle}>Registros mockados</Text>
        {weightLogs.map((log) => (
          <View key={log.id} style={styles.logRow}>
            <View>
              <Text style={styles.logDate}>{log.dateLabel}</Text>
              <Text style={styles.logNote}>{log.note}</Text>
            </View>
            <Text style={styles.logWeight}>{log.weightKg}kg</Text>
          </View>
        ))}
      </Card>

      <PrimaryButton>Registrar peso</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  goalLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  goalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 10,
  },
  goalText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  goalPercent: {
    color: theme.colors.brandDark,
    fontSize: 18,
    fontWeight: "800",
  },
  goalTrack: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    height: 12,
    overflow: "hidden",
  },
  goalFill: {
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.pill,
    height: "100%",
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  rangeText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  logsTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  logRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  logDate: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  logNote: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  logWeight: {
    color: theme.colors.brandDark,
    fontSize: 16,
    fontWeight: "800",
  },
});
