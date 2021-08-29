import { v4 as uuid } from 'uuid';
import Palette from './Palette';

export default class User {
  public readonly id: string;

  public username: string;

  public email: string;

  public password: string;

  public palettes?: Palette[];

  public profilePicture?: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.palettes = props.palettes || [];
    this.profilePicture = props.profilePicture || '';
    this.id = !id ? uuid() : id;
  }
}
