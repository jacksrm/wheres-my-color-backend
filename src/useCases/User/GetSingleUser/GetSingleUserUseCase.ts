import IUsersRepository from '@repositories/IUsersRepository';
import { IGetSingleUserRequestDTO } from './GetSingleUserDTO';

export default class GetSingleUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IGetSingleUserRequestDTO) {
    const user = await this.usersRepository.findById(data.userId);

    if (!user) throw new Error('User not found!');

    return user;
  }
}
