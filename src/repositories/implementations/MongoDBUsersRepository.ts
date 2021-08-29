import User from '@entities/User';
import { Model } from 'mongoose';
import IUsersRepository from '@repositories/IUsersRepository';

export default class MongoDBUsersRepository implements IUsersRepository {
  constructor(private UserModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ email });

    if (!user) return null;

    return user;
  }

  async save(user: User): Promise<void> {
    const userToSave = new this.UserModel(user);
    await userToSave.save();
  }
}
