import { compare } from 'bcrypt';
import User from '@entities/User';
import { ICheckEncodedPasswordRequestDTO } from './CheckEncodedPasswordDTO';

export default class CheckEncodedPasswordUseCase {
  constructor(private user: User) {}

  async execute(data: ICheckEncodedPasswordRequestDTO): Promise<Boolean> {
    return compare(data.password, this.user.password);
  }
}
