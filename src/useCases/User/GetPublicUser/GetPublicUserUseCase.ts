import { IUsersRepository } from '@repositories/IUsersRepository';
import { IGetPublicUserRequestDTO } from './GetPublicUserDTO';

export class GetPublicUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async ({ userId }: IGetPublicUserRequestDTO) => {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new Error('User not found!');

    const { _id, profilePicture, username, createdAt, updatedAt } = user;
    return { _id, profilePicture, username, createdAt, updatedAt };
  };
}
