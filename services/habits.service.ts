import type { Session } from "@supabase/supabase-js";
import { habitChecklist, habits as mockHabits } from "../lib/mock-data";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Database } from "../types/database";
import type { Habit, HabitChecklistItem } from "../types/health";

type HabitRow = Database["public"]["Tables"]["habits"]["Row"];
type HabitLogRow = Database["public"]["Tables"]["habit_logs"]["Row"];

const categoryByName: Record<string, Habit["category"]> = {
  "beber agua": "water",
  treinar: "movement",
  caminhar: "movement",
  "dormir cedo": "sleep",
  estudar: "mindset",
  "nao pedir besteira": "nutrition",
};

function resolveCategory(name: string, index: number): Habit["category"] {
  const key = name.trim().toLowerCase();
  return categoryByName[key] || mockHabits[index % mockHabits.length]?.category || "mindset";
}

function mapHabits(rows: HabitRow[], logs: HabitLogRow[]): { habits: Habit[]; checklist: HabitChecklistItem[] } {
  const logMap = new Map(logs.map((log) => [log.habit_id, log]));

  const mappedHabits = rows.map((row, index) => {
    const log = logMap.get(row.id);
    const targetValue = row.target_value ? `${row.target_value}${row.unit ? ` ${row.unit}` : ""}` : "Meta diaria";

    return {
      id: row.id,
      label: row.name,
      targetLabel: targetValue,
      currentLabel: log?.completed ? "Feito" : "Pendente",
      progress: log?.completed ? 1 : 0.25,
      category: resolveCategory(row.name, index),
    } satisfies Habit;
  });

  const checklist = rows.map((row) => ({
    id: row.id,
    label: row.name,
    checked: Boolean(logMap.get(row.id)?.completed),
  }));

  return { habits: mappedHabits, checklist };
}

export const habitsService = {
  async getHabits(session: Session | null): Promise<{ habits: Habit[]; checklist: HabitChecklistItem[] }> {
    if (!isSupabaseConfigured || !supabase || !session?.user) {
      return { habits: mockHabits, checklist: habitChecklist };
    }

    const userId = session.user.id;

    const { data: habitsData, error: habitsError } = await supabase
      .from("habits")
      .select("id,name,icon,unit,target_value,frequency,is_active,created_at")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (habitsError || !habitsData?.length) {
      return { habits: mockHabits, checklist: habitChecklist };
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: logsData } = await supabase
      .from("habit_logs")
      .select("habit_id,completed,value,date")
      .eq("user_id", userId)
      .eq("date", today);

    return mapHabits(habitsData as HabitRow[], (logsData ?? []) as HabitLogRow[]);
  },
};
