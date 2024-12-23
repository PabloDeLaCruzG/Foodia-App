 import Recipe from '../models/Recipe';

class RecipeController {
    
    static async getAllRecipes(req: any, res: any) {
        try {
            const recipes = await Recipe.find();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las recetas' });
        }
    }

    static async getRecipeById(req: any, res: any) {
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

    static async createRecipe(req: any, res: any) {
        try {
            const recipe = new Recipe(req.body);
            const savedRecipe = await recipe.save();
            res.status(201).json({ message: 'La receta se creó correctamente' }, savedRecipe);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la receta' });
        }
    }

    static async updateRecipeById(req: any, res: any) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const recipe = await Recipe.findById(id, updates, {
                new: true,
                runValidators: true
            });
            if (!recipe) {
                res.status(404).json({ message: 'No se encontró la receta' });
                return;
            }
            recipe.name = updates.name;
            recipe.description = updates.description;
            recipe.typeRecipe = updates.typeRecipe;
            recipe.event = updates.event;
            recipe.restrictions = updates.restrictions;
            recipe.prepTime = updates.prepTime;
            recipe.ingredients = updates.ingredients;
            recipe.nutrientsInfo = updates.nutrientsInfo;
            recipe.people = updates.people;
            await recipe.save();
            res.status(200).json({ message: 'La receta se actualizó correctamente' }, recipe);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la receta' });
        }
    }

    static async deleteRecipeById(req: any, res: any) {
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