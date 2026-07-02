import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { MealItemCard } from "../../components/food/MealItemCard";
import { NutritionTotalCard } from "../../components/food/NutritionTotalCard";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { useMealReview } from "../../hooks/use-meal-review";
import { theme } from "../../constants/theme";

export default function ReviewScreen() {
  const router = useRouter();
  const { addManualItem, meal, removeItem, totals, updateItemPortion } = useMealReview();

  return (
    <Screen>
      <ScreenHeader
        back
        eyebrow="Revisao"
        title={meal.title}
        subtitle="Antes de salvar, o usuario revisa cada item detectado, ajusta porcoes e remove o que nao fizer sentido."
      />

      <Card>
        <Text style={styles.summaryText}>{meal.items.length} itens detectados</Text>
        <NutritionTotalCard totals={totals} />
      </Card>

      {meal.items.map((item) => (
        <MealItemCard
          editable
          item={item}
          key={item.id}
          onDecrease={() => updateItemPortion(item.id, item.portionGrams - 25)}
          onIncrease={() => updateItemPortion(item.id, item.portionGrams + 25)}
          onRemove={() => removeItem(item.id)}
        />
      ))}

      <PrimaryButton onPress={addManualItem} variant="secondary">
        Adicionar item mockado
      </PrimaryButton>

      <View style={styles.footerActions}>
        <PrimaryButton onPress={() => router.back()} variant="secondary">
          Ajustar depois
        </PrimaryButton>
        <PrimaryButton onPress={() => router.replace("/(tabs)/history")}>Confirmar e salvar</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: theme.spacing.lg,
  },
  footerActions: {
    gap: theme.spacing.md,
  },
});
