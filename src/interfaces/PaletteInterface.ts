import Color from '@models/Color';
import User from '@models/User';

interface PaletteInterface {
  readonly id: string;
  colors: Color[];
  name: string;
  empty: boolean;
  readonly full: boolean;
  isPublic: boolean;
  members: User[];
  canChange: User[];
}

export default PaletteInterface;
