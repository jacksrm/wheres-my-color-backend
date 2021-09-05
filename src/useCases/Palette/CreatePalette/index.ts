import { repositoriesModule } from '@repositories/index';
import { CreatePaletteUseCase } from './CreatePaletteUseCase';
import { CreatePaletteController } from './CreatePaletteController';

const repos = repositoriesModule();

export function createPaletteModule() {
  const useCase = new CreatePaletteUseCase(repos.palettes);
  const controller = new CreatePaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
