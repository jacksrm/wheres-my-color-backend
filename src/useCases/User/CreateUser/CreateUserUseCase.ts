import User from '@entities/User';
import IUsersRepository from '@repositories/IUsersRepository';
import encodeUserPassword from '@useCases/Authentication/EncodePassword';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export default class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(data.email);
    const usernameAlreadyExists = await this.usersRepository.findByUsername(data.username);

    if (emailAlreadyExists) throw new Error('Email already registered!!');

    if (usernameAlreadyExists) throw new Error('Username already registered!!');

    const user = new User(data);

    await encodeUserPassword(user);

    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  }
}
