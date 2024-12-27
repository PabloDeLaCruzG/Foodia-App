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

export function Main() {
  const [recipes, setRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlerFavorite = () => {
    // Cambia el estado de favoritos
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    recipeApi.getAllRecipes().then((recipes) => setRecipes(recipes));
  }, []);

  const filteredRecipes = isFavorite
    ? recipes.filter((recipe) => recipe.fav)
    : recipes;

  return (
    <Screen>
      <View className="pb-2 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Mis recetas</Text>
        <View>
          <Pressable onPress={handlerFavorite} className="ml-4">
            {isFavorite ? <FavIcon /> : <FavoIcon />}
          </Pressable>
        </View>
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
