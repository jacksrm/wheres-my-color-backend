import express from 'express';
import { createUserModule } from '@useCases/User/CreateUser';
import { getPublicUserPalettesModule } from '@useCases/User/GetPublicUserPalettes';
import { getUserPalettesModule } from '@useCases/User/GetUserPalettes';
import { getUserModule } from '@useCases/User/GetUser';
import authenticateUserModule from '@useCases/Authentication/AuthenticateUser';

const userRoutes = express.Router();
const createUser = createUserModule();
const getPublicPalettes = getPublicUserPalettesModule();
const authenticate = authenticateUserModule();
const getUser = getUserModule();
const getUserPalettes = getUserPalettesModule();

userRoutes.post('/create', createUser.controller);
userRoutes.get('/:ownerId', authenticate.middleware, getUserPalettes.controller);
userRoutes.get('/public/:ownerId', getPublicPalettes.controller);
userRoutes.get('/profile/:userId', getUser.controller);

export default userRoutes;
