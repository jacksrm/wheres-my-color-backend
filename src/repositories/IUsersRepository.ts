import User from '@entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}

export default IUsersRepository;
