import UserInterface from '@interfaces/UserInterface';
import Palette from './Palette';

class User implements UserInterface {
  constructor(
    readonly id: string,
    public username: string,
    public email: string,
    public password: string,
    public palettes: Palette[],
    public profilePicture: string,
  ) {}
}

export default User;
