 import { Request, Response } from 'express';
 import Recipe from '../models/Recipe';
 import {openai}  from '../config/openai';

class RecipeController {

    static generateRecipe = async (req: Request, res: Response) => {
        try {
            const { preferences, restrictions, typeRecipe, people, prepTime, event, calories } = req.body;
    
            const prompt = `
            Genera una receta de comida basada en:
            - Tipo: ${typeRecipe || 'comida'}
            - Evento: ${event || 'ocasión especial'}
            - Preferencias: ${preferences || 'sin preferencias'}
            - Restricciones alimentarias: ${restrictions || 'ninguna'}.
            - Tiempo de preparación: ${prepTime || '30 minutos'}.
            - Rango de calorias: ${calories || '200-300'}.
            - Personas: ${people || '1'}
            Incluye un título, descripción, lista de ingredientes y pasos detallados.

            Devuelve la receta en el siguiente formato JSON:
            {
                "name": "Nombre de la receta",
                "description": "Breve descripción de la receta",
                "ingredients": ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"],
                "nutrientsInfo": {
                    "calories": 300,
                    "proteins": 20,
                    "carbohydrates": 50
                },
                "prepTime": 30,
            }
            `;

            // Llamada a OpenAI
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'Eres un asistente culinario que genera recetas.' },
                    { role: 'user', content: prompt },
                ],
            });

            // Parsear la respuesta de OpenAI
            const aiResult = response.choices[0]?.message?.content?.trim();
            if (!aiResult) {
                return res.status(500).json({ message: 'No se pudo generar la receta.' });
            }

            const recipeData = JSON.parse(aiResult);

            // Crear un nuevo documento de receta usando la respuesta estructurada
            const newRecipe = new Recipe({
                name: recipeData.name,
                description: recipeData.description,
                typeRecipe,
                event,
                restrictions,
                prepTime: prepTime || 30,
                ingredients: recipeData.ingredients,
                nutrientsInfo: [recipeData.nutrientsInfo],
                people,
            });

            await newRecipe.save();

            res.status(201).json({ message: 'Receta generada exitosamente', recipe: newRecipe });
        } catch (error) {
            res.status(500).json({ message: 'Error al generar la receta' });
        }
    }
    
    static async getAllRecipes(req: any, res: Response) {
        try {
            const recipes = await Recipe.find();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las recetas' });
        }
    }

    static async getRecipeById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                res.status(404).json({ message: 'No se encontró la receta' });
                return;
            }
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la receta' });
        }
    }

    static async deleteRecipeById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                res.status(404).json({ message: 'No se encontró la receta' });
                return;
            }
            await recipe.deleteOne();
            res.status(200).json({ message: 'La receta se eliminó correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la receta' });
        }
    }
}

export default RecipeController;