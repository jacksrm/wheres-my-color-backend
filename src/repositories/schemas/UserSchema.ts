import { model, Schema } from 'mongoose';

import { User } from '@entities/User';

const UserSchema = new Schema<User>({
  _id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  profilePicture: {
    type: String,
    default: '',
  },
});

const UserModel = model('User', UserSchema, 'Users');

export { UserSchema, UserModel };
