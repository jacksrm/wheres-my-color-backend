import User from '@entities/User';
import { Model, connection } from 'mongoose';
import IUsersRepository from '@repositories/IUsersRepository';

export default class MongoDBUsersRepository implements IUsersRepository {
  constructor(private UserModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.UserModel.find({});
    return users;
  }

  async findByEmail(
    email: string,
    withPassword?: boolean,
  ): Promise<User | null> {
    const user = withPassword
      ? await this.UserModel.findOne({ email }).select('+password').exec()
      : await this.UserModel.findOne({ email }).exec();
    return user;
  }

  async findByUsername(
    username: string,
    withPassword?: boolean,
  ): Promise<User | null> {
    const user = withPassword
      ? await this.UserModel.findOne({ username }).select('+password').exec()
      : await this.UserModel.findOne({ username }).exec();
    return user;
  }

  async findById(_id: string, withPassword?: boolean): Promise<User | null> {
    const user = withPassword
      ? await this.UserModel.findById(_id).select('+password').exec()
      : await this.UserModel.findById(_id).exec();
    return user;
  }

  async update(user: User): Promise<User | null> {
    return this.UserModel.findOneAndUpdate({ _id: user._id }, { ...user });
  }

  async save(user: User): Promise<User> {
    const userToSave = new this.UserModel(user);
    userToSave.isNew = true;
    return userToSave.save();
  }
}
