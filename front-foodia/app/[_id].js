import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { recipeApi } from "../lib/recipeApi";
import { FavIcon, FavoIcon } from "../components/Icons";

export default function RecipeDetail() {
  const { _id } = useLocalSearchParams();
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    prepTime: 0,
    nutrientsInfo: [],
    ingredients: [],
  });
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (_id) {
      recipeApi.getRecipeById(_id).then((recipe) => setRecipeInfo(recipe));
    }
  }, [_id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTintColor: "orange",
          headerTitle: "",
          headerRight: () => <Text className="text-white"></Text>,
        }}
      />

      {recipeInfo.name === "" ? (
        <ActivityIndicator color={"orange"} size={"large"} />
      ) : (
        <ScrollView className="flex-1 px-4 bg-bgApp">
          {/* Título */}
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold mb-2 text-dark">
              {recipeInfo.name}
            </Text>
            <Pressable onPress={toggleFavorite} className="ml-4">
              {isFavorite ? <FavIcon /> : <FavoIcon />}
            </Pressable>
          </View>
          {/* Tiempo */}
          <Text className="text-base text-gray-600 mb-4">
            {`${recipeInfo.prepTime}min`}
          </Text>

          {/* Valores nutricionales */}
          <View className="flex-row items-baseline mb-2">
            <Text className="text-xl font-bold text-dark">
              Valores nutricionales
            </Text>
            <Text className="text-xs text-gray-600 ml-0.5">(aproximado)</Text>
          </View>
          <View className="flex-row justify-center">
            {recipeInfo.nutrientsInfo?.length > 0 ? (
              <View className="flex-row items-baseline py-2 space-x-4">
                {recipeInfo.nutrientsInfo.map((nutrient, index) => (
                  <View key={index} className="flex-row items-baseline">
                    <View className="flex-col items-center justify-center bg-[#F1BD4D] rounded-xl py-4 w-28">
                      <Text className="font-bold text-2xl text-dark">
                        {nutrient.carbohydrates}
                      </Text>
                      <Text className="text-[#666] text-xs">Carbohidratos</Text>
                    </View>
                    <View className="flex-col items-center justify-center bg-[#58B57E] rounded-xl py-5 w-32">
                      <Text className="font-bold text-4xl text-dark">
                        {nutrient.calories}
                      </Text>
                      <Text className="text-[#666] text-xs">
                        Calorías (Kcal)
                      </Text>
                    </View>
                    <View className="flex-col items-center justify-center bg-[#F1BD4D] rounded-xl py-4 w-28">
                      <Text className="font-bold text-2xl text-dark">
                        {nutrient.proteins}
                      </Text>
                      <Text className="text-[#666] text-xs">Proteina</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-sm text-gray-600">
                Información nutricional no disponible
              </Text>
            )}
          </View>
          <Text className="text-xs italic text-gray-600 text-center mb-6">
            Ver mas +
          </Text>

          {/* Ingredientes */}
          <View className="flex-row items-baseline mb-2">
            <Text className="text-xl font-bold text-dark">Ingredientes</Text>
          </View>
          <View className="flex-wrap flex-row">
            {recipeInfo.ingredients.map((ingredient, index) => (
              <View key={index} className="flex-row items-center mb-2 mr-4">
                <View className="w-4 h-4 mr-2 border border-gray-600 bg-white rounded" />
                <Text className="text-sm text-dark">{ingredient}</Text>
              </View>
            ))}
          </View>

          {/* Botón Comenzar */}
          <Pressable className="mt-6 bg-green-300 py-4 items-center rounded-lg active:opacity-70 active:scale-95">
            <Text className="text-lg font-bold text-dark">¡Comenzar!</Text>
          </Pressable>
        </ScrollView>
      )}
    </Screen>
  );
}
