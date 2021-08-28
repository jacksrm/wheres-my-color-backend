import UserInterface from '@interfaces/UserInterface';
import connection from '../connection';
import PaletteSchema from './PaletteSchema';

const UserSchema = new connection.Schema<UserInterface>({
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
  profilePicture: {
    type: String,
    require: true,
  },
});

export default UserSchema;
