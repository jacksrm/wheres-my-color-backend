import { verify } from 'jsonwebtoken';
import { IAuthenticateUserJWT, IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';

export class AuthenticateUserUseCase {
  execute = (data: IAuthenticateUserRequestDTO) => {
    const { authorization } = data;
    const { SECRET_KEY } = process.env;

    if (!authorization) throw new Error('No authorization token provided!');

    const parts = authorization.split(' ');

    if (parts.length !== 2) throw new Error('Invalid token!');

    const [bearer, token] = parts;

    if (!(/^bearer$/i).test(bearer)) throw new Error('Token incorrectly formatted!');

    return verify(token, SECRET_KEY!) as IAuthenticateUserJWT;
  }
}
