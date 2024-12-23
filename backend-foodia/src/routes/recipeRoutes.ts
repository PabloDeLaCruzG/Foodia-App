import { Router } from 'express';
import { param, body } from 'express-validator';
import RecipeController from '../controllers/RecipeController';
import { validateRequest } from '../middleware/validation';

const recipeRoutes = Router();

recipeRoutes.get('/', RecipeController.getAllRecipes);

recipeRoutes.get('/:id', 
    param('id').isMongoId().withMessage('ID inválido'),
    validateRequest,
    RecipeController.getRecipeById
);

recipeRoutes.post('/', 
    body('name').isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
    body('description').isLength({ min: 1 }).withMessage('La descripción es obligatoria'),
    body('typeRecipe').isIn(['Comida', 'Reposteria', 'Snack']).withMessage('El tipo de receta es obligatorio'),
    body('event').isIn(['Especial', 'Diario', 'Familiar']).withMessage('El tipo de evento es obligatorio'),
    body('restrictions').isIn(['Vegana', 'Vegetariana', 'Sin lactosa', 'Sin gluten', 'Bajo en sal']).withMessage('Las restricciones son obligatorias'),
    body('prepTime').isInt({ min: 1 }).withMessage('El tiempo de preparación es obligatorio'),
    body('ingredients').isArray().withMessage('Los ingredientes son obligatorios'),
    body('nutrientsInfo').isArray().withMessage('Las nutriciones son obligatorias'),
    body('people').isInt({ min: 1 }).withMessage('El número de personas es obligatorio'),
    validateRequest,
    RecipeController.createRecipe
);

recipeRoutes.put('/:id', 
    param('id').isMongoId().withMessage('ID inválido'),
    body('name').isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
    body('description').isLength({ min: 1 }).withMessage('La descripción es obligatoria'),
    body('typeRecipe').isIn(['Comida', 'Reposteria', 'Snack']).withMessage('El tipo de receta es obligatorio'),
    body('event').isIn(['Especial', 'Diario', 'Familiar']).withMessage('El tipo de evento es obligatorio'),
    body('restrictions').isIn(['Vegana', 'Vegetariana', 'Sin lactosa', 'Sin gluten', 'Bajo en sal']).withMessage('Las restricciones son obligatorias'),
    body('prepTime').isInt({ min: 1 }).withMessage('El tiempo de preparación es obligatorio'),
    body('ingredients').isArray().withMessage('Los ingredientes son obligatorios'),
    body('nutrientsInfo').isArray().withMessage('Las nutriciones son obligatorias'),
    body('people').isInt({ min: 1 }).withMessage('El número de personas es obligatorio'),
    validateRequest,
    RecipeController.updateRecipeById
);

recipeRoutes.delete('/:id', 
    param('id').isMongoId().withMessage('ID inválido'),
    validateRequest,
    RecipeController.deleteRecipeById
);

export default recipeRoutes;