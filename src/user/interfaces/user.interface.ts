import { Role } from '../enums/role.enum';

export interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
