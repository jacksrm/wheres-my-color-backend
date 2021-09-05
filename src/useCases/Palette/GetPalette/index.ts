import { repositoriesModule } from '@repositories/index';
import { GetPaletteController } from './GetPaletteController';
import { GetPaletteUseCase } from './GetPaletteUseCase';

const repos = repositoriesModule();

export function getPaletteModule() {
  const useCase = new GetPaletteUseCase(repos.palettes);
  const controller = new GetPaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
