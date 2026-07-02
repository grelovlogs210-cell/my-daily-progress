import { StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";
import type { Meal } from "../../types/health";
import { sumMacros } from "../../lib/mock-data";

export function MealPreviewCard({ meal, compact = false }: { meal: Meal; compact?: boolean }) {
  const total = sumMacros(meal.items);

  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.leadTag}>
          <Text style={styles.leadTagText}>{meal.source.toUpperCase()}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.title}>{meal.title}</Text>
          <Text style={styles.subtitle}>
            {meal.timeLabel} · {meal.items.length} itens
          </Text>
        </View>
        <View style={styles.kcalWrap}>
          <Text style={styles.kcal}>{total.kcal}</Text>
          <Text style={styles.kcalLabel}>kcal</Text>
        </View>
      </View>

      {!compact ? (
        <View style={styles.itemRow}>
          {meal.items.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.itemChip}>
              <Text style={styles.itemChipText}>{item.name}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  leadTag: {
    alignItems: "center",
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  leadTagText: {
    color: theme.colors.brandDark,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  kcalWrap: {
    alignItems: "flex-end",
    gap: 2,
  },
  kcal: {
    color: theme.colors.brandDark,
    fontSize: 18,
    fontWeight: "800",
  },
  kcalLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    textTransform: "uppercase",
  },
  itemRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: theme.spacing.lg,
  },
  itemChip: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  itemChipText: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
});
