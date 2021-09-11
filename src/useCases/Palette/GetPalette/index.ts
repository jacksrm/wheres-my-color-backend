import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetPaletteController } from './GetPaletteController';
import { GetPaletteUseCase } from './GetPaletteUseCase';

const repos = repositoriesModule();

export function getPaletteModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetPaletteUseCase(repository.palettes);
  const controller = new GetPaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
