import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { SettingsIcon } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#FDF4DB",
            borderTopWidth: 0.3,
            borderTopColor: "lightgray",
          },
          headerTitle: "",
          headerRight: () => (
            <Link asChild href="/settings" className="text-white">
              <Pressable>
                <SettingsIcon color="black" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
