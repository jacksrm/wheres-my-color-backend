import { Router } from 'express';
import userLogin from '@useCases/Authentication/UserLogin';

const loginRoutes = Router();
const { controller } = userLogin();

loginRoutes.post('/', controller());

export default loginRoutes;
