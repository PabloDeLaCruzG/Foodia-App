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
import { AddIcon } from "../components/Icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

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

  const handleSubmit = async () => {
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
      setLoading(false); // Oculta el estado de carga

      console.log("Receta generada con éxito:", generatedRecipe);
      if (generatedRecipe?.recipe?._id) {
        console.log("ID de la receta:", generatedRecipe.recipe._id);
        navigation.navigate(`/${generatedRecipe.recipe._id}`);
      } else {
        Alert.alert("Error", "No se pudo obtener el ID de la receta.");
      }

      //Alert.alert("Receta generada con éxito", [{ text: "OK" }]);
    } catch (error) {
      setLoading(false); // Oculta el estado de carga si hay error
      Alert.alert(
        "Error al generar receta",
        "Hubo un problema al generar tu receta. Inténtalo de nuevo más tarde.",
      );
      console.error("Error al generar receta:", error);
    }
  };

  return (
    <Screen>
      <ScrollView>
        <Text className="text-3xl font-bold text-center mt-6  ">
          Generar receta
        </Text>

        <Text className="text-lg font-semibold mt-6  ">Ocación</Text>
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

        <Text className="text-lg font-semibold mt-6  ">Tipo de receta</Text>
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

        <Text className="text-lg font-semibold mt-6  ">Restricciones</Text>
        <View className="flex-row flex-wrap mt-2">
          {[
            "Vegana",
            "Vegetariana",
            "Sin gluten",
            "Sin lactosa",
            "Bajo en sal",
          ].map((restriction) => (
            <Pressable
              key={restriction}
              onPress={() => toggleRestriction(restriction)}
              className={`px-4 py-2 rounded-lg mb-2 ${
                restrictions.includes(restriction)
                  ? "bg-[#F1BD4D]/50"
                  : "bg-[#B8D8BA]/50"
              } mr-4`}
            >
              <Text className={" "}>{restriction}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-lg font-semibold mt-6  ">Ingredientes</Text>
        <View className="flex-row items-center mt-2">
          <TextInput
            value="newIngredient"
            onChangeText={setNewIngredient}
            placeholder="Elige un ingrediente"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-slate-50"
          />
          <Pressable
            onPress={addIngredient}
            className="ml-2 px-4 py-2 bg-orange-400 rounded-lg"
          >
            <AddIcon color="white" size={16} />
          </Pressable>
        </View>
        <View className="flex-row flex-wrap mt-2">
          {ingredients.map((ingredient, index) => (
            <View
              key={index}
              className="px-4 py-2 bg-green-100 rounded-lg mb-2 mr-2"
            >
              <Text className={" "}>{ingredient}</Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-semibold mt-6">
          Rango de calorías (Opcional)
        </Text>

        <View className="mt-4 relative">
          {/* Texto del rango */}
          <Text className="text-center text-sm text-[#666]">
            {caloriesRange.min} Kcal - {caloriesRange.max} Kcal
          </Text>

          {/* Slider de mínimo */}
          <Slider
            style={{
              width: "70%",
              height: 40,
              top: 40,
            }}
            minimumValue={0}
            maximumValue={1000} // Máximo dinámico para evitar solapamientos
            step={50}
            value={caloriesRange.min}
            onSlidingComplete={(value) => {
              setCaloriesRange((prev) => ({
                ...prev,
                min: Math.min(value, prev.max - 50), // Ajusta el mínimo para no cruzar el máximo
              }));
            }}
            onValueChange={(value) => handleCaloriesChange("min", value)}
            minimumTrackTintColor="#58b57e"
            maximumTrackTintColor="d3d3d3" // Transparenta la pista del máximo
            thumbTintColor="#58b57e"
          />

          {/* Slider de máximo */}
          <Slider
            style={{
              width: "70%",
              left: 115,
              height: 40,
            }}
            minimumValue={caloriesRange.min + 50} // Mínimo dinámico para evitar solapamientos
            maximumValue={1000}
            step={50}
            value={caloriesRange.max}
            onValueChange={(value) => handleCaloriesChange("max", value)}
            minimumTrackTintColor="transparent" // Transparenta la pista del mínimo
            maximumTrackTintColor="orange"
            thumbTintColor="#ff8c00"
          />
        </View>

        <Text className="text-lg font-semibold mt-6 text-[#333]">Personas</Text>
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
          className={`mt-6 bg-[#58b57e] py-4 items-center rounded-lg ${
            loading ? "opacity-50" : "active:opacity-70 active:scale-95"
          }`}
          disabled={loading} // Deshabilitar mientras se genera la receta
        >
          <Text className="text-lg font-bold text-white">
            {loading ? "Generando..." : "Generar Recetas"}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
