import { IUsersRepository } from '@repositories/IUsersRepository';
import { IGetUserRequestDTO } from './GetUserDTO';

export class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

   execute = async (data: IGetUserRequestDTO) => {
     const user = await this.usersRepository.findById(data.userId);

     if (!user) throw new Error('User not found!');

     return user;
   }
}
