import express from 'express';
import { createUserController } from '@useCases/User/CreateUser';
import { getUserPalettesController } from '@useCases/User/GetUserPalettes';
import { getSingleUserController } from '@useCases/User/GetSingleUser';

const userRoutes = express.Router();

userRoutes.post('/create', createUserController.handle());

userRoutes.get('/:ownerId', getUserPalettesController.handle());

userRoutes.get('/profile/:userId', getSingleUserController.handle());

export default userRoutes;
