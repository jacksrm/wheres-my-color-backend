import IUsersRepository from '@repositories/IUsersRepository';
import checkEncodedPasswordUseCase from '../CheckUserEncodedPassword';
import generateUserToken from '../GenerateUserToken';
import { IUserLoginRequestDTO } from './IUserLoginDTO';

export default class UserLoginUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUserLoginRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email, true);

    if (!user) throw new Error('Theres no user with this email!');

    const validPassword = await checkEncodedPasswordUseCase(user, data.password);

    if (!validPassword) {
      throw new Error('Incorrect password');
    }

    const token = generateUserToken(user);
    return token;
  }
}
