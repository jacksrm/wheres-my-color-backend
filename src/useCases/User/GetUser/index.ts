import { repositoriesModule } from '@repositories/index';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

const repos = repositoriesModule();

export function getUserModule() {
  const useCase = new GetUserUseCase(repos.users);
  const controller = new GetUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
