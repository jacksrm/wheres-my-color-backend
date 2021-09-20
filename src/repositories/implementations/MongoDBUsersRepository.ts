import { User } from '@entities/User';
import { Model } from 'mongoose';
import { IUsersRepository } from '@repositories/IUsersRepository';

export class MongoDBUsersRepository implements IUsersRepository {
  constructor(private UserModel: Model<User>) {}

  deleteUser = async (userId: string): Promise<void> => {
    await this.UserModel.deleteOne({ _id: userId });
  };

  getAllUsers = async (): Promise<User[]> => {
    const users = await this.UserModel.find({});
    return users.map((user) => new User(user, user._id));
  };

  findByEmail = async (
    email: string,
    withPassword?: boolean,
  ): Promise<User | null> => {
    const user = withPassword
      ? await this.UserModel.findOne({ email }).select('+password').exec()
      : await this.UserModel.findOne({ email }).exec();
    return user ? new User(user, user._id) : null;
  };

  findByUsername = async (
    username: string,
    withPassword?: boolean,
  ): Promise<User | null> => {
    const user = withPassword
      ? await this.UserModel.findOne({ username }).select('+password').exec()
      : await this.UserModel.findOne({ username }).exec();
    return user ? new User(user, user._id) : null;
  };

  findById = async (
    _id: string,
    withPassword?: boolean,
  ): Promise<User | null> => {
    const user = withPassword
      ? await this.UserModel.findById(_id).select('+password').exec()
      : await this.UserModel.findById(_id).exec();
    return user ? new User(user, user._id) : null;
  };

  update = async (user: User): Promise<User | null> => {
    const { _id, email, password, username, profilePicture } = user;
    const updatedUser = await this.UserModel.findOneAndUpdate(
      {
        _id,
      },
      { _id, email, password, username, profilePicture },
    );

    return updatedUser ? new User(updatedUser, updatedUser._id) : null;
  };

  save = async (user: User): Promise<User> => {
    const userToSave = new this.UserModel(user);
    userToSave.isNew = true;
    const createdUser = await userToSave.save();
    return new User(createdUser, createdUser._id);
  };
}
