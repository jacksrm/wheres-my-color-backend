import { Request, Response, Router } from 'express';
import { createPaletteController } from '@useCases/Palette/CreatePalette';
import { getSinglePaletteController } from '@useCases/Palette/GetSinglePalette';

const paletteRoutes = Router();

paletteRoutes.get('/:paletteId', getSinglePaletteController.handle());

paletteRoutes.post('/create', createPaletteController.handle());

export default paletteRoutes;
