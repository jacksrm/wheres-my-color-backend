import express, { Request, Response } from 'express';
import { createUserController } from '@useCases/CreateUser';

const userRoutes = express.Router();

userRoutes.post('/create', async (req: Request, res: Response) => (
  createUserController.handle(req, res)
));

export default userRoutes;
