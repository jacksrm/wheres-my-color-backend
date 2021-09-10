import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { PalettesRepository } from './PalettesRepository';
import { UsersRepository } from './UsersRepository';

export function mockRepos(): IRepositoryFactory {
  return {
    palettes: new PalettesRepository(),
    users: new UsersRepository(),
  };
}
