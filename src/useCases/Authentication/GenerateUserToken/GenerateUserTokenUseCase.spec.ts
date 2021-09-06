import 'dotenv/config';
import { verify } from 'jsonwebtoken';
import { IJWTContent } from '@interfaces/IJWTContent';
import { userCollection } from '@mocks/userCollection';

import { generateUserTokenModule } from '.';

const generate = generateUserTokenModule();

describe('Testes de GenerateUserToken.', () => {
  test('Testa se o token do usuário é gerado.', () => {
    const { SECRET_KEY } = process.env;

    const token = generate(userCollection()[0]);
    const data = verify(token, SECRET_KEY!) as unknown as IJWTContent;
    expect(data.userId).toEqual(userCollection()[0]._id);
  });
});
