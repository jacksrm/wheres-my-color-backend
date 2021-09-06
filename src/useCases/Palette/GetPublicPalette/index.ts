import { repositoriesModule } from '@repositories/index';
import { GetPublicPaletteController } from './GetPublicPaletteController';
import { GetPublicPaletteUseCase } from './GetPublicPaletteUseCase';

const repos = repositoriesModule();

export function getPublicPaletteModule() {
  const useCase = new GetPublicPaletteUseCase(repos.palettes);
  const controller = new GetPublicPaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
