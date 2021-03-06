import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { encodeUserPasswordModule } from '@useCases/Authentication/EncodePassword';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute = async ({
    _id,
    email,
    password,
    profilePicture,
    username,
  }: IUpdateUserRequestDTO) => {
    const encode = encodeUserPasswordModule();
    const matchUserById = await this.usersRepository.findById(_id, true);

    if (!matchUserById) throw new Error("There's a problema with your request!");

    if (email) {
      const matchUserByEmail = await this.usersRepository.findByEmail(email);

      if (matchUserByEmail && matchUserByEmail._id !== matchUserById._id) {
        throw new Error('Email already registered!');
      }
    }

    if (username) {
      const matchUserByUsername = await this.usersRepository.findByUsername(username);

      if (matchUserByUsername) throw new Error('Username already registered!');
    }

    const user = new User(
      {
        email: email ?? matchUserById.email,
        password: password ?? matchUserById.password,
        username: username ?? matchUserById.username,
        profilePicture: profilePicture ?? matchUserById.profilePicture,
      },
      _id,
    );

    const result = await this.usersRepository.update(
      user.password.slice(0, 3) === '$2b' ? user : await encode(user),
    );

    if (!result) {
      throw new Error(
        'There was an error updating your user, please try again!',
      );
    }

    return result;
  };
}
