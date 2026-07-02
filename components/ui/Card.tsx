import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

type CardProps = PropsWithChildren<{
  padded?: boolean;
  elevated?: boolean;
}>;

export function Card({ children, padded = true, elevated = true }: CardProps) {
  return <View style={[styles.card, padded && styles.padded, elevated && styles.elevated]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
  },
  padded: {
    padding: theme.spacing.xl,
  },
  elevated: theme.shadow.card,
});
