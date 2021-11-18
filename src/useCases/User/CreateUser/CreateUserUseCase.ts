import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { encodeUserPasswordModule } from '@useCases/Authentication/EncodePassword';
import { ICreateUserRequestDTO } from './CreateUserDTO';

const encodePassword = encodeUserPasswordModule();

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async (data: ICreateUserRequestDTO) => {
    if (Object.keys(data).length < 3) {
      throw new Error(
        'Insufficient data provided, please review your request data and try again!',
      );
    }

    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );
    const usernameAlreadyExists = await this.usersRepository.findByUsername(
      data.username,
    );

    if (emailAlreadyExists) throw new Error('Email already registered!!');

    if (usernameAlreadyExists) throw new Error('Username already registered!!');

    const user = new User(data);

    await encodePassword(user);

    const createdUser = await this.usersRepository.save(user);
    return createdUser;
  };
}
