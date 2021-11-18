import { repositoriesModule } from '@repositories/index';
import { authenticateUserModule } from '@useCases/Authentication/AuthenticateUser';
import { createColorModule } from '@useCases/Color/CreateColor';
import { deleteColorModule } from '@useCases/Color/DeleteColor';
import { updateColorModule } from '@useCases/Color/UpdateColor';
import { Request, Response, Router } from 'express';

const colorRoutes = Router();

const authenticate = authenticateUserModule();
const create = createColorModule();
const update = updateColorModule();
const deleteColor = deleteColorModule();

colorRoutes.post(
  '/create/:paletteId',
  authenticate.middleware,
  create.controller,
);

colorRoutes.put(
  '/update/:paletteId',
  authenticate.middleware,
  update.controller,
);

colorRoutes.delete(
  '/delete/:paletteId/:colorId',
  authenticate.middleware,
  deleteColor.controller,
);

const repos = repositoriesModule();

colorRoutes.get('/test', async (request: Request, response: Response) => {
  const color = await repos.colors.findColorById(
    '7a5aae1b-550a-46cc-9df5-3951c69d4897',
    '9e4a3881-409b-4271-83f0-f8be70bbc46a',
  );

  return response.json({ color });
});

export { colorRoutes };
