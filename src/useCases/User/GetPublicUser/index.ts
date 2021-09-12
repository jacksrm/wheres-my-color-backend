import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { GetUserController } from './GetPublicUserController';
import { GetPublicUserUseCase } from './GetPublicUserUseCase';

const repos = repositoriesModule();

export function getPublicUserModule(repository: IRepositoryFactory = repos) {
  const useCase = new GetPublicUserUseCase(repository.users);
  const controller = new GetUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
