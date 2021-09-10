import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetPublicPaletteController } from './GetPublicPaletteController';
import { GetPublicPaletteUseCase } from './GetPublicPaletteUseCase';

const repos = repositoriesModule();

export function getPublicPaletteModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetPublicPaletteUseCase(repository.palettes);
  const controller = new GetPublicPaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
