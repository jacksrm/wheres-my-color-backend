import 'dotenv/config';

import User from '@entities/User';
import { verify } from 'jsonwebtoken';
import generateUserToken from '.';

describe.skip('Testes de GenerateUserToken.', () => {
  test('Testa se o token do usuário é gerado.', () => {
    interface IData {
      id: string;
      email: string;
      iat: number;
      exp: number;
    }

    const { SECRET_KEY } = process.env;
    const id = 'bd562f6b-fc7e-40be-a4db-691409568196';

    const userData = {
      username: 'JackSR',
      email: 'jack2@meuapp.com',
      password: '$2b$12$rJtEWH4gFcMIJPgvcPowkulQipqO2VbULiLjotLpvV6oa/b/6wAC2',
    };

    const user = new User(userData, id);

    const token = generateUserToken(user);
    const data = verify(token, SECRET_KEY!) as IData;

    expect(data.id).toEqual(id);
  });
});
