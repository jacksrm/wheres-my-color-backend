import express from 'express';
import cors from 'cors';

import userRoutes from '@routes/userRoutes';
import paletteRoutes from '@routes/paletteRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/palette', paletteRoutes);

export default app;
