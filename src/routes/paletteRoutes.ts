import { Request, Response, Router } from 'express';
import { getUserPaletteController } from '@useCases/getUserPalettes';
import { IGetUserPalettesRequest } from '@useCases/getUserPalettes/GetUserPalettesDTO';

const paletteRoutes = Router();

paletteRoutes.get('/:userId', (req: Request<IGetUserPalettesRequest>, res: Response) => (
  getUserPaletteController.handle(req, res)
));

export default paletteRoutes;
