import { v4 } from 'uuid';
import Palette from './Palette';

interface UserProps {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export default class User {
  public readonly _id: string;

  public email: string;

  public username: string;

  public password: string;

  public profilePicture?: string;

  constructor(props: UserProps, id: string = v4()) {
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture;
    this._id = id;
  }
}
