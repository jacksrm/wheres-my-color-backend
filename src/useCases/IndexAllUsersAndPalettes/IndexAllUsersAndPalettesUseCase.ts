import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IUsersRepository } from '@repositories/IUsersRepository';

export class IndexAllUsersAndPalettesUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private paletteRepository: IPalettesRepository,
  ) {}

  execute = async () => {
    const users = await this.usersRepository.getAllUsers();
    const palettes = await this.paletteRepository.getAllPublicPalettes();
    const usersWithPalettes = users.map((userData) => {
      const {
        _id,
        username,
        profilePicture,
        createdAt,
        updatedAt,
      } = userData;

      const userPalettes = palettes.filter(
        (palette) => palette.ownerId === _id,
      );
      const userWithPalette = {
        _id,
        username,
        profilePicture,
        createdAt,
        updatedAt,
        palettes: userPalettes,
      };

      return userWithPalette;
    });

    return usersWithPalettes;
  }
}
