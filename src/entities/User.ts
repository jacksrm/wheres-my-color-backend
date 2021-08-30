import { v4 } from 'uuid';

interface UserProps {
  username: string;
  email: string;
  password: string;
  palettes?: string[];
  profilePicture?: string;
}

export default class User {
  public readonly _id: string;

  public username: string;

  public email: string;

  public password: string;

  public palettes?: string[];

  public profilePicture?: string;

  constructor(props: UserProps, id: string = v4()) {
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.palettes = props.palettes;
    this.profilePicture = props.profilePicture;
    this._id = id;
  }
}
