import User from '@entities/User';
import { Model } from 'mongoose';
import IUsersRepository from '@repositories/IUsersRepository';

export default class MongoDBUsersRepository implements IUsersRepository {
  constructor(private UserModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ email }).exec();

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ id }).exec();

    if (!user) return null;

    return user;
  }

  async update(user: User): Promise<void> {
    await this.UserModel.findOneAndUpdate({ id: user.id }, { ...user });
  }

  async save(user: User): Promise<void> {
    const userToSave = new this.UserModel(user);
    await userToSave.save();
  }
}
