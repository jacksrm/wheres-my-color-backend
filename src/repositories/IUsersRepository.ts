import User from '@entities/User';

interface IUsersRepository {
  findByEmail(email: string, withPassword?: boolean): Promise<User | null>;
  findByUsername(username: string, withPassword?: boolean): Promise<User | null>;
  findById(id: string, withPassword?: boolean): Promise<User | null>;
  getAllUsers(): Promise<User[]>
  update(user: User): Promise<User| null>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
