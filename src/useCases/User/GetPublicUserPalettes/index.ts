import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetPublicUserPalettesUseCase } from './GetPublicUserPalettesUseCase';
import { GetPublicUserPalettesController } from './GetPublicUserPalettesController';

const repos = repositoriesModule();

export function getPublicUserPalettesModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetPublicUserPalettesUseCase(repository.palettes);
  const controller = new GetPublicUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
