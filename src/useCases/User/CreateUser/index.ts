import { repositoriesModule } from '@repositories/index';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const repos = repositoriesModule();

export function createUserModule() {
  const useCase = new CreateUserUseCase(repos.users);
  const controller = new CreateUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
