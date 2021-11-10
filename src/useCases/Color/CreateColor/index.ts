import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { CreateColorController } from './CreateColorController';
import { CreateColorUseCase } from './CreateColorUseCase';

const repos = repositoriesModule();

export function createColorModule(repository: IRepositoryFactory = repos) {
  const useCase = new CreateColorUseCase(repository.colors);
  const controller = new CreateColorController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
