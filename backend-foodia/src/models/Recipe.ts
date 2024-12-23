import mongoose, { Schema, Document, PopulatedDoc } from 'mongoose';

export interface IRecipe extends Document {
    name: string;
    description: string;
    typeRecipe: string;
    event: string;
    restrictions: string[];
    prepTime: number;
    ingredients: string[];
    nutrientsInfo: {
        calories: number;
        proteins: number;
        carbohydrates: number;
    }[];
    people: number;
    //createdBy: PopulatedDoc<IUser & Document>;
}

const RecipeSchema = new Schema<IRecipe>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    typeRecipe: {
        type: String,
        required: true,
        default: 'Comida',
        enum: ['Comida', 'Reposteria', 'Snack'],
        trim: true
    },
    event: {
        type: String,
        required: true,
        default: 'Especial',
        enum: ['Especial', 'Diario', 'Familiar'],
        trim: true
    },
    restrictions: {
        type: [String],
        enum: ['Vegana', 'Vegetariana', 'Sin gluten', 'Sin lactosa', 'Bajo en sal'],
        required: true,
        default: []
    },
    prepTime: {
        type: Number,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],
        required: true,
        trim: true
    },
    nutrientsInfo: {
        type: [
            {
                calories: { type: Number, required: true },
                proteins: { type: Number, required: true },
                carbohydrates: { type: Number, required: true }
            }
        ],
        required: true
    },
    people: {
        type: Number,
        required: true, 
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, {timestamps: true});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;