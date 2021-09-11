import { compare } from 'bcrypt';
import { User } from '@entities/User';

export class CheckEncodedPasswordUseCase {
  execute = async (user: User, password: string): Promise<Boolean> => (
    compare(password, user.password)
  )
}
