import express from 'express';
import cors from 'cors';

import userRoutes from '@routes/userRoutes';
import paletteRoutes from '@routes/paletteRoutes';
import loginRoutes from '@routes/loginRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/palette', paletteRoutes);
app.use('/login', loginRoutes);

export default app;
