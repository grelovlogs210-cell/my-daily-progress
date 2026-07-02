import { Tabs } from "expo-router";
import { TabBar } from "../../components/ui/TabBar";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: "Hoje" }} />
      <Tabs.Screen name="history" options={{ title: "Historico" }} />
      <Tabs.Screen name="habits" options={{ title: "Habitos" }} />
      <Tabs.Screen name="weight" options={{ title: "Peso" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
