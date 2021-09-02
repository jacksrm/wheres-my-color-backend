import express from 'express';
import createUser from '@useCases/User/CreateUser';
import getUserPalettes from '@useCases/User/GetUserPalettes';
import getSingleUser from '@useCases/User/GetSingleUser';
import authenticateUser from '@useCases/Authentication/AuthenticateUser';

const userRoutes = express.Router();

userRoutes.post('/create', createUser().controller.handle());

userRoutes.get(
  '/:ownerId',
  authenticateUser().middleware.handle(),
  getUserPalettes().controller.handle(),
);

userRoutes.get('/profile/:userId', getSingleUser().controller.handle());

export default userRoutes;
