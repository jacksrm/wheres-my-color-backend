import Palette from '@models/Palette';

interface UserInterface {
  readonly id: string;
  username: string;
  email: string;
  password: string;
  palettes: Palette[];
  profilePicture: string;
}

export default UserInterface;
