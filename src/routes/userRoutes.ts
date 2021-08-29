import express, { Request, Response } from 'express';
import { createUserController } from '@useCases/CreateUser';
import { ICreateUserRequestDTO } from '@useCases/CreateUser/CreateUserDTO';

const userRoutes = express.Router();

userRoutes.post('/create', (req: Request, res: Response) => (
  createUserController.handle(req, res)
));

export default userRoutes;
