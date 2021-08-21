import PaletteInterface from '@interfaces/PaletteInterface';
import Color from './Color';
import User from './User';

class Palette implements PaletteInterface {
  constructor(
    readonly id: string,
    public colors: Color[],
    public name: string,
    public empty: boolean,
    public full: boolean,
    public isPublic: boolean,
    public members: User[],
    public canChange: User[],
  ) {}
}

export default Palette;
