import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { CreatePaletteUseCase } from './CreatePaletteUseCase';
import { CreatePaletteController } from './CreatePaletteController';

const repos = repositoriesModule();

export function createPaletteModule(repository: IRepositoryFactory = repos) {
  const useCase = new CreatePaletteUseCase(repository.palettes);
  const controller = new CreatePaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
