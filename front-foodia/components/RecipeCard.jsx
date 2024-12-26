import { View, Text, Animated, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export function RecipeCard({ recipe }) {
  return (
    <Link asChild href={`/${recipe._id}`}>
      <StyledPressable className="active:opacity-70">
        <View className="bg-orange-200 rounded-lg p-4 shadow-md mx-2 my-1">
          <Text className="text-xl font-bold">{recipe.name}</Text>
          <Text className="text-sm">{recipe.description}</Text>
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
