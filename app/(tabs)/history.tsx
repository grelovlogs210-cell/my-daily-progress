import { StyleSheet, Text, View } from "react-native";
import { MealPreviewCard } from "../../components/dashboard/MealPreviewCard";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { weeklyHistory } from "../../lib/mock-data";
import { theme } from "../../constants/theme";

export default function HistoryScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Historico"
        title="Suas refeicoes"
        subtitle="Lista mockada com totais do dia e visao semanal para a futura timeline real."
      />

      {weeklyHistory.map((group) => (
        <View key={group.id} style={styles.group}>
          <Card>
            <View style={styles.groupHeader}>
              <View>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <Text style={styles.groupSubtitle}>{group.meals.length} refeicoes</Text>
              </View>
              <Text style={styles.groupTotal}>{group.totalKcal} kcal</Text>
            </View>
          </Card>

          {group.meals.map((meal) => (
            <MealPreviewCard compact key={`${group.id}-${meal.id}`} meal={meal} />
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: theme.spacing.md,
  },
  groupHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  groupSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  groupTotal: {
    color: theme.colors.brandDark,
    fontSize: 18,
    fontWeight: "800",
  },
});
