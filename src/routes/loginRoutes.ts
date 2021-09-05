import { Router } from 'express';
import userLoginModule from '@useCases/Authentication/UserLogin';

const loginRoutes = Router();
const login = userLoginModule();

loginRoutes.post('/', login.controller);

export default loginRoutes;
