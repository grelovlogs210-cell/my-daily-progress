import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { Screen } from "../../components/ui/Screen";
import { ScreenHeader } from "../../components/ui/ScreenHeader";
import { theme } from "../../constants/theme";

export default function CaptureFoodScreen() {
  const router = useRouter();
  const [analysisState, setAnalysisState] = useState<"idle" | "analyzing" | "done">("idle");

  useEffect(() => {
    if (analysisState !== "analyzing") return;
    const timer = setTimeout(() => setAnalysisState("done"), 1200);
    return () => clearTimeout(timer);
  }, [analysisState]);

  return (
    <Screen>
      <ScreenHeader
        back
        eyebrow="Foto"
        title="Registrar comida por foto"
        subtitle="Tela mockada com fluxo visual de camera, galeria e analise antes da revisao."
      />

      <LinearGradient colors={["#16201C", "#060807"]} style={styles.cameraMock}>
        <View style={styles.aiBadge}>
          <Ionicons color={theme.colors.brand} name="sparkles-outline" size={12} />
          <Text style={styles.aiBadgeText}>Analise pronta para IA</Text>
        </View>

        <View style={styles.frame}>
          <Corner style={styles.topLeft} />
          <Corner style={styles.topRight} />
          <Corner style={styles.bottomRight} />
          <Corner style={styles.bottomLeft} />
        </View>

        <Text style={styles.cameraHint}>Centralize o prato para estimar porcoes e macros</Text>
        <View style={styles.chips}>
          {["Salmao", "Quinoa", "Brocolis"].map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.buttonStack}>
        <PrimaryButton onPress={() => setAnalysisState("analyzing")}>Tirar foto da refeicao</PrimaryButton>
        <PrimaryButton onPress={() => setAnalysisState("analyzing")} variant="secondary">
          Escolher da galeria
        </PrimaryButton>
      </View>

      <Card>
        <Text style={styles.analysisTitle}>Estado da analise</Text>
        <Text style={styles.analysisText}>
          {analysisState === "idle"
            ? "Nenhuma imagem enviada ainda."
            : analysisState === "analyzing"
              ? "Analisando refeicao mockada..."
              : "Analise concluida. Os itens estimados ja podem ser revisados."}
        </Text>
      </Card>

      <PrimaryButton disabled={analysisState !== "done"} onPress={() => router.push("/food/review")}>
        Ir para revisao
      </PrimaryButton>
    </Screen>
  );
}

function Corner({ style }: { style: object }) {
  return <View style={[styles.corner, style]} />;
}

const styles = StyleSheet.create({
  cameraMock: {
    borderRadius: 32,
    minHeight: 360,
    overflow: "hidden",
    padding: theme.spacing.xl,
  },
  aiBadge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(74, 222, 128, 0.16)",
    borderRadius: theme.radius.pill,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  aiBadgeText: {
    color: theme.colors.brand,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  frame: {
    alignItems: "center",
    alignSelf: "center",
    height: 220,
    justifyContent: "center",
    marginTop: 30,
    width: 220,
  },
  corner: {
    borderColor: theme.colors.brand,
    height: 34,
    position: "absolute",
    width: 34,
  },
  topLeft: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    left: 0,
    top: 0,
  },
  topRight: {
    borderRightWidth: 3,
    borderTopWidth: 3,
    right: 0,
    top: 0,
  },
  bottomRight: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    bottom: 0,
    right: 0,
  },
  bottomLeft: {
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    bottom: 0,
    left: 0,
  },
  cameraHint: {
    color: "rgba(255,255,255,0.84)",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 18,
    textAlign: "center",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: "auto",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: theme.colors.textOnDark,
    fontSize: 12,
    fontWeight: "700",
  },
  buttonStack: {
    gap: theme.spacing.md,
  },
  analysisTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  analysisText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
