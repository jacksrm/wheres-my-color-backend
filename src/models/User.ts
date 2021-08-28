import connection from '@database/connection';
import UserSchema from '@database/schemas/UserSchema';
import UserInterface from '@interfaces/UserInterface';

const User = connection.model<UserInterface>('User', UserSchema);

export default User;
