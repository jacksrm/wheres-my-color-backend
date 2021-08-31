import { Router } from 'express';
import createPalette from '@useCases/Palette/CreatePalette';
import getSinglePalette from '@useCases/Palette/GetSinglePalette';

const paletteRoutes = Router();

paletteRoutes.get('/:paletteId', getSinglePalette().controller.handle());

paletteRoutes.post('/create', createPalette().controller.handle());

export default paletteRoutes;
