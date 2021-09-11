import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetUserPalettesController } from './GetUserPalettesController';
import { GetUserPalettesUseCase } from './GetUserPalettesUseCase';

const repos = repositoriesModule();
export function getUserPalettesModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetUserPalettesUseCase(repository.palettes);
  const controller = new GetUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
