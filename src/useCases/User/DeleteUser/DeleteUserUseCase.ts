import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';
import { DeleteUserError } from './DeleteUserError';

export class DeleteUserUseCase {
  constructor(private repository: IRepositoryFactory) {}

  execute = async ({ userId }: IDeleteUserRequestDTO) => {
    const match = await this.repository.users.findById(userId);

    if (!match) {
      throw new DeleteUserError(404, "There's no user with the provided ID!");
    }

    await this.repository.palettes.deleteAllUserPalettes(userId);
    await this.repository.users.deleteUser(userId);
  };
}
