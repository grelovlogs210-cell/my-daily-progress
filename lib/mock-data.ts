import type {
  DailyGoals,
  DashboardStat,
  Habit,
  HabitChecklistItem,
  Meal,
  Macros,
  Profile,
  WeightLog,
  WeightPoint,
  WorkoutLog,
} from "../types/health";

export const dailyGoals: DailyGoals = {
  kcal: 2400,
  protein: 180,
  carbs: 255,
  fat: 84,
  fiber: 34,
  waterMl: 4000,
};

export const todayTotals: Macros = {
  kcal: 1865,
  protein: 142,
  carbs: 167,
  fat: 61,
  fiber: 21,
};

export const meals: Meal[] = [
  {
    id: "meal-1",
    title: "Cafe da manha",
    timeLabel: "07:40",
    loggedAt: "2026-07-01T07:40:00.000Z",
    source: "manual",
    items: [
      {
        id: "item-1",
        name: "Ovos mexidos",
        portionLabel: "2 unid.",
        portionGrams: 120,
        categoryLabel: "Proteina",
        macros: { kcal: 180, protein: 14, carbs: 2, fat: 12, fiber: 0 },
      },
      {
        id: "item-2",
        name: "Pao frances",
        portionLabel: "1 unid.",
        portionGrams: 55,
        categoryLabel: "Carboidrato",
        macros: { kcal: 148, protein: 5, carbs: 28, fat: 2, fiber: 1 },
      },
      {
        id: "item-3",
        name: "Cafe preto",
        portionLabel: "200 ml",
        portionGrams: 200,
        categoryLabel: "Bebida",
        macros: { kcal: 5, protein: 0, carbs: 1, fat: 0, fiber: 0 },
      },
    ],
  },
  {
    id: "meal-2",
    title: "Almoco",
    timeLabel: "12:30",
    loggedAt: "2026-07-01T12:30:00.000Z",
    source: "photo",
    items: [
      {
        id: "item-4",
        name: "Salmao grelhado",
        portionLabel: "150 g",
        portionGrams: 150,
        categoryLabel: "Proteina",
        macros: { kcal: 312, protein: 31, carbs: 0, fat: 20, fiber: 0 },
      },
      {
        id: "item-5",
        name: "Quinoa cozida",
        portionLabel: "100 g",
        portionGrams: 100,
        categoryLabel: "Carboidrato",
        macros: { kcal: 120, protein: 4, carbs: 21, fat: 2, fiber: 3 },
      },
      {
        id: "item-6",
        name: "Brocolis no vapor",
        portionLabel: "80 g",
        portionGrams: 80,
        categoryLabel: "Vegetal",
        macros: { kcal: 28, protein: 2, carbs: 5, fat: 0, fiber: 3 },
      },
      {
        id: "item-7",
        name: "Azeite",
        portionLabel: "1 colher",
        portionGrams: 12,
        categoryLabel: "Gordura",
        macros: { kcal: 90, protein: 0, carbs: 0, fat: 10, fiber: 0 },
      },
    ],
  },
  {
    id: "meal-3",
    title: "Lanche da tarde",
    timeLabel: "16:10",
    loggedAt: "2026-07-01T16:10:00.000Z",
    source: "text",
    items: [
      {
        id: "item-8",
        name: "Iogurte grego",
        portionLabel: "170 g",
        portionGrams: 170,
        categoryLabel: "Proteina",
        macros: { kcal: 130, protein: 15, carbs: 8, fat: 4, fiber: 0 },
      },
      {
        id: "item-9",
        name: "Mirtilos",
        portionLabel: "80 g",
        portionGrams: 80,
        categoryLabel: "Fruta",
        macros: { kcal: 45, protein: 1, carbs: 12, fat: 0, fiber: 2 },
      },
    ],
  },
  {
    id: "meal-4",
    title: "Jantar",
    timeLabel: "20:15",
    loggedAt: "2026-06-30T20:15:00.000Z",
    source: "photo",
    items: [
      {
        id: "item-10",
        name: "Arroz",
        portionLabel: "140 g",
        portionGrams: 140,
        categoryLabel: "Carboidrato",
        macros: { kcal: 182, protein: 4, carbs: 39, fat: 1, fiber: 1 },
      },
      {
        id: "item-11",
        name: "Feijao",
        portionLabel: "120 g",
        portionGrams: 120,
        categoryLabel: "Leguminosa",
        macros: { kcal: 110, protein: 7, carbs: 19, fat: 1, fiber: 7 },
      },
      {
        id: "item-12",
        name: "Frango grelhado",
        portionLabel: "180 g",
        portionGrams: 180,
        categoryLabel: "Proteina",
        macros: { kcal: 315, protein: 42, carbs: 0, fat: 15, fiber: 0 },
      },
    ],
  },
];

