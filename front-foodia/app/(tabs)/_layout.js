import { Tabs } from "expo-router";

import { AddIcon, HomeIcon, SettingsIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FDF6E3",
          border: "none",
          paddingTop: 10,
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <AddIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
