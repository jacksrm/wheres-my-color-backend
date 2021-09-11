import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

const repos = repositoriesModule();

export function getUserModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetUserUseCase(repository.users);
  const controller = new GetUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
