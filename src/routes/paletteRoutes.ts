import { Router } from 'express';
import { createPaletteModule } from '@useCases/Palette/CreatePalette';
import { getPaletteModule } from '@useCases/Palette/GetPalette';
import { authenticateUserModule } from '@useCases/Authentication/AuthenticateUser';
import { getPublicPaletteModule } from '@useCases/Palette/GetPublicPalette';
import { updatePaletteModule } from '@useCases/Palette/UpdatePalete';
import { deletePaletteModule } from '@useCases/Palette/DeletePalette';

const paletteRoutes = Router();
const deletePalette = deletePaletteModule();
const authenticate = authenticateUserModule();
const getPalette = getPaletteModule();
const getPublic = getPublicPaletteModule();
const update = updatePaletteModule();
const create = createPaletteModule();

paletteRoutes.route('/:paletteId')
  .get(authenticate.middleware, getPalette.controller)
  .delete(authenticate.middleware, deletePalette.controller)
  .put(authenticate.middleware, update.controller);

paletteRoutes.post('/create', authenticate.middleware, create.controller);
paletteRoutes.get('/public/:paletteId', getPublic.controller);

export { paletteRoutes };
