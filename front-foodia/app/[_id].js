import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { recipeApi } from "../lib/recipeApi";

export default function RecipeDetail() {
  const { _id } = useLocalSearchParams();
  const [recipeInfo, setRecipeInfo] = useState({});

  useEffect(() => {
    if (_id) {
      recipeApi.getRecipeById(_id).then((recipe) => setRecipeInfo(recipe));
    }
  }, [_id]);

  return (
    <Screen>
      <Stack.Screen
        // Me gustaria quitar el texto "back" y que se quede solo la flecha de ir hacia atras
        options={{
          headerTintColor: "green",
          headerRight: () => {},
          headerLeft: () => {},
        }}
      />
      <View>
        {recipeInfo === null ? (
          <ActivityIndicator color={"orange"} size={"large"} />
        ) : (
          <ScrollView>
            <Text className="text-3xl font-bold">{recipeInfo.name}</Text>
            <Text>{recipeInfo.description}</Text>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
