import { mockRepos } from '@mocks/index';
import 'dotenv/config';
import { validLoginData } from '@mocks/userCollection';
import { UserLoginUseCase } from '../UserLogin/UserLoginUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';

const repos = mockRepos();
let token: string;

describe('Testes unitários de AuthenticateUser', () => {
  beforeEach(async () => {
    const loginUseCase = new UserLoginUseCase(repos.users);
    token = await loginUseCase.execute(validLoginData);
  });

  test('Ao passar um token válido deve retornar o token decodificado', async () => {
    const useCase = new AuthenticateUserUseCase();
    const decodedToken = useCase.execute({ authorization: `Bearer ${token}` });

    expect(decodedToken).toBeDefined();
    expect(decodedToken).toHaveProperty('userId');
    expect(decodedToken).toHaveProperty('email');
    expect(decodedToken.email).toEqual(validLoginData.email);
  });

  test('Ao não passar um token deve lançar um erro com a mensagem "No authorization token provided!"', async () => {
    const useCase = new AuthenticateUserUseCase();

    expect(() => useCase.execute({} as IAuthenticateUserRequestDTO))
      .toThrowError(new Error('No authorization token provided!'));
  });

  test('Ao passar um token faltando uma parte deve lançar um erro com a mensagem "Invalid token!"', async () => {
    const useCase = new AuthenticateUserUseCase();

    expect(() => useCase.execute({ authorization: 'Bearer' }))
      .toThrowError(Error('Invalid token!'));
  });

  test('Ao passar um token faltando uma parte deve lançar um erro com a mensagem "Invalid token!"', async () => {
    const useCase = new AuthenticateUserUseCase();

    expect(() => useCase.execute({ authorization: `Anything ${token}` }))
      .toThrowError(Error('Token incorrectly formatted!'));
  });
});
