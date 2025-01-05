import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Screen } from "../components/Screen";
import { recipeApi } from "../lib/recipeApi";
import { AddIcon, DeleteIcon, CheckIconDos } from "../components/Icons";
import Slider from "@react-native-community/slider";
import { Stack, useRouter } from "expo-router";
import LoadingModal from "../components/LoadingModal";
import useRecipeStore from "../stores/recipeStore";

export default function Generate() {
  // States for catch the selected options
  const [occasion, setOccasion] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  //const [calories, setCalories] = useState("400-700");
  const [caloriesRange, setCaloriesRange] = useState({ min: 250, max: 550 });
  const [people, setPeople] = useState(1);

  const [newIngredient, setNewIngredient] = useState(""); // Temporal ingredient
  const [loading, setLoading] = useState(false);
  const [newRestriction, setNewRestriction] = useState("");

  const toggleRestriction = (restriction) => {
    if (restrictions.includes(restriction)) {
      setRestrictions(restrictions.filter((r) => r !== restriction));
    } else {
      setRestrictions([...restrictions, restriction]);
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleCaloriesChange = (type, value) => {
    setCaloriesRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const router = useRouter();
  const { addRecipe } = useRecipeStore();

  const handleSubmit = async () => {
    if (!occasion || !recipeType) {
      Alert.alert(
        "Campos requeridos",
        "Por favor, selecciona la ocasión y el tipo de receta antes de continuar.",
        [{ text: "Entendido" }],
      );
      return;
    }

    const formattedRange = `${caloriesRange.min}-${caloriesRange.max}`;
    const body = {
      event: occasion,
      typeRecipe: recipeType,
      restrictions: restrictions,
      preferences: ingredients,
      caloriesRange: formattedRange,
      people: people,
    };

    const bodyj = JSON.stringify(body);
    // console.log("Datos enviados para la API:", bodyj);

    try {
      setLoading(true); // Muestra un estado de carga
      const generatedRecipe = await recipeApi.generateRecipe(bodyj);

      console.log("Receta generada con éxito:", generatedRecipe);

      if (generatedRecipe?.recipe?._id) {
        console.log("ID de la receta:", generatedRecipe.recipe._id);

        addRecipe(generatedRecipe.recipe);

        router.push(`/${generatedRecipe.recipe._id}`);
      } else {
        Alert.alert("Error", "No se pudo obtener el ID de la receta.");
      }
    } catch (error) {
      console.error("Error al generar receta:", error);
      Alert.alert(
        "Error al generar receta",
        "Hubo un problema al generar tu receta. Inténtalo de nuevo más tarde.",
      );
    } finally {
      setLoading(false); // Ocultar el modal de carga
    }
  };

  return (
    <Screen>
      <Stack.Screen
        name="generate"
        options={{
          headerTintColor: "orange",
          headerTitle: "",
          headerRight: () => <Text className="text-white"></Text>,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-center mt-6  ">
          Generar receta
        </Text>

        <Text className="text-lg font-semibold mt-6">
          Ocasión <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row mt-2">
          <Pressable
            onPress={() => setOccasion("Diario")}
            className={`px-2 py-1 rounded-lg ${
              occasion === "Diario" ? "bg-[#F1BD4D]/50" : "bg-[#B8D8BA]/50"
            } mr-4`}
          >
            <Text className={"text-xs text-black"}>Diario</Text>
          </Pressable>
          <Pressable
            onPress={() => setOccasion("Especial")}
            className={`px-2 py-1 rounded-lg ${
              occasion === "Especial" ? "bg-[#F1BD4D]/50" : "bg-[#B8D8BA]/50"
            } mr-4`}
          >
            <Text className={" "}>Especial</Text>
          </Pressable>
        </View>

        <Text className="text-lg font-semibold mt-6">
          Tipo de receta <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row mt-2">
          {["Reposteria", "Comida", "Snack"].map((type) => (
            <Pressable
              key={type}
              onPress={() => setRecipeType(type)}
              className={`px-2 py-1 rounded-lg ${
                recipeType === type ? "bg-[#F1BD4D]/50" : "bg-[#B8D8BA]/50"
              } mr-4`}
            >
              <Text className={" "}>{type}</Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row items-baseline">
          <Text className="text-lg font-semibold mt-6">Restricciones</Text>
          <Text className="text-xs text-gray-600 ml-0.5">(opcional)</Text>
        </View>
        <View className="flex-row flex-wrap mt-2">
          {["Vegana", "Vegetariana", "Sin gluten", "Sin lactosa"].map(
            (restriction) => (
              <Pressable
                key={restriction}
                onPress={() => toggleRestriction(restriction)}
                className={`px-2 py-1 rounded-lg mb-2 ${
                  restrictions.includes(restriction)
                    ? "bg-[#F1BD4D]/50"
                    : "bg-[#B8D8BA]/50"
                } mr-2`}
              >
                <Text className="text-xs">{restriction}</Text>
              </Pressable>
            ),
          )}
        </View>

        <View className="flex-row items-center mt-2">
          <TextInput
            value={newRestriction}
            onChangeText={setNewRestriction}
            placeholder="Añade otra restricción"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-slate-50"
          />
          <Pressable
            onPress={() => {
              if (newRestriction.trim()) {
                toggleRestriction(newRestriction.trim());
                setNewRestriction("");
              }
            }}
            className="ml-2 px-4 py-2 bg-orange-400 rounded-lg"
          >
            {newRestriction.trim() ? (
              <AddIcon color="white" size={16} />
            ) : (
              <CheckIconDos color="white" size={16} />
            )}
          </Pressable>
        </View>

        {/* Lista de restricciones personalizadas */}
        <View className="flex-row flex-wrap mt-2">
          {restrictions
            .filter(
              (r) =>
                ![
                  "Vegana",
                  "Vegetariana",
                  "Sin gluten",
                  "Sin lactosa",
                ].includes(r),
            )
            .map((restriction, index) => (
              <View
                key={index}
                className="flex-row items-center px-2 py-1 bg-[#B8D8BA] rounded-lg mb-2 mr-2"
              >
                <Text className="mr-2 text-xs">{restriction}</Text>
                <Pressable
                  onPress={() => toggleRestriction(restriction)}
                  className="active:opacity-60"
                >
                  <DeleteIcon size={16} />
                </Pressable>
              </View>
            ))}
        </View>

        <View className="flex-row items-baseline">
          <Text className="text-lg font-semibold mt-6">Ingredientes</Text>
          <Text className="text-xs text-gray-600 ml-0.5">(opcional)</Text>
        </View>
        <View className="flex-row items-center mt-2">
          <TextInput
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="Elige un ingrediente"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-slate-50"
          />
          <Pressable
            onPress={() => {
              if (newIngredient.trim()) {
                addIngredient(newIngredient);
                setNewIngredient("");
              }
            }}
            className="ml-2 px-4 py-2 bg-orange-400 rounded-lg"
          >
            {newIngredient.trim() ? (
              <AddIcon color="white" size={16} />
            ) : (
              <CheckIconDos color="white" size={16} />
            )}
          </Pressable>
        </View>
        <View className="flex-row flex-wrap mt-2">
          {ingredients.map((ingredient, index) => (
            <View
              key={index}
              className="flex-row items-center px-2 py-1 bg-[#B8D8BA] rounded-lg mb-2 mr-2"
            >
              <Text className="mr-2 font-semibold">{ingredient}</Text>
              <Pressable
                onPress={() => {
                  const newIngredients = ingredients.filter(
                    (_, i) => i !== index,
                  );
                  setIngredients(newIngredients);
                }}
                className="active:opacity-60"
              >
                <DeleteIcon size={16} />
              </Pressable>
            </View>
          ))}
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold mb-4">Rango de calorías</Text>

          {/* Contenedor del rango */}
          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm font-medium text-gray-600">
                {caloriesRange.min} Kcal
              </Text>
              <Text className="text-sm font-medium text-gray-600">
                {caloriesRange.max} Kcal
              </Text>
            </View>

            {/* Contenedor de los sliders */}
            <View className="flex-row justify-between mx-auto">
              <View style={{ width: "50%" }}>
                <Slider
                  style={{
                    width: "100%",
                    height: 40,
                  }}
                  minimumValue={0}
                  maximumValue={1000}
                  step={50}
                  value={caloriesRange.min}
                  onSlidingComplete={(value) => {
                    if (value >= caloriesRange.max) {
                      setCaloriesRange((prev) => ({
                        ...prev,
                        min: prev.max - 50,
                      }));
                    } else {
                      setCaloriesRange((prev) => ({
                        ...prev,
                        min: value,
                      }));
                    }
                  }}
                  onValueChange={(value) => {
                    if (value < caloriesRange.max) {
                      handleCaloriesChange("min", value);
                    }
                  }}
                  minimumTrackTintColor="#e5e7eb"
                  maximumTrackTintColor="#58b57e"
                  thumbTintColor="#58b57e"
                />
              </View>

              <View style={{ width: "50%" }}>
                <Slider
                  style={{
                    width: "100%",
                    height: 40,
                    position: "absolute",
                  }}
                  minimumValue={0}
                  maximumValue={1000}
                  step={50}
                  value={caloriesRange.max}
                  onValueChange={(value) => {
                    if (value > caloriesRange.min) {
                      handleCaloriesChange("max", value);
                    }
                  }}
                  minimumTrackTintColor="#58b57e"
                  maximumTrackTintColor="#e5e7eb"
                  thumbTintColor="#ff8c00"
                />
              </View>
            </View>
          </View>
        </View>

        <Text className="text-lg font-semibold mt-2 text-[#333]">Personas</Text>
        <View className="flex-row items-center mt-2">
          <Pressable
            onPress={() => setPeople(Math.max(1, people - 1))}
            className="px-4 py-2 bg-[#e7e7e7] rounded-lg"
          >
            <Text className="text-[#333]">-</Text>
          </Pressable>
          <Text className="mx-4 text-lg text-[#333]">{people}</Text>
          <Pressable
            onPress={() => setPeople(people + 1)}
            className="px-4 py-2 bg-[#e7e7e7] rounded-lg"
          >
            <Text className="text-[#333]">+</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleSubmit}
          className={`mb-10 mt-10 py-4 items-center rounded-lg ${
            !occasion || !recipeType
              ? "bg-gray-400"
              : loading
                ? "bg-[#58b57e] opacity-50"
                : "bg-[#58b57e] active:opacity-70 active:scale-95"
          }`}
          disabled={loading || !occasion || !recipeType}
        >
          <Text className="text-lg font-bold text-white">
            {loading ? "Generando..." : "Generar Recetas"}
          </Text>
        </Pressable>
      </ScrollView>

      <LoadingModal visible={loading} />
    </Screen>
  );
}
