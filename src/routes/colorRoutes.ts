import { authenticateUserModule } from '@useCases/Authentication/AuthenticateUser';
import { createColorModule } from '@useCases/Color/CreateColor';
import { Router } from 'express';

const colorRoutes = Router();

const authenticate = authenticateUserModule();
const create = createColorModule();

colorRoutes.post(
  '/create/:paletteId',
  authenticate.middleware,
  create.controller,
);

export { colorRoutes };
