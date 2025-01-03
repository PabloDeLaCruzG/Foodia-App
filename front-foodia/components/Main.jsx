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
import {
  AddIcon,
  CheckIcon,
  CheckIcono,
  FavIcon,
  FavoIcon,
  RemoveCircle,
} from "./Icons";
import useRecipeStore from "../stores/recipeStore";
import { styled } from "nativewind";
import { Link } from "expo-router";

const StyledPressable = styled(Pressable);

export function Main() {
  const { recipes, setRecipes } = useRecipeStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handlerFavorite = () => setIsFavorite((prev) => !prev);

  useEffect(() => {
    recipeApi
      .getAllRecipes()
      .then((recipes) => {
        if (Array.isArray(recipes)) {
          setRecipes(recipes);
        } else {
          console.error("API response is not an array:", recipes);
          setRecipes([]); // Asegúrate de que el estado se mantenga como un array vacío en caso de error
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setRecipes([]); // Asegúrate de que el estado se mantenga como un array vacío en caso de error
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRecipes = Array.isArray(recipes)
    ? isFavorite
      ? recipes.filter((recipe) => recipe.fav)
      : recipes
    : [];

  const handleDeleteRecipe = async (id) => {
    try {
      await recipeApi.deleteRecipeById(id);
      const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
      setRecipes(updatedRecipes);
      console.log("Recipe deleted:", id);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <Screen>
      <View className="pb-2 flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Mis recetas</Text>
        <View className="flex-row items-center">
          <StyledPressable
            onPress={() => setIsEditMode(!isEditMode)}
            className="ml-4 active:scale-90"
          >
            {isEditMode ? <CheckIcon /> : <CheckIcono />}
          </StyledPressable>
          <StyledPressable
            onPress={handlerFavorite}
            className="ml-4 active:scale-90"
          >
            {isFavorite ? <FavIcon /> : <FavoIcon />}
          </StyledPressable>
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
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item, index }) => (
              <View className="flex-row items-center">
                {isEditMode && (
                  <View className="w-8">
                    <Pressable
                      onPress={() => handleDeleteRecipe(item._id)}
                      className="mr-2 active:scale-90"
                    >
                      <RemoveCircle />
                    </Pressable>
                  </View>
                )}
                <View className="w-full">
                  <AnimatedRecipeCard recipe={item} index={index} />
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Link asChild href="/generate">
        <StyledPressable className="absolute bottom-4 right-4 bg-orange-400 w-14 h-14 rounded-full flex items-center justify-center shadow-black shadow-sm shadow-opacity-20 elevation-5 active:scale-95 active:opacity-90">
          <AddIcon color="white" size={24} />
        </StyledPressable>
      </Link>
    </Screen>
  );
}
