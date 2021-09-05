import { repositoriesModule } from '@repositories/index';
import { UpdatePaletteController } from './UpdatePaletteController';
import { UpdatePaletteUseCase } from './UpdatePaletteUseCase';

const repos = repositoriesModule();

export function updatePaletteModule() {
  const useCase = new UpdatePaletteUseCase(repos.palettes);
  const controller = new UpdatePaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
