import { v4 } from 'uuid';
import { Color } from './Color';

interface PaletteProps {
  ownerId: string
  colors?: Color[]
  name: string
  isPublic: boolean;
  membersId?: string[];
  authorizeChange?: string[];
  createdAt?: string;
  updatedAt?: string;

}

export class Palette {
  public readonly _id: string;

  public readonly ownerId: string;

  public colors?: Color[];

  public name: string;

  public isPublic: boolean;

  public membersId: string[];

  public authorizeChange: string[];

  public createdAt?: string;

  public updatedAt?: string;

  constructor(props: PaletteProps, id: string = v4()) {
    this.colors = props.colors;
    this.ownerId = props.ownerId;
    this.name = props.name;
    this.isPublic = props.isPublic;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.membersId = props.membersId ? props.membersId : [props.ownerId];
    this.authorizeChange = props.authorizeChange ? props.authorizeChange : [props.ownerId];
    this._id = id;
  }
}
