import userLogin from '@useCases/Authentication/UserLogin';
import { Router } from 'express';

const loginRoutes = Router();

loginRoutes.post('/', userLogin().controller.handle());

export default loginRoutes;
