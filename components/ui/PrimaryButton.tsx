import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";

type PrimaryButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
}>;

export function PrimaryButton({
  children,
  onPress,
  variant = "primary",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View>
        <Text style={[styles.label, labelStyles[variant]]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: theme.colors.brand },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  ghost: { backgroundColor: theme.colors.surfaceMuted },
  danger: { backgroundColor: "#FDE8E6" },
});

const labelStyles = StyleSheet.create({
  primary: { color: theme.colors.brandDark },
  secondary: { color: theme.colors.text },
  ghost: { color: theme.colors.text },
  danger: { color: theme.colors.danger },
});

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: theme.radius.lg,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: theme.spacing.xl,
  },
  label: {
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
