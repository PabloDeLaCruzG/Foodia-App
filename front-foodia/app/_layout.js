import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { SettingsIcon } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FDF6E3", border: "none" },
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
