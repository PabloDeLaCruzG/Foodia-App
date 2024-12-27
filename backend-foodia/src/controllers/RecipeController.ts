 import { Request, Response } from 'express';
 import Recipe from '../models/Recipe';
 import {openai}  from '../config/openai';
 import * as JSON5 from 'json5';

interface GenerateRecipeBody {
    preferences?: string[];
    restrictions?: string[];
    typeRecipe: string;
    people: number;
    prepTime?: number;
    caloriesRange?: string;
    event?: string;
}

interface RecipeData {
    name: string;
    description: string;
    ingredients: string[];
    restrictions: string[];
    nutrientsInfo: {
        calories: number;
        proteins: number;
        carbohydrates: number;
    }[];
    prepTime: number;
}

class RecipeController {

    static generateRecipe = async (req: Request<{}, {}, GenerateRecipeBody>, res: Response) => {
        try {
            const { preferences, restrictions, typeRecipe, people, prepTime, caloriesRange, event } = req.body;
    
            // Convertir arrays a cadenas para el prompt
            const preferencesString = preferences?.join(', ') || 'Sin preferencias';
            const restrictionsString = restrictions?.join(', ') || 'Sin restricciones';

            const prompt = `
            Genera una receta para una comida de tipo ${typeRecipe || 'Comida'}
            para ${people || '1'} personas, basada en ${preferencesString || 'Sin preferencias'} 
            con un rango de calorias ${caloriesRange || '300-500'} y restricciones ${restrictionsString || 'Sin Restricciones'}. 
            Devuelve un JSON ESTRICTAMENTE válido con este formato:
            {
                "name": "Nombre de la receta",
                "description": "Breve descripción de la receta",
                "ingredients": ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"],
                "restrictions": ["Vegetariana", "Bajo en sal"],
                "nutrientsInfo": {
                    "calories": 300,
                    "proteins": 20,
                    "carbohydrates": 50
                },
                "prepTime": 30
            }
            No incluyas nada más fuera del JSON.
            `;

            // Llamada a OpenAI
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Eres un asistente culinario que genera recetas.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 200,
            });

            // Parsear la respuesta de OpenAI
            const aiResult = response.choices[0]?.message?.content?.trim();
            if (!aiResult) {
                res.status(500).json({ message: 'No se pudo generar la receta.' });
                return;
            }

            console.log('Respuesta de OpenAI:', aiResult);

                    // Intentar parsear el JSON usando JSON5
            let recipeData: RecipeData;
            try {
                recipeData = JSON5.parse(aiResult); // Usar JSON5 para tolerar errores menores
            } catch (parseError) {
                console.error('Error al parsear la respuesta de OpenAI:', parseError);
                res.status(500).json({
                    message: 'La respuesta de OpenAI no es un JSON válido',
                    error: parseError.message,
                });
                return;
            }

            console.log('Datos de la receta:', recipeData);

            // Crear un nuevo documento de receta usando la respuesta estructurada
            const newRecipe = new Recipe({
                name: recipeData.name,
                description: recipeData.description,
                typeRecipe,
                event,
                restrictions: recipeData.restrictions,
                prepTime: prepTime || 30,
                ingredients: recipeData.ingredients,
                nutrientsInfo: [recipeData.nutrientsInfo],
                people,
            });

            await newRecipe.save();

            res.status(201).json({ message: 'Receta generada exitosamente', recipe: newRecipe });
        } catch (error) {
            console.error('Error al generar la receta:', error);
            res.status(500).json({ message: 'Error al generar la receta', error: error.message });
        }
    }
    
    static getAllRecipes = async (req: any, res: Response) => {
        try {
            const recipes = await Recipe.find();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las recetas' });
        }
    }

    static getRecipeById = async (req: Request, res: Response) => {
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

    static deleteRecipeById = async (req: Request, res: Response) => {
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

    static createRecipe = async (req: Request, res: Response) => {
        console.log('Controlador alcanzado con datos:', req.body);
        try {
            const recipe = new Recipe(req.body);
            await recipe.save();
            res.status(201).json({ message: 'Receta creada exitosamente'  });
        } catch (error) {
            console.error('Errpr al crear la receta', error);
            res.status(500).json({ message: 'Error al crear la receta' });
        }
    }

    static setFavorite = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                res.status(404).json({ message: 'No se encontró la receta' });
                return;
            }
            recipe.fav = !recipe.fav;
            await recipe.save();
            res.status(200).json({ message: 'La receta se actualizó correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la receta' });
        }
    }
}

export default RecipeController;