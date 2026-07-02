import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import type { HabitChecklistItem } from "../../types/health";

export function HabitCheckItem({
  item,
  onToggle,
}: {
  item: HabitChecklistItem;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.checkCircle, item.checked && styles.checkCircleActive]}>
        {item.checked ? <Ionicons color={theme.colors.textOnDark} name="checkmark" size={14} /> : null}
      </View>
      <Text style={[styles.label, item.checked && styles.labelChecked]}>{item.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.md,
    paddingVertical: 10,
  },
  checkCircle: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 999,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkCircleActive: {
    backgroundColor: theme.colors.brandDark,
    borderColor: theme.colors.brandDark,
  },
  label: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  labelChecked: {
    color: theme.colors.textMuted,
  },
});
