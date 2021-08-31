import User from '@entities/User';

interface IUsersRepository {
  findByEmail(email: string, withPassword?: boolean): Promise<User | null>;
  findById(id: string, withPassword?: boolean): Promise<User | null>;
  update(user: User): Promise<void>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
