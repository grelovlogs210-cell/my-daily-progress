import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { HabitCheckItem } from "../../components/habits/HabitCheckItem";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { habitChecklist, habits as mockHabits } from "../../lib/mock-data";
import { theme } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import { habitsService } from "../../services/habits.service";
import type { Habit, HabitChecklistItem } from "../../types/health";

export default function HabitsScreen() {
  const { session } = useAuth();
  const [items, setItems] = useState<HabitChecklistItem[]>(habitChecklist);
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    habitsService
      .getHabits(session)
      .then((data) => {
        if (!mounted) return;
        setHabits(data.habits);
        setItems(data.checklist.length ? data.checklist : habitChecklist);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [session]);

  const completedCount = items.filter((item) => item.checked).length;

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Rotina"
        title="Habitos do dia"
        subtitle="Habitos tentam ler do Supabase. Se ainda nao houver dados, o app continua com checklist mockado."
      />

      <Card>
        <Text style={styles.waterLabel}>Agua de hoje</Text>
        <Text style={styles.waterValue}>2.8L / 4L</Text>
        <View style={styles.waterGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <View key={index} style={[styles.waterDot, index < 6 && styles.waterDotActive]} />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.listTitle}>Checklist</Text>
        <Text style={styles.listSubtitle}>{completedCount} de {items.length} concluidos</Text>
        {isLoading ? <ActivityIndicator color={theme.colors.brandDark} style={styles.loader} /> : null}
        {items.map((item) => (
          <HabitCheckItem
            item={item}
            key={item.id}
            onToggle={() =>
              setItems((current) =>
                current.map((entry) => (entry.id === item.id ? { ...entry, checked: !entry.checked } : entry))
              )
            }
          />
        ))}
      </Card>

      <Card>
        <Text style={styles.listTitle}>Resumo rapido</Text>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitSummaryRow}>
            <Text style={styles.habitSummaryLabel}>{habit.label}</Text>
            <Text style={styles.habitSummaryValue}>
              {habit.currentLabel} / {habit.targetLabel}
            </Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  waterLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  waterValue: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
  },
  waterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 20,
  },
  waterDot: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
    height: 38,
    width: 34,
  },
  waterDotActive: {
    backgroundColor: theme.colors.water,
  },
  listTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  listSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  loader: {
    marginBottom: 10,
  },
  habitSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  habitSummaryLabel: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  habitSummaryValue: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
});
