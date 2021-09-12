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

paletteRoutes.get('/:paletteId', authenticate.middleware, getPalette.controller);

paletteRoutes.delete('/:paletteId', authenticate.middleware, deletePalette.controller);

paletteRoutes.put('/update/:paletteId', authenticate.middleware, update.controller);

paletteRoutes.get('/public/:paletteId', getPublic.controller);

paletteRoutes.post('/create', authenticate.middleware, create.controller);

export default paletteRoutes;
