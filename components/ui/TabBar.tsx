import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

const iconByRoute: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  history: "time-outline",
  habits: "flame-outline",
  weight: "stats-chart-outline",
  profile: "person-outline",
};

const labelByRoute: Record<string, string> = {
  index: "Hoje",
  history: "Historico",
  habits: "Habitos",
  weight: "Peso",
  profile: "Perfil",
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2);

  return (
    <View pointerEvents="box-none" style={styles.host}>
      <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.side}>
          {leftRoutes.map((route) => {
            const index = state.routes.findIndex((item) => item.key === route.key);
            const isFocused = state.index === index;
            return (
              <TabButton
                active={isFocused}
                icon={iconByRoute[route.name]}
                key={route.key}
                label={labelByRoute[route.name]}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
        </View>

        <Pressable onPress={() => router.push("/food/capture")} style={styles.capture}>
          <Ionicons color={theme.colors.textOnDark} name="camera-outline" size={26} />
        </Pressable>

        <View style={styles.side}>
          {rightRoutes.map((route) => {
            const index = state.routes.findIndex((item) => item.key === route.key);
            const isFocused = state.index === index;
            return (
              <TabButton
                active={isFocused}
                icon={iconByRoute[route.name]}
                key={route.key}
                label={labelByRoute[route.name]}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

type BottomTabBarProps = {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  descriptors: Record<string, unknown>;
  navigation: {
    navigate: (name: string) => void;
  };
};

function TabButton({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Ionicons color={active ? theme.colors.brand : "#A3B0AA"} name={icon} size={20} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  host: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  bar: {
    alignItems: "flex-end",
    backgroundColor: theme.colors.surfaceStrong,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 14,
    paddingHorizontal: 18,
    paddingTop: 18,
    ...theme.shadow.card,
  },
  side: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  capture: {
    alignItems: "center",
    backgroundColor: theme.colors.brandDark,
    borderColor: theme.colors.background,
    borderRadius: 999,
    borderWidth: 6,
    height: 72,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: -42,
    width: 72,
  },
  tabButton: {
    alignItems: "center",
    gap: 4,
    minWidth: 56,
  },
  tabLabel: {
    color: "#A3B0AA",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  tabLabelActive: {
    color: theme.colors.brand,
  },
});
