import UserInterface from '@interfaces/UserInterface';
import { Schema } from 'mongoose';
import PaletteSchema from './PaletteSchema';

const UserSchema = new Schema<UserInterface>({
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
  palettes: [PaletteSchema],
  profilePicture: String,
});

export default UserSchema;
