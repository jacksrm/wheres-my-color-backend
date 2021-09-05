import { compare } from 'bcrypt';
import User from '@entities/User';

export class CheckEncodedPasswordUseCase {
  async execute(user: User, password: string): Promise<Boolean> {
    return compare(password, user.password);
  }
}
