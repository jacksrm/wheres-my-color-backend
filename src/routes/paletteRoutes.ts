import { Router } from 'express';
import createPalette from '@useCases/Palette/CreatePalette';
import getSinglePalette from '@useCases/Palette/GetPalette';
import authenticateUser from '@useCases/Authentication/AuthenticateUser';

const paletteRoutes = Router();

paletteRoutes.get(
  '/:paletteId',
  authenticateUser().middleware.handle(),
  getSinglePalette().controller.handle(),
);

paletteRoutes.get('/public/:paletteId', getSinglePalette().controller.handle());

paletteRoutes.post('/create', createPalette().controller.handle());

export default paletteRoutes;
