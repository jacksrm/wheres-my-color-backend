import { v4 } from 'uuid';

interface UserProps {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class User {
  public readonly _id: string;

  public email: string;

  public username: string;

  public password: string;

  public createdAt?: string;

  public updatedAt?: string;

  public profilePicture?: string;

  constructor(props: UserProps, id: string = v4()) {
    this.email = props.email;
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.profilePicture = props.profilePicture;
    this._id = id;
  }
}
