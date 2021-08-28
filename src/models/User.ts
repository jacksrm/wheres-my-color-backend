import UserSchema from '@database/schemas/UserSchema';
import UserInterface from '@interfaces/UserInterface';
import { model } from 'mongoose';

const User = model<UserInterface>('User', UserSchema);

export default User;
