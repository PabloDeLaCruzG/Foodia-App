import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { recipeApi } from "../lib/recipeApi";
import { AnimatedRecipeCard } from "./RecipeCard";
import { Screen } from "./Screen";
import { FavIcon, FavoIcon } from "./Icons";
import useRecipeStore from "../stores/recipeStore";

export function Main() {
  const { recipes, setRecipes, toggleFavorite } = useRecipeStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const handlerFavorite = () => setIsFavorite((prev) => !prev);

  useEffect(() => {
    recipeApi
      .getAllRecipes()
      .then((recipes) => setRecipes(recipes || []))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      });
  }, []);

  const filteredRecipes = Array.isArray(recipes)
    ? isFavorite
      ? recipes.filter((recipe) => recipe.fav)
      : recipes
    : [];

  return (
    <Screen>
      <View className="pb-2 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Mis recetas</Text>
        <Pressable onPress={handlerFavorite} className="ml-4">
          {isFavorite ? <FavIcon /> : <FavoIcon />}
        </Pressable>
      </View>

      <View>
        {recipes.length === 0 ? (
          <ActivityIndicator color={"orange"} size={"large"} />
        ) : filteredRecipes.length === 0 && isFavorite ? (
          <Text className="text-center text-lg text-gray-500">
            No tienes ninguna receta favorita
          </Text>
        ) : (
          <FlatList
            data={filteredRecipes}
            renderItem={({ item, index }) => (
              <AnimatedRecipeCard recipe={item} index={index} />
            )}
          />
        )}
      </View>
    </Screen>
  );
}
