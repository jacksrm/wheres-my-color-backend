import express from 'express';
import cors from 'cors';

import { connection } from '@repositories/connection';

import userRoutes from '@routes/userRoutes';
import paletteRoutes from '@routes/paletteRoutes';
import loginRoutes from '@routes/loginRoutes';
import { getAllRoutes } from '@routes/getAllRoutes';

const app = express();
const connect = connection();

app.use(cors());
app.use(express.json());

app.use('/v1', getAllRoutes);
app.use('/v1/user', userRoutes);
app.use('/v1/login', loginRoutes);
app.use('/v1/palette', paletteRoutes);

connect.start();

export { app };
