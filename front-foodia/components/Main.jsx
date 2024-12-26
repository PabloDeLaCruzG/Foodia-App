import { FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { recipeApi } from "../lib/recipeApi";
import { AnimatedRecipeCard } from "./RecipeCard";
import { Screen } from "./Screen";

export function Main() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    recipeApi.getAllRecipes().then((recipes) => setRecipes(recipes));
  }, []);

  return (
    <Screen>
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
    </Screen>
  );
}
