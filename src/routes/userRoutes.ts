import express, { Request, Response } from 'express';
import { createUserController } from '@useCases/User/CreateUser';
import { getUserPalettesController } from '@useCases/User/GetUserPalettes';
import { IGetUserPalettesRequestDTO } from '@useCases/User/GetUserPalettes/GetUserPalettesDTO';

const userRoutes = express.Router();

userRoutes.post('/create', createUserController.handle());

userRoutes.get('/:ownerId', getUserPalettesController.handle());

export default userRoutes;
