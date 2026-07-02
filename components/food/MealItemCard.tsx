import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";
import type { FoodItem } from "../../types/health";

type MealItemCardProps = {
  item: FoodItem;
  editable?: boolean;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onRemove?: () => void;
};

export function MealItemCard({
  item,
  editable = false,
  onDecrease,
  onIncrease,
  onRemove,
}: MealItemCardProps) {
  return (
    <Card>
      <View style={styles.topRow}>
        <View style={styles.meta}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.portionLabel} · {item.categoryLabel}
          </Text>
        </View>
        <View style={styles.kcalBadge}>
          <Text style={styles.kcalValue}>{item.macros.kcal}</Text>
          <Text style={styles.kcalLabel}>kcal</Text>
        </View>
      </View>

      <View style={styles.macroRow}>
        <MacroPill label="Prot" value={`${item.macros.protein}g`} />
        <MacroPill label="Carb" value={`${item.macros.carbs}g`} />
        <MacroPill label="Gord" value={`${item.macros.fat}g`} />
        <MacroPill label="Fib" value={`${item.macros.fiber}g`} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.confidenceBadge}>
          <Ionicons color={theme.colors.brandDark} name="sparkles-outline" size={12} />
          <Text style={styles.confidenceText}>{Math.round((item.confidence ?? 0.5) * 100)}% confianca</Text>
        </View>

        {editable ? (
          <View style={styles.controls}>
            <Pressable onPress={onDecrease} style={styles.controlButton}>
              <Ionicons color={theme.colors.text} name="remove" size={18} />
            </Pressable>
            <Pressable onPress={onIncrease} style={styles.controlButton}>
              <Ionicons color={theme.colors.text} name="add" size={18} />
            </Pressable>
            <Pressable onPress={onRemove} style={[styles.controlButton, styles.removeButton]}>
              <Ionicons color={theme.colors.danger} name="trash-outline" size={18} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </Card>
  );
}

function MacroPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.macroPill}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValue}>{value}</Text>
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
  meta: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  kcalBadge: {
    alignItems: "flex-end",
  },
  kcalValue: {
    color: theme.colors.brandDark,
    fontSize: 20,
    fontWeight: "800",
  },
  kcalLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    textTransform: "uppercase",
  },
  macroRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: theme.spacing.lg,
  },
  macroPill: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    minWidth: 68,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  macroLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  macroValue: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
  bottomRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.lg,
  },
  confidenceBadge: {
    alignItems: "center",
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.pill,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  confidenceText: {
    color: theme.colors.brandDark,
    fontSize: 11,
    fontWeight: "700",
  },
  controls: {
    flexDirection: "row",
    gap: 8,
  },
  controlButton: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  removeButton: {
    backgroundColor: "#FDE8E6",
  },
});
