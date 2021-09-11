import { genSalt, hash } from 'bcrypt';
import { User } from '@entities/User';

export class EncodePasswordUseCase {
  execute = async (user: User): Promise<User> => {
    const encodeUser = user;
    const salt = await genSalt(12);
    const hashPass = await hash(encodeUser.password, salt);

    encodeUser.password = hashPass;
    return user;
  }
}
