import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { UpdatePaletteController } from './UpdatePaletteController';
import { UpdatePaletteUseCase } from './UpdatePaletteUseCase';

const repos = repositoriesModule();

export function updatePaletteModule(repository: IRepositoryFactory = repos) {
  const useCase = new UpdatePaletteUseCase(repository.palettes);
  const controller = new UpdatePaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
