import { v4 } from 'uuid';

interface UserProps {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public readonly _id: string;

  public email: string;

  public username: string;

  public password: string;

  public profilePicture?: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  constructor(props: UserProps, id: string = v4()) {
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this._id = id;
  }
}
