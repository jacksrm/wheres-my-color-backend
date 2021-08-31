export interface IAuthenticateUserRequestDTO {
  authorization: string;
}

export interface IAuthenticateUserJWT {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
