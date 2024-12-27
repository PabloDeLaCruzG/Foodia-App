import { Text, ScrollView } from "react-native";
import { Screen } from "../components/Screen";
import { Stack } from "expo-router";

export default function Settings() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FDF4DB",
            borderTopWidth: 0.3,
            borderTopColor: "lightgray",
          },
          headerTintColor: "orange",
          headerTitle: "",
          headerRight: () => <Text> </Text>,
        }}
      />
      <Text>Settings</Text>;
      <ScrollView>
        <Text>
          lorem ipsum dolor sit amet , consectetur adipiscing elit. sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. lorem ipsum
          dolor sit amet , consectetur adipiscing elit. sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>
      </ScrollView>
    </Screen>
  );
}
