import User from '@entities/User';
import { Model } from 'mongoose';
import IUsersRepository from '@repositories/IUsersRepository';

export default class MockUsersRepository {
  constructor() {}

  async findByEmail(email: string, withPassword?: boolean) {}

  async findByUsername(
    username: string,
    withPassword?: boolean,
  ) {}

  async findById(_id: string, withPassword?: boolean) {}

  async update(user: User): Promise<void> {
    console.log(user);
  }

  async save(user: User) {}
}
