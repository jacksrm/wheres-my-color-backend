import { MongoDBPalettesRepository } from './implementations/MongoDBPalettesRepository';
import { MongoDBUsersRepository } from './implementations/MongoDBUsersRepository';
import { MongoDBColorsRepository } from './implementations/MongoDBColorsRepository';
import { IRepositoryFactory } from './IRepositoryFactory';
import { PaletteModel } from './schemas/PaletteSchema';
import { UserModel } from './schemas/UserSchema';
import { ColorModel } from './schemas/ColorSchema';

export function repositoriesModule(): IRepositoryFactory {
  return {
    colors: new MongoDBColorsRepository(ColorModel, PaletteModel),
    palettes: new MongoDBPalettesRepository(PaletteModel),
    users: new MongoDBUsersRepository(UserModel),
  };
}
