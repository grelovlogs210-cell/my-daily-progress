import { StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";
import type { WeightPoint } from "../../types/health";

export function WeightTrendCard({ data }: { data: WeightPoint[] }) {
  const min = Math.min(...data.map((point) => point.weight));
  const max = Math.max(...data.map((point) => point.weight));
  const range = Math.max(max - min, 0.5);

  return (
    <Card>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Ultimos 7 dias</Text>
          <Text style={styles.title}>{data[data.length - 1]?.weight.toFixed(1)} kg</Text>
        </View>
        <Text style={styles.delta}>-1.2kg</Text>
      </View>

      <View style={styles.chart}>
        {data.map((point) => {
          const normalized = (point.weight - min) / range;
          const height = 28 + normalized * 72;
          return (
            <View key={point.day} style={styles.column}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.day}>{point.day}</Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginTop: 4,
  },
  delta: {
    color: theme.colors.brandDark,
    fontSize: 14,
    fontWeight: "800",
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 10,
    height: 132,
  },
  column: {
    alignItems: "center",
    flex: 1,
    gap: 8,
    justifyContent: "flex-end",
  },
  bar: {
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.pill,
    minHeight: 24,
    width: "100%",
  },
  day: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
});
