import Palette from '@entities/Palette';

export interface ICreateUserRequestDTO {
  username: string;

  email: string;

  password: string;

  palettes?: Palette[];

  profilePicture?: string;
}
