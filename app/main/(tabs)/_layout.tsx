import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="courses"
        options={{
          title: "Matérias",
          tabBarIcon: () => <Ionicons name="albums" size={20} />,
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Atividades",
          tabBarIcon: () => <Ionicons name="book" size={20} />,
        }}
      />
    </Tabs>
  );
}
