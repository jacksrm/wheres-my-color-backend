import { repositoriesModule } from '@repositories/index';
import { IndexAllUsersAndPalettesController } from './IndexAllUsersAndPalettesController';
import { IndexAllUsersAndPalettesUseCase } from './IndexAllUsersAndPalettesUseCase';

const repositories = repositoriesModule();
export function indexAllUsersAndPalettesModule() {
  const useCase = new IndexAllUsersAndPalettesUseCase(
    repositories.users,
    repositories.palettes,
  );

  const controller = new IndexAllUsersAndPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
