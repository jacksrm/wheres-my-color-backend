import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { DeletePaletteController } from './DeletePaletteController';
import { DeletePaletteUseCase } from './DeletePaletteUseCase';

const repos = repositoriesModule();

export function deletePaletteModule(repository: IRepositoryFactory = repos) {
  const useCase = new DeletePaletteUseCase(repository.palettes);
  const controller = new DeletePaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
