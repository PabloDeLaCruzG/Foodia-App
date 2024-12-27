import { Router } from 'express';
import { param, body } from 'express-validator';
import RecipeController from '../controllers/RecipeController';
import { validateRequest } from '../middleware/validation';

const recipeRoutes = Router();

recipeRoutes.post('/generate', 
    body('preferences').optional().isArray().withMessage('preferences debe ser un array de cadenas'),
    body('preferences.*').optional().isString().withMessage('Cada preferencia debe ser una cadena'),
    body('restrictions').optional().isArray().withMessage('restrictions debe ser un array de cadenas'),
    body('restrictions.*').optional().isString().withMessage('Cada restricción debe ser una cadena'),
    body('typeRecipe').notEmpty().isString(),
    body('people').notEmpty().isInt(),
    body('prepTime').optional().isInt(),
    body('caloriesRange').optional().isString().matches(/^\d+-\d+$/).withMessage('El rango de calorías debe estar en formato "200-600"'),
    body('event').optional().isString(),
    validateRequest,
    RecipeController.generateRecipe
);

recipeRoutes.get('/', RecipeController.getAllRecipes);

recipeRoutes.get('/:id', 
    param('id').isMongoId().withMessage('ID inválido'),
    validateRequest,
    RecipeController.getRecipeById
);

recipeRoutes.delete('/:id', 
    param('id').isMongoId().withMessage('ID inválido'),
    validateRequest,
    RecipeController.deleteRecipeById
);

recipeRoutes.post('/', 
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('typeRecipe').notEmpty().isString(),
    body('event').optional().isString(),
    body('restrictions').optional().isString(),
    body('prepTime').optional().isInt(),
    body('ingredients').notEmpty().isArray(),
    body('nutrientsInfo').isArray().withMessage('nutrientsInfo debe ser un array'),
    body('nutrientsInfo.*.calories').isNumeric().withMessage('calories debe ser un número'),
    body('nutrientsInfo.*.proteins').isNumeric().withMessage('proteins debe ser un número'),
    body('nutrientsInfo.*.carbohydrates').isNumeric().withMessage('carbohydrates debe ser un número'),
    body('people').notEmpty().isInt(),
    validateRequest,
    RecipeController.createRecipe
);

recipeRoutes.put('/:id/favorite', 
    param('id').isMongoId().withMessage('ID inválido'),
    validateRequest,
    RecipeController.setFavorite
);

export default recipeRoutes;