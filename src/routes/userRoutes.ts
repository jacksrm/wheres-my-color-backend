import express from 'express';
import { createUserModule } from '@useCases/User/CreateUser';
import { getPublicUserPalettesModule } from '@useCases/User/GetPublicUserPalettes';
import { getUserPalettesModule } from '@useCases/User/GetUserPalettes';
import { getUserModule } from '@useCases/User/GetUser';
import { authenticateUserModule } from '@useCases/Authentication/AuthenticateUser';
import { deleteUserModule } from '@useCases/User/DeleteUser';
import { updateUserModule } from '@useCases/User/UpdateUser';
import { getPublicUserModule } from '@useCases/User/GetPublicUser';

const userRoutes = express.Router();

const getPublicPalettes = getPublicUserPalettesModule();
const getUserPalettes = getUserPalettesModule();
const getPublicUser = getPublicUserModule();
const authenticate = authenticateUserModule();
const createUser = createUserModule();
const deleteUser = deleteUserModule();
const updateUser = updateUserModule();
const getUser = getUserModule();

userRoutes.post('/create', createUser.controller);
userRoutes.get('/palettes/public/:ownerId', getPublicPalettes.controller);
userRoutes.get('/profile/public/:userId', getPublicUser.controller);

userRoutes.get('/palettes', authenticate.middleware, getUserPalettes.controller);
userRoutes.route('/profile')
  .get(authenticate.middleware, getUser.controller)
  .put(authenticate.middleware, updateUser.controller)
  .delete(authenticate.middleware, deleteUser.controller);

export { userRoutes };