export const detectedMeal: Meal = {
  id: "meal-detected",
  title: "Almoco detectado",
  timeLabel: "Agora",
  loggedAt: "2026-07-01T12:30:00.000Z",
  source: "photo",
  items: [
    {
      id: "det-1",
      name: "Salmao grelhado",
      portionLabel: "150 g",
      portionGrams: 150,
      categoryLabel: "Proteina",
      confidence: 0.89,
      macros: { kcal: 312, protein: 31, carbs: 0, fat: 20, fiber: 0 },
    },
    {
      id: "det-2",
      name: "Quinoa cozida",
      portionLabel: "100 g",
      portionGrams: 100,
      categoryLabel: "Carboidrato",
      confidence: 0.82,
      macros: { kcal: 120, protein: 4, carbs: 21, fat: 2, fiber: 3 },
    },
    {
      id: "det-3",
      name: "Brocolis no vapor",
      portionLabel: "80 g",
      portionGrams: 80,
      categoryLabel: "Vegetal",
      confidence: 0.78,
      macros: { kcal: 28, protein: 2, carbs: 5, fat: 0, fiber: 3 },
    },
    {
      id: "det-4",
      name: "Azeite extra virgem",
      portionLabel: "1 colher",
      portionGrams: 12,
      categoryLabel: "Gordura",
      confidence: 0.71,
      macros: { kcal: 90, protein: 0, carbs: 0, fat: 10, fiber: 0 },
    },
  ],
};

export const habits: Habit[] = [
  { id: "habit-water", label: "Agua", targetLabel: "4L", currentLabel: "2.8L", progress: 0.7, category: "water" },
  { id: "habit-steps", label: "Caminhada", targetLabel: "45 min", currentLabel: "32 min", progress: 0.71, category: "movement" },
  { id: "habit-sleep", label: "Sono", targetLabel: "Dormir 23h", currentLabel: "23:20", progress: 0.82, category: "sleep" },
  { id: "habit-workout", label: "Treino", targetLabel: "Treino do dia", currentLabel: "Feito", progress: 1, category: "nutrition" },
];

export const habitChecklist: HabitChecklistItem[] = [
  { id: "check-water", label: "Beber 4L de agua", checked: true },
  { id: "check-train", label: "Treinar", checked: true },
  { id: "check-sleep", label: "Dormir cedo", checked: false },
  { id: "check-walk", label: "Caminhar", checked: true },
  { id: "check-study", label: "Estudar", checked: false },
  { id: "check-food", label: "Nao pedir besteira", checked: true },
];

export const weightHistory: WeightPoint[] = [
  { day: "Seg", weight: 123.4 },
  { day: "Ter", weight: 122.8 },
  { day: "Qua", weight: 122.1 },
  { day: "Qui", weight: 121.7 },
  { day: "Sex", weight: 121.2 },
  { day: "Sab", weight: 120.6 },
  { day: "Dom", weight: 120.0 },
];

export const weightLogs: WeightLog[] = [
  { id: "wl-1", dateLabel: "Hoje", weightKg: 120.0, note: "Acordei mais leve" },
  { id: "wl-2", dateLabel: "Ontem", weightKg: 120.6, note: "Boa hidratacao" },
  { id: "wl-3", dateLabel: "Seg", weightKg: 121.7, note: "Retomando rotina" },
  { id: "wl-4", dateLabel: "Sex passada", weightKg: 123.0, note: "Fim de semana pesado" },
];

export const workoutLogs: WorkoutLog[] = [
  {
    id: "workout-1",
    title: "Treino A",
    durationMin: 55,
    caloriesBurned: 420,
    intensity: "forte",
    note: "Peito, ombro e triceps.",
  },
  {
    id: "workout-2",
    title: "Treino B",
    durationMin: 48,
    caloriesBurned: 360,
    intensity: "forte",
    note: "Costas, biceps e posterior.",
  },
  {
    id: "workout-3",
    title: "Cardio",
    durationMin: 35,
    caloriesBurned: 330,
    intensity: "moderada",
    note: "Bike ou caminhada inclinada.",
  },
  {
    id: "workout-4",
    title: "Kitesurf",
    durationMin: 90,
    caloriesBurned: 620,
    intensity: "forte",
    note: "Sessao longa no mar.",
  },
];

export const profile: Profile = {
  name: "Lucas Mendes",
  email: "lucas@email.com",
  targetWeightKg: 100,
  currentWeightKg: 120,
  goalLabel: "Emagrecer 20kg",
  heightLabel: "1,90 m",
};

export const quickMealExamples = [
  "2 ovos, 1 pao frances e cafe",
  "arroz, feijao, frango e salada",
] as const;

export const dashboardStats: DashboardStat[] = [
  { id: "stat-water", label: "Agua", value: "2.8L", helper: "de 4L", tone: "water" },
  { id: "stat-weight", label: "Peso", value: "120kg", helper: "meta 100kg", tone: "neutral" },
  { id: "stat-habits", label: "Habitos", value: "4/6", helper: "concluidos", tone: "brand" },
  { id: "stat-workout", label: "Ultimo treino", value: "Treino A", helper: "55 min", tone: "accent" },
];

export const weeklyHistory = [
  {
    id: "today",
    title: "Hoje",
    totalKcal: 2050,
    meals: meals.filter((meal) => meal.loggedAt.startsWith("2026-07-01")),
  },
  {
    id: "week",
    title: "Ultimos 7 dias",
    totalKcal: 13240,
    meals,
  },
];

export function sumMacros(items: Meal["items"]): Macros {
  return items.reduce<Macros>(
    (acc, item) => ({
      kcal: acc.kcal + item.macros.kcal,
      protein: acc.protein + item.macros.protein,
      carbs: acc.carbs + item.macros.carbs,
      fat: acc.fat + item.macros.fat,
      fiber: acc.fiber + item.macros.fiber,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
  );
}
