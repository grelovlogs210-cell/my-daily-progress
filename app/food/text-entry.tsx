import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { TextField } from "../../components/ui/TextField";
import { theme } from "../../constants/theme";
import { quickMealExamples } from "../../lib/mock-data";

export default function TextEntryScreen() {
  const router = useRouter();
  const [description, setDescription] = useState(
    "150g de salmao grelhado, 100g de quinoa e uma porcao de brocolis no vapor."
  );

  return (
    <Screen>
      <ScreenHeader
        back
        eyebrow="Texto"
        title="Descreva sua refeicao"
        subtitle="Nesta fase a IA ainda esta mockada, mas o fluxo de revisao ja foi preparado."
      />

      <Card>
        <TextField
          label="Descricao da refeicao"
          multiline
          onChangeText={setDescription}
          placeholder="Ex: 2 ovos, 1 tapioca pequena e cafe preto"
          value={description}
        />
      </Card>

      <Card>
        <Text style={styles.tipTitle}>Exemplos rapidos</Text>
        <View style={styles.examples}>
          {quickMealExamples.map((example) => (
            <Pressable key={example} onPress={() => setDescription(example)} style={styles.exampleChip}>
              <Text style={styles.exampleChipText}>{example}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.tipTitle}>Como vai funcionar depois</Text>
        <Text style={styles.tipText}>
          O app enviara esse texto para uma Edge Function, validara o JSON retornado pela OpenAI e abrira a mesma tela de revisao abaixo.
        </Text>
      </Card>

      <PrimaryButton onPress={() => router.push("/food/review")}>Analisar refeicao</PrimaryButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tipTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  tipText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  exampleChip: {
    backgroundColor: theme.colors.brandSoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  exampleChipText: {
    color: theme.colors.brandDark,
    fontSize: 12,
    fontWeight: "700",
  },
});
