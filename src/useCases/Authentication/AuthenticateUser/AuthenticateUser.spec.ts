import { mockRepos } from '@mocks/index';
import 'dotenv/config';
import { validLoginData } from '@mocks/userCollection';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';
import { userLoginModule } from '../UserLogin';
import { authenticateUserModule } from '.';

const repos = mockRepos();
const userLogin = userLoginModule(repos);
const authenticate = authenticateUserModule();
let token: string;

describe('Testes unitários de AuthenticateUser', () => {
  beforeEach(async () => {
    token = await userLogin.useCase(validLoginData);
  });

  test('Ao passar um token válido deve retornar o token decodificado', async () => {
    const decodedToken = authenticate.useCase({ authorization: `Bearer ${token}` });

    expect(decodedToken).toBeDefined();
    expect(decodedToken).toHaveProperty('userId');
    expect(decodedToken).toHaveProperty('email');
    expect(decodedToken.email).toEqual(validLoginData.email);
  });

  test('Ao não passar um token deve lançar um erro com a mensagem "No authorization token provided!"', async () => {
    expect(() => authenticate.useCase({} as IAuthenticateUserRequestDTO))
      .toThrowError(new Error('No authorization token provided!'));
  });

  test('Ao passar um token faltando uma parte deve lançar um erro com a mensagem "Invalid token!"', async () => {
    expect(() => authenticate.useCase({ authorization: 'Bearer' }))
      .toThrowError(Error('Invalid token!'));
  });

  test('Ao passar um token faltando uma parte deve lançar um erro com a mensagem "Invalid token!"', async () => {
    expect(() => authenticate.useCase({ authorization: `Anything ${token}` }))
      .toThrowError(Error('Token incorrectly formatted!'));
  });
});
