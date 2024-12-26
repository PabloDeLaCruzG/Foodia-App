import axios from "axios";

const BASE_URL = "http://localhost:4000/api/recipes"; // Cambia esto según la URL de tu backend

export const recipeApi = {
  /**
   * Obtiene todas las recetas del backend.
   */
  getAllRecipes: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las recetas:", error);
      throw error;
    }
  },

  /**
   * Obtiene una receta por su ID.
   * @param id ID de la receta a buscar
   */
  getRecipeById: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la receta con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Elimina una receta por su ID.
   * @param id ID de la receta a eliminar
   */
  deleteRecipeById: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la receta con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea una nueva receta.
   * @param recipe Datos de la nueva receta
   */
  createRecipe: async (recipe: any) => {
    try {
      const response = await axios.post(BASE_URL, recipe);
      return response.data;
    } catch (error) {
      console.error("Error al crear la receta:", error);
      throw error;
    }
  },

  /**
   * Genera una receta automáticamente con base en los parámetros enviados.
   * @param recipeParams Parámetros para generar la receta
   */
  generateRecipe: async (recipeParams: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/generate`, recipeParams);
      return response.data;
    } catch (error) {
      console.error("Error al generar la receta:", error);
      throw error;
    }
  },
};
