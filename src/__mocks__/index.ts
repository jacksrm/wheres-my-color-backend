import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { ColorsRepository } from './ColorsRepository';
import { PalettesRepository } from './PalettesRepository';
import { UsersRepository } from './UsersRepository';

export function mockRepos(): IRepositoryFactory {
  return {
    colors: new ColorsRepository(),
    palettes: new PalettesRepository(),
    users: new UsersRepository(),
  };
}
