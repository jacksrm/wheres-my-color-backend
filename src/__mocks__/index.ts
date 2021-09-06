import { PalettesRepository } from './PalettesRepository';
import { UsersRepository } from './UsersRepository';

export function mockRepos() {
  return {
    palettes: new PalettesRepository(),
    users: new UsersRepository(),
  };
}
