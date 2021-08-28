import PaletteInterface from './PaletteInterface';

interface UserInterface {
  username: string;
  email: string;
  password: string;
  palettes: PaletteInterface[];
  profilePicture?: string;
}

export default UserInterface;
