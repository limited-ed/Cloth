import { EmployeeCloth,Division } from './';

export class Employee
{
    id: number;
    fullName: string;
    tabNumber: number;
    professionId: number;
    divisionId: number;
    division: Division;

    height: number;
    headSize: number;
    clothSize: number;
    legSize: number;

    employeeCloths: EmployeeCloth[];
}
