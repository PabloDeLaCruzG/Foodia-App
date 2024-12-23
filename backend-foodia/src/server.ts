import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import recipeRoutes from './routes/recipeRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/reciìes', recipeRoutes);

export default app;