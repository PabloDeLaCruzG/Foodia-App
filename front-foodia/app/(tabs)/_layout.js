import { Tabs } from "expo-router";

import { CalendarIcon, HomeIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FDF4DB",
          borderTopWidth: 0.3,
          borderTopColor: "lightgray",
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menús",
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
