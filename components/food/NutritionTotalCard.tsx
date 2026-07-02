import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import type { Macros } from "../../types/health";

export function NutritionTotalCard({ totals }: { totals: Macros }) {
  const items = [
    { label: "kcal", value: totals.kcal.toString(), highlight: true },
    { label: "Prot", value: `${totals.protein}g` },
    { label: "Carb", value: `${totals.carbs}g` },
    { label: "Gord", value: `${totals.fat}g` },
    { label: "Fib", value: `${totals.fiber}g` },
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.label} style={[styles.cell, item.highlight && styles.highlight]}>
          <Text style={[styles.value, item.highlight && styles.highlightValue]}>{item.value}</Text>
          <Text style={[styles.label, item.highlight && styles.highlightLabel]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    flex: 1,
    gap: 4,
    paddingVertical: 12,
  },
  highlight: {
    backgroundColor: theme.colors.brand,
  },
  value: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  highlightValue: {
    color: theme.colors.brandDark,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  highlightLabel: {
    color: theme.colors.brandDark,
  },
});
