import { IPalettesRepository } from './IPalettesRepository';
import { IUsersRepository } from './IUsersRepository';

export interface IRepositoryFactory {
  palettes: IPalettesRepository
  users: IUsersRepository
}
