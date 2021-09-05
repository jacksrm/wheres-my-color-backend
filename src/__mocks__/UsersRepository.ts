import User from '@entities/User';
import IUsersRepository from '@repositories/IUsersRepository';
import { encodeUserPasswordModule } from '@useCases/Authentication/EncodePassword';
import { userCollection } from './userCollection';

const encode = encodeUserPasswordModule();
export class UsersRepository implements IUsersRepository {
  getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => resolve(userCollection()));
  }

  async findByEmail(
    email: string,
    withPassword?: boolean,
  ): Promise<User | null> {
    const match = userCollection().find((user) => user.email === email);
    if (!match) return null;

    await encode(match);

    if (withPassword) return match;

    const { password, ...newMatch } = match;
    return newMatch as User;
  }

  async findByUsername(
    username: string,
    withPassword?: boolean,
  ): Promise<User | null> {
    return new Promise((resolve) => {
      const match = userCollection().find((user) => user.username === username);

      if (withPassword) resolve(match ?? null);
      else if (match) {
        const { password, ...newMatch } = match;
        resolve(newMatch as User);
      } else resolve(null);
    });
  }

  async findById(_id: string, withPassword?: boolean): Promise<User | null> {
    return new Promise((resolve) => {
      const match = userCollection().find((user) => user._id === _id);

      if (withPassword) resolve(match ?? null);
      else if (match) {
        const { password, ...newMatch } = match;
        resolve(newMatch as User);
      } else resolve(null);
    });
  }

  async update(userToUpdate: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const match = userCollection().find((user) => user._id === userToUpdate._id);
      if (match) resolve(userToUpdate);
      else reject();
    });
  }

  async save(user: User): Promise<User> {
    return new Promise((resolve) => resolve(user));
  }
}
