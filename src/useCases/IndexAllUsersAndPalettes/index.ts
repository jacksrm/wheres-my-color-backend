import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { IndexAllUsersAndPalettesController } from './IndexAllUsersAndPalettesController';
import { IndexAllUsersAndPalettesUseCase } from './IndexAllUsersAndPalettesUseCase';

const repos = repositoriesModule();

export function indexAllUsersAndPalettesModule(repository: IRepositoryFactory = repos) {
  const useCase = new IndexAllUsersAndPalettesUseCase(
    repository.users,
    repository.palettes,
  );

  const controller = new IndexAllUsersAndPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
