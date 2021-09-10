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
    const usersWithPalettes = users.map(({ profilePicture, _id, username }) => {
      const userPalettes = palettes.filter((palette) => palette.ownerId === _id);
      const userWithPalette = {
        _id,
        profilePicture: profilePicture ?? '',
        username,
        palettes: userPalettes,
      };

      return userWithPalette;
    });

    return usersWithPalettes;
  }
}
