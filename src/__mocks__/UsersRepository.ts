import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { encodeUserPasswordModule } from '@useCases/Authentication/EncodePassword';
import { userCollection } from './userCollection';

const encode = encodeUserPasswordModule();
export class UsersRepository implements IUsersRepository {
  deleteUser = (userId: string): Promise<void> => new Promise((resolve) => resolve())

  getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => resolve(userCollection()));
  }

  findByEmail = async (
    email: string,
    withPassword?: boolean,
  ): Promise<User | null> => {
    const match = userCollection().find((user) => user.email === email);
    if (!match) return new Promise((resolve) => resolve(null));

    const userEncodedPass: User = await encode(match);

    if (withPassword) return new Promise((resolve) => resolve(userEncodedPass));

    const { password, ...newMatch } = userEncodedPass;
    return new Promise((resolve) => resolve(newMatch as User));
  }

  findByUsername = (
    username: string,
    withPassword?: boolean,
  ): Promise<User | null> => (
    new Promise((resolve) => {
      const match = userCollection().find((user) => user.username === username);

      if (withPassword) resolve(match ?? null);
      else if (match) {
        const { password, ...newMatch } = match;
        resolve(newMatch as User);
      } else resolve(null);
    })
  );

  findById = (_id: string, withPassword?: boolean): Promise<User | null> => (
    new Promise((resolve) => {
      const match = userCollection().find((user) => user._id === _id);

      if (withPassword) resolve(match ?? null);
      else if (match) {
        const { password, ...newMatch } = match;
        resolve(newMatch as User);
      } else resolve(null);
    })
  );

  update = (userToUpdate: User): Promise<User> => (
    new Promise((resolve, reject) => {
      const match = userCollection().find((user) => user._id === userToUpdate._id);
      if (match) resolve(userToUpdate);
      else reject();
    })
  );

  save = (user: User): Promise<User> => new Promise((resolve) => resolve(user));
}
