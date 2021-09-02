import { Request } from 'express';

export interface IRequestWithUserID extends Request {
  userId?: string;
}
