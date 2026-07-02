import { useMemo, useState } from "react";
import { mockHealthService } from "../services/mock-health-service";
import { sumMacros } from "../lib/mock-data";
import type { FoodItem } from "../types/health";

export function useMealReview() {
  const [meal, setMeal] = useState(() => mockHealthService.getDetectedMeal());

  const updateItemPortion = (itemId: string, nextGrams: number) => {
    setMeal((current) => ({
      ...current,
      items: current.items.map((item) => {
        if (item.id !== itemId) return item;
        const safeGrams = Math.max(10, nextGrams);
        const ratio = safeGrams / item.portionGrams;
        return {
          ...item,
          portionGrams: safeGrams,
          portionLabel: `${safeGrams} g`,
          macros: {
            kcal: Math.round(item.macros.kcal * ratio),
            protein: Math.round(item.macros.protein * ratio),
            carbs: Math.round(item.macros.carbs * ratio),
            fat: Math.round(item.macros.fat * ratio),
            fiber: Math.round(item.macros.fiber * ratio),
          },
        };
      }),
    }));
  };

  const removeItem = (itemId: string) => {
    setMeal((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== itemId),
    }));
  };

  const addManualItem = () => {
    const item: FoodItem = {
      id: `manual-${Date.now()}`,
      name: "Item manual",
      categoryLabel: "Ajuste",
      portionLabel: "100 g",
      portionGrams: 100,
      confidence: 0.55,
      macros: { kcal: 110, protein: 8, carbs: 11, fat: 4, fiber: 2 },
    };

    setMeal((current) => ({
      ...current,
      items: [...current.items, item],
    }));
  };

  const totals = useMemo(() => sumMacros(meal.items), [meal.items]);

  return {
    addManualItem,
    meal,
    removeItem,
    setMeal,
    totals,
    updateItemPortion,
  };
}
