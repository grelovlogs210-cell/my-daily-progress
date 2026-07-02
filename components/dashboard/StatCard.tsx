import { StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";
import { theme } from "../../constants/theme";

export function StatCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: string;
  helper: string;
  tone?: "brand" | "water" | "accent" | "neutral";
}) {
  return (
    <Card padded={false}>
      <View style={[styles.inner, toneStyles[tone]]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.helper}>{helper}</Text>
      </View>
    </Card>
  );
}

const toneStyles = StyleSheet.create({
  brand: { backgroundColor: theme.colors.brandSoft },
  water: { backgroundColor: "#EAF5FD" },
  accent: { backgroundColor: "#FFF3D9" },
  neutral: { backgroundColor: theme.colors.surface },
});

const styles = StyleSheet.create({
  inner: {
    borderRadius: theme.radius.xl,
    minHeight: 108,
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
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
  },
  helper: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});
