import { IColorsRepository } from './IColorsRepository';
import { IPalettesRepository } from './IPalettesRepository';
import { IUsersRepository } from './IUsersRepository';

export interface IRepositoryFactory {
  colors: IColorsRepository;
  palettes: IPalettesRepository;
  users: IUsersRepository;
}
