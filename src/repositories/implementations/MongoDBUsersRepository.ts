import User from '@entities/User';
import { Model } from 'mongoose';
import IUsersRepository from '@repositories/IUsersRepository';

export default class MongoDBUsersRepository implements IUsersRepository {
  constructor(private UserModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ email }).exec();
    return user;
  }

  async findById(_id: string): Promise<User | null> {
    const user = await this.UserModel.findById(_id).exec();
    return user;
  }

  async update(user: User): Promise<void> {
    await this.UserModel.findOneAndUpdate({ _id: user._id }, { ...user });
  }

  async save(user: User): Promise<User> {
    const userToSave = new this.UserModel(user);
    userToSave.isNew = true;
    return userToSave.save();
  }
}
