import { Schema } from 'mongoose';

import Palette from '@entities/Palette';
import User from '@entities/User';

const UserSchema = new Schema<User>({
  id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
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
  palettes: [typeof Palette],
  profilePicture: String,
});

export default UserSchema;