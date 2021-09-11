import { MongoDBPalettesRepository } from './implementations/MongoDBPalettesRepository';
import { MongoDBUsersRepository } from './implementations/MongoDBUsersRepository';
import { IRepositoryFactory } from './IRepositoryFactory';
import { PaletteModel } from './schemas/PaletteSchema';
import { UserModel } from './schemas/UserSchema';

export function repositoriesModule(): IRepositoryFactory {
  return {
    palettes: new MongoDBPalettesRepository(PaletteModel),
    users: new MongoDBUsersRepository(UserModel),
  };
}
