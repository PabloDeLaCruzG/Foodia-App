import { FlatList, ActivityIndicator, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { recipeApi } from "../lib/recipeApi";
import { AnimatedRecipeCard } from "./RecipeCard";
import { Screen } from "./Screen";
import { Picker } from "@react-native-picker/picker";

export function Main() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    recipeApi.getAllRecipes().then((recipes) => setRecipes(recipes));
  }, []);

  useEffect(() => {
    recipeApi.getAllRecipes().then((recipes) => {
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    });
  }, []);

  useEffect(() => {
    if (filter === "Todos") {
      setFilteredRecipes(recipes);
    } else if (filter === "Favoritos") {
      setFilteredRecipes(recipes.filter((recipe) => recipe.isFavorite)); //TODO Ajusta según la lógica de favoritos
    } else if (filter === "Recientes") {
      setFilteredRecipes(recipes.filter((recipe) => recipe.isRecent)); //TODO Ajusta según la lógica de recientes
    }
  }, [filter, recipes]);

  return (
    <Screen>
      <View className="pb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold pb-4">Mis recetas</Text>

          <View className="border border-gray-300 rounded-lg bg-white w-40">
            <Picker
              selectedValue={filter}
              onValueChange={(value) => setFilter(value)}
              dropdownIconColor={"black"}
            >
              <Picker.Item label="Todos" value="Todos" />
              <Picker.Item label="Favoritos" value="Favoritos" />
              <Picker.Item label="Recientes" value="Recientes" />
            </Picker>
          </View>
        </View>
      </View>

      <View className="flex-1">
        {recipes.length === 0 ? (
          <ActivityIndicator color={"orange"} size={"large"} />
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item, index }) => (
              <AnimatedRecipeCard recipe={item} index={index} />
            )}
          />
        )}
      </View>
    </Screen>
  );
}
