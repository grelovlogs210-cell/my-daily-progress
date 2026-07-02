import { StyleSheet, Text, View } from "react-native";
import { WorkoutLogCard } from "../../components/exercise/WorkoutLogCard";
import { Card } from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { workoutLogs } from "../../lib/mock-data";
import { theme } from "../../constants/theme";

export default function ExercisesScreen() {
  return (
    <Screen>
      <ScreenHeader
        back
        eyebrow="Treinos"
        title="Exercicios"
        subtitle="Treino A, Treino B, Cardio e Kitesurf com fluxo mockado de registro."
      />

      <Card>
        <Text style={styles.headline}>Resumo semanal</Text>
        <Text style={styles.value}>4 treinos · 1.730 kcal</Text>
        <View style={styles.tagRow}>
          {["Treino A", "Treino B", "Cardio", "Kitesurf"].map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </Card>

      {workoutLogs.map((workout) => (
        <WorkoutLogCard key={workout.id} workout={workout} />
      ))}

      <PrimaryButton>Registrar treino</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headline: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tagText: {
    color: theme.colors.brandDark,
    fontSize: 11,
    fontWeight: "700",
  },
});
