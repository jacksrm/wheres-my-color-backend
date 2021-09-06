import { IUsersRepository } from '@repositories/IUsersRepository';
import { checkUserEncodedPasswordModule } from '../CheckUserEncodedPassword';
import { generateUserTokenModule } from '../GenerateUserToken';
import { IUserLoginRequestDTO } from './IUserLoginDTO';

const generateToken = generateUserTokenModule();
const checkPassword = checkUserEncodedPasswordModule();

export class UserLoginUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUserLoginRequestDTO) {
    const user = await this.userRepository.findByEmail(data.email, true);

    if (!user) throw new Error('Theres no user with this email!');

    const validPassword = await checkPassword(user, data.password);

    if (!validPassword) {
      throw new Error('Incorrect password!');
    }

    const token = generateToken(user);
    return token;
  }
}
