import { verify } from 'jsonwebtoken';
import { IAuthenticateUserJWT, IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';

export default class AuthenticateUserUseCase {
  execute(data: IAuthenticateUserRequestDTO) {
    const { authorization } = data;
    const { SECRET_KEY } = process.env;

    if (!authorization) throw new Error('No authorization token provided!');

    const parts = authorization.split(' ');

    if (parts.length !== 2) throw new Error('Invalid token');

    const [bearer, token] = parts;

    if (!(/^Bearer$/i).test(bearer)) throw new Error('Token malformed!');

    return verify(token, SECRET_KEY!) as IAuthenticateUserJWT;
  }
}
