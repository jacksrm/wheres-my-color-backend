import { Request, Response, Router } from 'express';
import { getUserPaletteController } from '@useCases/getUserPalettes';
import { IGetUserPalettesRequestDTO } from '@useCases/getUserPalettes/GetUserPalettesDTO';
import { createPaletteController } from '@useCases/CreatePalette';

const paletteRoutes = Router();

paletteRoutes.get(
  '/:ownerId',
  (req: Request<IGetUserPalettesRequestDTO>, res: Response) => (
    getUserPaletteController.handle(req, res)
  ),
);

paletteRoutes.post(
  '/create',
  (req: Request, res: Response) => (
    createPaletteController.handle(req, res)
  ),
);

export default paletteRoutes;
