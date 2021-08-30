import { genSalt, hash } from 'bcrypt';
import User from '@entities/User';

export default class EncodePasswordUseCase {
  constructor(private user: User) {}

  async execute(): Promise<User> {
    const salt = await genSalt(12);
    const hashPass = await hash(this.user.password, salt);

    this.user.password = hashPass;
    return this.user;
  }
}
