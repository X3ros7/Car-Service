import { IUserData } from 'src/user/interfaces/user.interface';

export interface IAuthResult {
  token: string;
  refreshToken: string;
  user: IUserData;
}
