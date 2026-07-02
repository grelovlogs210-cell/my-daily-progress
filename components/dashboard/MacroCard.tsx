import { StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";

export function MacroCard({
  label,
  value,
  goal,
  accentColor,
}: {
  label: string;
  value: number;
  goal: number;
  accentColor?: string;
}) {
  const progress = Math.min(1, value / goal);

  return (
    <Card padded={false}>
      <View style={styles.card}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}g</Text>
        <Text style={styles.goal}>Meta {goal}g</Text>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${progress * 100}%`, backgroundColor: accentColor ?? theme.colors.brand },
            ]}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    minHeight: 124,
    padding: theme.spacing.lg,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  goal: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  track: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    height: 8,
    marginTop: "auto",
    overflow: "hidden",
  },
  fill: {
    borderRadius: theme.radius.pill,
    height: "100%",
  },
});
