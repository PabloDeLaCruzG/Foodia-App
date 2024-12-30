// Importamos la función 'create' de Zustand para crear nuestro store.
import { create } from "zustand";

// Creamos el store con la función 'create'. Aquí definimos el estado y las acciones.
const useRecipeStore = create((set) => ({
  // 1. recipes: Es el estado inicial. Un array vacío que contendrá las recetas.
  recipes: [],

  // 2. setRecipes: Una función (acción) para actualizar el array completo de recetas.
  // Recibe un array 'recipes' como argumento y reemplaza el estado actual.
  setRecipes: (recipes) => set({ recipes }),

  // 3. addRecipe: Una función (acción) para agregar una receta nueva al array de recetas.
  // Recibe una receta como argumento y la agrega al array.
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  // 3. toggleFavorite: Una función para cambiar el estado de favorito ('fav') de una receta específica.
  // Recibe el '_id' de la receta a modificar.
  toggleFavorite: (_id) =>
    // Usamos 'set' para actualizar el estado del store.
    set((state) => ({
      // Actualizamos el array de recetas.
      recipes: state.recipes.map((recipe) =>
        // Si el 'id' de la receta coincide con el '_id' recibido...
        recipe._id === _id
          ? // ...creamos una nueva receta con el valor de 'fav' invertido.
            { ...recipe, fav: !recipe.fav }
          : // Si no coincide, devolvemos la receta sin cambios.
            recipe,
      ),
    })),
}));

// Exportamos el store para usarlo en cualquier componente de la app.
export default useRecipeStore;
