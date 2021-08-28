import ColorInterface from './ColorInterface';

interface PaletteInterface {
  colors: ColorInterface[];
  name: string;
  empty: boolean;
  readonly full: boolean;
  isPublic: boolean;
  membersID: string[];
  canChange: string[];
}

export default PaletteInterface;
