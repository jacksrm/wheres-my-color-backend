import Palette from '@entities/Palette';

export interface ICreateUserRequestDTO {
  username: string;

  email: string;

  password: string;

  palettes?: string[];

  profilePicture?: string;
}
