import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const repos = repositoriesModule();

export function createUserModule(repository: IRepositoryFactory = repos) {
  const useCase = new CreateUserUseCase(repository.users);
  const controller = new CreateUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
