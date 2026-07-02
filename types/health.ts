export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

export type FoodItem = {
  id: string;
  name: string;
  portionLabel: string;
  portionGrams: number;
  categoryLabel: string;
  confidence?: number;
  macros: Macros;
};

export type Meal = {
  id: string;
  title: string;
  timeLabel: string;
  loggedAt: string;
  source: "photo" | "text" | "manual";
  imageUri?: string;
  items: FoodItem[];
};

export type Habit = {
  id: string;
  label: string;
  targetLabel: string;
  currentLabel: string;
  progress: number;
  category: "water" | "movement" | "sleep" | "nutrition" | "mindset";
};

export type HabitChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type WeightPoint = {
  day: string;
  weight: number;
};

export type WeightLog = {
  id: string;
  dateLabel: string;
  weightKg: number;
  note: string;
};

export type DailyGoals = Macros & {
  waterMl: number;
};

export type Profile = {
  name: string;
  email: string;
  targetWeightKg: number;
  currentWeightKg: number;
  goalLabel: string;
  heightLabel: string;
};

export type WorkoutLog = {
  id: string;
  title: string;
  durationMin: number;
  caloriesBurned: number;
  intensity: "leve" | "moderada" | "forte";
  note: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  helper: string;
  tone?: "brand" | "water" | "accent" | "neutral";
};
