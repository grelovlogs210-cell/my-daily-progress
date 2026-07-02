import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../constants/theme";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

export function TextField({
  label,
  placeholder,
  secureTextEntry,
  multiline,
  value,
  onChangeText,
}: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={secureTextEntry}
        style={[styles.input, multiline && styles.multiline]}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    minHeight: 56,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  multiline: {
    minHeight: 128,
    textAlignVertical: "top",
  },
});
