import { Router } from 'express';
import createPalette from '@useCases/Palette/CreatePalette';
import getSinglePalette from '@useCases/Palette/GetPalette';
import authenticateUserModule from '@useCases/Authentication/AuthenticateUser';
import getPublicPalette from '@useCases/Palette/GetPublicPalette';
import updatePalette from '@useCases/Palette/UpdatePalete';

const paletteRoutes = Router();
const authenticate = authenticateUserModule();

paletteRoutes.get(
  '/:paletteId',
  authenticate.middleware,
  getSinglePalette().controller.handle(),
);

paletteRoutes.put(
  '/update/:paletteId',
  authenticate.middleware,
  updatePalette().controller.handle(),
);

paletteRoutes.get('/public/:paletteId', getPublicPalette().controller.handle());

paletteRoutes.post('/create', createPalette().controller.handle());

export default paletteRoutes;
