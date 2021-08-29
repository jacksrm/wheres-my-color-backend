import { v4 as uuid } from 'uuid';
import Color from './Color';

export default class Palette {
  public readonly id: string;

  public colors: Color[];

  public name: string;

  public isPublic: boolean;

  public membersID: string[];

  public authorizeChange: string[];

  constructor(props: Omit<Palette, 'id'>, id?: string) {
    this.colors = props.colors;
    this.name = props.name;
    this.isPublic = props.isPublic;
    this.membersID = props.membersID;
    this.authorizeChange = props.authorizeChange;
    this.id = !id ? uuid() : id;
  }
}
