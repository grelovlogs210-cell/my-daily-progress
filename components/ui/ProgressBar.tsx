import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

export function ProgressBar({ progress, color = theme.colors.brand }: { progress: number; color?: string }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(1, progress)) * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    height: 8,
    overflow: "hidden",
  },
  fill: {
    borderRadius: theme.radius.pill,
    height: "100%",
  },
});
