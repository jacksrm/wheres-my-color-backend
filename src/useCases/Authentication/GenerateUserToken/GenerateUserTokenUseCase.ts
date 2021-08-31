import User from '@entities/User';
import { sign } from 'jsonwebtoken';

export default class GenerateUserTokenUseCase {
  execute(user: User) {
    const { SECRET_KEY } = process.env;

    const token = sign(
      {
        userId: user._id,
        email: user.email,
      },
      SECRET_KEY!,
      {
        expiresIn: '1d',
      },
    );
    return token;
  }
}
