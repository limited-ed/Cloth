import { UserRole, Division, UserDivision } from './';

export class User {
    id: number;
    login: string;
    userName: string;
    passwordHash: string;
    roleId: number;
    userDivisions: UserDivision[];
}

