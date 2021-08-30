import express, { Request, Response } from 'express';
import { createUserController } from '@useCases/User/CreateUser';
import { getUserPalettesController } from '@useCases/User/GetUserPalettes';
import { IGetUserPalettesRequestDTO } from '@useCases/User/GetUserPalettes/GetUserPalettesDTO';

const userRoutes = express.Router();

userRoutes.post('/create', (req: Request, res: Response) => (
  createUserController.handle(req, res)
));

userRoutes.get(
  '/:ownerId',
  (req: Request<IGetUserPalettesRequestDTO>, res: Response) => (
    getUserPalettesController.handle(req, res)
  ),
);

export default userRoutes;
