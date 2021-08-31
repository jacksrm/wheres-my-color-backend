import User from '@entities/User';
import IUsersRepository from '@repositories/IUsersRepository';
import encodeUserPassword from '@useCases/Authentication/EncodePassword';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export default class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new Error('User already exists!!');

    const user = new User(data);

    await encodeUserPassword(user);

    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}
