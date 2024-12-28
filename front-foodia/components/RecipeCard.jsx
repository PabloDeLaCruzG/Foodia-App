import { View, Text, Animated, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export function RecipeCard({ recipe }) {
  return (
    <Link asChild href={`/${recipe._id}`}>
      <StyledPressable className="active:opacity-70">
        <View className="bg-[#FDF4DB] rounded-lg p-4 shadow-sm my-1 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-gray-500 text-sm">{recipe.event}</Text>
            <Text className="text-lg font-bold text-black">{recipe.name}</Text>
            <Text className="text-black text-xs">
              {recipe.description.length > 100
                ? recipe.description.substring(0, 100) + "..."
                : recipe.description}
            </Text>
            <View className="flex-row mt-2">
              <Text> </Text>
              <View
                className={`px-2 py-1 rounded-lg ${
                  recipe.typeRecipe === "Comida"
                    ? "bg-[#F1BD4D]/50"
                    : "bg-[#B8D8BA]/50"
                }`}
              >
                <Text className={"text-xs text-black"}>
                  {recipe.typeRecipe}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedRecipeCard({ recipe, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, index]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <RecipeCard recipe={recipe} />
    </Animated.View>
  );
}
