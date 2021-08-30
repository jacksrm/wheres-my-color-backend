import { Request, Response, Router } from 'express';
import { createPaletteController } from '@useCases/Palette/CreatePalette';
import { getSinglePaletteController } from '@useCases/Palette/GetSinglePalette';
import { IGetSinglePaletteRequestDTO } from '@useCases/Palette/GetSinglePalette/GetSinglePaletteDTO';

const paletteRoutes = Router();

paletteRoutes.get(
  '/:paletteId',
  (req: Request<IGetSinglePaletteRequestDTO>, res: Response) => (
    getSinglePaletteController.handle(req, res)
  ),
);

paletteRoutes.post('/create', (req: Request, res: Response) => (
  createPaletteController.handle(req, res)
));

export default paletteRoutes;
