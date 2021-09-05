import { indexAllUsersAndPalettesModule } from '@useCases/IndexAllUsersAndPalettes';
import { Router } from 'express';

const getAllRoutes = Router();
const getAll = indexAllUsersAndPalettesModule();

getAllRoutes.get('/', getAll.controller);

export { getAllRoutes };
